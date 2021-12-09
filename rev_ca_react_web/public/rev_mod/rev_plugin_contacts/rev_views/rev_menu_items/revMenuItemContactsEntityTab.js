const revMenuItemContactsEntityTabWidget = require("./rev_menu_items_widgets/revMenuItemContactsEntityTabWidget");

var revPluginMenuItem = () => {
    return {
        "rev_plugin_name": "rev_plugin_contacts",
        "revNameId": "revMenuItemContactsEntityTab",
        "revOverrideView": revMenuItemContactsEntityTabWidget.revMenuItemWidget.toString(),
        "revContainerMenuAreas": ["rev_floating_menu_area_user_profile_activity_page"],
        "revMenuItems": [],
        "revScriptPaths": [],
        // 'revCSSFiles': ['/rev_plugin_contacts/rev_views/rev_menu_items/rev_menu_items_widgets/revMenuItemFileExplorerTabWidget.css']
    };
};

module.exports.revPluginMenuItem = revPluginMenuItem;
