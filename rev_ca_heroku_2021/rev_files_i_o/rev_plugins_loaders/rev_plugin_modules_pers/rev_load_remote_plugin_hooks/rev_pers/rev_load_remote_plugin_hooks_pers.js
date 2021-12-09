const rev_plugin_loaders_helper_funcs = require("../../rev_plugin_loaders_helper_funcs");
const rev_strings_helper_funcs = require("../../../../../rev_helper_functions/rev_strings_helper_funcs");

const rev_plugins_objects = require("../../../rev_plugins_objects");

const rev_remote_plugin_hooks_const_resolver = require("../rev_read/rev_remote_plugin_hooks_const_resolver");

const rev_json_functions = require("../../../../../rev_helper_functions/rev_json_functions");

const rev_pers_create_rev_entity_service_helper = require("../../../../../rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_pers_lib_create/rev_pers_create/rev_service_helper/rev_pers_create_rev_entity_service_helper");

const rev_db_entity_const_resolver = require("../../../../../rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_db_models/rev_db_entity_const_resolver");

const rev_db_entity_metadata_const_resolver = require("../../../../../rev_pers_lib/rev_entity_data/rev_pers_metadata/rev_db_models/rev_db_entity_metadata_const_resolver");
const rev_pers_read_rev_entity_metadata_service_helper = require("../../../../../rev_pers_lib/rev_entity_data/rev_pers_metadata/rev_pers_lib_read/rev_service_helper/rev_pers_read_rev_entity_metadata_service_helper");

const rev_db_rels_const_resolver = require("../../../../../rev_pers_lib/rev_entity_data/rev_pers_relationships/rev_db_models/rev_db_rels_const_resolver");

var revLoadRemotePluginHooks = async (revPlugin, revPluginContainerEntity) => {
    if (!revPlugin.revPluginName) {
        return;
    }

    let revPluginName = revPlugin.revPluginName;

    let revRemotePluginHookEntitiesArr = [];

    let revPluginsObjects = rev_plugins_objects.revPluginsObjects;

    if (!revPluginsObjects.revLoadedPlugins[revPluginName].hasOwnProperty("revPluginHookHandlersRemote")) {
        revPluginsObjects.revLoadedPlugins[revPluginName]["revPluginHookHandlersRemote"] = [];
    }

    if (revPlugin.revPluginHookHandlersRemote && revPlugin.revPluginHookHandlersRemote.length > 0) {
        for (let i = 0; i < revPlugin.revPluginHookHandlersRemote.length; i++) {
            let revPluginHookHandlersRemote = revPlugin.revPluginHookHandlersRemote[i];

            if (!revPluginHookHandlersRemote) {
                continue;
            }

            if (revPluginHookHandlersRemote.revNameID) {
                let revNameID = revPluginHookHandlersRemote.revNameID;
                let revPluginHookContextRemote = revPluginHookHandlersRemote.revPluginHookContextRemote;
                let revHandler = revPluginHookHandlersRemote.revHandler;

                if (!revNameID || !revPluginHookContextRemote || !revHandler) {
                    continue;
                }

                let revCurrPluginHookHandlersRemote = {
                    revNameID: revNameID,
                    revPluginHookContextRemote: revPluginHookContextRemote,
                    revHandler: revHandler,
                };

                revPluginsObjects.revLoadedPlugins[revPluginName].revPluginHookHandlersRemote.push(revCurrPluginHookHandlersRemote);

                if (!revPluginsObjects.revPluginHookContextRemoteContainers.hasOwnProperty(revPluginHookContextRemote)) {
                    revPluginsObjects.revPluginHookContextRemoteContainers[revPluginHookContextRemote] = [];
                }

                let revPluginHookContextRemoteContainer = revPluginsObjects.revPluginHookContextRemoteContainers[revPluginHookContextRemote];

                /** REV START CHECK IF ADDED */
                if (rev_plugin_loaders_helper_funcs.revIsNameIdAdded(revPluginHookContextRemoteContainer, revNameID)) {
                    continue;
                }
                /** REV END CHECK IF ADDED */

                let revPluginHookGUID = await rev_pers_read_rev_entity_metadata_service_helper.revPersMetadataValueExists_By_MetadataName_MetadataValue_Serv("rev_remote_plugin_hook_name", revNameID);

                let revPersRemotePluginHookEntity;

                if (revPluginHookGUID < 1) {
                    revPersRemotePluginHookEntity = rev_db_entity_const_resolver.REV_ENTITY_STRUCT();
                    revPersRemotePluginHookEntity._revEntityResolveStatus = -1;
                    revPersRemotePluginHookEntity._revEntityChildableStatus = 1;
                    revPersRemotePluginHookEntity._revEntityType = "rev_object";
                    revPersRemotePluginHookEntity._revEntitySubType = "rev_remote_plugin_hook";
                    revPersRemotePluginHookEntity._remoteRevEntityGUID = -1;
                    revPersRemotePluginHookEntity._revEntityOwnerGUID = 1;
                    revPersRemotePluginHookEntity._revEntityContainerGUID = -1;
                    revPersRemotePluginHookEntity._revTimeCreated = new Date().getTime();

                    let revPersRemotePluginHookInfoEntity = rev_db_entity_const_resolver.REV_ENTITY_STRUCT();
                    revPersRemotePluginHookInfoEntity._revEntityResolveStatus = -1;
                    revPersRemotePluginHookInfoEntity._revEntityChildableStatus = 1;
                    revPersRemotePluginHookInfoEntity._revEntityType = "rev_object";
                    revPersRemotePluginHookInfoEntity._revEntitySubType = "rev_entity_info";

                    revPersRemotePluginHookInfoEntity._revEntityMetadataList.push(rev_db_entity_metadata_const_resolver.REV_METADATA_FILLER("rev_remote_plugin_hook_name", revNameID));
                    revPersRemotePluginHookInfoEntity._revEntityMetadataList.push(rev_db_entity_metadata_const_resolver.REV_METADATA_FILLER("rev_plugin_hook_context_remote", revPluginHookContextRemote));
                    revPersRemotePluginHookInfoEntity._revEntityMetadataList.push(rev_db_entity_metadata_const_resolver.REV_METADATA_FILLER("rev_handler", revHandler));

                    revPersRemotePluginHookEntity._revInfoEntity = revPersRemotePluginHookInfoEntity;

                    let revPluginHookRel = rev_db_rels_const_resolver.REV_ENTITY_RELATIONSHIP_STRUCT();
                    revPluginHookRel._revResolveStatus = -101;
                    revPluginHookRel._revEntityRelationshipType = "rev_remote_plugin_hook_of";
                    revPluginHookRel._remoteRevEntityTargetGUID = revPluginContainerEntity._remoteRevEntityGUID;
                    revPluginHookRel._remoteRevEntitySubjectGUID = revPersRemotePluginHookEntity._remoteRevEntityGUID;

                    revPersRemotePluginHookEntity._revSubjectEntityRelationships.push(revPluginHookRel);

                    let revPersRemotePluginHookEntityRetArr = await rev_pers_create_rev_entity_service_helper.createNewRevEntitiesArray_Serv([revPersRemotePluginHookEntity]);
                    revPersRemotePluginHookEntity._remoteRevEntityGUID = revPersRemotePluginHookEntityRetArr.filter[0]._remoteRevEntityGUID;
                } else {
                    revPersRemotePluginHookEntity = await rev_db_entity_const_resolver.revGetFlatEntity_Serv(revPluginHookGUID);
                }

                let revSavedRemotePluginHookHandler = rev_remote_plugin_hooks_const_resolver.revRemotePluginHookConstructor(revPersRemotePluginHookEntity);

                if (!rev_json_functions.revIsEmptyJSONObject(revSavedRemotePluginHookHandler)) {
                    revPluginsObjects.revPluginHookContextRemoteContainers[revPluginHookContextRemote].push(revSavedRemotePluginHookHandler);
                }

                revRemotePluginHookEntitiesArr.push(revPersRemotePluginHookEntity);
            }
        }
    }

    return revRemotePluginHookEntitiesArr;
};

module.exports.revLoadRemotePluginHooks = revLoadRemotePluginHooks;
