const revMenuItemVideoCallsTabWidget = require('./rev_menu_items_widgets/revMenuItemVideoCallsTabWidget');

var revPluginMenuItem = () => {
    return {
        'rev_plugin_name': 'rev_plugin_video_call',
        'revNameId': 'revMenuItemVideoCallsTab',
        'revOverrideView': revMenuItemVideoCallsTabWidget.revMenuItemWidget.toString(),
        'revContainerMenuAreas': [
            'revMenuAreaCommsServices'
        ],
        'revMenuItems': [],
        'revBefore': ['**']
    }
};

module.exports.revPluginMenuItem = revPluginMenuItem;