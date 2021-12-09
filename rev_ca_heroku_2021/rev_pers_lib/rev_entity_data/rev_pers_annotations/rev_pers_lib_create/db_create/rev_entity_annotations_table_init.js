const revDb = require("../../../../rev_db_init/rev_db_init");

function revTableCreate_REV_ENTITY_ANNOTATIONS(callback) {
  let createTodos =
    "CREATE TABLE IF NOT EXISTS REV_ENTITY_ANNOTATIONS_TABLE( \n" +
    "REV_RESOLVE_STATUS     INT     DEFAULT -1, \n" +
    "ANNOTATION_ID INT NOT NULL     AUTO_INCREMENT PRIMARY KEY, \n" +
    "ANNOTATION_NAME_ID INT NOT NULL, \n" +
    "ANNOTATION_VALUE TEXT      NOT NULL, \n" +
    "REV_ENTITY_GUID            INT     NOT NULL, \n" +
    "REV_ENTITY_OWNER_GUID            INT     NOT NULL, \n" +
    "CREATED_DATE            TEXT NOT NULL, \n" +
    "UPDATED_DATE           TEXT NOT NULL);";

  revDb.getRevConnection(connection => {
    connection.query(createTodos, function (err, results, res) {
      if (err) console.log('ERR -> revTableCreate_REV_ENTITY_ANNOTATIONS -> ' + err.message);

      return callback(
        "Rev LOG : REV_ENTITY_ANNOTATION_TABLE TABLE CREATE > >> " + results
      );
    });

    connection.release();
  });
}

module.exports.revTableCreate_REV_ENTITY_ANNOTATIONS = revTableCreate_REV_ENTITY_ANNOTATIONS;
