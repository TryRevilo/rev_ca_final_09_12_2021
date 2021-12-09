const revMenuItemSearchPageEntityTabWidget = require("./rev_menu_items_widgets/revMenuItemSearchPageEntityTabWidget");

var revPluginMenuItem = () => {
    return {
        "rev_plugin_name": "rev_plugin_search",
        "revNameId": "revMenuItemSearchPageEntityTab",
        "revOverrideView": revMenuItemSearchPageEntityTabWidget.revMenuItemWidget.toString(),
        "revContainerMenuAreas": ["rev_floating_menu_area_user_profile_activity_page"],
        "revMenuItems": [],
        "revScriptPaths": [],
        // 'revCSSFiles': ['/rev_plugin_search/rev_views/rev_menu_items/rev_menu_items_widgets/revMenuItemFileExplorerTabWidget.css']
    };
};

module.exports.revPluginMenuItem = revPluginMenuItem;
