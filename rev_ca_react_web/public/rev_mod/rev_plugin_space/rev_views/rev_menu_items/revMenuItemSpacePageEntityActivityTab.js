const revMenuItemSpacePageEntityActivityTabWidget = require('./rev_menu_items_widgets/revMenuItemSpacePageEntityActivityTabWidget');

var revPluginMenuItem = () => {
    return {
        'rev_plugin_name': 'rev_plugin_space',
        'revNameId': 'revMenuItemSpacePageEntityActivityTab',
        'revOverrideView': revMenuItemSpacePageEntityActivityTabWidget.revMenuItemWidget.toString(),
        'revContainerMenuAreas': ['revMenuAreaPageFloatingOptions'],
        'revMenuItems': [],
        'revScriptPaths': [],
        // 'revCSSFiles': ['/rev_plugin_space/rev_views/rev_menu_items/rev_menu_items_widgets/revMenuItemFileExplorerTabWidget.css']
    }
};

module.exports.revPluginMenuItem = revPluginMenuItem;