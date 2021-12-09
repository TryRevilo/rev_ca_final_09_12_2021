const rev_db_init = require('../../../../../rev_db_init/rev_db_init')
const rev_time = require('../../../../../../rev_helper_functions/rev_time')

function revPersSaveRevGroupEntity (revData, callback) {
  let stmt = 'INSERT INTO REV_GROUP_ENTITY (\n' +
    'REV_RESOLVE_STATUS, \n' +
    'REV_GROUP_ENTITY_GUID, \n' +
    'REV_GROUP_ENTITY_OWNER_GUID, \n' +
    'REV_GROUP_ENTITY_CONTAINER_GUID, \n' +
    'REV_GROUP_ENTITY_NAME, \n' +
    'REV_GROUP_ENTITY_DESCRIPTION, \n' +
    'CREATED_DATE, \n' +
    'UPDATED_DATE\n' +
    ' ) \n' +
    `VALUES(?, ?, ?, ?, ?, ?, ?, ?)`

  let todo = [
    revData['_revEntityResolveStatus'],
    revData['_revEntityGUID'],
    revData['_revEntityOwnerGUID'],
    revData['_revEntityContainerGUID'],
    revData['name'],
    revData['description'],
    rev_time.revGetDateTime(),
    rev_time.revGetDateTime()
  ]

  rev_db_init.getRevConnection((connection) => {
    connection.query(stmt, todo, function (err, res) {
      if (err) {
        console.log('revPersSaveRevUserEntity HERE ERR : \n\t' + err.message + '\n')
        return ('insertData ' + err.message)
      }

      callback(res)
    })

    connection.release()
  })
}

module.exports.revPersSaveRevGroupEntity = revPersSaveRevGroupEntity
