const rev_pers_rev_group_entity_accessor = require('../rev_accessor/rev_pers_rev_group_entity_accessor')

var revPersCreateNewRevGroupEntityServ = (revData) => {
  return new Promise(function (resolve, reject) {
    rev_pers_rev_group_entity_accessor.revPersSaveRevGroupEntity(revData, function (result) {
      resolve(result)
    })
  })
}

module.exports.revPersCreateNewRevGroupEntityServ = revPersCreateNewRevGroupEntityServ
