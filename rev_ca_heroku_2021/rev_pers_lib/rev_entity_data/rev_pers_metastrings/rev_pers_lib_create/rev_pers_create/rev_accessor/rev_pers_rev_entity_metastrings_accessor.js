const rev_db_init = require('../../../../../rev_db_init/rev_db_init')

function revPersSaveRevEntityMetastring (revData, callback) {
  let stmt = 'INSERT INTO REV_ENTITY_METASTRINGS_TABLE (\n' +
    'METASTRING_VALUE \n' +
    ' ) \n' +
    `VALUES(?)`

  let todo = [
    revData['_metadataValue']
  ]

  rev_db_init.getRevConnection((connection) => {
    connection.query(stmt, todo, function (err, res) {
      if (err) {
        console.log('revPersSaveRevEntityMetastring ERR : ' + err.message)
        return ('insertData ' + err.message)
      }

      connection.release()
      callback(res.insertId)
    })
  })
}

module.exports.revPersSaveRevEntityMetastring = revPersSaveRevEntityMetastring
