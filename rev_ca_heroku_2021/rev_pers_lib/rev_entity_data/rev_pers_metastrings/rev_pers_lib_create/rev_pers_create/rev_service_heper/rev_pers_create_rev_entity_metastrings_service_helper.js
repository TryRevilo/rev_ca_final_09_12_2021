const rev_pers_rev_entity_relationship_accessor = require("../rev_accessor/rev_pers_rev_entity_relationship_accessor");

/** START NEW REL API- - - - - - - - - - - - - - - - - - */

var filterRevRetArr = {
  filter: []
};

let cleanSyncNewRevRel = revData => {
  return new Promise(function(resolve, reject) {
    rev_pers_rev_entity_relationship_accessor.revPersSaveRevEntityRelationship(
      revData,
      function(result) {
        resolve(result);
      }
    );
  });
};

function syncNewRevRelCollection(arr) {
  return arr.reduce(async (promise, item) => {
    let promiseTorevEntityRelExista = await rev_pers_rev_entity_relationship_accessor.revPersLocalRevEntityRelationshipExistsPromise(
      item
    );

    if (!promiseTorevEntityRelExista) {
      return promise
        .then(result => {
          return cleanSyncNewRevRel(item).then(result =>
            filterRevRetArr.filter.push(result)
          );
        })
        .catch(console.error);
    }
  }, Promise.resolve());
}

var createNewRevEntitiesRelationshipsArrayService = (
  revEntitiesRelationships,
  callback
) => {
  syncNewRevRelCollection(revEntitiesRelationships).then(() => {
    callback(filterRevRetArr);
  });
};

/** END NEW REL API - - - - - - - - - - - - - - - - - - */

module.exports.createNewRevEntitiesRelationshipsArrayService = createNewRevEntitiesRelationshipsArrayService;
