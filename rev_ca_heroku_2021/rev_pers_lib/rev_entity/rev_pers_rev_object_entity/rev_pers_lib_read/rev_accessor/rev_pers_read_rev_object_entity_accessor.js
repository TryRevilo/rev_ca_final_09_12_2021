const rev_db_init = require("../../../../rev_db_init/rev_db_init");

function revPersReadRevEntity(remoteRevEntityGUID, callback) {
  let todo = [remoteRevEntityGUID];

  rev_db_init.getRevConnection(connection => {
    connection.query(
      "SELECT * FROM REV_ENTITY_TABLE WHERE REMOTE_REV_ENTITY_GUID = ?",
      todo,
      function(err, result, fields) {
        if (err) console.log("SELECT " + err.message);
        callback(result);
      }
    );

    connection.release();
  });
}

function revPersReadRevObjectEntity_By_RemoteRevEntityGUID_Accessor(
  remoteRevEntityGUID,
  callback
) {
  let todo = [remoteRevEntityGUID];

  rev_db_init.getRevConnection(connection => {
    connection.query(
      "SELECT * FROM REV_OBJECT_ENTITY_TABLE WHERE REV_ENTITY_GUID = ?",
      todo,
      function(err, result, fields) {
        if (err) console.log("SELECT " + err.message);
        callback(result);
      }
    );

    connection.release();
  });
}

module.exports.revPersReadRevEntity = revPersReadRevEntity;
module.exports.revPersReadRevObjectEntity_By_RemoteRevEntityGUID_Accessor = revPersReadRevObjectEntity_By_RemoteRevEntityGUID_Accessor;
