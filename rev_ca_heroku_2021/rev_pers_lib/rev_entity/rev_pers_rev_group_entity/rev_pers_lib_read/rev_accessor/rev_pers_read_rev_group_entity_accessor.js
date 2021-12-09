const rev_db_init = require("../../../../rev_db_init/rev_db_init");

function revPersReadRevGroupEntity(callback) {
  rev_db_init.getRevConnection(connection => {
    connection.query("SELECT * FROM REV_ENTITY_TABLE", function(
      err,
      result,
      fields
    ) {
      if (err) console.log("SELECT " + err.message);

      return callback(result);
    });

    connection.release();
  });
}

function revPersReadRevGroupEntityByRevEntityGUID(revEntityGUID, callback) {
  let todo = [revEntityGUID];

  var stmt = "SELECT * FROM REV_GROUP_ENTITY WHERE REV_GROUP_ENTITY_GUID = ?";

  rev_db_init.getRevConnection(connection => {
    connection.query(stmt, todo, function(err, result, fields) {
      if (err) console.log("SELECT REV ERR " + err.message);
      return callback(result);
    });

    connection.release();
  });
}

module.exports.revPersReadRevUserEntity = revPersReadRevGroupEntity;
module.exports.revPersReadRevGroupEntityByRevEntityGUID = revPersReadRevGroupEntityByRevEntityGUID;
