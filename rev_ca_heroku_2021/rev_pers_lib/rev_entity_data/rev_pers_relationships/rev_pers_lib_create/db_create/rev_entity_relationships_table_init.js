const revDb = require("../../../../rev_db_init/rev_db_init");

function revTableCreate_REV_ENTITY_RELATIONSHIPS(callback) {
  let stmt =
    "CREATE TABLE IF NOT EXISTS REV_ENTITY_RELATIONSHIPS_TABLE(\n" +
    "REV_RESOLVE_STATUS INT DEFAULT -1, \n" +
    "RELATIONSHIP_ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY, \n" +
    "OWNER_GUID     INTEGER     NOT NULL,\n" +
    "SUBJECT_GUID     INTEGER     NOT NULL,\n" +
    "TARGET_GUID     INTEGER     NOT NULL,\n" +
    "RELATIONSHIP_TYPE_VALUE_ID            INTEGER     NOT NULL,\n" +
    "REV_PUBLISHED_DATE     TEXT     NOT NULL,\n" +
    "REV_UPDATED_DATE     TEXT      NULL);";

  revDb.getRevConnection(connection => {
    connection.query(stmt, function (err, results, res) {
      if (err) console.log('ERR -> revTableCreate_REV_ENTITY_RELATIONSHIPS -> ' + err.message);

      callback("Rev LOG : REV RELATIONSHIPS TABLE CREATE > >> " + results);
    });

    connection.release();
  });
}

module.exports.revTableCreate_REV_ENTITY_RELATIONSHIPS = revTableCreate_REV_ENTITY_RELATIONSHIPS;
