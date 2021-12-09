const rev_db_init = require("../../../../rev_db_init/rev_db_init");

function revPersReadRevUserEntity(callback) {
  rev_db_init.getRevConnection(connection => {
    connection.query("SELECT * FROM REV_ENTITY_TABLE", function(
      err,
      result,
      fields
    ) {
      if (err) console.log("SELECT " + err.message);

      callback(result);
    });

    connection.release();
  });
}

let revPersUserRevEntityExists = (revUserEntityUniqueRep, callback) => {
  let stmt =
    "SELECT 1 FROM REV_USER_ENTITY_TABLE WHERE COLUMN_NAME_REV_USER_EMAIL = ?";

  let todo = [revUserEntityUniqueRep];

  rev_db_init.getRevConnection(connection => {
    connection.query(stmt, todo, function(err, row) {
      if (err) {
        console.log("revPersUserRevEntityExists " + err.message);
        return "revPersUserRevEntityExists: " + err.message;
      } else {
        if (row && row.length > 0) {
          callback(true);
        } else callback(false);
      }
    });
    connection.release();
  });
};

function revPersReadRevUserEntityByRevEntityGUID(revEntityGUID, callback) {
  let todo = [revEntityGUID];

  var stmt = "SELECT * FROM REV_USER_ENTITY_TABLE WHERE REV_ENTITY_GUID = ?";

  rev_db_init.getRevConnection(connection => {
    connection.query(stmt, todo, function(err, result, fields) {
      if (err) console.log("SELECT REV ERR " + err.message);
      callback(result);
    });

    connection.release();
  });
}

function revPersReadRevUserEntityByRevUserEntityUserName_EMAIL_PHONENUMBER(
  revUserEntityUniqueRep,
  callback
) {
  let todo = [revUserEntityUniqueRep];

  var stmt =
    "SELECT * FROM REV_USER_ENTITY_TABLE WHERE COLUMN_NAME_REV_USER_EMAIL = ?";

  rev_db_init.getRevConnection(connection => {
    connection.query(stmt, todo, function(err, row, fields) {
      if (err) console.log("SELECT REV ERR " + err.message);

      if (row && row.length > 0) {
        callback(row[0]);
      } else {
        callback(0);
      }
    });

    connection.release();
  });
}

function revPersReadRevUserEntityGUID_By_EMAIL_PHONENUMBER(
  revUserEntityUniqueRep,
  callback
) {
  let todo = [revUserEntityUniqueRep];

  var stmt =
    "SELECT REV_ENTITY_GUID FROM REV_USER_ENTITY_TABLE WHERE COLUMN_NAME_REV_USER_EMAIL = ?";

  rev_db_init.getRevConnection(connection => {
    connection.query(stmt, todo, function(err, row, fields) {
      if (err) console.log("SELECT REV ERR " + err.message);

      if (row && row.length > 0) {
        callback(row[0]);
      } else {
        callback(0);
      }
    });

    connection.release();
  });
}

module.exports.revPersUserRevEntityExists = revPersUserRevEntityExists;
module.exports.revPersReadRevUserEntityGUID_By_EMAIL_PHONENUMBER = revPersReadRevUserEntityGUID_By_EMAIL_PHONENUMBER;
module.exports.revPersReadRevUserEntity = revPersReadRevUserEntity;
module.exports.revPersReadRevUserEntityByRevEntityGUID = revPersReadRevUserEntityByRevEntityGUID;
module.exports.revPersReadRevUserEntityByRevUserEntityUserName_EMAIL_PHONENUMBER = revPersReadRevUserEntityByRevUserEntityUserName_EMAIL_PHONENUMBER;
