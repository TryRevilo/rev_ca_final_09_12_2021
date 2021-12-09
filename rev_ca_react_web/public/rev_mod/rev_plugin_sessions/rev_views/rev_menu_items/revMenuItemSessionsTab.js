const revMenuItemSessionsTabWidget = require('./rev_menu_items_widgets/revMenuItemSessionsTabWidget');

var revPluginMenuItem = () => {
    return {
        'rev_plugin_name': 'rev_plugin_sessions',
        'revNameId': 'revMenuItemSessionsTab',
        'revOverrideView': revMenuItemSessionsTabWidget.revMenuItemWidget.toString(),
        'revContainerMenuAreas': [
            'revMenuAreaCommsServices'
        ],
        'revMenuItems': [],
        'revBefore': ['revMenuItemAudioCallsTab']
    }
};

module.exports.revPluginMenuItem = revPluginMenuItem;