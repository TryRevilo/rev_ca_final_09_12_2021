const rev_json_functions = require("../../../../rev_helper_functions/rev_json_functions");

/** REV START ENTITY */
const rev_pers_read_rev_entity_service_helper = require("../rev_pers_lib_read/rev_service_heper/rev_pers_read_rev_entity_service_helper");
/** REV END ENTITY */

/** REV START METADATA */
const rev_db_entity_metadata_const_resolver = require("../../../rev_entity_data/rev_pers_metadata/rev_db_models/rev_db_entity_metadata_const_resolver");

const rev_pers_read_rev_entity_metadata_service_helper = require("../../../rev_entity_data/rev_pers_metadata/rev_pers_lib_read/rev_service_helper/rev_pers_read_rev_entity_metadata_service_helper");

const rev_pers_create_metadata_service_helper = require("../../../rev_entity_data/rev_pers_metadata/rev_pers_lib_create/rev_pers_create/rev_service_heper/rev_pers_create_metadata_service_helper");
/** REV END METADATA */

/** REV START ANNOTATTIONS */
const rev_db_entity_annotation_const_resolver = require("../../../rev_entity_data/rev_pers_annotations/rev_db_models/rev_db_entity_annotation_const_resolver");

const rev_pers_read_rev_entity_annotations_service_helper = require("../../../rev_entity_data/rev_pers_annotations/rev_pers_lib_read/rev_service_helper/rev_pers_read_rev_entity_annotations_service_helper");
/** REV END ANNOTATTIONS */

/** REV START RELATIONSHIPS */
const rev_pers_read_rev_entity_relationship_service_helper = require("../../../rev_entity_data/rev_pers_relationships/rev_pers_lib_read/rev_service_helper/rev_pers_read_rev_entity_relationship_service_helper");
const { resolve } = require("path");
/** REV END RELATIONSHIPS */

var REV_ENTITY_STRUCT = () => {
    return {
        "_revEntityType": "",
        "_revEntitySubType": "",
        "_revEntityGUID": -1,
        "_remoteRevEntityGUID": -1,
        "_revEntityOwnerGUID": -1,
        "_revEntityContainerGUID": -1,
        "_revEntityRemoteContainerGUID": -1,
        "_revEntitySiteGUID": -1,
        "_revEntityAccessPermission": -1,
        "_revEntityResolveStatus": -1,
        "_revEntityChildableStatus": -1,
        "_revEntityMetadataList": [],
        "_revEntityAnnotations": [],
        "_revEntityChildrenList": [],
        "_revInfoEntity": {},
        "_timeCreated": "",
        "_timeUpdated": "",
        "_revTimeCreated": new Date().getTime(),
        "_revTimePublished": "",
        "_revTimePublishedUpdated": -1,
        "_revPersContainerChildren": [],
        "_revTargetEntityRelationships": [],
        "_revSubjectEntityRelationships": [],
    };
};

var promiseToFillRevEntity = (revEntityDBRes) => {
    if (rev_json_functions.revIsEmptyJSONObject(revEntityDBRes) || revEntityDBRes.REV_ENTITY_SUB_TYPE == undefined) {
        return null;
    }

    let revEntityJSONConst = {};

    revEntityJSONConst._revEntityType = revEntityDBRes.REV_ENTITY_TYPE;
    revEntityJSONConst._revEntitySubType = revEntityDBRes.REV_ENTITY_SUB_TYPE;

    revEntityJSONConst._remoteRevEntityGUID = revEntityDBRes.REMOTE_REV_ENTITY_GUID;

    revEntityJSONConst._revEntityOwnerGUID = revEntityDBRes.REV_ENTITY_OWNER_GUID;
    revEntityJSONConst._revEntityContainerGUID = revEntityDBRes.REV_ENTITY_CONTAINER_GUID;
    revEntityJSONConst._revEntityRemoteContainerGUID = revEntityDBRes.REV_ENTITY_CONTAINER_GUID;

    revEntityJSONConst._revEntitySiteGUID = revEntityDBRes.REV_ENTITY_SITE_GUID;
    revEntityJSONConst._revEntityAccessPermission = revEntityDBRes.REV_ENTITY_ACCESS_PERMISSION;

    revEntityJSONConst._revEntityResolveStatus = revEntityDBRes.REV_RESOLVE_STATUS;

    revEntityJSONConst._revEntityChildableStatus = revEntityDBRes.REV_CHILDABLE_STATUS;

    revEntityJSONConst["_revEntityMetadataList"] = [];
    revEntityJSONConst["_revEntityAnnotations"] = [];
    revEntityJSONConst["_revEntityChildrenList"] = [];

    if (revEntityJSONConst._revEntitySubType && revEntityJSONConst._revEntitySubType.localeCompare("_revInfoEntity") !== 0) {
        revEntityJSONConst["_revInfoEntity"] = {};
    }

    revEntityJSONConst._timeCreated = revEntityDBRes.COLUMN_NAME_CREATED_DATE;
    revEntityJSONConst._timeUpdated = revEntityDBRes.COLUMN_NAME_UPDATED_DATE;

    revEntityJSONConst._revTimeCreated = revEntityDBRes.REV_CREATED_DATE;
    revEntityJSONConst._revTimePublished = revEntityDBRes.REV_PUBLISHED_DATE;
    revEntityJSONConst._revTimePublishedUpdated = revEntityDBRes.REV_UPDATED_DATE;

    return revEntityJSONConst;
};

var revFillRevAnnotations_Serv = async (revEntity) => {
    let remoteRevEntityGUID = revEntity._remoteRevEntityGUID;

    let revEntityAnnsDBRes = await rev_pers_read_rev_entity_annotations_service_helper.revPersReadRevEntityAnn_By_RemoteRevEntityGUID_Serv(remoteRevEntityGUID);

    for (let i = 0; i < revEntityAnnsDBRes.length; i++) {
        let revEntityAnn = rev_db_entity_annotation_const_resolver.revEntityAnnFillerResolver(revEntityAnnsDBRes[i]);

        revEntity._revEntityAnnotations.push(revEntityAnn);
    }
};

var revFillEntityPicsAlbum = async (revEntityGUID) => {
    let revInfoPicsAlbumGUID = await rev_pers_read_rev_entity_relationship_service_helper.revPersReadSingleRevEntityRelsSubjectGUID_By_RevTargetGUID_RevRelId_Serv(revEntityGUID, 3);

    if (revInfoPicsAlbumGUID < 1) {
        revInfoPicsAlbumGUID = await rev_pers_read_rev_entity_service_helper.revGetEntityGUID_By_ContainerGuid_SubType_Serv({ "revContainerGUID": revEntityGUID, "revEntitySubType": "rev_pics_album" });

        if (revInfoPicsAlbumGUID < 1) {
            return null;
        }
    }

    let revInfoPicsAlbumEntityDBRes = await rev_pers_read_rev_entity_service_helper.promiseToReadRevEntityByRemoteRevEntityGUID(revInfoPicsAlbumGUID);
    let revPicAlbumEntity = await revFillrevEntityType(revInfoPicsAlbumEntityDBRes);

    if (!revPicAlbumEntity) {
        return null;
    }

    let revEntityFilesGUIDs = await rev_pers_read_rev_entity_relationship_service_helper.revPersReadRevEntityRelsSubjectGUIDs_By_RevTargetGUID_RevRelIdServ(revInfoPicsAlbumGUID, 4);

    let revEntitesArray = [];

    await revEntityFilesGUIDs.filter.reduce((previousPromise, nextId) => {
        return previousPromise.then(() => {
            return new Promise(async (resolve, reject) => {
                let revEntityRetDBRes = await rev_pers_read_rev_entity_service_helper.promiseToReadRevEntityByRemoteRevEntityGUID(nextId);
                let revFilledRevEntity = await revFillrevEntityType(revEntityRetDBRes);

                if (revFilledRevEntity !== null) {
                    revEntitesArray.push(revFilledRevEntity);
                }

                resolve();
            });
        });
    }, Promise.resolve());

    revPicAlbumEntity._revEntityChildrenList.push.apply(revPicAlbumEntity._revEntityChildrenList, revEntitesArray);

    return revPicAlbumEntity;
};

var revFillEntityVidsAlbum = async (revEntityGUID) => {
    let revEntitesArray = [];

    let revVidsAlbumGUID = await rev_pers_read_rev_entity_relationship_service_helper.revPersReadSingleRevEntityRelsSubjectGUID_By_RevTargetGUID_RevRelId_Serv(revEntityGUID, 9);

    if (revVidsAlbumGUID < 1) return null;

    let revInfoPicsAlbumEntityDBRes = await rev_pers_read_rev_entity_service_helper.promiseToReadRevEntityByRemoteRevEntityGUID(revVidsAlbumGUID);
    let revVidsAlbumEntity = await revFillrevEntityType(revInfoPicsAlbumEntityDBRes);

    if (!revVidsAlbumEntity) return null;

    let revEntityFilesGUIDs = await rev_pers_read_rev_entity_relationship_service_helper.revPersReadRevEntityRelsSubjectGUIDs_By_RevTargetGUID_RevRelIdServ(revVidsAlbumGUID, 8);

    await revEntityFilesGUIDs.filter.reduce(async (previousPromise, nextId) => {
        return previousPromise.then(async () => {
            let revEntityRetDBRes = await rev_pers_read_rev_entity_service_helper.promiseToReadRevEntityByRemoteRevEntityGUID(nextId);
            return await revEntityFiller(revEntityRetDBRes, (filledRevEntity) => {
                if (filledRevEntity !== null) {
                    revEntitesArray.push(filledRevEntity);
                }
            });
        });
    }, Promise.resolve());

    revVidsAlbumEntity._revEntityChildrenList.push.apply(revVidsAlbumEntity._revEntityChildrenList, revEntitesArray);

    return revVidsAlbumEntity;
};

var revFillRevEntityInfo_Serv = async (revFillRevEntityInfoDBRes, callback) => {
    let revEntityInfoDBRes;

    let revEntityGUID = revFillRevEntityInfoDBRes.REMOTE_REV_ENTITY_GUID;

    if (revFillRevEntityInfoDBRes["REV_ENTITY_TYPE"] === "rev_group_entity") {
        let revEntityInfoGUID = await rev_pers_read_rev_entity_relationship_service_helper.revPersReadSingleRevEntityRelsSubjectGUID_By_RevTargetGUID_RevRelId_Serv(revEntityGUID, 0);
        revEntityInfoDBRes = await rev_pers_read_rev_entity_service_helper.promiseToReadRevEntityByRemoteRevEntityGUID(revEntityInfoGUID);
    } else {
        revEntityInfoDBRes = await rev_pers_read_rev_entity_service_helper.revPersReadRevEntity_By_RevEntityOwnerGUID_SubtypeServ(revEntityGUID, "rev_entity_info");
    }

    let revEntityInfo = await revFillrevEntityType(revEntityInfoDBRes);

    let revInfoPicsAlbum = await revFillEntityPicsAlbum(revEntityInfoDBRes.REMOTE_REV_ENTITY_GUID);

    if (revInfoPicsAlbum) {
        revEntityInfo._revEntityChildrenList.push(revInfoPicsAlbum);
    }

    if (callback) {
        callback(revEntityInfo);
    } else {
        return revEntityInfo;
    }
};

var revFilledRevEntity_Serv = async (revEntityDBRes) => {
    if (revEntityDBRes == null) {
        return null;
    }

    let revEntityJSONConst = promiseToFillRevEntity(revEntityDBRes);

    if (revEntityJSONConst == null) return null;

    await rev_db_entity_metadata_const_resolver.revEntityMetadataFiller_Serv(revEntityJSONConst._remoteRevEntityGUID, (revCallRes) => {
        revEntityJSONConst._revEntityMetadataList = revCallRes;
    });

    return revEntityJSONConst;
};

var revFillrevEntityType = async (revEntityDBRes) => {
    if (rev_json_functions.revIsEmptyJSONObject(revEntityDBRes)) {
        return null;
    }

    let revEntityJSONConst = promiseToFillRevEntity(revEntityDBRes);

    if (rev_json_functions.revIsEmptyJSONObject(revEntityJSONConst)) {
        return null;
    }

    try {
        revEntityJSONConst._revEntityMetadataList = await rev_db_entity_metadata_const_resolver.revEntityMetadataFiller_Serv(revEntityJSONConst._remoteRevEntityGUID);
    } catch (error) {
        console.log("ERR -> revFillrevEntityType -> " + error);
    }

    if (revEntityJSONConst._revEntitySubType !== "_revInfoEntity") {
        let revRetRevEntityInfo = await revFillRevEntityInfo_Serv(revEntityDBRes);

        if (!rev_json_functions.revIsEmptyJSONObject(revRetRevEntityInfo)) {
            revEntityJSONConst["_revInfoEntity"] = revRetRevEntityInfo;
        }
    }

    let revEntityPicsAlbum = await revFillEntityPicsAlbum(revEntityJSONConst._remoteRevEntityGUID);

    if (revEntityPicsAlbum) {
        revEntityJSONConst._revEntityChildrenList.push(revEntityPicsAlbum);
    }

    let revEntityVidsAlbum = await revFillEntityVidsAlbum(revEntityJSONConst._remoteRevEntityGUID);

    if (revEntityVidsAlbum) {
        revEntityJSONConst._revEntityChildrenList.push(revEntityVidsAlbum);
    }

    return revEntityJSONConst;
};

var revGetFlatEntity_Serv = async (revEntityGUID) => {
    let revEntityDBRes = await rev_pers_read_rev_entity_service_helper.promiseToReadRevEntityByRemoteRevEntityGUID(revEntityGUID);
    let revFlatEntity = await revFillrevEntityType(revEntityDBRes);

    return revFlatEntity;
};

var revEntityFiller = async (revEntityDBRes, callback) => {
    let revEntity = await revFillrevEntityType(revEntityDBRes);

    if (callback) {
        callback(revEntity);
    } else {
        return revEntity;
    }
};

var revEntityNonUserFiller = async (revEntityDBRes, callback) => {
    if (revEntityDBRes.REV_ENTITY_SUB_TYPE !== "rev_user_entity") {
        await revEntityFiller(revEntityDBRes, (result) => {
            callback(result);
        });
    } else {
        callback(null);
    }
};

var revPersReadRevEntityFiller_BY_RemoteRevEntityGUIDsServ = async (revEntityGUIDs) => {
    let revEntitesArray = [];

    let revEntitiesDBRes = await rev_pers_read_rev_entity_service_helper.revPersReadRevEntities_OF_RemoteRevEntityGUIDs_Serv(revEntityGUIDs);

    await revEntitiesDBRes.reduce(async (previousPromise, nextId) => {
        return previousPromise.then(async () => {
            return await revEntityFiller(nextId, (filledRevEntity) => {
                if (filledRevEntity !== null) {
                    revEntitesArray.push(filledRevEntity);
                }
            });
        });
    }, Promise.resolve());

    return revEntitesArray;
};

var revPersReadRevEntityFiller_BY_RemoteRevEntityGUIDsServ_Exempt_Subtypes = async (revContainerGUID, revEntityGUIDs, exemptSubtypes) => {
    let revEntitesArray = [];

    let revEntitiesDBRes = await rev_pers_read_rev_entity_service_helper.revPersReadRevEntities_OF_RemoteRevEntityGUIDs_EXEMPT_SubType_Serv(revContainerGUID, revEntityGUIDs, exemptSubtypes);

    await revEntitiesDBRes.reduce(async (previousPromise, nextId) => {
        return previousPromise.then(async () => {
            return await revEntityFiller(nextId, (filledRevEntity) => {
                if (filledRevEntity !== null) {
                    revEntitesArray.push(filledRevEntity);
                }
            });
        });
    }, Promise.resolve());

    return revEntitesArray;
};

var revPersReadRevEntities_By_Subtype_Expo_Serv = async (revEntitySubtype, revQueryLimit) => {
    let revEntitesArray = [];

    let revEntitiesDBRes = await rev_pers_read_rev_entity_service_helper.revPersReadRevEntities_By_Subtype_Serv(revEntitySubtype, revQueryLimit);

    await revEntitiesDBRes.reduce((previousPromise, nextId) => {
        return previousPromise.then(async () => {
            return await revEntityFiller(nextId, (filledRevEntity) => {
                if (filledRevEntity !== null) {
                    revEntitesArray.push(filledRevEntity);
                }
            });
        });
    }, Promise.resolve());

    return revEntitesArray;
};

var revPersReadRevEntityFiller_BY_ContainerGUID_Exempt_Subtypes_Serv = async (revContainerGUID, exemptSubtypes) => {
    let revEntitesArray = [];

    let revEntitiesDBRes = await rev_pers_read_rev_entity_service_helper.revPersReadRevEntities_OF_ContainerGUID_EXEMPT_SubType_Serv(revContainerGUID, exemptSubtypes);

    await revEntitiesDBRes.reduce((previousPromise, nextId) => {
        return previousPromise.then(async () => {
            return await revEntityFiller(nextId, (filledRevEntity) => {
                if (filledRevEntity !== null) {
                    revEntitesArray.push(filledRevEntity);
                }
            });
        });
    }, Promise.resolve());

    return revEntitesArray;
};

var revPersReadRevEntityFiller_Exempt_Subtypes_Serv = async (exemptSubtypes) => {
    let revEntitesArray = [];

    let revEntitiesDBRes = await rev_pers_read_rev_entity_service_helper.revPersReadRevEntities_EXEMPT_SubType_Serv(exemptSubtypes);

    await revEntitiesDBRes.reduce((previousPromise, nextId) => {
        return previousPromise.then(async () => {
            return await revEntityFiller(nextId, (filledRevEntity) => {
                if (filledRevEntity !== null) {
                    revEntitesArray.push(filledRevEntity);
                }
            });
        });
    }, Promise.resolve());

    return revEntitesArray;
};

var revPersReadRevEntities_OF_RevEntityContainerGUID_Expo = async (revVarArgs) => {
    let revEntitesArray = [];

    let revEntitiesDBRes = await rev_pers_read_rev_entity_service_helper.revPersReadRevEntities_OF_RevEntityContainerGUID_Serv(revVarArgs);

    await revEntitiesDBRes.reduce((previousPromise, nextId) => {
        return previousPromise.then(async () => {
            return revEntityFiller(nextId, (filledRevEntity) => {
                if (filledRevEntity !== null) {
                    revEntitesArray.push(filledRevEntity);
                }
            });
        });
    }, Promise.resolve());

    return revEntitesArray;
};

var revPersReadFilledRevEntities_OF_ContainerGUID_SubType_Serv = async (revVarArgs) => {
    let revEntitesArray = [];

    let revEntitiesDBRes = await rev_pers_read_rev_entity_service_helper.revPersReadEntities_By_ContainerGUID_SubType_Serv(revVarArgs);

    await revEntitiesDBRes.reduce((previousPromise, nextId) => {
        return previousPromise.then(async () => {
            return new Promise(async (resolve, reject) => {
                let filledRevEntity = await revEntityFiller(nextId);

                if (filledRevEntity !== null) {
                    revEntitesArray.push(filledRevEntity);
                }

                resolve();
            });
        });
    }, Promise.resolve());

    return revEntitesArray;
};

var revPersReadRevEntities_BY_OWNER_GUID_OR_CONTAINER_GUID_SubTypesArr_Serv = async (revVarArgs) => {
    let revEntitesArray = [];

    let revEntitiesDBRes = await rev_pers_read_rev_entity_service_helper.revPersReadRevEntities_BY_OWNER_GUID_OR_CONTAINER_GUID_SubTypesArr_Serv(revVarArgs);

    await revEntitiesDBRes.reduce((previousPromise, nextId) => {
        return previousPromise.then(async () => {
            return revEntityFiller(nextId, (filledRevEntity) => {
                if (filledRevEntity !== null) {
                    revEntitesArray.push(filledRevEntity);
                }
            });
        });
    }, Promise.resolve());

    return revEntitesArray;
};

var revPersReadFlatEntities_OF_ContainerGUID_SubTypesArr_Serv = async (revContainerGUID, revSubtypesArray) => {
    let revEntitesArray = [];

    let revEntitiesDBRes = await rev_pers_read_rev_entity_service_helper.revPersReadRevEntities_OF_ContainerGUID_SubTypesArr_Serv(revContainerGUID, revSubtypesArray);

    await revEntitiesDBRes.reduce((previousPromise, nextId) => {
        return previousPromise.then(async () => {
            let filledRevEntity = await revFillrevEntityType(nextId);

            if (!rev_json_functions.revIsEmptyJSONObject(filledRevEntity)) {
                revEntitesArray.push(filledRevEntity);
            }
        });
    }, Promise.resolve());

    return revEntitesArray;
};

var revPersReadFlatEnties_By_OwnerGUID_Subtype_Serv = async (revVarArgs) => {
    let revEntitesArray = [];

    let revEntitiesDBRes = await rev_pers_read_rev_entity_service_helper.revPersReadRevEntities_By_RevEntityOwnerGUID_Subtype_Serv(revVarArgs);

    await revEntitiesDBRes.reduce((previousPromise, nextId) => {
        return previousPromise.then(async () => {
            return new Promise(async (resolve, reject) => {
                let filledRevEntity = await revFillrevEntityType(nextId);
                if (filledRevEntity !== null) {
                    revEntitesArray.push(filledRevEntity);
                }

                resolve();
            });
        });
    }, Promise.resolve());

    return revEntitesArray;
};

var revPersReadFlatEnties_By_OwnerGUID_ContainerGUID_Subtype_Serv = async (revVarArgs) => {
    let revEntitesArray = [];

    let revEntitiesDBRes = await rev_pers_read_rev_entity_service_helper.revPersReadEnties_By_OwnerGUID_ContainerGUID_Subtype_Serv(revVarArgs);

    await revEntitiesDBRes.reduce((previousPromise, nextId) => {
        return previousPromise.then(async () => {
            return new Promise(async (resolve, reject) => {
                let filledRevEntity = await revFillrevEntityType(nextId);
                if (filledRevEntity !== null) {
                    revEntitesArray.push(filledRevEntity);
                }

                resolve();
            });
        });
    }, Promise.resolve());

    return revEntitesArray;
};

var revPersReadFlatEntities_By_ContainerGUIDsArr_SubTypesArr_Serv = async (revVarArgs) => {
    let revEntitesArray = [];

    let revEntitiesDBRes = await rev_pers_read_rev_entity_service_helper.revPersEntities_By_ContainerGUIDsArr_SubTypesArr_Serv(revVarArgs);

    await revEntitiesDBRes.reduce((previousPromise, nextId) => {
        return previousPromise.then(async () => {
            return await revFillrevEntityType(nextId, (filledRevEntity) => {
                if (filledRevEntity !== null) {
                    revEntitesArray.push(filledRevEntity);
                }
            });
        });
    }, Promise.resolve());

    return revEntitesArray;
};

var revGetEntityStatsWrapper = async (revVarArgs) => {
    if (!revVarArgs || !revVarArgs.revEntityGUID || revVarArgs.revEntityGUID < 1 || !revVarArgs.revEntityStatsWrapperNameId) {
        return null;
    }

    let revEntityGUID = revVarArgs.revEntityGUID;
    let revEntityStatsWrapperNameId = revVarArgs.revEntityStatsWrapperNameId;
    let revEntityStatsWrapperDefVal = revVarArgs.revEntityStatsWrapperDefVal;

    let revEntityMetadataStatsWrapper = await rev_pers_read_rev_entity_metadata_service_helper.revPersReadRevEntityMetadata_By_RevEntityGUID_MetadataName_Serv(revEntityGUID, revEntityStatsWrapperNameId);

    if (!revEntityMetadataStatsWrapper || rev_json_functions.revIsEmptyJSONObject(revEntityMetadataStatsWrapper)) {
        let revEntityStatsWrapperMetadata = rev_db_entity_metadata_const_resolver.REV_METADATA_FILLER(revEntityStatsWrapperNameId, revEntityStatsWrapperDefVal);

        let revRetMetadata = await rev_pers_create_metadata_service_helper.promiseToSaveRevEntityMetadataItem(revEntityStatsWrapperMetadata, revEntityGUID);

        if (revRetMetadata.metadataId > 0) {
            revEntityStatsWrapperMetadata._revMetadataEntityGUID = revRetMetadata.metadataId;

            revEntityMetadataStatsWrapper = revEntityStatsWrapperMetadata;
        }
    }

    return revEntityMetadataStatsWrapper;
};

module.exports.REV_ENTITY_STRUCT = REV_ENTITY_STRUCT;

module.exports.revFillEntityPicsAlbum = revFillEntityPicsAlbum;
module.exports.revFillEntityVidsAlbum = revFillEntityVidsAlbum;

module.exports.revFillRevAnnotations_Serv = revFillRevAnnotations_Serv;
module.exports.promiseToFillRevEntity = promiseToFillRevEntity;
module.exports.revGetFlatEntity_Serv = revGetFlatEntity_Serv;
module.exports.revEntityFiller = revEntityFiller;
module.exports.revFilledRevEntity_Serv = revFilledRevEntity_Serv;
module.exports.revFillrevEntityType = revFillrevEntityType;
module.exports.revEntityNonUserFiller = revEntityNonUserFiller;
module.exports.revPersReadRevEntityFiller_BY_RemoteRevEntityGUIDsServ = revPersReadRevEntityFiller_BY_RemoteRevEntityGUIDsServ;

module.exports.revPersReadRevEntityFiller_BY_RemoteRevEntityGUIDsServ_Exempt_Subtypes = revPersReadRevEntityFiller_BY_RemoteRevEntityGUIDsServ_Exempt_Subtypes;
module.exports.revPersReadRevEntities_By_Subtype_Expo_Serv = revPersReadRevEntities_By_Subtype_Expo_Serv;
module.exports.revPersReadRevEntityFiller_BY_ContainerGUID_Exempt_Subtypes_Serv = revPersReadRevEntityFiller_BY_ContainerGUID_Exempt_Subtypes_Serv;
module.exports.revPersReadRevEntityFiller_Exempt_Subtypes_Serv = revPersReadRevEntityFiller_Exempt_Subtypes_Serv;

module.exports.revPersReadFlatEnties_By_OwnerGUID_Subtype_Serv = revPersReadFlatEnties_By_OwnerGUID_Subtype_Serv;

module.exports.revPersReadRevEntities_OF_RevEntityContainerGUID_Expo = revPersReadRevEntities_OF_RevEntityContainerGUID_Expo;
module.exports.revPersReadFilledRevEntities_OF_ContainerGUID_SubType_Serv = revPersReadFilledRevEntities_OF_ContainerGUID_SubType_Serv;
module.exports.revPersReadRevEntities_BY_OWNER_GUID_OR_CONTAINER_GUID_SubTypesArr_Serv = revPersReadRevEntities_BY_OWNER_GUID_OR_CONTAINER_GUID_SubTypesArr_Serv;
module.exports.revPersReadFlatEntities_OF_ContainerGUID_SubTypesArr_Serv = revPersReadFlatEntities_OF_ContainerGUID_SubTypesArr_Serv;
module.exports.revPersReadFlatEnties_By_OwnerGUID_ContainerGUID_Subtype_Serv = revPersReadFlatEnties_By_OwnerGUID_ContainerGUID_Subtype_Serv;
module.exports.revPersReadFlatEntities_By_ContainerGUIDsArr_SubTypesArr_Serv = revPersReadFlatEntities_By_ContainerGUIDsArr_SubTypesArr_Serv;

module.exports.revGetEntityStatsWrapper = revGetEntityStatsWrapper;
