const revMenuItem_PluginHookHandlersRemoteTab_Widget = require("./rev_menu_items_widgets/revMenuItem_PluginHookHandlersRemoteTab_Widget");

var revPluginMenuItem = () => {
    return {
        "rev_plugin_name": "rev_plugin_editor",
        "revNameId": "revMenuItem_PluginHookHandlersRemoteTab",
        "revOverrideView": revMenuItem_PluginHookHandlersRemoteTab_Widget.revMenuItemWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuItems": [],
        "revScriptPaths": [],
        // 'revCSSFiles': ['/rev_plugin_editor/rev_views/rev_menu_items/rev_menu_items_widgets/revMenuItemFileExplorerTabWidget.css']
    };
};

module.exports.revPluginMenuItem = revPluginMenuItem;
