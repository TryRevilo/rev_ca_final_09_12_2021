const { resolve } = require("path");
var rev_pers_update_rev_entity_metadata_value = require("../rev_accessor/rev_pers_update_rev_entity_metadata_value");

var revPersUpdaterevEntityMetadataValue_By_MetadataId_Serv = (nextMetadata, filterRevRetArr) => {
    return new Promise((resolve, reject) => {
        rev_pers_update_rev_entity_metadata_value.revPersUpdaterevEntityMetadataValue_By_MetadataId(nextMetadata.remoteRevMetadataId, nextMetadata._metadataValue, (result) => {
            let revResStatus = -4;

            if (result["affectedRows"] == 1) {
                revResStatus = 0;
            }

            if (filterRevRetArr) {
                filterRevRetArr.filter.push({ "remoteRevMetadataId": nextMetadata.remoteRevMetadataId, "revResStatus": revResStatus });
                resolve(filterRevRetArr);
            } else {
                resolve({ "remoteRevMetadataId": nextMetadata.remoteRevMetadataId, "revResStatus": revResStatus });
            }
        });
    });
};

var revPersUpdateMetadataGUID_By_MetadataId_Serv = (nextMetadata, filterRevRetArr) => {
    return new Promise((resolve, reject) => {
        rev_pers_update_rev_entity_metadata_value.revPersUpdateMetadataGUID_By_MetadataId(remoteRevMetadataId, revNewEntityGUID, (result) => {
            resolve(result);
        });
    });
};

var revPersMultiUpdateMetadataValue_By_MetadataIds_Serv = (revMetedataArr) => {
    return new Promise((resolve, reject) => {
        rev_pers_update_rev_entity_metadata_value.revPersMultiUpdateMetadataValue_By_MetadataIds(revMetedataArr, (revUpdateData) => {
            resolve(revUpdateData);
        });
    });
};

var revPersUpdaterevEntityMetadataValueList_By_MetadataId_Serv = async (revEntityMetadataArr, callbak) => {
    let filterRevRetArr = {
        filter: [],
    };

    let revAccumulatedPromises = revEntityMetadataArr.reduce(async (accumulatorPromise, nextID) => {
        await accumulatorPromise;
        return revPersUpdaterevEntityMetadataValue_By_MetadataId_Serv(nextID, filterRevRetArr);
    }, Promise.resolve());

    if (callbak) {
        revAccumulatedPromises.then(() => {
            callbak(filterRevRetArr);
        });
    } else {
        await revAccumulatedPromises;
        return filterRevRetArr;
    }
};

module.exports.revPersUpdaterevEntityMetadataValue_By_MetadataId_Serv = revPersUpdaterevEntityMetadataValue_By_MetadataId_Serv;
module.exports.revPersUpdateMetadataGUID_By_MetadataId_Serv = revPersUpdateMetadataGUID_By_MetadataId_Serv;
module.exports.revPersMultiUpdateMetadataValue_By_MetadataIds_Serv = revPersMultiUpdateMetadataValue_By_MetadataIds_Serv;
module.exports.revPersUpdaterevEntityMetadataValueList_By_MetadataId_Serv = revPersUpdaterevEntityMetadataValueList_By_MetadataId_Serv;
