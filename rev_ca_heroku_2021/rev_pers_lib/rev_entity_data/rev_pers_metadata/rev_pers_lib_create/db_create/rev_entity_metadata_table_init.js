const revDb = require("../../../../rev_db_init/rev_db_init");

function revTableCreate_REV_ENTITY_METADATA(callback) {
  let createTodos = "CREATE TABLE IF NOT EXISTS REV_ENTITY_METADATA_TABLE( \n" + "REV_RESOLVE_STATUS     INT     DEFAULT -1, \n" + "METADATA_ID  INT NOT NULL    AUTO_INCREMENT  PRIMARY KEY, \n" + "REV_ENTITY_GUID   INT      NOT NULL, \n" + "METADATA_NAME     TEXT     NOT NULL, \n" + "METADATA_VALUE     TEXT     NOT NULL, \n" + "REV_CREATED_DATE     TEXT     NOT NULL, \n" + "REV_PUBLISHED_DATE     TEXT     NOT NULL, \n" + "REV_UPDATED_DATE     TEXT);\n";

  revDb.getRevConnection((connection) => {
    connection.query(createTodos, function (err, results, res) {
      if (err) console.log("ERR -> revTableCreate_REV_ENTITY_METADATA -> " + err.message);

      return callback("Rev LOG : REV_ENTITY_METADATA_TABLE TABLE CREATE > >> " + results);
    });

    connection.release();
  });
}

module.exports.revTableCreate_REV_ENTITY_METADATA = revTableCreate_REV_ENTITY_METADATA;
