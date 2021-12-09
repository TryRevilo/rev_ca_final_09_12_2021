const revMenuItemCommsServicesIMWidget = require('./rev_menu_items_widgets/revMenuItemCommsServicesActivityWidget');

var revPluginMenuItem = () => {
    return {
        'rev_plugin_name': 'rev_plugin_comms',
        'revNameId': 'rev_comms_activity_tab',
        'revOverrideView': revMenuItemCommsServicesIMWidget.revMenuItemWidget.toString(),
        'revContainerMenuAreas': [
            'revMenuAreaCommsServices'
        ],
        'revMenuItems': [],
        'revBefore': ['--', 'revMenuItemContactsTab']
    }
};

module.exports.revPluginMenuItem = revPluginMenuItem;