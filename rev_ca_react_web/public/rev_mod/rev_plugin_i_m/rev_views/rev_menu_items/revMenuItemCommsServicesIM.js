const revMenuItemCommsServicesIMWidget = require('./rev_menu_items_widgets/revMenuItemCommsServicesIMWidget');

var revPluginMenuItem = () => {
    return {
        'rev_plugin_name': 'rev_plugin_i_m',
        'revNameId': 'revMenuItemCommsServicesIM',
        'revOverrideView': revMenuItemCommsServicesIMWidget.revMenuItemWidget.toString(),
        'revContainerMenuAreas': [
            'revMenuAreaCommsServices'
        ],
        'revMenuItems': [],
        'revBefore': ['revMenuItemContactsTab']
    }
};

module.exports.revPluginMenuItem = revPluginMenuItem;