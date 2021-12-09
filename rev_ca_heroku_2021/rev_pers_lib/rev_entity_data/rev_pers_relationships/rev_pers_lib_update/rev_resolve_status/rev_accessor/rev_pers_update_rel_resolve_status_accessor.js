const rev_db_init = require("../../../../../rev_db_init/rev_db_init");

var revPersUpdateRevEntityRelAcceptedAcce = (
  revResolveStatus,
  revRelId,
  callback
) => {
  let todo = [revResolveStatus, revRelId];

  var sql = `UPDATE REV_ENTITY_RELATIONSHIPS_TABLE SET REV_RESOLVE_STATUS = ? WHERE RELATIONSHIP_ID = ?`;

  rev_db_init.getRevConnection(connection => {
    connection.query(sql, todo, function (err, result) {
      if (err) console.log('ERR -> revPersUpdateRevEntityRelAcceptedAcce -> ' + err.message);

      callback(result);

      connection.release();
    });
  });
};

module.exports.revPersUpdateRevEntityRelAcceptedAcce = revPersUpdateRevEntityRelAcceptedAcce;
