const revMenuItemJoinSpacePageEntityTab_Widget = require("./rev_menu_items_widgets/revMenuItemJoinSpacePageEntityTab_Widget");

var revPluginMenuItem = () => {
    return {
        "rev_plugin_name": "rev_plugin_space",
        "revNameId": "revMenuItemJoinSpacePageEntityTab",
        "revOverrideView": revMenuItemJoinSpacePageEntityTab_Widget.revMenuItemWidget.toString(),
        "revContainerMenuAreas": ["rev_floating_menu_area_user_profile_activity_page"],
        "revMenuItems": [],
        "revScriptPaths": [],
        // 'revCSSFiles': ['/rev_plugin_space/rev_views/rev_menu_items/rev_menu_items_widgets/revMenuItemFileExplorerTabWidget.css']
    };
};

module.exports.revPluginMenuItem = revPluginMenuItem;
