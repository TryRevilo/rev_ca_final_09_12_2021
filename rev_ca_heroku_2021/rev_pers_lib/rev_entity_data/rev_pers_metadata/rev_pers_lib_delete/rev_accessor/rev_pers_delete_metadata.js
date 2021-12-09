const rev_db_init = require("../../../../rev_db_init/rev_db_init");

function revPersDeleteMetadata_By_EntityGUID(remoteRevEntityGUIDsArr, callback) {
    if (!Array.isArray(remoteRevEntityGUIDsArr)) {
        return;
    }

    let revINOptions = "";

    for (let i = 0; i < remoteRevEntityGUIDsArr.length; i++) {
        if (i === 0) {
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

    var stmt = "DELETE FROM REV_ENTITY_METADATA_TABLE WHERE REV_ENTITY_GUID" + revINOptions;

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, remoteRevEntityGUIDsArr, function (err, result, fields) {
            if (err) {
                console.log("ERR -> revPersDeleteMetadata_By_EntityGUID -> " + err.message);
                callback(-1);
            } else {
                callback(result.affectedRows);
            }
        });

        connection.release();
    });
}

function revPersDeleteMetadata_By_MetadataId(revMetadataIdsArr, callback) {
    if (!revMetadataIdsArr || !Array.isArray(revMetadataIdsArr) || revMetadataIdsArr.length < 1) {
        callback(-1);
        return;
    }

    let revINOptions = "";

    for (let i = 0; i < revMetadataIdsArr.length; i++) {
        if (i === 0) {
            revINOptions += " IN (?";
        } else {
            revINOptions += ", ?";
        }

        if (i == revMetadataIdsArr.length - 1) revINOptions += ")";
    }

    if (revINOptions.localeCompare("") == 0) {
        callback([]);
        return;
    }

    var stmt = "DELETE FROM REV_ENTITY_METADATA_TABLE WHERE METADATA_ID" + revINOptions;

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, revMetadataIdsArr, function (err, result, fields) {
            if (err) {
                console.log("ERR -> revPersDeleteMetadata_By_MetadataId -> " + err.message);
                callback(-1);
            } else {
                callback(result.affectedRows);
            }
        });

        connection.release();
    });
}

module.exports.revPersDeleteMetadata_By_EntityGUID = revPersDeleteMetadata_By_EntityGUID;
module.exports.revPersDeleteMetadata_By_MetadataId = revPersDeleteMetadata_By_MetadataId;
