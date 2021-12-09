const rev_db_init = require("../../../../rev_db_init/rev_db_init");

function revPersCountRevEntyAnn_By_Entity_GUID_Ann_Val(revVarArgs, callback) {
    let revAnnotationRemoteEntityGUID = revVarArgs.revAnnotationRemoteEntityGUID;
    let revAnnotationValue = revVarArgs.revAnnotationValue;
    let revAnnotationNameId = revVarArgs.revAnnotationNameId;
    let revStartColumnId = 0;

    if (revVarArgs.revStartColumnId) revStartColumnId = revVarArgs.revStartColumnId;

    let todo = [revAnnotationRemoteEntityGUID, revAnnotationNameId, revAnnotationValue, revStartColumnId];

    var stmt = "SELECT COUNT (ANNOTATION_ID) AS revTotCount FROM REV_ENTITY_ANNOTATIONS_TABLE WHERE REV_ENTITY_GUID = ? AND ANNOTATION_NAME_ID = ? AND ANNOTATION_VALUE = ? AND ANNOTATION_ID >= ?";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersCountRevEntyAnn_By_Entity_GUID_Ann_Val -> " + err.message);
                callback(-1);
            } else {
                if (row && row.length > 0) {
                    callback(row[0].revTotCount);
                } else {
                    callback(0);
                }
            }
        });

        connection.release();
    });
}

function revPersReadAnnId_By_AnnNameId_OwnerEntityGUID(revVarArgs, callback) {
    let revAnnotationNameId = revVarArgs._revAnnotationNameId;
    let revAnnRemoteOwnerEntityGUID = revVarArgs._revAnnRemoteOwnerEntityGUID;
    let revAnnotationRemoteEntityGUID = revVarArgs._revAnnotationRemoteEntityGUID;

    let todo = [revAnnotationNameId, revAnnRemoteOwnerEntityGUID, revAnnotationRemoteEntityGUID];

    var stmt = "SELECT ANNOTATION_ID, ANNOTATION_VALUE FROM REV_ENTITY_ANNOTATIONS_TABLE WHERE ANNOTATION_NAME_ID = ? AND REV_ENTITY_OWNER_GUID = ? AND REV_ENTITY_GUID = ? LIMIT 1";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadAnnId_By_AnnNameId_OwnerEntityGUID -> " + err.message);
                callback(-1);
            } else {
                if (row && row.length > 0) {
                    callback(row[0]);
                } else {
                    callback(null);
                }
            }
        });

        connection.release();
    });
}

function revPersReadRevEntityAnn_By_RemoteRevEntityGUID(revEntityGUID, callback) {
    let todo = [revEntityGUID];

    var stmt = "SELECT * FROM REV_ENTITY_ANNOTATIONS_TABLE WHERE REV_ENTITY_GUID = ?";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevEntityAnn_By_RemoteRevEntityGUID -> " + err.message);
                callback(-1);
            } else {
                if (row && row.length > 0) {
                    callback(row);
                } else {
                    callback([]);
                }
            }
        });

        connection.release();
    });
}

function revPersReadAnnEntityGUIDs_By_AnnId_OwnerEntityGUID(revVarArgs, callback) {
    let revAnnNameId = revVarArgs.rev_ann_name_id;
    let revOwnerEntityGUID = revVarArgs.rev_logged_in_entity_guid;

    let revLimit = 100;

    if (revVarArgs.rev_limit) revLimit = revVarArgs.rev_limit;

    let todo = [revAnnNameId, revOwnerEntityGUID, revLimit];

    var stmt = "SELECT REV_ENTITY_GUID FROM REV_ENTITY_ANNOTATIONS_TABLE WHERE ANNOTATION_NAME_ID = ? AND REV_ENTITY_OWNER_GUID = ? ORDER BY ANNOTATION_ID DESC LIMIT ?";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadAnnEntityGUIDs_By_AnnId_OwnerEntityGUID -> " + err.message);
                callback(-1);
            } else {
                if (row && row.length > 0) {
                    callback(row);
                } else {
                    callback([]);
                }
            }
        });

        connection.release();
    });
}

function revPersReadAnns_By_AnnId_OwnerEntityGUID(revVarArgs, callback) {
    let revAnnNameId = revVarArgs.rev_ann_name_id;
    let revOwnerEntityGUID = revVarArgs.rev_logged_in_entity_guid;

    let revLimit = 100;

    if (revVarArgs.rev_limit) {
        revLimit = revVarArgs.rev_limit;
    }

    let todo = [revAnnNameId, revOwnerEntityGUID, revLimit];

    var stmt = "SELECT * FROM REV_ENTITY_ANNOTATIONS_TABLE WHERE ANNOTATION_NAME_ID = ? AND REV_ENTITY_OWNER_GUID = ? ORDER BY ANNOTATION_ID DESC LIMIT ?";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadAnns_By_AnnId_OwnerEntityGUID -> " + err.message);
                callback([-1]);
            } else {
                if (row && row.length > 0) {
                    callback(row);
                } else {
                    callback([]);
                }
            }
        });

        connection.release();
    });
}

module.exports.revPersCountRevEntyAnn_By_Entity_GUID_Ann_Val = revPersCountRevEntyAnn_By_Entity_GUID_Ann_Val;

module.exports.revPersReadAnnId_By_AnnNameId_OwnerEntityGUID = revPersReadAnnId_By_AnnNameId_OwnerEntityGUID;

module.exports.revPersReadRevEntityAnn_By_RemoteRevEntityGUID = revPersReadRevEntityAnn_By_RemoteRevEntityGUID;
module.exports.revPersReadAnnEntityGUIDs_By_AnnId_OwnerEntityGUID = revPersReadAnnEntityGUIDs_By_AnnId_OwnerEntityGUID;

module.exports.revPersReadAnns_By_AnnId_OwnerEntityGUID = revPersReadAnns_By_AnnId_OwnerEntityGUID;
