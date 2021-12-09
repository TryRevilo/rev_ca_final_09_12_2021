//our username
var conn;
var revPort = 4000;

var revSetupWebSocket = () => {
    conn = new WebSocket(`ws://localhost:${revPort}`);

    conn.onerror = function (err) {
        console.log("Got error", err);
        conn = new WebSocket(`ws://localhost:${revPort}`);
    };

    conn.onopen = function () {
        console.log("Connected to the signaling server");
    };

    let revOKGo = async (revVarArgs) => {
        /** START REV CALL PLUGINS */
        let revEntityPlugins = await window.revGetLoadedPluginHookHandlers("revPluginModuleWebRTCResponce");
        revEntityPlugins = revEntityPlugins.filter[0].revPluginHookHandlersArr;

        if (revVarArgs && Array.isArray(revEntityPlugins)) {
            let revRetVal = await window.revInitHookHandlers("revPluginModuleWebRTCResponce", revEntityPlugins, revVarArgs);
            console.log("OK GO . . . " + revRetVal);
        }
        /** END REV CALL PLUGINS */
    };

    //when we got a message from a signaling server
    conn.onmessage = function (msg) {
        var data = JSON.parse(msg.data);

        console.log(">>> data.type : " + data.type);

        switch (data.type) {
            case "connection":
                console.log("connected : " + JSON.stringify(data.success));
                break;
            //when we make connection
            case "login":
                handleLogin(data.success);
                break;
            //when somebody wants to call us
            case "offer":
                handleOffer(data.offer, data.revEntity, data.revConnType);
                break;
            case "answer":
                handleAnswer(data.answer, data.revEntity);
                break;
            //when a remote peer sends an ice candidate to us
            case "candidate":
                handleCandidate(data.candidate, data.revEntity);
                break;
            case "leave":
                handleLeave(data.revEntity);
                break;
            case "revConnEntity":
                revOKGo(data);
                break;
            case "error":
                console.log("ERR : " + JSON.stringify(data));
                break;
            default:
                break;
        }
    };

    conn.onclose = function () {
        // setTimeout(setupWebSocket, 1000);
    };
};

//connecting to our signaling server
revSetupWebSocket();

//alias for sending JSON encoded messages
function send(message) {
    //attach the other peer username to our messages
    if (message && message.revEntity) {
        try {
            conn.send(JSON.stringify(message));
        } catch (error) {}
    }
}

//******
//UI selectors block
//******

// Login when the user clicks the button
var revWebRTCLogIn = (revEntity) => {
    if (revEntity._remoteRevEntityGUID > 0) {
        send({
            type: "login",
            revEntity: revEntity,
        });
    }
};

function handleLogin(success) {
    if (success === false) {
        alert("Ooops...try a different username");
    } else {
        //**********************
        //Starting a peer connection
        //**********************
        console.log("Logged In . . .");
    }
}

var revGetEntityRCTObject = (revTargetEntity, revProp) => {
    if (!revTargetEntity || !revTargetEntity._remoteRevEntityGUID) {
        console.log("ERR -> !revEntity || !revEntity._remoteRevEntityGUID");
        return;
    }

    let remoteRevEntityGUID = revTargetEntity._remoteRevEntityGUID;

    if (window.revRCTConnectionObjectsArr && window.revRCTConnectionObjectsArr.hasOwnProperty(remoteRevEntityGUID)) {
        let revRCTConnectionObject = window.revRCTConnectionObjectsArr[remoteRevEntityGUID];
        return revRCTConnectionObject[revProp];
    }

    return null;
};

var revInitConn = (revTargetEntity) => {
    // Using Google public stun server
    let peerConnectionConfig = {
        "iceServers": [{ "urls": "stun:stun2.1.google.com:19302" }],
    };

    let revTargetConn;

    try {
        revTargetConn = new RTCPeerConnection(peerConnectionConfig, { optional: [{ RtpDataChannels: true }] });
    } catch (err) {
        console.log("ERR -> revInitConn -> " + err);
    }

    // Setup ice handling
    revTargetConn.onicecandidate = function (event) {
        if (event.candidate) {
            send({
                type: "candidate",
                candidate: event.candidate,
                revEntity: revTargetEntity,
            });
        }
    };

    // Creating data channel
    let remoteRevEntityGUID = revTargetEntity._remoteRevEntityGUID;
    let revDataChannel = revTargetConn.createDataChannel(remoteRevEntityGUID, { reliable: true });

    revDataChannel.onerror = function (error) {
        console.log("Ooops...error:", error);
    };

    revTargetConn.ondatachannel = function (event) {
        console.log("Data channel is created!");

        event.channel.onopen = function () {
            console.log("Data channel is open and ready to be used.");

            // When we receive a message from the other peer, display it on the screen
            event.channel.onmessage = async (event) => {
                console.log("onmessage -> event.data :\n\t\t" + event.data);

                let revData = event.data;

                /** START REV CALL PLUGIN HOOK HANDLERS */
                if (revData) {
                    let revEntityPlugins = await window.revGetLoadedPluginHookHandlers("revPluginModuleWebRTCResponce_NewMessages");
                    revEntityPlugins = revEntityPlugins.filter[0].revPluginHookHandlersArr;

                    if (Array.isArray(revEntityPlugins)) {
                        let revRetVal = await window.revInitHookHandlers("revPluginModuleWebRTCResponce_NewMessages", revEntityPlugins, revData);
                        console.log("revPluginModuleWebRTCResponce_NewMessages . . . " + revRetVal);
                    }
                }
                /** END REV CALL PLUGIN HOOK HANDLERS */
            };
        };
    };

    if (!window.revRCTConnectionObjectsArr) window.revRCTConnectionObjectsArr = {};

    if (!window.revRCTConnectionObjectsArr.hasOwnProperty(remoteRevEntityGUID)) {
        window.revRCTConnectionObjectsArr[remoteRevEntityGUID] = {
            "revConnection": revTargetConn,
            "revDataChannel": revDataChannel,
        };
    }
};

var revSendDataChannelMessage = (revDataChannel, revMessage) => {
    let revSendMsg = JSON.stringify(revMessage);

    console.log(revDataChannel.readyState + " -> revSendMsg : " + revSendMsg);

    if (revDataChannel.readyState == "open") {
        console.log("OPEN . . .");
        revDataChannel.send(revSendMsg);
    } else {
        revDataChannel.onopen = function (event) {
            if (revDataChannel.readyState == "open") {
                console.log("DATA.C OPEN . . .");

                revDataChannel.send(revSendMsg);
            }
        };
    }
};

// Initiating a data messanger
var revInitiateDataMessanger = (revMessage, revMessageRecipientEntity) => {
    if (!revMessageRecipientEntity || !revMessageRecipientEntity._remoteRevEntityGUID) return;

    let revDataChannel = revGetEntityRCTObject(revMessageRecipientEntity, "revDataChannel");

    if (!revDataChannel) {
        revInitConn(revMessageRecipientEntity);

        // create an offer
        let revConnection = revGetEntityRCTObject(revMessageRecipientEntity, "revConnection");

        revConnection.createOffer(
            function (offer) {
                send({
                    type: "offer",
                    offer: offer,
                    revEntity: revMessageRecipientEntity,
                    revConnType: "revData",
                });

                revConnection.setLocalDescription(offer);
            },
            function (error) {
                alert("Error when creating an offer :\n\t" + error);
            }
        );

        revDataChannel = revGetEntityRCTObject(revMessageRecipientEntity, "revDataChannel");
        revSendDataChannelMessage(revDataChannel, revMessage);
    } else {
        revSendDataChannelMessage(revDataChannel, revMessage);
    }
};

var revStoreStreams = (revEntity, revStream) => {
    let revEntityGUID = revEntity._remoteRevEntityGUID;

    if (!window.revRCTConnectionObjectsArr) window.revRCTConnectionObjectsArr = {};

    if (!window.revRCTConnectionObjectsArr.hasOwnProperty(revEntityGUID)) window.revRCTConnectionObjectsArr[revEntityGUID] = {};

    window.revRCTConnectionObjectsArr[revEntityGUID]["revEntityStream"] = revStream;
};

// Initiating a call
var revInitiateVideoCall = (revCallRecipientEntity, revLocalStreamCallback, revRemoteStreamCallback) => {
    if (revCallRecipientEntity._remoteRevEntityGUID > 0) {
        let revTargetConn = revGetEntityRCTObject(revCallRecipientEntity, "revConnection");

        if (!revTargetConn) {
            revInitConn(revCallRecipientEntity);
            revTargetConn = revGetEntityRCTObject(revCallRecipientEntity, "revConnection");
        }

        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

        let revStreamHandler = function (myStream) {
            // Setup stream listening
            revTargetConn.addStream(myStream);

            revStoreStreams(window.REV_LOGGED_IN_ENTITY, myStream);

            //when a remote user adds stream to the peer connection, we display it
            revTargetConn.onaddstream = function (e) {
                console.log("REMOTE USER PICKED!");
                revStoreStreams(revCallRecipientEntity, e.stream);

                revRemoteStreamCallback(e);
            };

            revLocalStreamCallback(myStream);

            revTargetConn.createOffer(
                function (offer) {
                    send({
                        type: "offer",
                        offer: offer,
                        revEntity: revCallRecipientEntity,
                    });

                    revTargetConn.setLocalDescription(offer);
                },
                function (error) {
                    alert("Error when creating an offer :\n\t" + error);
                }
            );
        };

        let revErrorHandler = function (error) {
            alert("ERR -> revInitiateVideoCall -> streamHandler -> " + error);
        };

        if (typeof navigator.mediaDevices.getUserMedia === "undefined") {
            navigator.getUserMedia({ video: true, audio: true }, revStreamHandler, revErrorHandler);
        } else {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(revStreamHandler).catch(revErrorHandler);
        }
    }
};

var revPickCall = (offer, revEntity) => {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

    // Getting local video stream

    let revCallbackFunc = (myStream) => {
        let revMyConn = revGetEntityRCTObject(revEntity, "revConnection");
        revMyConn.setRemoteDescription(new RTCSessionDescription(offer));
        revMyConn.addStream(myStream);

        revStoreStreams(window.REV_LOGGED_IN_ENTITY, myStream);

        // Create an answer to an offer
        revMyConn.createAnswer(
            function (answer) {
                revMyConn.setLocalDescription(answer);

                send({
                    type: "answer",
                    answer: answer,
                    revEntity: revEntity,
                });
            },
            function (error) {
                alert("Error when creating an answer");
            }
        );
    };

    let revErrorHandler = function (error) {
        alert("ERR -> revPickCall -> streamHandler -> " + error);
    };

    if (typeof navigator.mediaDevices.getUserMedia === "undefined") {
        navigator.getUserMedia({ video: true, audio: true }, revCallbackFunc, revErrorHandler);
    } else {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(revCallbackFunc).catch(revErrorHandler);
    }
};

var revReceiveMsg = (offer, revEntity) => {
    let revMyConn = revGetEntityRCTObject(revEntity, "revConnection");
    revMyConn.setRemoteDescription(new RTCSessionDescription(offer));

    // Create an answer to an offer
    revMyConn.createAnswer(
        function (answer) {
            revMyConn.setLocalDescription(answer);
            send({
                type: "answer",
                answer: answer,
                revEntity: revEntity,
            });
        },
        function (error) {
            alert("Error when creating an answer");
        }
    );
};

// When somebody sends us an offer
var handleOffer = (offer, revEntity, revConnType) => {
    revInitConn(revEntity);

    if (revConnType && revConnType.localeCompare("revData") == 0) {
        revReceiveMsg(offer, revEntity);
    } else {
        revPickCall(offer, revEntity);
    }
};

// When we got an answer from a remote user
var handleAnswer = (answer, revEntity) => {
    revGetEntityRCTObject(revEntity, "revConnection").setRemoteDescription(new RTCSessionDescription(answer));
};

// When we got an ice candidate from a remote user
function handleCandidate(candidate, revEntity) {
    revGetEntityRCTObject(revEntity, "revConnection").addIceCandidate(new RTCIceCandidate(candidate));
}

// Hang up
var revHangUpVideoCall = (revEntity) => {
    send({
        type: "leave",
        revEntity: revEntity,
    });

    handleLeave(revEntity);
};

var revClearStreams = (revEntity) => {
    let revStream = revGetEntityRCTObject(revEntity, "revEntityStream");

    if (revStream) {
        // stop both mic and camera
        function stopBothVideoAndAudio(stream) {
            stream.getTracks().forEach(function (track) {
                if (track.readyState == "live") {
                    track.stop();
                }
            });
        }

        // stop only camera
        function stopVideoOnly(stream) {
            stream.getTracks().forEach(function (track) {
                if (track.readyState == "live" && track.kind === "video") {
                    track.stop();
                }
            });
        }

        // stop only mic
        function stopAudioOnly(stream) {
            stream.getTracks().forEach(function (track) {
                if (track.readyState == "live" && track.kind === "audio") {
                    track.stop();
                }
            });
        }

        stopBothVideoAndAudio(revStream);
        stopVideoOnly(revStream);
        stopAudioOnly(revStream);
    }
};

var handleLeave = async (revEntity) => {
    let revEntityConn = revGetEntityRCTObject(revEntity, "revConnection");

    if (revEntityConn) {
        revClearStreams(revEntity);
        revClearStreams(window.REV_LOGGED_IN_ENTITY);

        // revEntityConn.close();
        revEntityConn.onicecandidate = null;
        revEntityConn.onaddstream = null;
    }
};
