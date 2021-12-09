/** REV START MENU ITEMS */
const revMenuItemFilterPageEntityTab = require("./rev_views/rev_menu_items/revMenuItemFlagEntityTab");
/** REV END MENU ITEMS */

/** REV START FORMS */
const revFormViewFlagEntity = require("./rev_views/rev_forms/revFormViewFlagEntity");
/** REV END FORMS */

var revStart = () => {
    return {
        "revPluginName": "rev_plugin_flag",
        "revMenuItems": [revMenuItemFilterPageEntityTab.revPluginMenuItem],
        "revForms": [revFormViewFlagEntity.revPluginPageView],
        "revPageViews": [],
        "revModules": [],
        "revPluginHookContextsRemoteArr": [],
        "revPluginHookHandlersRemote": [],
    };
};

module.exports.revStart = revStart;
