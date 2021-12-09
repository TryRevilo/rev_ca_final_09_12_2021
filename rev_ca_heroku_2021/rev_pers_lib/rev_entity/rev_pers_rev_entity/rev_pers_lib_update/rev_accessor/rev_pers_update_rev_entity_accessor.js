const rev_db_init = require("../../../../rev_db_init/rev_db_init");

function revPersUpdateResolvedRevEntity(remoteRevEntityGUID, callback) {
    var sql = `UPDATE REV_ENTITY_TABLE SET REV_RESOLVE_STATUS = 0 WHERE REMOTE_REV_ENTITY_GUID = ${remoteRevEntityGUID}`;

    rev_db_init.getRevConnection((connection) => {
        connection.query(sql, function (err, result, fields) {
            if (err) console.log("SELECT " + err.message);
            callback(result);
        });

        connection.release();
    });
}

function revPersUpdateSetForDelete(remoteRevEntityGUID, callback) {
    var sql = `UPDATE REV_ENTITY_TABLE SET REV_RESOLVE_STATUS = -7 WHERE REMOTE_REV_ENTITY_GUID = ${remoteRevEntityGUID}`;

    rev_db_init.getRevConnection((connection) => {
        connection.query(sql, function (err, result, fields) {
            if (err) console.log("SELECT " + err.message);

            callback(result);

            client.end(function (err) {
                if (err) {
                    console.log("end " + err.message);
                }
            });
        });

        connection.release();
    });
}

module.exports.revPersUpdateResolvedRevEntity = revPersUpdateResolvedRevEntity;
module.exports.revPersUpdateSetForDelete = revPersUpdateSetForDelete;
