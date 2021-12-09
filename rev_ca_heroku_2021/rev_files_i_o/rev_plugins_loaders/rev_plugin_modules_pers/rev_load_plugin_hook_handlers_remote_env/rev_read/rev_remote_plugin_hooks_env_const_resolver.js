const rev_db_entity_metadata_const_resolver = require("../../../../../rev_pers_lib/rev_entity_data/rev_pers_metadata/rev_db_models/rev_db_entity_metadata_const_resolver");

var revRemotePluginHookEnvConstructor = (revEntity) => {
    let revRemotePluginHook = {};

    let revNameID = rev_db_entity_metadata_const_resolver.revGetMetadataValue(revEntity._revEntityMetadataList, "rev_plugin_hook_remote_env_name");
    let revHandler = rev_db_entity_metadata_const_resolver.revGetMetadataValue(revEntity._revEntityMetadataList, "rev_handler");

    if (revNameID && revHandler) {
        revRemotePluginHook["revNameID"] = revNameID;
        revRemotePluginHook["revHandler"] = revHandler;
    }

    return revRemotePluginHook;
};

module.exports.revRemotePluginHookEnvConstructor = revRemotePluginHookEnvConstructor;
