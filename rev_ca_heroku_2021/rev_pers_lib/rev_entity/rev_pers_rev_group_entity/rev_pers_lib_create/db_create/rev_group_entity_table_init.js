const revDb = require('../../../../rev_db_init/rev_db_init')

function revTableCreate_REV_GROUP_ENTITY(callback) {
  let stmt = 'CREATE TABLE IF NOT EXISTS REV_GROUP_ENTITY(\n' +
    'REV_RESOLVE_STATUS     INTEGER     DEFAULT -1,\n' +
    'REV_GROUP_ENTITY_GUID INT NOT NULL AUTO_INCREMENT PRIMARY KEY, \n' +
    'REV_GROUP_ENTITY_OWNER_GUID     INTEGER     NOT NULL,\n' +
    'REV_GROUP_ENTITY_CONTAINER_GUID     INTEGER     NOT NULL,\n' +
    'REV_GROUP_ENTITY_NAME            TEXT     NOT NULL,\n' +
    'REV_GROUP_ENTITY_DESCRIPTION           TEXT    NOT NULL,\n' +
    'CREATED_DATE            TEXT     NOT NULL,\n' +
    'UPDATED_DATE           TEXT     NOT NULL);'

  revDb.getRevConnection((connection) => {
    connection.query(stmt, function (err, results, res) {
      if (err) console.log('ERR -> revTableCreate_REV_GROUP_ENTITY -> ' + err.message)

      callback('Rev LOG : REV USER TABLE CREATE > >> ' + results)
    })

    connection.release()
  })
}

module.exports.revTableCreate_REV_GROUP_ENTITY = revTableCreate_REV_GROUP_ENTITY
