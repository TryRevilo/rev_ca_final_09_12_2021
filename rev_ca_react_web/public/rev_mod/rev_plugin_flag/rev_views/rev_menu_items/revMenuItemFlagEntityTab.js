const revMenuItemFlagEntityTabWidget = require("./rev_menu_items_widgets/revMenuItemFlagEntityTabWidget");

var revPluginMenuItem = () => {
    return {
        "rev_plugin_name": "rev_plugin_flag",
        "revNameId": "revMenuItemFlagEntityTab",
        "revOverrideView": revMenuItemFlagEntityTabWidget.revMenuItemWidget.toString(),
        "revContainerMenuAreas": ["revListingItemOptionsMenuArea"],
        "revMenuItems": [],
        "revScriptPaths": [],
        // 'revCSSFiles': ['/rev_plugin_flag/rev_views/rev_menu_items/rev_menu_items_widgets/revMenuItemFileExplorerTabWidget.css']
    };
};

module.exports.revPluginMenuItem = revPluginMenuItem;
