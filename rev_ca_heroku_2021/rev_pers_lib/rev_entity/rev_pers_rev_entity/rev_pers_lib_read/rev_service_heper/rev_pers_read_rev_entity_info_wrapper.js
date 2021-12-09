const rev_json_functions = require("../../../../../rev_helper_functions/rev_json_functions");

const rev_pers_read_rev_entity_service_helper = require("./rev_pers_read_rev_entity_service_helper");
const rev_db_entity_const_resolver = require("../../rev_db_models/rev_db_entity_const_resolver");
const rev_pers_read_rev_entity_relationship_service_helper = require("../../../../rev_entity_data/rev_pers_relationships/rev_pers_lib_read/rev_service_helper/rev_pers_read_rev_entity_relationship_service_helper");
const rev_db_rels_const_resolver = require("../../../../rev_entity_data/rev_pers_relationships/rev_db_models/rev_db_rels_const_resolver");

const rev_load_plugins = require("../../../../../rev_files_i_o/rev_plugins_loaders/rev_load_plugins");

/**
 * User Info + User Social Info + Profile photo album + Connections + Spaces + Timeline
 */

var revGetMetadataVal = (revMetadataList, revMetadataName) => {
    let revMetadataVal;
    for (let i = 0; i < revMetadataList.length; i++) {
        let revMetadata = revMetadataList[i];

        if (revMetadataName.localeCompare(revMetadata._revMetadataName) == 0) revMetadataVal = revMetadata._metadataValue;
    }

    return revMetadataVal;
};

var revConnectionGUIDs = [];
var revEntityRelsArr = [];

var getRevEntitySocialInfo_Serv = async (revEntityGUID) => {
    let revSocialInfoEntityDBRes = await rev_pers_read_rev_entity_service_helper.revPersReadRevEntity_By_RevEntityOwnerGUID_SubtypeServ(revEntityGUID, "rev_entity_social_info");

    if (rev_json_functions.revIsEmptyJSONObject(revSocialInfoEntityDBRes)) {
        return {};
    }

    let revSocialInfoEntity = await rev_db_entity_const_resolver.revFillrevEntityType(revSocialInfoEntityDBRes);

    if (revSocialInfoEntity != null && Object.keys(revSocialInfoEntity).length) {
        return revSocialInfoEntity;
    }

    return null;
};

var getRevEntityConnections_serv = async (revEntityGUID, revRelTypeValId) => {
    var revEntityConnections = [];
    let revEntityConnRelGuids = await rev_pers_read_rev_entity_relationship_service_helper.revPersReadRevEntityRels_Subjects_Targets_By_RemoteRevEntityGUID_RevRelValId_serv(revEntityGUID, revRelTypeValId);

    for (let i = 0; i < revEntityConnRelGuids.filter.length; i++) {
        let revConnection = {
            revConnectionEntity: {},
        };

        let revItem = revEntityConnRelGuids.filter[i];

        let revSubjectGUID = revItem.SUBJECT_GUID;
        let revTargetGUID = revItem.TARGET_GUID;

        let revRelGUID = revSubjectGUID == revEntityGUID ? revTargetGUID : revSubjectGUID;

        if (!revConnectionGUIDs.includes(revRelGUID)) {
            revConnectionGUIDs.push(revRelGUID);
        }

        let revEntityDBRes = await rev_pers_read_rev_entity_service_helper.promiseToReadRevEntityByRemoteRevEntityGUID(revRelGUID);
        revConnection.revConnectionEntity = await rev_db_entity_const_resolver.revFillrevEntityType(revEntityDBRes);

        revEntityConnections.push({ [revRelGUID]: revConnection });
    }

    return revEntityConnections;
};

var revGetFilledEntity_By_EntityGUID_Serv = async (revEntityGUID) => {
    if (!revEntityGUID && revEntityGUID < 1) {
        return null;
    }

    let revEntityDBRes = await rev_pers_read_rev_entity_service_helper.promiseToReadRevEntityByRemoteRevEntityGUID(revEntityGUID);
    let revEntity = await rev_db_entity_const_resolver.revFillrevEntityType(revEntityDBRes);

    return revEntity;
};

var revGetFilledEntities_Serv = async (remoteRevEntityGUIDs, revVarArgs) => {
    let revEntitiesArr = [];

    if (!Array.isArray(remoteRevEntityGUIDs) || remoteRevEntityGUIDs.length < 1) {
        return revEntitiesArr;
    }

    let revEntitiesDBResArr;

    if (!rev_json_functions.revIsEmptyJSONObject(revVarArgs)) {
        revEntitiesDBResArr = await rev_pers_read_rev_entity_service_helper.revPersReadRevEntities_BY_RemoteRevEntityGUIDs_SubTypesArr_Serv(remoteRevEntityGUIDs, revVarArgs);
    } else {
        revEntitiesDBResArr = await rev_pers_read_rev_entity_service_helper.revPersReadRevEntities_BY_RemoteRevEntityGUIDs_Serv(remoteRevEntityGUIDs);
    }

    let revAddedEntitiesDBResGUIDsArr = [];

    for (let i = 0; i < revEntitiesDBResArr.length; i++) {
        if (rev_json_functions.revArrIncludesElement(revAddedEntitiesDBResGUIDsArr, revEntitiesDBResArr[i].REMOTE_REV_ENTITY_GUID)) {
            continue;
        }

        let revEntity = await rev_db_entity_const_resolver.revFillrevEntityType(revEntitiesDBResArr[i]);

        if (revEntity) {
            revEntitiesArr.push(revEntity);
            revAddedEntitiesDBResGUIDsArr.push(revEntity._remoteRevEntityGUID);
        }
    }

    return revEntitiesArr;
};

var revGetEntitySpaceSubscriptionsArr = async (revEntityGUID) => {
    let revEntitySpaceSubscriptionsArr = await rev_pers_read_rev_entity_relationship_service_helper.revPersReadRevEntityRels_By_RemoteRevEntityGUID_RevRelValId_Serv(revEntityGUID, 7);

    for (let i = 0; i < revEntitySpaceSubscriptionsArr.length; i++) {
        revEntityRelsArr.push(rev_db_rels_const_resolver.revFillRevRel(revEntitySpaceSubscriptionsArr[i]));
    }

    let revSubscriptionEntitiesArr = [];

    await revEntitySpaceSubscriptionsArr.reduce((previousPromise, nextId) => {
        return previousPromise.then(() => {
            return new Promise(async (resolve, reject) => {
                let revEntityDBRes = await rev_pers_read_rev_entity_service_helper.promiseToReadRevEntityByRemoteRevEntityGUID(nextId.TARGET_GUID);
                let revSubscriptionEntity = await rev_db_entity_const_resolver.revFillrevEntityType(revEntityDBRes);
                revSubscriptionEntitiesArr.push(revSubscriptionEntity);
                resolve();
            });
        });
    }, Promise.resolve());

    return revSubscriptionEntitiesArr;
};

var revGetTimeline_Serv = async (revContainerGUID) => {
    let revTimelineEntities = await rev_db_entity_const_resolver.revPersReadRevEntityFiller_BY_ContainerGUID_Exempt_Subtypes_Serv(revContainerGUID, [
        "rev_timeline",
        "rev_noticias",
        "rev_file",
        "rev_entity_info",
        "rev_entity_social_info",
        // "rev_comment",
        "rev_entity_language",
    ]);

    return revTimelineEntities;
};

var revGetRevConnRels = async (revEntityGUID) => {
    let revRelsDBRes = await rev_pers_read_rev_entity_relationship_service_helper.revPersReadAllRevEntityRels_By_ResStatus_RevEntityGUID_RevRelId_Serv([-1, 0, 1, 2], revEntityGUID, [5, 7]);

    let revRels = [];

    for (let i = 0; i < revRelsDBRes.length; i++) {
        revRels.push(rev_db_rels_const_resolver.revFillRevRel(revRelsDBRes[i]));
    }

    return revRels;
};

var revGetEntityPlugins = async (revContainerGUID) => {
    let revEntityPlugins = [];

    let revPassVarArgs = {
        "revEntityContainerGUID": revContainerGUID,
        "revEntitySubtype": "rev_user_installed_plugin",
    };

    let revEntityPluginsArr = await rev_pers_read_rev_entity_service_helper.revPersReadEntities_By_ContainerGUID_SubType_Serv(revPassVarArgs);

    let revAddedPluginNamesArr = [];

    for (let i = 0; i < revEntityPluginsArr.length; i++) {
        let revFilledEntityPlugin = await rev_db_entity_const_resolver.revFillrevEntityType(revEntityPluginsArr[i]);

        let revPluginName = revGetMetadataVal(revFilledEntityPlugin._revEntityMetadataList, "rev_plugin_name_value");

        if (revAddedPluginNamesArr.includes(revPluginName)) {
            continue;
        } else {
            revAddedPluginNamesArr.push(revPluginName);
        }

        revFilledEntityPlugin["revPluginHookHandlers"] = rev_load_plugins.revGetPluginHookHandlers(revPluginName);

        revEntityPlugins.push(revFilledEntityPlugin);
    }

    return revEntityPlugins;
};

var revPersReadRevEntityInfoWrapper_By_RemoteRevEntityGUID = async (revVarArgs) => {
    revConnectionGUIDs = [];

    var filterRevRetArr = {
        revEntity: {},
        revEntityRelationships: [],
        revEntitySocialInfo: {},
        revEntityConnections: [],
        // revTimelineEntities: [],
        // revEntityContainersArr: [],
        // revEntityPublishersArr: [],
        revEntitySubscriptionEntitiesArr: [],
        revConnectionRels: [],
        revEntityPlugins: [],
    };

    if (!revVarArgs.rev_requested_entity_guid || revVarArgs.rev_requested_entity_guid < 1) return null;

    let revRequestedEntityGUID = revVarArgs.rev_requested_entity_guid;

    let revLoggedInEntityGUID = -1;

    if (revVarArgs.rev_logged_in_entity_guid) revLoggedInEntityGUID = revVarArgs.rev_logged_in_entity_guid;

    let revRelValIdsArr = [];

    if (revVarArgs.rev_rel_val_ids && (typeof revVarArgs.rev_rel_val_ids).localeCompare("string") == 0) revRelValIdsArr = revVarArgs.rev_rel_val_ids.split(",");

    if (!revLoggedInEntityGUID) revLoggedInEntityGUID = -1;

    let revEntityDBRes = await rev_pers_read_rev_entity_service_helper.promiseToReadRevEntityByRemoteRevEntityGUID(revRequestedEntityGUID);

    filterRevRetArr["revEntity"] = await rev_db_entity_const_resolver.revFillrevEntityType(revEntityDBRes);

    let revRelsDBResArr;

    if (revRelValIdsArr.length > 0) {
        revRelsDBResArr = await rev_pers_read_rev_entity_relationship_service_helper.revPersReadAllRevEntityRels_By_RelGUIDs_RevRelIds_Serv([revLoggedInEntityGUID, revRequestedEntityGUID], revRelValIdsArr);

        if (revRelsDBResArr) {
            for (let i = 0; i < revRelsDBResArr.length; i++) {
                filterRevRetArr["revEntityRelationships"].push(rev_db_rels_const_resolver.revFillRevRel(revRelsDBResArr[i]));
            }
        }
    }

    filterRevRetArr["revEntitySocialInfo"] = await getRevEntitySocialInfo_Serv(revRequestedEntityGUID);
    filterRevRetArr["revEntityConnections"] = await getRevEntityConnections_serv(revRequestedEntityGUID, 5);

    revConnectionGUIDs.push(revRequestedEntityGUID);
    // filterRevRetArr["revTimelineEntities"] = await revGetTimeline_Serv(revRequestedEntityGUID);
    // filterRevRetArr["revEntityContainersArr"] = await revGetContainersArr_Serv(filterRevRetArr.revTimelineEntities);
    filterRevRetArr["revEntitySubscriptionEntitiesArr"] = await revGetEntitySpaceSubscriptionsArr(revRequestedEntityGUID);

    let revGetRevConnRelsArr = await revGetRevConnRels(revRequestedEntityGUID);
    revEntityRelsArr.push.apply(revEntityRelsArr, revGetRevConnRelsArr);

    filterRevRetArr["revConnectionRels"] = revEntityRelsArr;

    filterRevRetArr["revEntityPlugins"] = await revGetEntityPlugins(revRequestedEntityGUID);

    return filterRevRetArr;
};

module.exports.revGetFilledEntity_By_EntityGUID_Serv = revGetFilledEntity_By_EntityGUID_Serv;
module.exports.revGetFilledEntities_Serv = revGetFilledEntities_Serv;
module.exports.getRevEntitySocialInfo_Serv = getRevEntitySocialInfo_Serv;
module.exports.revGetTimeline_Serv = revGetTimeline_Serv;
module.exports.getRevEntityConnections_serv = getRevEntityConnections_serv;
module.exports.revPersReadRevEntityInfoWrapper_By_RemoteRevEntityGUID = revPersReadRevEntityInfoWrapper_By_RemoteRevEntityGUID;

module.exports.revGetEntityPlugins = revGetEntityPlugins;
