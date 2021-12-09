const rev_strings_helper_funcs = require("../../../../../rev_helper_functions/rev_strings_helper_funcs");
const rev_json_functions = require("../../../../../rev_helper_functions/rev_json_functions");

/** REV START READ METADATA */
const rev_db_entity_metadata_const_resolver = require("../../../../../rev_pers_lib/rev_entity_data/rev_pers_metadata/rev_db_models/rev_db_entity_metadata_const_resolver");
/** REV END READ METADATA */

const rev_plugins_objects = require("../../../rev_plugins_objects");

var revGetPluginEntity_By_Plugin_Name = async (revPluginNameId) => {
    let revPluginEntitiesArr = rev_plugins_objects.revPluginsObjects.revPluginsInstalledArr;

    if (rev_strings_helper_funcs.revIsEmptyVar(revPluginEntitiesArr)) {
        return;
    }

    let revPlugin;

    for (let i = 0; i < revPluginEntitiesArr.length; i++) {
        let revCurrPluginEntity = revPluginEntitiesArr[i];

        if (
            rev_strings_helper_funcs.revIsEmptyVar(revCurrPluginEntity) ||
            rev_strings_helper_funcs.revIsEmptyVar(revCurrPluginEntity._revInfoEntity) ||
            rev_strings_helper_funcs.revIsEmptyVar(revCurrPluginEntity._revInfoEntity._revEntityMetadataList)
            /** */
        ) {
            continue;
        }

        let revCurrPluginNameId = rev_db_entity_metadata_const_resolver.revGetMetadataValue(revCurrPluginEntity._revInfoEntity._revEntityMetadataList, "rev_plugin_name_id");

        if (revPluginNameId.localeCompare(revCurrPluginNameId) == 0) {
            revPlugin = revCurrPluginEntity;

            break;
        }
    }

    return rev_json_functions.revCloneJsObject(revPlugin);
};

module.exports.revGetPluginEntity_By_Plugin_Name = revGetPluginEntity_By_Plugin_Name;
