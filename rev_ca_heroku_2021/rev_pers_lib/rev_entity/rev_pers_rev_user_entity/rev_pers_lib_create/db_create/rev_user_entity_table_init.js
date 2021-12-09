const revDb = require("../../../../rev_db_init/rev_db_init");

function revTableCreate_REV_USER_ENTITY(callback) {
  let stmt =
    "CREATE TABLE IF NOT EXISTS REV_USER_ENTITY_TABLE(\n" +
    "ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY, \n" +
    "REV_ENTITY_GUID     INTEGER     NOT NULL,\n" +
    "COLUMN_NAME_REV_USER_EMAIL            TEXT     NOT NULL,\n" +
    "COLUMN_NAME_REV_USER_FULL_NAMES           TEXT    NOT NULL,\n" +
    "CREATED_DATE            TEXT     NOT NULL,\n" +
    "UPDATED_DATE           TEXT     NOT NULL);";

  revDb.getRevConnection(connection => {
    connection.query(stmt, function (err, results, res) {
      if (err) console.log('ERR -> revTableCreate_REV_USER_ENTITY -> ' + err.message);

      return callback("Rev LOG : REV USER TABLE CREATE > >> " + results);
    });

    connection.release();
  });
}

module.exports.revTableCreate_REV_USER_ENTITY = revTableCreate_REV_USER_ENTITY;
