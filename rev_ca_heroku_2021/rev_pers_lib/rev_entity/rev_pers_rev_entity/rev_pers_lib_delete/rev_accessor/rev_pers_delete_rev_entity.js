const rev_db_init = require('../../../../rev_db_init/rev_db_init')

function revPersDeleteRevEntity_By_remoteRevEntityGUIDs_Multi(remoteRevEntityGUIDsArr, callback) {
    let revINOptions = '';

    for (let i = 0; i < remoteRevEntityGUIDsArr.length; i++) {
        if (i === 0) {
            revINOptions += "IN (?";
        } else {
            revINOptions += ", ?";
        }

        if (i == (remoteRevEntityGUIDsArr.length - 1)) revINOptions += ")";
    }

    if (revINOptions.localeCompare('') == 0) {
        callback([]);
        return;
    }

    var stmt = "DELETE FROM REV_ENTITY_TABLE WHERE REMOTE_REV_ENTITY_GUID " + revINOptions;

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, remoteRevEntityGUIDsArr, function (err, result, fields) {
            if (err) {
                console.log("revPersDeleteRevEntity_By_remoteRevEntityGUIDs_Multi : " + err.message);
                callback(-1);
            } else {
                callback(result.affectedRows);
            }
        })

        connection.release();
    })
}


module.exports.revPersDeleteRevEntity_By_remoteRevEntityGUIDs_Multi = revPersDeleteRevEntity_By_remoteRevEntityGUIDs_Multi;