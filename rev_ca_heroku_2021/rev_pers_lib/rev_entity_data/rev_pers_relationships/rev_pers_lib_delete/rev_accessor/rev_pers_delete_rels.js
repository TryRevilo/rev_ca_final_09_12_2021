const rev_db_init = require("../../../../rev_db_init/rev_db_init");

function revPersDeleteRel_By_revRelId(revRelId, callback) {
    var stmt = "DELETE FROM REV_ENTITY_RELATIONSHIPS_TABLE WHERE RELATIONSHIP_ID = ?";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, [revRelId], function (err, result, fields) {
            if (err) {
                console.log("ERR -> revPersDeleteRel_By_revRelId -> " + err.message);
                callback(-1);
            } else {
                callback(result.affectedRows);
            }
        });

        connection.release();
    });
}

function revPersDeleteRel_By_revRelIdaArr(revRelIdsArr, callback) {
    let revINOptions = "";

    for (let i = 0; i < revRelIdsArr.length; i++) {
        if (i == 0) {
            revINOptions += " IN (?";
        } else {
            revINOptions += ", ?";
        }

        if (i == revRelIdsArr.length - 1) {
            revINOptions += ")";
        }
    }

    if (revINOptions.localeCompare("") == 0) {
        callback([]);
        return;
    }

    let stmt = `DELETE FROM REV_ENTITY_RELATIONSHIPS_TABLE WHERE RELATIONSHIP_ID ${revINOptions}`;

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, revRelIdsArr, function (err, result, fields) {
            if (err) {
                console.log("ERR -> revPersDeleteRel_By_revRelId -> " + err.message);
                callback(-1);
            } else {
                callback(result.affectedRows);
            }
        });

        connection.release();
    });
}

function revPersDeleteRel_By_revRelValId_EntityGUIDs(relTypeValId, revEntityGUIDsArr, callback) {
    let todo = [revEntityGUIDsArr[0], revEntityGUIDsArr[1], revEntityGUIDsArr[0], revEntityGUIDsArr[1], relTypeValId];

    var stmt = "DELETE FROM REV_ENTITY_RELATIONSHIPS_TABLE WHERE ((SUBJECT_GUID = ? AND TARGET_GUID = ?) OR (TARGET_GUID = ? AND SUBJECT_GUID = ?)) AND RELATIONSHIP_TYPE_VALUE_ID = ?";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, result, fields) {
            if (err) {
                console.log("ERR -> revPersDeleteRel_By_revRelValId_EntityGUIDs -> " + err.message);
                callback(-1);
            } else {
                callback(result.insertId);
            }
        });

        connection.release();
    });
}

function revPersDeleteRels_By_remoteRevEntityGUID(remoteRevEntityGUIDsArr, callback) {
    let todo = remoteRevEntityGUIDsArr.concat(remoteRevEntityGUIDsArr);

    let revINOptions = "";

    for (let i = 0; i < remoteRevEntityGUIDsArr.length; i++) {
        if (i == 0) {
            revINOptions += " IN (?";
        } else {
            revINOptions += ", ?";
        }

        if (i == remoteRevEntityGUIDsArr.length - 1) revINOptions += ")";
    }

    if (revINOptions.localeCompare("") == 0) {
        callback([]);
        return;
    }

    let stmt = "DELETE FROM REV_ENTITY_RELATIONSHIPS_TABLE WHERE SUBJECT_GUID" + revINOptions + " OR TARGET_GUID" + revINOptions;

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, result, fields) {
            if (err) {
                console.log("ERR -> revPersDeleteRels_By_remoteRevEntityGUID -> " + err.message);
                callback(-1);
            } else {
                callback(result.insertId);
            }
        });

        connection.release();
    });
}

module.exports.revPersDeleteRel_By_revRelId = revPersDeleteRel_By_revRelId;
module.exports.revPersDeleteRel_By_revRelIdaArr = revPersDeleteRel_By_revRelIdaArr;
module.exports.revPersDeleteRel_By_revRelValId_EntityGUIDs = revPersDeleteRel_By_revRelValId_EntityGUIDs;
module.exports.revPersDeleteRels_By_remoteRevEntityGUID = revPersDeleteRels_By_remoteRevEntityGUID;
