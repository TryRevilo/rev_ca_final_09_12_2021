const rev_pers_read_rev_entity_accessor = require("../rev_accessor/rev_pers_read_rev_entity_accessor");
const rev_db_entity_metadata_const_resolver = require("../../../../rev_entity_data/rev_pers_metadata/rev_db_models/rev_db_entity_metadata_const_resolver");
const rev_db_entity_const_resolver = require("../../rev_db_models/rev_db_entity_const_resolver");

var filterRevRetArr = {
  filter: []
};

function syncNewRevRelCollection(arr) {
  return arr.reduce(async (promise, item) => {
    return promise
      .then(() => {
        return new Promise(function(resolve, reject) {
          rev_db_entity_const_resolver.revEntityFiller(item, async function(
            result
          ) {
            result[
              "revEntityMetadata"
            ] = await rev_db_entity_metadata_const_resolver.revEntityMetadataFiller_Serv(
              item.REMOTE_REV_ENTITY_GUID
            );
            filterRevRetArr.filter.push(result);
            resolve();
          });
        });
      })
      .catch(console.error);
  }, Promise.resolve());
}

var revPersReadAllOwnerGUIDRevEntitiesByRemoteRevEntityGUIDServ = remoteRevEntityOwnerGUID => {
  return new Promise(function(resolve, reject) {
    rev_pers_read_rev_entity_accessor.revPersReadAllOwnerGUIDRevEntitiesByRemoteRevEntityGUID(
      remoteRevEntityOwnerGUID,
      function(result) {
        syncNewRevRelCollection(result).then(() => {
          resolve(filterRevRetArr);
        });
      }
    );
  });
};

module.exports.revPersReadAllOwnerGUIDRevEntitiesByRemoteRevEntityGUIDServ = revPersReadAllOwnerGUIDRevEntitiesByRemoteRevEntityGUIDServ;
