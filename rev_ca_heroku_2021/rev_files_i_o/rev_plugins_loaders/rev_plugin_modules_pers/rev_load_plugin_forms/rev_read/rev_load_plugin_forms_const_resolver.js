const rev_json_functions = require("../../../../../rev_helper_functions/rev_json_functions");

const rev_db_entity_metadata_const_resolver = require("../../../../../rev_pers_lib/rev_entity_data/rev_pers_metadata/rev_db_models/rev_db_entity_metadata_const_resolver");

var revPluginFormConstructor = (revEntity) => {
    let revPluginForm = {};

    if (rev_json_functions.revIsEmptyJSONObject(revEntity) || rev_json_functions.revIsEmptyJSONObject(revEntity._revInfoEntity)) {
        return;
    }

    let revInfoEntity = revEntity._revInfoEntity;

    let revPluginName = rev_db_entity_metadata_const_resolver.revGetMetadataValue(revInfoEntity._revEntityMetadataList, "rev_plugin_name_id");
    let revNameID = rev_db_entity_metadata_const_resolver.revGetMetadataValue(revInfoEntity._revEntityMetadataList, "rev_plugin_form_name");
    let revOverrideView = rev_db_entity_metadata_const_resolver.revGetMetadataValue(revInfoEntity._revEntityMetadataList, "rev_override_view");
    let revMenuAreaValsArr = rev_db_entity_metadata_const_resolver.revGetMetadataValuesArr(revInfoEntity._revEntityMetadataList, "rev_menu_areas");
    let revMenuItemsValsArr = rev_db_entity_metadata_const_resolver.revGetMetadataValuesArr(revInfoEntity._revEntityMetadataList, "rev_menu_items");
    let revCSSFilesArr = rev_db_entity_metadata_const_resolver.revGetMetadataValuesArr(revInfoEntity._revEntityMetadataList, "rev_css_files");

    if (revPluginName && revNameID && revOverrideView) {
        revPluginForm["revPluginName"] = revPluginName;
        revPluginForm["revNameId"] = revNameID;
        revPluginForm["revOverrideView"] = revOverrideView;

        revPluginForm["revMenuAreas"] = [];

        for (let i = 0; i < revMenuAreaValsArr.length; i++) {
            revPluginForm.revMenuAreas.push(revMenuAreaValsArr[i]);
        }

        revPluginForm["revMenuItems"] = [];

        for (let i = 0; i < revMenuItemsValsArr.length; i++) {
            revPluginForm.revMenuItems.push(revMenuItemsValsArr[i]);
        }

        revPluginForm["revCSSFiles"] = [];

        for (let i = 0; i < revCSSFilesArr.length; i++) {
            revPluginForm.revCSSFiles.push(revCSSFilesArr[i]);
        }
    }

    return revPluginForm;
};

module.exports.revPluginFormConstructor = revPluginFormConstructor;
