const rev_db_entity_metadata_const_resolver = require("../../../../../rev_pers_lib/rev_entity_data/rev_pers_metadata/rev_db_models/rev_db_entity_metadata_const_resolver");

var revRemotePluginHookConstructor = (revEntity) => {
    let revRemotePluginHook = {};

    let revNameID = rev_db_entity_metadata_const_resolver.revGetMetadataValue(revEntity._revEntityMetadataList, "rev_remote_plugin_hook_name");
    let revRemotePluginHookContextRemote = rev_db_entity_metadata_const_resolver.revGetMetadataValue(revEntity._revEntityMetadataList, "rev_plugin_hook_context_remote");
    let revHandler = rev_db_entity_metadata_const_resolver.revGetMetadataValue(revEntity._revEntityMetadataList, "rev_handler");

    if (revNameID && revRemotePluginHookContextRemote && revHandler) {
        revRemotePluginHook["revNameID"] = revNameID;
        revRemotePluginHook["revRemotePluginHookContextRemote"] = revRemotePluginHookContextRemote;
        revRemotePluginHook["revHandler"] = revHandler;
    }

    return revRemotePluginHook;
};

module.exports.revRemotePluginHookConstructor = revRemotePluginHookConstructor;
