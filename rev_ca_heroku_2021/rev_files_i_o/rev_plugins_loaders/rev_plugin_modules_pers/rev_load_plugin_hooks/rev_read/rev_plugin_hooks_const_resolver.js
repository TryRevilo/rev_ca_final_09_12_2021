const rev_db_entity_metadata_const_resolver = require("../../../../../rev_pers_lib/rev_entity_data/rev_pers_metadata/rev_db_models/rev_db_entity_metadata_const_resolver");

var revPluginHookConstructor = (revEntity) => {
    let revPluginHook = {};

    let revPluginHookName = rev_db_entity_metadata_const_resolver.revGetMetadataValue(revEntity._revEntityMetadataList, "rev_plugin_hook_name");
    let revNameID = rev_db_entity_metadata_const_resolver.revGetMetadataValue(revEntity._revEntityMetadataList, "rev_name_id");
    let revHandler = rev_db_entity_metadata_const_resolver.revGetMetadataValue(revEntity._revEntityMetadataList, "rev_handler");

    if (revPluginHookName && revNameID && revHandler) {
        revPluginHook["revPluginHookName"] = revPluginHookName;
        revPluginHook["revNameID"] = revNameID;
        revPluginHook["revHandler"] = revHandler;
    }

    return revPluginHook;
};

module.exports.revPluginHookConstructor = revPluginHookConstructor;
