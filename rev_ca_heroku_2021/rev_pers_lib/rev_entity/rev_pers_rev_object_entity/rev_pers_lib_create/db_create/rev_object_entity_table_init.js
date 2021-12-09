const rev_db_init = require("../../../../rev_db_init/rev_db_init");

function revTableCreate_REV_OBJECT_ENTITY(callback) {
  let stmt =
    "CREATE TABLE IF NOT EXISTS REV_OBJECT_ENTITY_TABLE(\n" +
    "ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY, \n" +
    "REV_ENTITY_GUID     INTEGER     NOT NULL,\n" +
    "OWNER_ENTITY_GUID     INTEGER     NOT NULL,\n" +
    "ENTITY_CONTAINER_GUID     INTEGER     NOT NULL,\n" +
    "REV_OBJECT_NAME            TEXT     NOT NULL,\n" +
    "REV_OBJECT_DESCRIPTION           TEXT    NOT NULL,\n" +
    "CREATED_DATE            TEXT     NOT NULL,\n" +
    "UPDATED_DATE           TEXT     NOT NULL);";

  rev_db_init.getRevConnection(connection => {
    connection.query(stmt, function (err, results, res) {
      if (err) console.log('ERR -> revTableCreate_REV_OBJECT_ENTITY -> ' + err.message);

      return callback("Rev LOG : REV OBJECT TABLE CREATE > >> " + results);
    });

    connection.release();
  });
}

module.exports.revTableCreate_REV_OBJECT_ENTITY = revTableCreate_REV_OBJECT_ENTITY;
