const rev_pers_rev_group_entity_accessor = require('../rev_accessor/rev_pers_rev_group_entity_accessor')
var filterRevRetArr = {
  filter: []
}

let cleanSyncNewRevGroup = (revData) => {
  return new Promise(function (resolve, reject) {
    rev_pers_rev_group_entity_accessor.revPersSaveRevGroupEntity(revData, function (result) {
      resolve(result)
    })
  })
}

function syncNewRevGroupsCollection (arr) {
  return arr.reduce((promise, item) => {
    return promise
      .then((result) => {
        if (item.hasOwnProperty('revGroupEntity'))
          return cleanSyncNewRevGroup(item).then(result => filterRevRetArr.filter.push(result))
      })
      .catch(console.error)
  }, Promise.resolve())
}

var createNewRevGroupEntitiesArrayService = (revUserEntities, callback) => {
  syncNewRevGroupsCollection(revUserEntities)
    .then(() => {
      callback(filterRevRetArr)
    })
}

module.exports.createNewRevGroupEntitiesArrayService = createNewRevGroupEntitiesArrayService
