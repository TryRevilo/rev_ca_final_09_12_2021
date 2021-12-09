const rev_pers_read_rev_group_entity_accessor = require('../rev_accessor/rev_pers_read_rev_group_entity_accessor')

var revPersReadRevGroupEntity_By_RemoteRevEntityGUID_Serv = revEntityGUID => {
  return new Promise(function (resolve, reject) {
    rev_pers_read_rev_group_entity_accessor.revPersReadRevGroupEntityByRevEntityGUID(revEntityGUID, (result) => {
      resolve(result)
    })
  })
}

module.exports.revPersReadRevGroupEntity_By_RemoteRevEntityGUID_Serv = revPersReadRevGroupEntity_By_RemoteRevEntityGUID_Serv
