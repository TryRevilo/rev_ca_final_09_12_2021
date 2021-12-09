const revMenuItemGenericAddEntitySubTypeTabWidget = require('./rev_menu_items_widgets/revMenuItemGenericAddEntitySubTypeTabWidget');

var revPluginMenuItem = () => {
    return {
        'rev_plugin_name': 'rev_plugin_core',
        'revNameId': 'revMenuItemGenericAddEntitySubTypeTab',
        'revOverrideView': revMenuItemGenericAddEntitySubTypeTabWidget.revMenuItemWidget.toString(),
        'revContainerMenuAreas': [],
        'revMenuItems': [],
        'revScriptPaths': [],
        // 'revCSSFiles': ['/rev_plugin_core/rev_views/rev_menu_items/rev_menu_items_widgets/revMenuItemGenericAddEntitySubTypeTabWidget.css']
    }
};

module.exports.revPluginMenuItem = revPluginMenuItem;