var request = require("request");

const rev_strings_helper_funcs = require("../../../rev_helper_functions/rev_strings_helper_funcs");
const rev_json_functions = require("../../../rev_helper_functions/rev_json_functions");

const revWebSocketServer = require("../../../rev_helper_functions/rev_server_resolver_services/revWebSocketServer");

const rev_cache_session_entity_data_array = require("../../../rev_sessions/rev_cache_session_entity_data_array");
const rev_cache_session_entity_data_object = require("../../../rev_sessions/rev_cache_session_entity_data_object");

const rev_plugins_objects = require("../../../rev_files_i_o/rev_plugins_loaders/rev_plugins_objects");

const rev_pers_save_plugin_form = require("./rev_load_plugin_forms/rev_pers/rev_pers_save_plugin_form");

const rev_read_plugins = require("./rev_plugin_pers/rev_read/rev_read_plugins");
const rev_read_plugin_forms = require("./rev_load_plugin_forms/rev_read/rev_read_plugin_forms");

const rev_pers_lang_code = require("../../../rev_files_i_o/rev_plugins_loaders/rev_plugin_modules_pers/rev_load_plugin_langs/rev_pers/rev_pers_lang_code");
const rev_load_plugin_langs_pers = require("../../../rev_files_i_o/rev_plugins_loaders/rev_plugin_modules_pers/rev_load_plugin_langs/rev_pers/rev_load_plugin_langs_pers");
const rev_read_plugin_object_langs_expo = require("../../../rev_files_i_o/rev_plugins_loaders/rev_plugin_modules_pers/rev_load_plugin_langs/rev_read/rev_read_plugin_object_langs_expo");
const rev_load_plugin_lang_const_resolver = require("../../../rev_files_i_o/rev_plugins_loaders/rev_plugin_modules_pers/rev_load_plugin_langs/rev_read/rev_load_plugin_lang_const_resolver");

const rev_db_entity_const_resolver = require("../../../rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_db_models/rev_db_entity_const_resolver");

const rev_pers_read_rev_entity_info_wrapper = require("../../../rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_pers_lib_read/rev_service_heper/rev_pers_read_rev_entity_info_wrapper");
const rev_pers_read_rev_entity_service_helper = require("../../../rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_pers_lib_read/rev_service_heper/rev_pers_read_rev_entity_service_helper");

const rev_pers_create_rev_entity_service_helper = require("../../../rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_pers_lib_create/rev_pers_create/rev_service_helper/rev_pers_create_rev_entity_service_helper");
const rev_pers_create_contacts_book_service_helper = require("../../../rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_pers_lib_create/rev_pers_create/rev_service_helper/rev_pers_create_contacts_book_service_helper");

const rev_pers_fill_rev_entity_children = require("../../../rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_pers_lib_read/rev_service_heper/rev_pers_fill_rev_entity_children");

const rev_pers_update_rev_entity_serv = require("../../../rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_pers_lib_update/rev_service_heper/rev_pers_update_rev_entity_serv");

const rev_pers_delete_rev_entity_serv = require("../../../rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_pers_lib_delete/rev_service_heper/rev_pers_delete_rev_entity_serv");

const rev_db_rels_const_resolver = require("../../../rev_pers_lib/rev_entity_data/rev_pers_relationships/rev_db_models/rev_db_rels_const_resolver");

const rev_pers_create_rev_entity_rel_service_helper = require("../../../rev_pers_lib/rev_entity_data/rev_pers_relationships/rev_pers_lib_create/rev_pers_create/rev_service_heper/rev_pers_create_rev_entity_rel_service_helper");

const rev_pers_update_rel_resolve_status_service_helper = require("../../../rev_pers_lib/rev_entity_data/rev_pers_relationships/rev_pers_lib_update/rev_resolve_status/rev_service_heper/rev_pers_update_rel_resolve_status_service_helper");

const rev_pers_delete_rels_serv = require("../../../rev_pers_lib/rev_entity_data/rev_pers_relationships/rev_pers_lib_delete/rev_service_heper/rev_pers_delete_rels_serv");

const rev_pers_read_rev_entity_relationship_service_helper = require("../../../rev_pers_lib/rev_entity_data/rev_pers_relationships/rev_pers_lib_read/rev_service_helper/rev_pers_read_rev_entity_relationship_service_helper");

const rev_db_entity_metadata_const_resolver = require("../../../rev_pers_lib/rev_entity_data/rev_pers_metadata/rev_db_models/rev_db_entity_metadata_const_resolver");

const rev_pers_read_rev_entity_metadata_service_helper = require("../../../rev_pers_lib/rev_entity_data/rev_pers_metadata/rev_pers_lib_read/rev_service_helper/rev_pers_read_rev_entity_metadata_service_helper");

const rev_pers_update_rev_entity_metadata_value_serv = require("../../../rev_pers_lib/rev_entity_data/rev_pers_metadata/rev_pers_lib_update/rev_service_helper/rev_pers_update_rev_entity_metadata_value_serv");

const rev_db_entity_annotation_const_resolver = require("../../../rev_pers_lib/rev_entity_data/rev_pers_annotations/rev_db_models/rev_db_entity_annotation_const_resolver");

const rev_pers_create_rev_entity_annotation_service_helper = require("../../../rev_pers_lib/rev_entity_data/rev_pers_annotations/rev_pers_lib_create/rev_pers_create/rev_service_helper/rev_pers_create_rev_entity_annotation_service_helper");

const rev_pers_read_rev_entity_annotations_service_helper = require("../../../rev_pers_lib/rev_entity_data/rev_pers_annotations/rev_pers_lib_read/rev_service_helper/rev_pers_read_rev_entity_annotations_service_helper");

const rev_pers_delete_rev_ann_serv = require("../../../rev_pers_lib/rev_entity_data/rev_pers_annotations/rev_pers_lib_delete/rev_service_heper/rev_pers_delete_rev_ann_serv");

var revLastSelectIndex = 0;

/** START REV ADS */

let revAdsArr = [];

(async () => {
    let revEntityDBRes = await rev_pers_read_rev_entity_service_helper.revPersReadRevEntities_By_Subtype_Serv("rev_ad", 10000);

    for (let i = 0; i < revEntityDBRes.length; i++) {
        await rev_db_entity_const_resolver.revEntityFiller(revEntityDBRes[i], async (revEntity) => {
            let revAdPicsAlbum = await rev_db_entity_const_resolver.revFillEntityPicsAlbum(revEntity._remoteRevEntityGUID);

            if (revAdPicsAlbum) {
                revEntity._revEntityChildrenList.push(revAdPicsAlbum);
            }

            revAdsArr.push(revEntity);
        });
    }
})().then(() => {
    console.log("revAdsArr : " + revAdsArr.length);
});

let revGetAdsBatch = () => {
    let revRetBatch = [];
    let revSkipped = 0;

    let revAdsArrLength = revAdsArr.length;
    let revAdsArrLengthBreak = revAdsArrLength - 1;

    if (revAdsArrLength < 2) {
        return revAdsArr;
    }

    if (!revLastSelectIndex || revLastSelectIndex < 0) {
        revLastSelectIndex = 0;
    }

    for (; revLastSelectIndex < revAdsArrLength; revLastSelectIndex++) {
        let reCurrvAd = revAdsArr[revLastSelectIndex];

        if (!reCurrvAd) {
            continue;
        }

        if (reCurrvAd._revEntityOwnerGUID == 0) {
            revLastSelectIndex++;
            revSkipped++;
            continue;
        }

        revRetBatch.push(reCurrvAd);

        if (revLastSelectIndex == revAdsArrLengthBreak) {
            revLastSelectIndex = 0;
        }

        if (revRetBatch.length == 7) {
            break;
        }
    }

    revLastSelectIndex = revLastSelectIndex - revSkipped;

    return revRetBatch;
};
/** END REV ADS */

var revInitRemoteHookMethods = () => {
    rev_plugins_objects.REV_REMOTE_HOOK_METHODS = {
        "revRequest": request,

        "revGetAdsBatch": revGetAdsBatch,
        /** REV  DB STRUCTS */
        "REV_ENTITY_STRUCT": rev_db_entity_const_resolver.REV_ENTITY_STRUCT,
        "promiseToFillRevEntity": rev_db_entity_const_resolver.promiseToFillRevEntity,

        "REV_ENTITY_METADATA_STRUCT": rev_db_entity_metadata_const_resolver.REV_ENTITY_METADATA_STRUCT,
        "REV_METADATA_FILLER": rev_db_entity_metadata_const_resolver.REV_METADATA_FILLER,
        "revEntityMetadataFillerResolver": rev_db_entity_metadata_const_resolver.revEntityMetadataFillerResolver,
        "revGetMetadataValue": rev_db_entity_metadata_const_resolver.revGetMetadataValue,
        "revGetMetadata_By_Metadata_Name": rev_db_entity_metadata_const_resolver.revGetMetadata_By_Metadata_Name,

        /** REV START HELPER FUNCS */
        "revIsEmptyJSONObject": rev_json_functions.revIsEmptyJSONObject,
        "revJSONArrContains_NameId": rev_json_functions.revJSONArrContains_NameId,
        "revArrIncludesElement": rev_json_functions.revArrIncludesElement,
        "revEntitiesArrIncludesEntityGUID": rev_json_functions.revEntitiesArrIncludesEntityGUID,
        "revCloneJsObject": rev_json_functions.revCloneJsObject,

        "revIsEmptyVar": rev_strings_helper_funcs.revIsEmptyVar,
        /** REV END HELPER FUNCS */

        /** REV START DATA OBJECTS */
        "revCacheDataObjectInit": rev_cache_session_entity_data_object.revCacheDataObjectInit,
        "revGetPluginsObject": rev_cache_session_entity_data_object.revGetPluginsObject,
        "revGetCachedPluginsObjectVals": rev_cache_session_entity_data_object.revGetCachedPluginsObjectVals,
        "revSetCaheDataObjectVals": rev_cache_session_entity_data_object.revSetCaheDataObjectVals,

        // rev cache arrays
        "revCacheDataArrayInit": rev_cache_session_entity_data_array.revCacheDataArrayInit,
        "revGetPluginDataArray": rev_cache_session_entity_data_array.revGetPluginDataArray,
        "revSetCaheArrayDataVals": rev_cache_session_entity_data_array.revSetCaheArrayDataVals,
        "revCaheArrayDataValIndices": rev_cache_session_entity_data_array.revCaheArrayDataValIndices,
        "revSpliceCaheArrayDataVals": rev_cache_session_entity_data_array.revSpliceCaheArrayDataVals,
        /** REV END DATA OBJECTS */

        /** REV START PLUGINS */
        "revGetPluginEntity_By_Plugin_Name": rev_read_plugins.revGetPluginEntity_By_Plugin_Name,
        "revGetPluginFormEntity_By_Plugin_Name": rev_read_plugin_forms.revGetPluginFormEntity_By_Plugin_Name,
        "revGetEntityPlugins": rev_pers_read_rev_entity_info_wrapper.revGetEntityPlugins,
        "revGetAllListedPlugins": rev_plugins_objects.revPluginsObjects.revListedPlugins,
        "revGetLoadedPlugin": rev_plugins_objects.revGetLoadedPlugin,
        "revGetLoadedPluginsNamesArr": rev_plugins_objects.revGetLoadedPluginsNamesArr,

        "revSavePluginForm": rev_pers_save_plugin_form.revSavePluginForm,
        /** REV END PLUGINS */

        /** REV START LANGS */
        "revLangsDetailsArr": rev_plugins_objects.revPluginsObjects.revLangsDetailsArr,
        "revLangTranslations": rev_plugins_objects.revPluginsObjects.revLangs,
        "revPluginLangs": rev_plugins_objects.revPluginsObjects.revPluginLangs,
        "revLangsDefaults": rev_plugins_objects.revPluginsObjects.revLangsDefaults,
        "revCreateNewLangCode": rev_pers_lang_code.revCreateLangCodeEntity,
        "revLoadPluginLangs": rev_load_plugin_langs_pers.revLoadPluginLangs,
        "revGetPluginViewFinalTranslations": rev_read_plugin_object_langs_expo.revGetPluginViewFinalTranslations,
        "revGetPluginViewLangs_By_OwnerGUID": rev_load_plugin_lang_const_resolver.revGetPluginViewLangs_By_OwnerGUID,
        /** REV END LANGS */

        /** */
        "revReadOwnerEntityGUID_By_RevEntityGUID": rev_pers_read_rev_entity_service_helper.revPersReadOwnerEntityGUID_By_RevEntityGUID_Serv,
        /** */

        "revFillEntityPicsAlbum": rev_db_entity_const_resolver.revFillEntityPicsAlbum,
        "revFillEntityVidsAlbum": rev_db_entity_const_resolver.revFillEntityVidsAlbum,

        /** REV START ENTITY STATS */
        "revGetEntityStatsWrapper": rev_db_entity_const_resolver.revGetEntityStatsWrapper,
        /** REV START ENTITY STATS */

        /** REV START SAVE ENTITIES */
        "revSaveRevEntity": rev_pers_create_rev_entity_service_helper.revSaveRevEntityPromise_Serv,
        "createNewRevEntitiesArray": rev_pers_create_rev_entity_service_helper.createNewRevEntitiesArray_Serv,
        "revSaveContactsBook": rev_pers_create_contacts_book_service_helper.revPersSaveContactsBook_Serv,
        "revUserRegistration": rev_pers_create_contacts_book_service_helper.revUserRegistration,
        /** REV END SAVE ENTITIES */

        /** REV START READ ENTITIES */
        "revPersReadRevEntities_By_Subtype": rev_db_entity_const_resolver.revPersReadRevEntities_By_Subtype_Expo_Serv,
        "revCountRevEntities_By_OwnerGuid_SubType": rev_pers_read_rev_entity_service_helper.revCountRevEntities_By_OwnerGuid_SubType_Serv,

        "revGetFilledEntity_By_EntityGUID": rev_pers_read_rev_entity_info_wrapper.revGetFilledEntity_By_EntityGUID_Serv,
        "revGetFilledEntities": rev_pers_read_rev_entity_info_wrapper.revGetFilledEntities_Serv,
        "revGetFlatEntity": rev_db_entity_const_resolver.revGetFlatEntity_Serv,

        "revPersReadRevEntityGUID_By_RevEntityOwnerGUID_Subtype": rev_pers_read_rev_entity_service_helper.revPersReadRevEntityGUID_By_RevEntityOwnerGUID_Subtype_Serv,
        "revPersReadRevEntities_BY_OWNER_GUID_OR_CONTAINER_GUID_SubTypesArr": rev_db_entity_const_resolver.revPersReadRevEntities_BY_OWNER_GUID_OR_CONTAINER_GUID_SubTypesArr_Serv,

        "revPersReadFlatEnties_By_OwnerGUID_Subtype": rev_db_entity_const_resolver.revPersReadFlatEnties_By_OwnerGUID_Subtype_Serv,
        "revPersReadFlatEnties_By_OwnerGUID_ContainerGUID_Subtype": rev_db_entity_const_resolver.revPersReadFlatEnties_By_OwnerGUID_ContainerGUID_Subtype_Serv,

        "revReadRevEntityInfoWrapper_By_RemoteRevEntityGUID": rev_pers_read_rev_entity_info_wrapper.revPersReadRevEntityInfoWrapper_By_RemoteRevEntityGUID,

        "revPersReadRevRelsIdSubjectsContainer_By_TargetGUID_RelID": rev_pers_fill_rev_entity_children.revPersReadRevRelsIdSubjectsContainer_By_TargetGUID_RelID_Serv,
        "revReadEntities_By_TargetGUID_RelId": rev_pers_fill_rev_entity_children.revReadEntities_By_TargetGUID_RelValIdArr_Serv,
        /** REV END READ ENTITIES */

        /** REV START DELETE ENTITIES */
        "revGetEntityChildsDeleteGUIDs": rev_pers_delete_rev_entity_serv.revGetEntityChildsDeleteGUIDs,
        "revDelRevEntity_By_remoteRevEntityGUID": rev_pers_delete_rev_entity_serv.revDelRevEntity_By_remoteRevEntityGUID_Serv,
        /** REV END DELETE ENTITIES */

        /** REV START CONTAINER METHS */
        "revCountRevEntities_By_ContainerGuid_SubType": rev_pers_read_rev_entity_service_helper.revCountRevEntities_By_ContainerGuid_SubType_Serv,

        "revPersReadFilledRevEntities_OF_ContainerGUID_SubType": rev_db_entity_const_resolver.revPersReadFilledRevEntities_OF_ContainerGUID_SubType_Serv,
        "revPersReadFlatEntities_OF_ContainerGUID_SubTypesArr": rev_db_entity_const_resolver.revPersReadFlatEntities_OF_ContainerGUID_SubTypesArr_Serv,
        "revPersReadFlatEntities_By_ContainerGUIDsArr_SubTypesArr": rev_db_entity_const_resolver.revPersReadFlatEntities_By_ContainerGUIDsArr_SubTypesArr_Serv,
        "revPersReadRevEntityFiller_Exempt_Subtypes": rev_db_entity_const_resolver.revPersReadRevEntityFiller_Exempt_Subtypes_Serv,
        "revPersReadEntityFiller_BY_ContainerGUID_Exempt_Subtypes_Serv": rev_db_entity_const_resolver.revPersReadRevEntityFiller_BY_ContainerGUID_Exempt_Subtypes_Serv,
        "revGetTimelineContainerChilds": rev_pers_read_rev_entity_info_wrapper.revGetTimeline_Serv,
        /** REV END CONTAINER METHS */

        /** REV START UPDATE ENTITY DATA */
        "revUpdateRevEntityData_Serv": rev_pers_update_rev_entity_serv.revUpdateRevEntityData_Serv,
        /** REV END UPDATE ENTITY DATA */

        /** REV START RELS */
        "createNewRevEntitiesRelationshipsArrayService": rev_pers_create_rev_entity_rel_service_helper.createNewRevEntitiesRelationshipsArrayService,

        "revGetRelationshipTypeValId": rev_pers_read_rev_entity_relationship_service_helper.revGetRelationshipTypeValId,
        "revGetRelationshipTypeVal": rev_pers_read_rev_entity_relationship_service_helper.revGetRelationshipTypeVal,

        "REV_ENTITY_RELATIONSHIP_STRUCT": rev_db_rels_const_resolver.REV_ENTITY_RELATIONSHIP_STRUCT,
        "revRelExists_By_RevEntityGUIDs_RevRelValId": rev_pers_read_rev_entity_relationship_service_helper.revPersRelExists_By_RevEntityGUIDs_RevRelValId_Serv,

        "revCountRels_By_TargetGUID_RelValId": rev_pers_read_rev_entity_relationship_service_helper.revCountRels_By_TargetGUID_RelValId_Serv,
        "revCountRels_By_SubjectGUID_RelValId": rev_pers_read_rev_entity_relationship_service_helper.revCountRels_By_SubjectGUID_RelValId_Serv,

        "revPersReadAllRevEntityRels_By_RelGUIDs_RevRelIds": rev_pers_read_rev_entity_relationship_service_helper.revPersReadAllRevEntityRels_By_RelGUIDs_RevRelIds_Serv_EXPO,
        "revPersReadAllRevEntityRels_By_ResStatus_RevEntityGUID_RevRelIdsArr": rev_pers_read_rev_entity_relationship_service_helper.revPersReadAllRevEntityRels_By_ResStatus_RevEntityGUID_RevRelIdsArr_EXPO_Serv,

        "revPersReadRevEntityRelTargetGUID_By_SubjectGUID_RevRelId": rev_pers_read_rev_entity_relationship_service_helper.revPersReadRevEntityRelTargetGUID_By_SubjectGUID_RevRelId_Serv,
        "revPersReadRelGUIDS_By_RemoteRevEntityGUID_RelValId": rev_pers_read_rev_entity_relationship_service_helper.revPersReadRevEntityRels_By_RemoteRevEntityGUID_RevRelValId_EXPO_Serv,
        "revPersReadRevRelsSubjects_By_RemoteRevEntityGUID_RelID": rev_pers_read_rev_entity_relationship_service_helper.revPersReadRevRelsSubjects_By_RemoteRevEntityGUID_RelID_Expo_Serv,

        "revPersReadRels_Subjects_Targets_GUIDs_By_RemoteRevEntityGUID_RevRelValId": rev_pers_read_rev_entity_relationship_service_helper.revPersReadRels_Subjects_Targets_GUIDs_By_RemoteRevEntityGUID_RevRelValId_EXPO_serv,
        "revPersReadRevRelsTargetGUIDs_By_RemoteRevEntityGUID_RelID": rev_pers_read_rev_entity_relationship_service_helper.revPersReadRevRelsTargetGUIDs_By_RemoteRevEntityGUID_RelID_Expo_Serv,

        "revPersReadRevEntityRels_By_TargetRevEntityGUID_RelTypeValId": rev_pers_read_rev_entity_relationship_service_helper.revPersReadRevEntityRels_By_TargetRevEntityGUID_Serv,
        /** REV END RELS */

        /** REV START UPDATE RELS */
        "revSetRelResStatus": rev_pers_update_rel_resolve_status_service_helper.revSetRelResStatusServ,
        /** REV START UPDATE RELS */

        /** REV START DEL RELS */
        "revPersDeleteRel_By_revRelId": rev_pers_delete_rels_serv.revPersDeleteRel_By_revRelId_Serv,
        "revPersDeleteRel_By_revRelIdaArr": rev_pers_delete_rels_serv.revPersDeleteRel_By_revRelIdaArr_Serv,
        /** REV END DEL RELS */

        /** REV START METADATA */
        "revMetadataValueExists_By_MetadataName_MetadataValue": rev_pers_read_rev_entity_metadata_service_helper.revPersMetadataValueExists_By_MetadataName_MetadataValue_Serv,
        "revMetadataValsArrFullTextSearch": rev_pers_read_rev_entity_metadata_service_helper.revMetadataValsArrFullTextSearch_Serve,
        "revReadMetadataOwnerGUID_By_UniqueId": rev_pers_read_rev_entity_metadata_service_helper.revPersReadRevEntityMetadataOwnerGUID_By_UniqueId_Serv,
        "revReadUniqueMetadata_By_UniqueValue": rev_pers_read_rev_entity_metadata_service_helper.revPersReadRevEntityMetadata_By_UniqueId_Serv,
        "revPersUpdaterevEntityMetadataValue_By_MetadataId": rev_pers_update_rev_entity_metadata_value_serv.revPersUpdaterevEntityMetadataValue_By_MetadataId_Serv,
        "revReadEntityMetadataArr_By_MetadataName": rev_pers_read_rev_entity_metadata_service_helper.revPersReadRevEntityMetadataArr_By_MetadataName_Serv_EXPO,
        /** REV END METADATA */

        /**REV START ANNS */
        "REV_ENTITY_ANNOTATION_STRUCT": rev_db_entity_annotation_const_resolver.REV_ENTITY_ANNOTATION_STRUCT,

        "revPersSaveRevEntityAnnotation": rev_pers_create_rev_entity_annotation_service_helper.revPersSaveRevEntityAnnotation_Serv,

        "revCountRevEntyAnn_By_Entity_GUID_Ann_Val": rev_pers_read_rev_entity_annotations_service_helper.revPersCountRevEntyAnn_By_Entity_GUID_Ann_Val_Serv,
        "revPersReadAnnEntityGUIDs_By_AnnId_OwnerEntityGUID": rev_pers_read_rev_entity_annotations_service_helper.revPersReadAnnEntityGUIDs_By_AnnId_OwnerEntityGUID_serv,
        "revPersReadAnns_By_AnnId_OwnerEntityGUID": rev_pers_read_rev_entity_annotations_service_helper.revPersReadAnns_By_AnnId_OwnerEntityGUID_Serv_EXPO,
        /**REV END ANNS */

        /** REV START DEL ANN */
        "revPersDeleteAnn_By_AnnId_Multi": rev_pers_delete_rev_ann_serv.revPersDeleteAnn_By_AnnId_Multi_Serv,

        /** REV WEB SOCKET SERV */
        "revSendToLiveEntities": revWebSocketServer.revSendToLiveEntities_Serv,
        "revSendToLiveEntities_Serv": revWebSocketServer.revSendToLiveEntities_Serv,

        "revTestMeth": async (retData) => {
            console.log("REV TEST METHOD CALLED");
            return retData;
        },
    };
};

var revRemoteHookMethods = () => {
    return rev_plugins_objects.REV_REMOTE_HOOK_METHODS;
};

var revLoadRemoteEnvMethod = (revVarArgs) => {
    let revEnvFunc = revVarArgs.revEnvFunc;

    let revNameID = revEnvFunc.revNameID;
    let revFunc = revEnvFunc.revFunc;

    revRemoteHookMethods()[revNameID] = revFunc;
};

module.exports.revInitRemoteHookMethods = revInitRemoteHookMethods;
module.exports.revRemoteHookMethods = revRemoteHookMethods;
module.exports.revLoadRemoteEnvMethod = revLoadRemoteEnvMethod;
module.exports.revAdsArr = revAdsArr;
