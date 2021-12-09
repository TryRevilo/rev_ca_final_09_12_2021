const rev_pers_read_rev_entity_relationship_accessor = require('../rev_accessor/rev_pers_read_rev_entity_relationship_accessor')

var revRetArrDef = {
    filter: []
}

var revPersReadRevEntityRelsByRemoteRevEntityGUIDServ = (remoteRevEntityGUID) => {
    return new Promise(function (resolve, reject) {
        rev_pers_read_rev_entity_relationship_accessor.revPersReadRevEntityRelationshipsByRemoteRevEntityGUID(remoteRevEntityGUID, (result) => {
            revRetArrDef.filter = result;
            
            resolve(revRetArrDef);
        })
    });
}


module.exports.revPersReadRevEntityRelsByRemoteRevEntityGUIDServ = revPersReadRevEntityRelsByRemoteRevEntityGUIDServ