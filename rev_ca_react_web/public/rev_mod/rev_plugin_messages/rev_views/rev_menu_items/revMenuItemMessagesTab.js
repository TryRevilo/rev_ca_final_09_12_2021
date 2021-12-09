const revMenuItemMessagesTabWidget = require('./rev_menu_items_widgets/revMenuItemMessagesTabWidget');

var revPluginMenuItem = () => {
    return {
        'rev_plugin_name': 'rev_plugin_messages',
        'revNameId': 'revMenuItemMessagesTab',
        'revOverrideView': revMenuItemMessagesTabWidget.revMenuItemWidget.toString(),
        'revContainerMenuAreas': [
            'revMenuAreaCommsServices'
        ],
        'revMenuItems': [],
        'revBefore': ['revMenuItemSessionsTab']
    }
};

module.exports.revPluginMenuItem = revPluginMenuItem;