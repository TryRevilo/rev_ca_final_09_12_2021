const revMenuItemMoreOptionsPageEntityTabWidget = require('./rev_menu_items_widgets/revMenuItemMoreOptionsPageEntityTabWidget');

var revPluginMenuItem = () => {
    return {
        'rev_plugin_name': 'rev_plugin_core',
        'revNameId': 'revMenuItemMoreOptionsPageEntityTab',
        'revOverrideView': revMenuItemMoreOptionsPageEntityTabWidget.revMenuItemWidget.toString(),
        'revContainerMenuAreas': ['revMenuAreaPageFloatingOptions'],
        'revMenuItems': [],
        'revScriptPaths': [],
        // 'revCSSFiles': ['/rev_plugin_core/rev_views/rev_menu_items/rev_menu_items_widgets/revMenuItemFileExplorerTabWidget.css']
    }
};

module.exports.revPluginMenuItem = revPluginMenuItem;