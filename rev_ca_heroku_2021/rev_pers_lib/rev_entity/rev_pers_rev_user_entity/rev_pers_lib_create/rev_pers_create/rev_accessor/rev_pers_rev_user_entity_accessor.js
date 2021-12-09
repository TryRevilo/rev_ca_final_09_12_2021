const rev_db_init = require("../../../../../rev_db_init/rev_db_init");

function revPersSaveRevUserEntity(revData, callback) {
  rev_db_init.getRevConnection(connection => {
    let stmt =
      "INSERT INTO REV_USER_ENTITY_TABLE (\n" +
      "REV_ENTITY_GUID, \n" +
      "COLUMN_NAME_REV_USER_EMAIL, \n" +
      "COLUMN_NAME_REV_USER_FULL_NAMES, \n" +
      "CREATED_DATE, \n" +
      "UPDATED_DATE\n" +
      " ) \n" +
      `VALUES(?, ?, ?, ?, ?)`;

    let todo = [
      revData["_remoteRevEntityGUID"],
      revData["revUserEntity"]._email,
      revData["revUserEntity"]._fullNames,
      revData["_timeCreated"],
      revData["_timeUpdated"]
    ];

    connection.query(stmt, todo, function(err, res) {
      if (err) {
        console.log(
          "revPersSaveRevUserEntity HERE ERR : \n\t" + err.message + "\n"
        );
        return "insertData " + err.message;
      }

      callback(res);
    });

    connection.release();
  });
}

module.exports.revPersSaveRevUserEntity = revPersSaveRevUserEntity;
