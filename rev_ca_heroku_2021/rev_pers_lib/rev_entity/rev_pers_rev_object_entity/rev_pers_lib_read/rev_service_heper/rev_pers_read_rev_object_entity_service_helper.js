const rev_pers_read_rev_object_entity_accessor = require('../rev_accessor/rev_pers_read_rev_object_entity_accessor')

var revPersReadRevObjectEntity_By_RemoteRevEntityGUID_Serv = remoteRevEntityOwnerGUID => {
  return new Promise(function (resolve, reject) {
    rev_pers_read_rev_object_entity_accessor.revPersReadRevObjectEntity_By_RemoteRevEntityGUID_Accessor(remoteRevEntityOwnerGUID, (result) => {
      resolve(result)
    })
  })
}

module.exports.revPersReadRevObjectEntity_By_RemoteRevEntityGUID_Serv = revPersReadRevObjectEntity_By_RemoteRevEntityGUID_Serv
