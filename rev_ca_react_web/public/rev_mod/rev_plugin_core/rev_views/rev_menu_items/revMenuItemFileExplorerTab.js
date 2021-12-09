const revMenuItemFileExplorerTabWidget = require('./rev_menu_items_widgets/revMenuItemFileExplorerTabWidget');

var revPluginMenuItem = () => {
    return {
        'rev_plugin_name': 'rev_plugin_core',
        'revNameId': 'revMenuItemFileExplorerTab',
        'revOverrideView': revMenuItemFileExplorerTabWidget.revMenuItemWidget.toString(),
        'revContainerMenuAreas': [],
        'revMenuItems': [],
        'revScriptPaths': [],
        // 'revCSSFiles': ['/rev_plugin_core/rev_views/rev_menu_items/rev_menu_items_widgets/revMenuItemFileExplorerTabWidget.css']
    }
};

module.exports.revPluginMenuItem = revPluginMenuItem;