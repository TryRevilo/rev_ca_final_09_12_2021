const rev_db_init = require('../../../../rev_db_init/rev_db_init')

function revPersReadRevEntityRelationshipsByRemoteRevEntityGUID (remoteRevEntityGUID, callback) {
  const client = rev_db_init.revSQLDbLocalConnection()

  let todo = [
    remoteRevEntityGUID,
    remoteRevEntityGUID
  ]

  var stmt = 'SELECT * FROM REV_ENTITY_RELATIONSHIPS_TABLE WHERE SUBJECT_GUID = ? OR TARGET_GUID = ?'

  client.query(stmt, todo, function (err, row) {
    client.end(function (err) {
      if (err) {
        console.log('ERRR')
      }
    })

    if (err) {
      console.log('revPersReadRevEntityRelationshipsByRemoteRevEntityGUID : ' + err.message)
      return ('insertData ' + err.message)
    } else {
      if (row.length > 0) {
        if (row) {
          callback(row)
        }
      } else {
        callback(row)
      }
    }
  })
}

module.exports.revPersReadRevEntityRelationshipsByRemoteRevEntityGUID = revPersReadRevEntityRelationshipsByRemoteRevEntityGUID
