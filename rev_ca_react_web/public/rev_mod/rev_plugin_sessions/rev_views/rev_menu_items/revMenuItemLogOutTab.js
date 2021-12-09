const revMenuItemLogOutTabWidget = require('./rev_menu_items_widgets/revMenuItemLogOutTabWidget');

var revPluginMenuItem = () => {
    return {
        'rev_plugin_name': 'rev_plugin_sessions',
        'revNameId': 'revMenuItemLogOutTab',
        'revOverrideView': revMenuItemLogOutTabWidget.revMenuItemWidget.toString(),
        'revContainerMenuAreas': [
            'revRightSideBarTopBarMenuArea'
        ],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_sessions/rev_views/rev_menu_items/rev_menu_items_widgets/revMenuItemLogOutTabWidget.css']
    }
};

module.exports.revPluginMenuItem = revPluginMenuItem;