const rev_pers_read_rev_entity_accessor = require("../rev_accessor/rev_pers_read_rev_entity_accessor");

var revCountRevEntities_By_OwnerGuid_SubType_Serv = (revVarArgs) => {
    return new Promise(function (resolve, reject) {
        rev_pers_read_rev_entity_accessor.revCountRevEntities_By_OwnerGuid_SubType(revVarArgs, (revRetCount) => {
            resolve(revRetCount);
        });
    });
};

var revCountRevEntities_By_ContainerGuid_SubType_Serv = (revVarArgs) => {
    return new Promise(function (resolve, reject) {
        rev_pers_read_rev_entity_accessor.revCountRevEntities_By_ContainerGuid_SubType(revVarArgs, (revRetCount) => {
            resolve(revRetCount);
        });
    });
};

var revGetEntityGUID_By_ContainerGuid_SubType_Serv = (revVarArgs) => {
    return new Promise(function (resolve, reject) {
        rev_pers_read_rev_entity_accessor.revGetEntityGUID_By_ContainerGuid_SubType(revVarArgs, (revRetCount) => {
            resolve(revRetCount);
        });
    });
};

var revPersReadRevEntityResolveStatus_Serv = (remoteRevEntityGUID) => {
    return new Promise(function (resolve, reject) {
        rev_pers_read_rev_entity_accessor.revPersReadRevEntityResolveStatus(remoteRevEntityGUID, (revEntitySubtype) => {
            resolve(revEntitySubtype);
        });
    });
};

var revPersReadRevEntitySubType_Serv = (remoteRevEntityGUID) => {
    return new Promise(function (resolve, reject) {
        rev_pers_read_rev_entity_accessor.revPersReadRevEntitySubType(remoteRevEntityGUID, (revEntitySubtype) => {
            resolve(revEntitySubtype);
        });
    });
};

var revPersReadRevEntityType_Serv = (remoteRevEntityGUID) => {
    return new Promise(function (resolve, reject) {
        rev_pers_read_rev_entity_accessor.revPersReadRevEntityType(remoteRevEntityGUID, (revEntitySubtype) => {
            resolve(revEntitySubtype);
        });
    });
};

var revPersReadRevEntityChildableStatus_Serv = (remoteRevEntityGUID) => {
    return new Promise(function (resolve, reject) {
        rev_pers_read_rev_entity_accessor.revPersReadRevEntityChildableStatus(remoteRevEntityGUID, (revEntitySubtype) => {
            resolve(revEntitySubtype);
        });
    });
};

var getRevPersReadAllRevEntityType = (revEntityType) => {
    return new Promise(function (resolve, reject) {
        rev_pers_read_rev_entity_accessor.revPersReadAllRevEntityType(revEntityType, (revEntitiesTypes) => {
            resolve(revEntitiesTypes);
        });
    });
};

var revPersReadRevEntityGUID_By_CreationDate_Serv = async (revCreationDates, callback) => {
    let filterRevRetArr = {
        filter: [],
    };

    await revCreationDates.reduce((accumulatorPromise, nextID) => {
        return accumulatorPromise.then(() => {
            return new Promise((resolve, reject) => {
                rev_pers_read_rev_entity_accessor.revPersReadRevEntityGUID_By_CreationDate(nextID, (remoteRevEntityGUID) => {
                    filterRevRetArr.filter.push({ _remoteRevEntityGUID: remoteRevEntityGUID, _revTimeCreated: nextID });

                    resolve();
                });
            });
        });
    }, Promise.resolve());

    callback(filterRevRetArr);
};

var revPersReadOwnerEntityGUID_By_RevEntityGUID_Serv = (revEntityGUID) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_accessor.revPersReadOwnerEntityGUID_By_RevEntityGUID(revEntityGUID, (revEntityOwnerGUID) => {
            resolve(revEntityOwnerGUID);
        });
    });
};

var revPersReadRevPublishedDate_By_RevEntityGUID_Serv = (revEntityGUID) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_accessor.revPersReadRevPublishedDate_By_RevEntityGUID(revEntityGUID, (revTimeCreated) => {
            resolve(revTimeCreated);
        });
    });
};

var revPersReadRevEntities_By_Subtype_Serv = (revEntitySubtype, revQueryLimit) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_accessor.revPersReadRevEntities_By_Subtype(revEntitySubtype, revQueryLimit, (revRes) => {
            resolve(revRes);
        });
    });
};

var revPersReadRevEntities_By_SubtypesArr_Serv = (revEntitySubtypesArr, revQueryLimit) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_accessor.revPersReadRevEntities_By_SubtypesArr(revEntitySubtypesArr, revQueryLimit, (revRes) => {
            resolve(revRes);
        });
    });
};

var revPersReadRevEntityGUID_By_OwnerGUID_ContainerGUID_Subtype_Serv = (revEntityOwnerGUID, revEntityContainerGUID, revEntitySubtype) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_accessor.revPersReadRevEntityGUID_By_OwnerGUID_ContainerGUID_Subtype(revEntityOwnerGUID, revEntityContainerGUID, revEntitySubtype, (retRevEntityGUID) => {
            resolve(retRevEntityGUID);
        });
    });
};

var revPersReadEnties_By_OwnerGUID_ContainerGUID_Subtype_Serv = (revVarArgs) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_accessor.revPersReadEnties_By_OwnerGUID_ContainerGUID_Subtype(revVarArgs, (revEntitiesRes) => {
            resolve(revEntitiesRes);
        });
    });
};

var revPersReadRevEntity_By_OwnerGUID_ContainerGUID_Subtype_Serv = (revEntityOwnerGUID, revEntityContainerGUID, revEntitySubtype) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_accessor.revPersReadRevEntity_By_OwnerGUID_ContainerGUID_Subtype(revEntityOwnerGUID, revEntityContainerGUID, revEntitySubtype, (revEntity) => {
            resolve(revEntity);
        });
    });
};

var promiseToReadRevEntityByRemoteRevEntityGUID = (remoteRevEntityGUID) => {
    return new Promise(function (resolve, reject) {
        rev_pers_read_rev_entity_accessor.revPersReadRevEntityByRemoteRevEntityGUID(remoteRevEntityGUID, function (result) {
            resolve(result);
        });
    });
};

var revPersReadAllRevEntity_By_RevEntityGUIDs_Serv = (revRelValEntityGUIDsArr) => {
    return new Promise(function (resolve, reject) {
        rev_pers_read_rev_entity_accessor.revPersReadAllRevEntity_By_RevEntityGUIDs(revRelValEntityGUIDsArr, function (result) {
            resolve(result);
        });
    });
};

var revPersReadRevEntityContainerGUID_By_RevEntityGUID_Serv = (todo) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_accessor.revPersReadRevEntityContainerGUID_By_RevEntityGUID(todo, (revContainerGUIDsArr) => {
            resolve(revContainerGUIDsArr);
        });
    });
};

var revPersReadRevEntityGUID_By_RevEntityOwnerGUID_Subtype_Serv = async (revEntityOwnerGUID, revEntitySubtype) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_accessor.revPersReadRevEntityGUID_By_RevEntityOwnerGUID_Subtype(revEntityOwnerGUID, revEntitySubtype, (retRevEntityGUID) => {
            resolve(retRevEntityGUID);
        });
    });
};

var revPersReadRevEntity_By_RevEntityOwnerGUID_SubtypeServ = (revEntityOwnerGUID, revEntityType) => {
    return new Promise(function (resolve, reject) {
        rev_pers_read_rev_entity_accessor.revPersReadRevEntity_By_RevEntityOwnerGUID_Subtype(revEntityOwnerGUID, revEntityType, function (result) {
            resolve(result);
        });
    });
};

var revPersReadRevEntities_By_RevEntityOwnerGUID_Subtype_Serv = (revVarArgs) => {
    return new Promise(function (resolve, reject) {
        rev_pers_read_rev_entity_accessor.revPersReadRevEntities_By_RevEntityOwnerGUID_Subtype(revVarArgs, function (result) {
            resolve(result);
        });
    });
};

var revPersReadRevEntities_OF_RemoteRevEntityGUIDs_Serv = (revEntitiesGUIDs) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_accessor.revPersReadRevEntities_OF_RemoteRevEntityGUIDs(revEntitiesGUIDs, (revEntitiesRes) => {
            resolve(revEntitiesRes);
        });
    });
};

var revPersReadRevEntities_OF_OwnerGUIDArr_SubTypeArr_Serv = (revVarArgs) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_accessor.revPersReadRevEntities_OF_OwnerGUIDArr_SubTypeArr(revVarArgs, (revEntitiesRes) => {
            resolve(revEntitiesRes);
        });
    });
};

var revPersReadEntities_By_ContainerGUID_SubType_Serv = (revVarArgs) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_accessor.revPersEntities_By_ContainerGUID_SubType(revVarArgs, (revEntitiesRes) => {
            resolve(revEntitiesRes);
        });
    });
};

var revPersReadRevEntities_OF_ContainerGUID_SubTypesArr_Serv = (revContainerGUID, revSubtypesArray) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_accessor.revPersReadRevEntities_OF_ContainerGUID_SubTypesArr(revContainerGUID, revSubtypesArray, (revEntitiesRes) => {
            resolve(revEntitiesRes);
        });
    });
};

var revPersEntities_By_ContainerGUIDsArr_SubTypesArr_Serv = (revCollectionLimit, revEntityContainerGUIDsArray, revEntitySubtypesArray, revLastCheckDate) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_accessor.revPersEntities_By_ContainerGUIDsArr_SubTypesArr(revCollectionLimit, revEntityContainerGUIDsArray, revEntitySubtypesArray, revLastCheckDate, (revEntitiesRes) => {
            resolve(revEntitiesRes);
        });
    });
};

var revPersReadContainerChilds_Serv = (revVarArgs) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_accessor.revPersReadContainerChilds(revVarArgs, (revEntitiesRes) => {
            resolve(revEntitiesRes);
        });
    });
};

var revPersReadRevEntities_OF_RemoteRevEntityGUIDs_EXEMPT_SubType_Serv = (revContainerGUID, revEntitiesGUIDs, exemptSubtypesArray) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_accessor.revPersReadRevEntities_OF_RemoteRevEntityGUIDs_EXEMPT_SubType(revContainerGUID, revEntitiesGUIDs, exemptSubtypesArray, (revEntitiesRes) => {
            resolve(revEntitiesRes);
        });
    });
};

var revPersReadRevEntities_EXEMPT_SubType_Serv = (exemptSubtypesArray) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_accessor.revPersReadRevEntities_EXEMPT_SubType(exemptSubtypesArray, (revEntitiesRes) => {
            resolve(revEntitiesRes);
        });
    });
};

var revPersReadRevEntities_OF_ContainerGUID_EXEMPT_SubType_Serv = (revContainerGUID, exemptSubtypesArray) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_accessor.revPersReadRevEntities_OF_ContainerGUID_EXEMPT_SubType(revContainerGUID, exemptSubtypesArray, (revEntitiesRes) => {
            resolve(revEntitiesRes);
        });
    });
};

var revPersReadRevEntyGUIDs_OF_RevEntityContainerGUID_Serv = (revVarArgs) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_accessor.revPersReadRevEntyGUIDs_OF_RevEntityContainerGUID(revVarArgs, (revEntitiesRes) => {
            resolve(revEntitiesRes);
        });
    });
};

var revPersReadRevEntities_OF_RevEntityContainerGUID_Serv = (revVarArgs) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_accessor.revPersReadRevEntities_OF_RevEntityContainerGUID(revVarArgs, (revEntitiesRes) => {
            resolve(revEntitiesRes);
        });
    });
};

var revPersReadRevEntities_OF_RevEntityContainerGUID_Serv_EXPO = async (revVarArgs) => {
    let revEntityGUIDsArr = [];
    let revEntityDBResArr = await revPersReadRevEntities_OF_RevEntityContainerGUID_Serv(revVarArgs);

    for (let i = 0; i < revEntityDBResArr.length; i++) {
        revEntityGUIDsArr.push(revEntityDBResArr[i].REMOTE_REV_ENTITY_GUID);
    }

    return revEntityGUIDsArr;
};

var revPersReadAllRevEntities_OF_RevEntityContainerGUIDs_Serv = (revEntityContainerGUIDsArr) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_accessor.revPersReadAllRevEntities_OF_RevEntityContainerGUIDs(revEntityContainerGUIDsArr, (revEntitiesRes) => {
            resolve(revEntitiesRes);
        });
    });
};

var revPersReadAllRevEntities_By_RemoteRevEntityOwnerGUID_Serv = (revEntityOwnerGUID) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_accessor.revPersReadAllRevEntities_By_RemoteRevEntityOwnerGUID(revEntityOwnerGUID, (revEntitiesRes) => {
            resolve(revEntitiesRes);
        });
    });
};

var revPersReadRevEntities_BY_RemoteRevEntityGUIDs_Serv = (remoteRevEntityGUIDs) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_accessor.revPersReadRevEntities_BY_RemoteRevEntityGUIDs(remoteRevEntityGUIDs, (retRevEntities) => {
            resolve(retRevEntities);
        });
    });
};

var revPersReadRevEntities_BY_RemoteRevEntityGUIDs_SubTypesArr_Serv = (remoteRevEntityGUIDs, revVarArgs) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_accessor.revPersReadRevEntities_BY_RemoteRevEntityGUIDs_SubTypesArr(remoteRevEntityGUIDs, revVarArgs, (retRevEntities) => {
            resolve(retRevEntities);
        });
    });
};

var revPersReadRevEntities_BY_OWNER_GUID_OR_CONTAINER_GUID_SubTypesArr_Serv = (revVarArgs) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_accessor.revPersReadRevEntities_BY_OWNER_GUID_OR_CONTAINER_GUID_SubTypesArr(revVarArgs, (retRevEntities) => {
            resolve(retRevEntities);
        });
    });
};

var revSelectRevEntityOwnerChildrenGUIDs_By_RevEntityGUID_Serv = async (revEntityGUID) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_accessor.revSelectRevEntityOwnerChildrenGUIDs_By_RevEntityGUID(revEntityGUID, (result) => {
            resolve(result);
        });
    });
};

var revSelectRevEntityContainerChildrenGUIDs_By_RevEntityGUID_Serv = async (revEntityGUID) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_accessor.revSelectRevEntityContainerChildrenGUIDs_By_RevEntityGUID(revEntityGUID, (result) => {
            resolve(result);
        });
    });
};

module.exports.revCountRevEntities_By_OwnerGuid_SubType_Serv = revCountRevEntities_By_OwnerGuid_SubType_Serv;
module.exports.revCountRevEntities_By_ContainerGuid_SubType_Serv = revCountRevEntities_By_ContainerGuid_SubType_Serv;
module.exports.revGetEntityGUID_By_ContainerGuid_SubType_Serv = revGetEntityGUID_By_ContainerGuid_SubType_Serv;

module.exports.revPersReadRevEntityResolveStatus_Serv = revPersReadRevEntityResolveStatus_Serv;
module.exports.revPersReadRevEntitySubType_Serv = revPersReadRevEntitySubType_Serv;
module.exports.revPersReadRevEntityType_Serv = revPersReadRevEntityType_Serv;
module.exports.revPersReadRevEntityChildableStatus_Serv = revPersReadRevEntityChildableStatus_Serv;

module.exports.revPersReadRevEntityGUID_By_CreationDate_Serv = revPersReadRevEntityGUID_By_CreationDate_Serv;
module.exports.revPersReadOwnerEntityGUID_By_RevEntityGUID_Serv = revPersReadOwnerEntityGUID_By_RevEntityGUID_Serv;
module.exports.revPersReadRevPublishedDate_By_RevEntityGUID_Serv = revPersReadRevPublishedDate_By_RevEntityGUID_Serv;
module.exports.revPersReadRevEntityGUID_By_OwnerGUID_ContainerGUID_Subtype_Serv = revPersReadRevEntityGUID_By_OwnerGUID_ContainerGUID_Subtype_Serv;
module.exports.revPersReadEnties_By_OwnerGUID_ContainerGUID_Subtype_Serv = revPersReadEnties_By_OwnerGUID_ContainerGUID_Subtype_Serv;

module.exports.revPersReadRevEntities_By_Subtype_Serv = revPersReadRevEntities_By_Subtype_Serv;
module.exports.revPersReadRevEntities_By_SubtypesArr_Serv = revPersReadRevEntities_By_SubtypesArr_Serv;

module.exports.revPersReadRevEntity_By_OwnerGUID_ContainerGUID_Subtype_Serv = revPersReadRevEntity_By_OwnerGUID_ContainerGUID_Subtype_Serv;

module.exports.getRevPersReadAllRevEntityType = getRevPersReadAllRevEntityType;
module.exports.promiseToReadRevEntityByRemoteRevEntityGUID = promiseToReadRevEntityByRemoteRevEntityGUID;
module.exports.revPersReadAllRevEntity_By_RevEntityGUIDs_Serv = revPersReadAllRevEntity_By_RevEntityGUIDs_Serv;

module.exports.revPersReadRevEntityContainerGUID_By_RevEntityGUID_Serv = revPersReadRevEntityContainerGUID_By_RevEntityGUID_Serv;
module.exports.revPersReadRevEntityGUID_By_RevEntityOwnerGUID_Subtype_Serv = revPersReadRevEntityGUID_By_RevEntityOwnerGUID_Subtype_Serv;

module.exports.revPersReadRevEntity_By_RevEntityOwnerGUID_SubtypeServ = revPersReadRevEntity_By_RevEntityOwnerGUID_SubtypeServ;
module.exports.revPersReadRevEntities_By_RevEntityOwnerGUID_Subtype_Serv = revPersReadRevEntities_By_RevEntityOwnerGUID_Subtype_Serv;

module.exports.revPersReadRevEntities_OF_RemoteRevEntityGUIDs_Serv = revPersReadRevEntities_OF_RemoteRevEntityGUIDs_Serv;

module.exports.revPersReadRevEntities_OF_OwnerGUIDArr_SubTypeArr_Serv = revPersReadRevEntities_OF_OwnerGUIDArr_SubTypeArr_Serv;
module.exports.revPersReadEntities_By_ContainerGUID_SubType_Serv = revPersReadEntities_By_ContainerGUID_SubType_Serv;

module.exports.revPersEntities_By_ContainerGUIDsArr_SubTypesArr_Serv = revPersEntities_By_ContainerGUIDsArr_SubTypesArr_Serv;
module.exports.revPersReadContainerChilds_Serv = revPersReadContainerChilds_Serv;
module.exports.revPersReadRevEntities_OF_ContainerGUID_SubTypesArr_Serv = revPersReadRevEntities_OF_ContainerGUID_SubTypesArr_Serv;

module.exports.revPersReadRevEntities_EXEMPT_SubType_Serv = revPersReadRevEntities_EXEMPT_SubType_Serv;
module.exports.revPersReadRevEntities_OF_ContainerGUID_EXEMPT_SubType_Serv = revPersReadRevEntities_OF_ContainerGUID_EXEMPT_SubType_Serv;
module.exports.revPersReadRevEntities_OF_RemoteRevEntityGUIDs_EXEMPT_SubType_Serv = revPersReadRevEntities_OF_RemoteRevEntityGUIDs_EXEMPT_SubType_Serv;

module.exports.revPersReadRevEntyGUIDs_OF_RevEntityContainerGUID_Serv = revPersReadRevEntyGUIDs_OF_RevEntityContainerGUID_Serv;
module.exports.revPersReadRevEntities_OF_RevEntityContainerGUID_Serv = revPersReadRevEntities_OF_RevEntityContainerGUID_Serv;
module.exports.revPersReadRevEntities_OF_RevEntityContainerGUID_Serv_EXPO = revPersReadRevEntities_OF_RevEntityContainerGUID_Serv_EXPO;
module.exports.revPersReadAllRevEntities_OF_RevEntityContainerGUIDs_Serv = revPersReadAllRevEntities_OF_RevEntityContainerGUIDs_Serv;

module.exports.revPersReadRevEntities_BY_RemoteRevEntityGUIDs_Serv = revPersReadRevEntities_BY_RemoteRevEntityGUIDs_Serv;
module.exports.revPersReadRevEntities_BY_RemoteRevEntityGUIDs_SubTypesArr_Serv = revPersReadRevEntities_BY_RemoteRevEntityGUIDs_SubTypesArr_Serv;
module.exports.revPersReadRevEntities_BY_OWNER_GUID_OR_CONTAINER_GUID_SubTypesArr_Serv = revPersReadRevEntities_BY_OWNER_GUID_OR_CONTAINER_GUID_SubTypesArr_Serv;

module.exports.revPersReadAllRevEntities_By_RemoteRevEntityOwnerGUID_Serv = revPersReadAllRevEntities_By_RemoteRevEntityOwnerGUID_Serv;

module.exports.revSelectRevEntityOwnerChildrenGUIDs_By_RevEntityGUID_Serv = revSelectRevEntityOwnerChildrenGUIDs_By_RevEntityGUID_Serv;
module.exports.revSelectRevEntityContainerChildrenGUIDs_By_RevEntityGUID_Serv = revSelectRevEntityContainerChildrenGUIDs_By_RevEntityGUID_Serv;
