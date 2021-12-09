/** REV START MENU ITEMS */
const revMenuItemFilterPageEntityTab = require("./rev_views/rev_menu_items/revMenuItemFilterPageEntityTab");
/** REV END MENU ITEMS */

/** REV START FORMS */
const revFormViewFilterPageContentSearch = require("./rev_views/rev_forms/revFormViewFilterPageContentSearch");
/** REV END FORMS */

var revStart = () => {
    return {
        "revPluginName": "rev_plugin_filter",
        "revMenuItems": [revMenuItemFilterPageEntityTab.revPluginMenuItem],
        "revForms": [revFormViewFilterPageContentSearch.revPluginPageView],
        "revPageViews": [],
        "revModules": [],
        "revPluginHookContextsRemoteArr": [],
        "revPluginHookHandlersRemote": [],
    };
};

module.exports.revStart = revStart;
