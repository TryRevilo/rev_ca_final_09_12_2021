const rev_db_init = require("../../../../rev_db_init/rev_db_init");

var revPersUpdaterevEntityMetadataValue_By_MetadataId = (revMetadataId, revMetadataValue, callback) => {
    let todo = [revMetadataValue, revMetadataId];

    let sql = `UPDATE REV_ENTITY_METADATA_TABLE SET METADATA_VALUE = ? WHERE METADATA_ID = ?`;

    rev_db_init.getRevConnection((connection) => {
        connection.query(sql, todo, function (err, result) {
            if (err) {
                console.log("revPersUpdaterevEntityMetadataValue_By_MetadataId " + err.message);
            } else {
                callback(result.affectedRows);
            }

            connection.release();
        });
    });
};

var revPersUpdateMetadataGUID_By_MetadataId = (revMetadataId, revNewEntityGUID, callback) => {
    let todo = [revNewEntityGUID, revMetadataId];

    let sql = `UPDATE REV_ENTITY_METADATA_TABLE SET METADATA_VALUE = ? WHERE METADATA_ID = ?`;

    rev_db_init.getRevConnection((connection) => {
        connection.query(sql, todo, function (err, result) {
            if (err) {
                console.log("revPersUpdateMetadataGUID_By_MetadataId " + err.message);
            } else {
                callback(result["affectedRows"]);
            }

            connection.release();
        });
    });
};

var revPersMultiUpdateMetadataValue_By_MetadataIds = (revMetedataArr, callback) => {
    console.log(JSON.stringify(revMetedataArr));

    let revToDoDataArr = [];
    let revValsArr = [];

    for (let i = 0; i < revMetedataArr.length; i++) {
        let revMetadataValue = revMetedataArr[i]._metadataValue;
        let revMetadataId = revMetedataArr[i].remoteRevMetadataId;

        revToDoDataArr.push(revMetadataId);
        revToDoDataArr.push(revMetadataValue);

        revValsArr.push(["(?, ?)"]);
    }

    let revSQL = `INSERT INTO REV_ENTITY_METADATA_TABLE (METADATA_ID, METADATA_VALUE) VALUES ${revValsArr.join(",")}
    ON DUPLICATE KEY UPDATE METADATA_ID=VALUES(METADATA_ID), METADATA_VALUE=VALUES(METADATA_VALUE);`;

    rev_db_init.getRevConnection((connection) => {
        connection.query(revSQL, revToDoDataArr, function (err, result) {
            if (err) {
                console.log("revPersMultiUpdateMetadataValue_By_MetadataIds " + err.message);
            } else {
                callback(result.affectedRows);
            }

            connection.release();
        });
    });
};

module.exports.revPersUpdaterevEntityMetadataValue_By_MetadataId = revPersUpdaterevEntityMetadataValue_By_MetadataId;
module.exports.revPersUpdateMetadataGUID_By_MetadataId = revPersUpdateMetadataGUID_By_MetadataId;
module.exports.revPersMultiUpdateMetadataValue_By_MetadataIds = revPersMultiUpdateMetadataValue_By_MetadataIds;
