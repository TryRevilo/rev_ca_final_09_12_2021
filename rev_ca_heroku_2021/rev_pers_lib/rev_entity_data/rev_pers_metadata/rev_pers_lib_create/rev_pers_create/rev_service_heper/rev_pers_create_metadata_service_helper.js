const rev_pers_rev_entity_metadata_accessor = require("../rev_accessor/rev_pers_rev_entity_metadata_accessor");

let promiseToSaveRevEntityMetadataItem = (revMetaData, revEntityGUID) => {
  return new Promise(function (resolve, reject) {
    rev_pers_rev_entity_metadata_accessor.revPersSaveRevEntityMetadata(
      revEntityGUID,
      revMetaData,
      function (result) {
        resolve(result);
      }
    );
  });
};

var createNewRevMetadataArrayService = async (revMetadataList, revEntityGUID) => {
  let filterRevRetArr = {
    filter: []
  };

  if (!revMetadataList || !Array.isArray(revMetadataList)) return null;

  await revMetadataList.reduce((promise, revNextItem) => {
    return promise
      .then(async result => {
        let revEntityMetadataItem = await promiseToSaveRevEntityMetadataItem(revNextItem, revEntityGUID);

        let revRetMetadata = {};
        revRetMetadata["localMetadataId"] = revNextItem.revMetadataId;
        revRetMetadata["metadataId"] = revEntityMetadataItem.metadataId;
        revRetMetadata["metadataValueId"] = revEntityMetadataItem.metadataValueId;

        filterRevRetArr.filter.push(revRetMetadata);
      })
      .catch(console.error);
  }, Promise.resolve());

  return filterRevRetArr;
};

module.exports.promiseToSaveRevEntityMetadataItem = promiseToSaveRevEntityMetadataItem;
module.exports.createNewRevMetadataArrayService = createNewRevMetadataArrayService;
