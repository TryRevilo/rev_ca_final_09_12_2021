const rev_db_init = require("../../../../rev_db_init/rev_db_init");

function revTableCreate_REV_ENTITY(callback) {
  /** REV DB **/

  let createTodos =
    "CREATE TABLE IF NOT EXISTS REV_ENTITY_TABLE( \n" +
    "REMOTE_REV_ENTITY_GUID BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, \n" +
    "REV_CHILDABLE_STATUS INT DEFAULT -1, \n" +
    "REV_RESOLVE_STATUS INT DEFAULT -1, \n" +
    "REV_ENTITY_CHILDABLE_STATUS INT DEFAULT -1, \n" +
    "REV_ENTITY_OWNER_GUID     TEXT     NOT NULL, \n" +
    "REV_ENTITY_CONTAINER_GUID     TEXT     NOT NULL, \n" +
    "REV_ENTITY_SITE_GUID     TEXT     NOT NULL, \n" +
    "REV_ENTITY_ACCESS_PERMISSION     INT     NOT NULL, \n" +
    "REV_ENTITY_TYPE            TEXT     NOT NULL, \n" +
    "REV_ENTITY_SUB_TYPE           TEXT    NOT NULL, \n" +
    "COLUMN_NAME_CREATED_DATE            TEXT     NOT NULL, \n" +
    "COLUMN_NAME_UPDATED_DATE           TEXT     NOT NULL, \n" +
    "REV_CREATED_DATE     TEXT     NOT NULL, \n" +
    "REV_PUBLISHED_DATE     TEXT     NOT NULL, \n" +
    "REV_UPDATED_DATE     TEXT     NOT NULL);\n";

  rev_db_init.getRevConnection(function (connection) {
    connection.query(createTodos, function (err, results, fields) {
      if (err) {
        console.log('ERR -> revTableCreate_REV_ENTITY -> ' + err.message);
      }

      callback(`Rev LOG : TABLE CREATE > >> ${JSON.stringify(results)}`);

      connection.release();
    });
  });

  /** END REV DB **/
}

module.exports.revTableCreate_REV_ENTITY = revTableCreate_REV_ENTITY;
