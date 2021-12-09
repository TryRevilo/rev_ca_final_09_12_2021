const rev_pers_read_rev_entity_info_wrapper = require("../../rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_pers_lib_read/rev_service_heper/rev_pers_read_rev_entity_info_wrapper");
const rev_pers_read_rev_entity_relationship_service_helper = require("../../rev_pers_lib/rev_entity_data/rev_pers_relationships/rev_pers_lib_read/rev_service_helper/rev_pers_read_rev_entity_relationship_service_helper");

//require our websocket library
var WebSocketServer = require("ws").Server;

/** All revConnectedUsers connected to the server
 * var revConnectedUsers = { revEntityGUID: { connection: connection, revEntity: revEntity } }
 * **/

var revConnectedUsers = {};

var revGetConnectedUser = (revEntityGUID) => {
    return revConnectedUsers[revEntityGUID];
};

var revSendToLiveEntities_Serv = (revVarArgsArr) => {
    console.log("SEND PRESENCE . . . .");

    for (let i = 0; i < revVarArgsArr.length; i++) {
        let remoteRevEntityGUID = revVarArgsArr[i].remoteRevEntityGUID;
        let revEntity = revVarArgsArr[i].revVarArgs;

        if (!revConnectedUsers.hasOwnProperty(remoteRevEntityGUID)) {
            // console.log("NOT AVAILABLE . . . " + remoteRevEntityGUID);
            continue;
        } else {
            console.log("Sending To remoteRevEntityGUID . . . " + remoteRevEntityGUID);
        }

        let revLiveEntityConn = revGetConnectedUser(remoteRevEntityGUID);

        let revData = { "type": "revConnEntity", "data": { "revEntity": revEntity } };

        if (revLiveEntityConn) {
            console.log("CONN . . .");

            revSendToConnection(revLiveEntityConn.connection, revData);
        }
    }
};

var revSendLoggedIn_Serv = async (revEntity) => {
    let revEntityGUID = revEntity._remoteRevEntityGUID;

    let revRelsArr = await rev_pers_read_rev_entity_relationship_service_helper.revPersReadRels_Subjects_Targets_GUIDs_By_RemoteRevEntityGUID_RevRelValId_EXPO_serv(revEntityGUID, 5);
    revRelsArr = revRelsArr.filter;

    let revRelGUIDsArr = [];

    for (let i = 0; i < revRelsArr.length; i++) {
        let revSubjectGUID = revRelsArr[i].revSubjectGUID;
        let revTargetGUID = revRelsArr[i].revTargetGUID;

        if (revEntityGUID == revSubjectGUID) {
            revRelGUIDsArr.push(revTargetGUID);
        } else revRelGUIDsArr.push(revSubjectGUID);
    }

    let revGetFilledEntities = await rev_pers_read_rev_entity_info_wrapper.revGetFilledEntities_Serv(revRelGUIDsArr);

    let revPassVarArgsArr = [];

    for (let i = 0; i < revGetFilledEntities.length; i++) {
        revPassVarArgsArr.push({ "remoteRevEntityGUID": revGetFilledEntities[i]._remoteRevEntityGUID, "revVarArgs": revEntity });
    }

    revSendToLiveEntities_Serv(revPassVarArgsArr);
};

var revInitWebSocketServer = (revServer) => {
    //creating a websocket server at port 9090

    let revWebSS = new WebSocketServer({
        server: revServer,
        // You should not use autoAcceptConnections for production
        // applications, as it defeats all standard cross-origin protection
        // facilities built into the protocol and the browser.  You should
        // *always* verify the connection's origin and decide whether or not
        // to accept it.
        autoAcceptConnections: false,
    });

    //when a user connects to our sever
    revWebSS.on("connection", function (connection) {
        console.log("User connected");

        // When server gets a message from a connected user
        connection.on("message", function (message) {
            let revData;

            //accepting only JSON messages
            try {
                revData = JSON.parse(message);
            } catch (e) {
                console.log("Invalid JSON");
                revData = { "rev-ERR": "Invalid JSON" };
            }

            let revEntity = revData.revEntity;

            if (!revEntity || revEntity._remoteRevEntityGUID < 1) return;

            console.log("revData.type : " + revData.type + "\n");

            //switching type of the user message
            switch (revData.type) {
                //when a user tries to login
                case "login":
                    console.log("User logged", revEntity._remoteRevEntityGUID);

                    //if anyone is logged in with this username then refuse
                    if (revConnectedUsers[revEntity._remoteRevEntityGUID]) {
                        revSendToConnection(connection, {
                            type: "login",
                            success: true,
                        });
                    } else {
                        //save user connection on the server
                        revConnectedUsers[revEntity._remoteRevEntityGUID] = { connection: connection, revEntity: revEntity };
                        connection.revEntity = revEntity;

                        revSendToConnection(connection, {
                            type: "login",
                            success: true,
                        });
                    }

                    revSendLoggedIn_Serv(revEntity);

                    break;

                case "offer":
                    //for ex. UserA wants to call UserB
                    console.log("Sending offer to: ", revEntity._remoteRevEntityGUID);

                    if (!revConnectedUsers || !revConnectedUsers[revEntity._remoteRevEntityGUID] || !revConnectedUsers[revEntity._remoteRevEntityGUID].connection) {
                        revSendToConnection(connection, {
                            type: "rev_unavailable",
                            offer: revData.offer,
                            revEntity: null,
                            revConnType: revData.revConnType,
                        });

                        break;
                    }

                    //if UserB exists then send him offer details
                    let revOfferConn = revConnectedUsers[revEntity._remoteRevEntityGUID].connection;

                    console.log("revOfferConn != null : " + (revOfferConn != null));

                    if (revOfferConn != null) {
                        //setting that UserA connected with UserB
                        connection.otherName = revEntity;

                        revSendToConnection(revOfferConn, {
                            type: "offer",
                            offer: revData.offer,
                            revEntity: connection.revEntity,
                            revConnType: revData.revConnType,
                        });
                    }

                    break;

                case "answer":
                    console.log("Sending answer to: ", revEntity._remoteRevEntityGUID);

                    if (!revConnectedUsers || !revConnectedUsers[revEntity._remoteRevEntityGUID] || !revConnectedUsers[revEntity._remoteRevEntityGUID].connection) {
                        revSendToConnection(connection, {
                            type: "rev_unavailable",
                            offer: revData.offer,
                            revEntity: null,
                        });

                        break;
                    }

                    //for ex. UserB answers UserA
                    let revAnswerConn = revConnectedUsers[revEntity._remoteRevEntityGUID].connection;

                    if (revAnswerConn != null) {
                        connection.otherName = revEntity;
                        revSendToConnection(revAnswerConn, {
                            type: "answer",
                            answer: revData.answer,
                            revEntity: connection.revEntity,
                        });
                    }

                    break;

                case "candidate":
                    console.log("Sending candidate to:", revEntity._remoteRevEntityGUID);

                    if (!revConnectedUsers || !revConnectedUsers[revEntity._remoteRevEntityGUID] || !revConnectedUsers[revEntity._remoteRevEntityGUID].connection) {
                        console.log("ERR candidate . . .");

                        revSendToConnection(connection, {
                            type: "rev_unavailable",
                            offer: revData.offer,
                            revEntity: null,
                        });

                        break;
                    }

                    let revCandidateConn = revConnectedUsers[revEntity._remoteRevEntityGUID].connection;

                    if (revCandidateConn != null) {
                        revSendToConnection(revCandidateConn, {
                            type: "candidate",
                            candidate: revData.candidate,
                            revEntity: connection.revEntity,
                        });
                    }

                    break;

                case "leave":
                    console.log("Disconnecting from", revEntity._remoteRevEntityGUID);

                    if (!revConnectedUsers || !revConnectedUsers[revEntity._remoteRevEntityGUID] || !revConnectedUsers[revEntity._remoteRevEntityGUID].connection) {
                        revSendToConnection(connection, {
                            type: "rev_unavailable",
                            offer: revData.offer,
                            revEntity: null,
                        });

                        break;
                    }

                    var revLeaveConn = revConnectedUsers[revEntity._remoteRevEntityGUID].connection;

                    //notify the other user so he can disconnect his peer connection
                    if (revLeaveConn != null) {
                        revSendToConnection(revLeaveConn, {
                            type: "leave",
                            revEntity: revLeaveConn.otherName,
                        });

                        revLeaveConn.otherName = null;
                    }

                    break;

                default:
                    revSendToConnection(connection, {
                        type: "error",
                        message: "Command not found: " + revData.type,
                    });

                    break;
            }
        });

        //when user exits, for example closes a browser window
        //this may help if we are still in "offer","answer" or "candidate" state
        connection.on("close", function () {
            let revEntity = connection.revEntity;

            if (revEntity && revEntity._remoteRevEntityGUID) {
                let remoteRevEntityGUID = revEntity._remoteRevEntityGUID;

                delete revConnectedUsers[remoteRevEntityGUID];

                if (connection.otherName) {
                    console.log("Disconnecting from ", connection.otherName._remoteRevEntityGUID);

                    let revCloseConn = revConnectedUsers[connection.otherName];

                    if (!revCloseConn || !revCloseConn.otherName) return;
                    revCloseConn.otherName = null;

                    if (revCloseConn != null) {
                        revSendToConnection(revCloseConn, {
                            type: "leave",
                        });
                    }
                }
            }
        });

        connection.send(JSON.stringify({ revData: "Hello world" }));
    });
};

var revSendToConnection = (connection, message) => {
    connection.send(JSON.stringify(message));
};

module.exports.revInitWebSocketServer = revInitWebSocketServer;
module.exports.revSendToLiveEntities_Serv = revSendToLiveEntities_Serv;
