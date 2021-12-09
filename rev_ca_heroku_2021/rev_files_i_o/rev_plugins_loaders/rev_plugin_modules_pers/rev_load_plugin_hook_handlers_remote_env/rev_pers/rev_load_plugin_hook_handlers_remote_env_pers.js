const rev_remote_plugin_hooks_env_const_resolver = require("../rev_read/rev_remote_plugin_hooks_env_const_resolver");

const rev_json_functions = require("../../../../../rev_helper_functions/rev_json_functions");

const rev_plugins_objects = require("../../../rev_plugins_objects");

const rev_pers_create_rev_entity_service_helper = require("../../../../../rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_pers_lib_create/rev_pers_create/rev_service_helper/rev_pers_create_rev_entity_service_helper");

const rev_db_entity_const_resolver = require("../../../../../rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_db_models/rev_db_entity_const_resolver");

const rev_db_entity_metadata_const_resolver = require("../../../../../rev_pers_lib/rev_entity_data/rev_pers_metadata/rev_db_models/rev_db_entity_metadata_const_resolver");
const rev_pers_read_rev_entity_metadata_service_helper = require("../../../../../rev_pers_lib/rev_entity_data/rev_pers_metadata/rev_pers_lib_read/rev_service_helper/rev_pers_read_rev_entity_metadata_service_helper");

const rev_db_rels_const_resolver = require("../../../../../rev_pers_lib/rev_entity_data/rev_pers_relationships/rev_db_models/rev_db_rels_const_resolver");

const rev_plugin_init = require("../../rev_plugin_init");

var revLoadRemotePluginHooks = async (revPlugin, revPluginContainerEntity, REV_REMOTE_HOOK_METHODS) => {
    let revPluginsObjects = rev_plugins_objects.revPluginsObjects;

    if (!revPlugin.revPluginName) {
        return;
    }

    let revPluginName = revPlugin.revPluginName;

    if (!revPluginsObjects.revLoadedPlugins[revPluginName].hasOwnProperty("revPluginHookHandlersRemoteEnvironment")) {
        revPluginsObjects.revLoadedPlugins[revPluginName]["revPluginHookHandlersRemoteEnvironment"] = [];
    }

    let revRemotePluginHookEntitiesArr = [];

    if (revPlugin.revPluginHookHandlersRemoteEnvironment && revPlugin.revPluginHookHandlersRemoteEnvironment.length > 0) {
        for (let i = 0; i < revPlugin.revPluginHookHandlersRemoteEnvironment.length; i++) {
            let revCurrPluginHookHandlerRemoteEnvironment = revPlugin.revPluginHookHandlersRemoteEnvironment[i];

            if (!revCurrPluginHookHandlerRemoteEnvironment) {
                continue;
            }

            if (revCurrPluginHookHandlerRemoteEnvironment.revNameID) {
                let revNameID = revCurrPluginHookHandlerRemoteEnvironment.revNameID;
                let revHandler = revCurrPluginHookHandlerRemoteEnvironment.revHandler;

                if (!revNameID || !revHandler) {
                    continue;
                }

                /** REV START CHECK IF ADDED */
                if (REV_REMOTE_HOOK_METHODS.hasOwnProperty(revNameID)) {
                    continue;
                }
                /** REV END CHECK IF ADDED */

                let revCurr = {
                    revNameID: revNameID,
                    revHandler: revHandler,
                };

                revPluginsObjects.revLoadedPlugins[revPluginName].revPluginHookHandlersRemoteEnvironment.push(revCurr);

                let revPluginHookGUID = await rev_pers_read_rev_entity_metadata_service_helper.revPersMetadataValueExists_By_MetadataName_MetadataValue_Serv("rev_plugin_hook_remote_env_name", revNameID);

                let revPersRemotePluginHookEnvEntity;

                if (revPluginHookGUID < 1) {
                    revPersRemotePluginHookEnvEntity = rev_db_entity_const_resolver.REV_ENTITY_STRUCT();
                    revPersRemotePluginHookEnvEntity._revEntityResolveStatus = -1;
                    revPersRemotePluginHookEnvEntity._revEntityChildableStatus = 1;
                    revPersRemotePluginHookEnvEntity._revEntityType = "rev_object";
                    revPersRemotePluginHookEnvEntity._revEntitySubType = "rev_plugin_hook_remote_env";
                    revPersRemotePluginHookEnvEntity._remoteRevEntityGUID = -1;
                    revPersRemotePluginHookEnvEntity._revEntityOwnerGUID = 1;
                    revPersRemotePluginHookEnvEntity._revEntityContainerGUID = -1;
                    revPersRemotePluginHookEnvEntity._revTimeCreated = new Date().getTime();

                    let revPersRemotePluginHookEnvInfoEntity = rev_db_entity_const_resolver.REV_ENTITY_STRUCT();
                    revPersRemotePluginHookEnvInfoEntity._revEntityResolveStatus = -1;
                    revPersRemotePluginHookEnvInfoEntity._revEntityChildableStatus = 1;
                    revPersRemotePluginHookEnvInfoEntity._revEntityType = "rev_object";
                    revPersRemotePluginHookEnvInfoEntity._revEntitySubType = "rev_entity_info";

                    revPersRemotePluginHookEnvInfoEntity._revEntityMetadataList.push(rev_db_entity_metadata_const_resolver.REV_METADATA_FILLER("rev_plugin_hook_remote_env_name", revNameID));
                    revPersRemotePluginHookEnvInfoEntity._revEntityMetadataList.push(rev_db_entity_metadata_const_resolver.REV_METADATA_FILLER("rev_handler", revHandler));

                    revPersRemotePluginHookEnvEntity._revInfoEntity = revPersRemotePluginHookEnvInfoEntity;

                    let revPluginHookEnvRel = rev_db_rels_const_resolver.REV_ENTITY_RELATIONSHIP_STRUCT();
                    revPluginHookEnvRel._revResolveStatus = -101;
                    revPluginHookEnvRel._revEntityRelationshipType = "rev_plugin_hook_remote_env_of";
                    revPluginHookEnvRel._remoteRevEntityTargetGUID = revPluginContainerEntity._remoteRevEntityGUID;
                    revPluginHookEnvRel._remoteRevEntitySubjectGUID = revPersRemotePluginHookEnvEntity._remoteRevEntityGUID;

                    revPersRemotePluginHookEnvEntity._revSubjectEntityRelationships.push(revPluginHookEnvRel);

                    let revPersRemotePluginHookEnvEntityRetArr = await rev_pers_create_rev_entity_service_helper.createNewRevEntitiesArray_Serv([revPersRemotePluginHookEnvEntity]);
                    revPersRemotePluginHookEnvEntity._remoteRevEntityGUID = revPersRemotePluginHookEnvEntityRetArr.filter[0]._remoteRevEntityGUID;
                } else {
                    revPersRemotePluginHookEnvEntity = await rev_db_entity_const_resolver.revGetFlatEntity_Serv(revPluginHookGUID);
                }

                let revSavedRemotePluginHookEnvHandler = rev_remote_plugin_hooks_env_const_resolver.revRemotePluginHookEnvConstructor(revPersRemotePluginHookEnvEntity);

                if (!rev_json_functions.revIsEmptyJSONObject(revSavedRemotePluginHookEnvHandler)) {
                    let revFuncString = revSavedRemotePluginHookEnvHandler.revHandler;

                    let revFuncBody = revFuncString.slice(revFuncString.indexOf("{") + 1, revFuncString.lastIndexOf("}"));

                    let AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

                    rev_plugin_init.revLoadRemoteEnvMethod({ "revEnvFunc": { "revNameID": revNameID, "revFunc": new AsyncFunction("revVarArgs", revFuncBody) } });
                }

                revRemotePluginHookEntitiesArr.push(revPersRemotePluginHookEnvEntity);
            }
        }
    }

    return revRemotePluginHookEntitiesArr;
};

module.exports.revLoadRemotePluginHooks = revLoadRemotePluginHooks;
