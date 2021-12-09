const rev_plugin_loaders_helper_funcs = require("../../rev_plugin_loaders_helper_funcs");

const rev_plugins_objects = require("../../../rev_plugins_objects");

const rev_plugin_hooks_const_resolver = require("../rev_read/rev_plugin_hooks_const_resolver");

const rev_json_functions = require("../../../../../rev_helper_functions/rev_json_functions");

const rev_pers_create_rev_entity_service_helper = require("../../../../../rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_pers_lib_create/rev_pers_create/rev_service_helper/rev_pers_create_rev_entity_service_helper");

const rev_db_entity_const_resolver = require("../../../../../rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_db_models/rev_db_entity_const_resolver");

const rev_db_entity_metadata_const_resolver = require("../../../../../rev_pers_lib/rev_entity_data/rev_pers_metadata/rev_db_models/rev_db_entity_metadata_const_resolver");
const rev_pers_read_rev_entity_metadata_service_helper = require("../../../../../rev_pers_lib/rev_entity_data/rev_pers_metadata/rev_pers_lib_read/rev_service_helper/rev_pers_read_rev_entity_metadata_service_helper");

const rev_db_rels_const_resolver = require("../../../../../rev_pers_lib/rev_entity_data/rev_pers_relationships/rev_db_models/rev_db_rels_const_resolver");

var revLoadPluginHooks = async (revPlugin, revPluginContainerEntity) => {
    let revPluginHookEntitiesArr = [];

    let revPluginsObjects = rev_plugins_objects.revPluginsObjects;

    if (revPlugin.revPluginHookHandlers && revPlugin.revPluginHookHandlers.length > 0) {
        let revAddedHooks = [];

        let revPluginName = revPlugin.revPluginName;

        if (!revPluginName) {
            return;
        }

        if (!revPluginsObjects.revLoadedPlugins[revPluginName].hasOwnProperty("revPluginHookHandlers")) {
            revPluginsObjects.revLoadedPlugins[revPluginName]["revPluginHookHandlers"] = [];
        }

        for (let i = 0; i < revPlugin.revPluginHookHandlers.length; i++) {
            let revPluginHookHandler = revPlugin.revPluginHookHandlers[i];

            if (!revPluginHookHandler) {
                continue;
            }

            if (revPluginHookHandler.revNameID && revPluginHookHandler.revPluginHookName) {
                let revPluginHookName = revPluginHookHandler.revPluginHookName;
                let revNameID = revPluginHookHandler.revNameID;
                let revHandler = revPluginHookHandler.revHandler;

                let revPluginHookHandlersContainerAdded = revPluginsObjects.revPluginHookHandlers.some((item) => {
                    return item.revPluginHookName == revPluginHookName;
                });

                let revCurrPluginHookHandler = {
                    "revPluginHookName": revPluginHookName,
                    "revNameID": revNameID,
                    "revHandler": revHandler,
                };

                revPluginsObjects.revLoadedPlugins[revPluginName].revPluginHookHandlers.push(revCurrPluginHookHandler);

                if (!revPluginHookHandlersContainerAdded) {
                    revPluginsObjects.revPluginHookHandlers.push({ "revPluginName": revPluginName, "revPluginHookName": revPluginHookName, "revPluginHookHandlersArr": [] });
                }

                if (!revAddedHooks.includes(revNameID)) {
                    for (let c = 0; c < revPluginsObjects.revPluginHookHandlers.length; c++) {
                        let revAddedPluginHookHandlersContainer = revPluginsObjects.revPluginHookHandlers[c];

                        let revCurrPluginHookName = revAddedPluginHookHandlersContainer.revPluginHookName;

                        if (revCurrPluginHookName.localeCompare(revPluginHookName) == 0) {
                            let revPluginHookHandlersArr = revAddedPluginHookHandlersContainer.revPluginHookHandlersArr;

                            if (rev_plugin_loaders_helper_funcs.revIsNameIdAdded(revPluginHookHandlersArr, revNameID)) {
                                continue;
                            }

                            if (revPluginHookName && revNameID) {
                                let revPluginHookGUID = await rev_pers_read_rev_entity_metadata_service_helper.revPersMetadataValueExists_By_MetadataName_MetadataValue_Serv("rev_plugin_hook_name", revPluginHookName);

                                let revPersPluginHookEntity;

                                if (revPluginHookGUID < 1) {
                                    revPersPluginHookEntity = rev_db_entity_const_resolver.REV_ENTITY_STRUCT();
                                    revPersPluginHookEntity._revEntityResolveStatus = -1;
                                    revPersPluginHookEntity._revEntityChildableStatus = 1;
                                    revPersPluginHookEntity._revEntityType = "rev_object";
                                    revPersPluginHookEntity._revEntitySubType = "rev_plugin_hook";
                                    revPersPluginHookEntity._remoteRevEntityGUID = -1;
                                    revPersPluginHookEntity._revEntityOwnerGUID = 1;
                                    revPersPluginHookEntity._revEntityContainerGUID = -1;
                                    revPersPluginHookEntity._revTimeCreated = new Date().getTime();

                                    let revPersPluginHookInfoEntity = rev_db_entity_const_resolver.REV_ENTITY_STRUCT();
                                    revPersPluginHookInfoEntity._revEntityResolveStatus = -1;
                                    revPersPluginHookInfoEntity._revEntityChildableStatus = 1;
                                    revPersPluginHookInfoEntity._revEntityType = "rev_object";
                                    revPersPluginHookInfoEntity._revEntitySubType = "rev_entity_info";

                                    revPersPluginHookInfoEntity._revEntityMetadataList.push(rev_db_entity_metadata_const_resolver.REV_METADATA_FILLER("rev_plugin_hook_name", revPluginHookName));
                                    revPersPluginHookInfoEntity._revEntityMetadataList.push(rev_db_entity_metadata_const_resolver.REV_METADATA_FILLER("rev_name_id", revNameID));
                                    revPersPluginHookInfoEntity._revEntityMetadataList.push(rev_db_entity_metadata_const_resolver.REV_METADATA_FILLER("rev_handler", revHandler));

                                    revPersPluginHookEntity._revInfoEntity = revPersPluginHookInfoEntity;

                                    let revPluginHookRel = rev_db_rels_const_resolver.REV_ENTITY_RELATIONSHIP_STRUCT();
                                    revPluginHookRel._revResolveStatus = -101;
                                    revPluginHookRel._revEntityRelationshipType = "rev_plugin_hook_of";
                                    revPluginHookRel._remoteRevEntityTargetGUID = revPluginContainerEntity._remoteRevEntityGUID;
                                    revPluginHookRel._remoteRevEntitySubjectGUID = revPersPluginHookEntity._remoteRevEntityGUID;

                                    revPersPluginHookEntity._revSubjectEntityRelationships.push(revPluginHookRel);

                                    let revPersPluginHookEntityRetArr = await rev_pers_create_rev_entity_service_helper.createNewRevEntitiesArray_Serv([revPersPluginHookEntity]);
                                    revPersPluginHookEntity._remoteRevEntityGUID = revPersPluginHookEntityRetArr.filter[0]._remoteRevEntityGUID;
                                } else {
                                    revPersPluginHookEntity = await rev_db_entity_const_resolver.revGetFlatEntity_Serv(revPluginHookGUID);
                                }

                                let revSavedPluginHookHandler = rev_plugin_hooks_const_resolver.revPluginHookConstructor(revPersPluginHookEntity);

                                if (!rev_json_functions.revIsEmptyJSONObject(revSavedPluginHookHandler)) {
                                    revPluginsObjects.revPluginHookHandlers[c].revPluginHookHandlersArr.push(revSavedPluginHookHandler);

                                    revAddedHooks.push(revNameID);
                                }

                                revPluginHookEntitiesArr.push(revPersPluginHookEntity);
                            }
                        }
                    }
                }
            }
        }
    }

    return revPluginHookEntitiesArr;
};

module.exports.revLoadPluginHooks = revLoadPluginHooks;
