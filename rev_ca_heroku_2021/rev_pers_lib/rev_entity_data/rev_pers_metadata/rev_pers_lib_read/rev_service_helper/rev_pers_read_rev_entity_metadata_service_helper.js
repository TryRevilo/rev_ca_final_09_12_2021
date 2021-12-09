const rev_pers_read_rev_entity_metadat_accessor = require("../rev_accessor/rev_pers_read_rev_entity_metadat_accessor");
const rev_db_entity_metadata_const_resolver = require("../../rev_db_models/rev_db_entity_metadata_const_resolver");

var revMetadataValsArrFullTextSearch_Serve = (revMetadataValsArr) => {
    return new Promise(function (resolve, reject) {
        rev_pers_read_rev_entity_metadat_accessor.revMetadataValsArrFullTextSearch(revMetadataValsArr, (result) => {
            let revFilledMetadataArr = [];

            for (let i = 0; i < result.length; i++) {
                revFilledMetadataArr.push(rev_db_entity_metadata_const_resolver.revEntityMetadataFillerResolver(result[i]));
            }

            resolve(revFilledMetadataArr);
        });
    });
};

var revPersMetadataValueExists_By_MetadataName_MetadataValue_Serv = (revMetadataName, revMetadataValue) => {
    return new Promise(function (resolve, reject) {
        rev_pers_read_rev_entity_metadat_accessor.revPersMetadataValueExists_By_MetadataName_MetadataValue(revMetadataName, revMetadataValue, (result) => {
            resolve(result);
        });
    });
};

var revPersReadMetadataValuesArr_By_MetadataName_MetadataValue_Serv = (revMetadataName, revMetadataValue) => {
    return new Promise(function (resolve, reject) {
        rev_pers_read_rev_entity_metadat_accessor.revPersReadMetadataValuesArr_By_MetadataName_MetadataValue(revMetadataName, revMetadataValue, (result) => {
            resolve(result);
        });
    });
};

var revPersGetMetadataId_By_MetadataName_EntityGUID_Serv = (revMetadataName, revEntityGUID) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_metadat_accessor.revPersGetMetadataId_By_MetadataName_EntityGUID(revMetadataName, revEntityGUID, (revMetadataId) => {
            resolve(revMetadataId);
        });
    });
};

var revPersReadMetadataID_By_CreationDate_MetadataEntityGUID_Serv = async (revCreationDates, callback) => {
    let filterRevRetArr = {
        filter: [],
    };

    await revCreationDates.reduce((accumulatorPromise, nextID) => {
        return accumulatorPromise.then(() => {
            return new Promise((resolve, reject) => {
                rev_pers_read_rev_entity_metadat_accessor.revPersReadMetadataID_By_CreationDate_MetadataEntityGUID(nextID, (remoteRevMetadataId) => {
                    filterRevRetArr.filter.push({
                        revMetadataId: nextID.revMetadataId,
                        remoteRevMetadataId: remoteRevMetadataId,
                    });

                    resolve();
                });
            });
        });
    }, Promise.resolve());

    callback(filterRevRetArr);
};

var revPersReadRevEntityMetadataOwnerGUID_By_UniqueId_Serv = (revEntityUniqueId) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_metadat_accessor.revPersReadRevEntityMetadataOwnerGUID_By_UniqueId(revEntityUniqueId, (revRetEntityMetadataArr) => {
            resolve(revRetEntityMetadataArr);
        });
    });
};

var revPersReadRevEntityMetadataOwnerGUIDsArr_By_UniqueIdsArr_Serv = (revEntityUniqueIdsArr) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_metadat_accessor.revPersReadRevEntityMetadataOwnerGUIDsArr_By_UniqueIdsArr(revEntityUniqueIdsArr, (revRetEntityMetadataArr) => {
            resolve(revRetEntityMetadataArr);
        });
    });
};

var revPersReadRevEntityMetadataOwnerGUIDsArr_By_UniqueIdsArr_Serv_EXPO = async (revEntityUniqueIdsArr) => {
    let revMetadataOwnerGUIDsArr = [];

    let revMetadataOwnerGUIDsArrDBRes = await revPersReadRevEntityMetadataOwnerGUIDsArr_By_UniqueIdsArr_Serv(revEntityUniqueIdsArr);

    for (let i = 0; i < revMetadataOwnerGUIDsArrDBRes.length; i++) {
        revMetadataOwnerGUIDsArr.push(revMetadataOwnerGUIDsArrDBRes[i].REV_ENTITY_GUID);
    }

    return revMetadataOwnerGUIDsArr;
};

var revPersReadRevEntityMetadata_By_UniqueId_Serv = (revEntityUniqueId) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_metadat_accessor.revPersReadRevEntityMetadata_By_UniqueId(revEntityUniqueId, (revRetEntityMetadataArr) => {
            resolve(rev_db_entity_metadata_const_resolver.revEntityMetadataFillerResolver(revRetEntityMetadataArr));
        });
    });
};

function reduceOfAllRevEntityMetadata(filterRevRetArr, arr) {
    return arr.reduce((promise, item) => {
        return promise
            .then(() => {
                var jsonData = {};
                jsonData["localMetadataId"] = item.METADATA_ID;
                jsonData["metadataId"] = item.METADATA_ID;
                jsonData["metadataValueId"] = item.METADATA_VALUE_ID;

                filterRevRetArr.filter.push(jsonData);
            })
            .catch(console.error);
    }, Promise.resolve());
}

var promiseToGetUnresolvedRevEntityMetadataServ = (revEntityGUID) => {
    var filterRevRetArr = {
        filter: [],
    };

    return new Promise(function (resolve, reject) {
        rev_pers_read_rev_entity_metadat_accessor.revPersReadRevEntityMetadataByRemoteRevEntityGUID(revEntityGUID, function (revEntitiesMetadataResult) {
            return reduceOfAllRevEntityMetadata(filterRevRetArr, revEntitiesMetadataResult).then(() => {
                resolve(filterRevRetArr);
            });
        });
    });
};

var revPersReadRevEntityMetadataValue_By_RemoteRevEntityGUID_MetadataName_Serv = (revEntityGUID, revMetadataName) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_metadat_accessor.revPersReadRevEntityMetadataValue_By_RevEntityGUID_MetadataName(revEntityGUID, revMetadataName, (revMetadataValue) => {
            resolve(revMetadataValue);
        });
    });
};

var revPersReadRevEntityMetadataArr_By_MetadataName_Serv = (revVarArgs) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_metadat_accessor.revPersReadRevEntityMetadataArr_By_MetadataName(revVarArgs, (revMetadataArr) => {
            resolve(revMetadataArr);
        });
    });
};

var revPersReadRevEntityMetadataArr_By_MetadataName_Serv_EXPO = async (revVarArgs) => {
    let revMetadataArr = await revPersReadRevEntityMetadataArr_By_MetadataName_Serv(revVarArgs);

    let revResolvedMetadataArr = [];

    for (let i = 0; i < revMetadataArr.length; i++) {
        let revCurrResolvedMetadata = rev_db_entity_metadata_const_resolver.revEntityMetadataFillerResolver(revMetadataArr[i]);
        revResolvedMetadataArr.push(revCurrResolvedMetadata);
    }

    return revResolvedMetadataArr;
};

var revPersReadRevEntityMetadata_By_RevEntityGUID_MetadataName_Serv = (revEntityGUID, revMetadataName) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_metadat_accessor.revPersReadRevEntityMetadata_By_RevEntityGUID_MetadataName(revEntityGUID, revMetadataName, (revRetEntityMetadata) => {
            resolve(rev_db_entity_metadata_const_resolver.revEntityMetadataFillerResolver(revRetEntityMetadata));
        });
    });
};

module.exports.revMetadataValsArrFullTextSearch_Serve = revMetadataValsArrFullTextSearch_Serve;

module.exports.revPersReadRevEntityMetadataOwnerGUID_By_UniqueId_Serv = revPersReadRevEntityMetadataOwnerGUID_By_UniqueId_Serv;
module.exports.revPersReadRevEntityMetadataOwnerGUIDsArr_By_UniqueIdsArr_Serv = revPersReadRevEntityMetadataOwnerGUIDsArr_By_UniqueIdsArr_Serv;
module.exports.revPersReadRevEntityMetadataOwnerGUIDsArr_By_UniqueIdsArr_Serv_EXPO = revPersReadRevEntityMetadataOwnerGUIDsArr_By_UniqueIdsArr_Serv_EXPO;

module.exports.revPersReadRevEntityMetadata_By_UniqueId_Serv = revPersReadRevEntityMetadata_By_UniqueId_Serv;

module.exports.revPersMetadataValueExists_By_MetadataName_MetadataValue_Serv = revPersMetadataValueExists_By_MetadataName_MetadataValue_Serv;
module.exports.revPersReadMetadataValuesArr_By_MetadataName_MetadataValue_Serv = revPersReadMetadataValuesArr_By_MetadataName_MetadataValue_Serv;

module.exports.revPersReadMetadataID_By_CreationDate_MetadataEntityGUID_Serv = revPersReadMetadataID_By_CreationDate_MetadataEntityGUID_Serv;
module.exports.revPersGetMetadataId_By_MetadataName_EntityGUID_Serv = revPersGetMetadataId_By_MetadataName_EntityGUID_Serv;
module.exports.promiseToGetUnresolvedRevEntityMetadataServ = promiseToGetUnresolvedRevEntityMetadataServ;

module.exports.revPersReadRevEntityMetadataValue_By_RemoteRevEntityGUID_MetadataName_Serv = revPersReadRevEntityMetadataValue_By_RemoteRevEntityGUID_MetadataName_Serv;

module.exports.revPersReadRevEntityMetadataArr_By_MetadataName_Serv = revPersReadRevEntityMetadataArr_By_MetadataName_Serv;
module.exports.revPersReadRevEntityMetadataArr_By_MetadataName_Serv_EXPO = revPersReadRevEntityMetadataArr_By_MetadataName_Serv_EXPO;

module.exports.revPersReadRevEntityMetadata_By_RevEntityGUID_MetadataName_Serv = revPersReadRevEntityMetadata_By_RevEntityGUID_MetadataName_Serv;
