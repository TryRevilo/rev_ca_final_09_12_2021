const revMenuItemAudioCallsTabMWidget = require('./rev_menu_items_widgets/revMenuItemAudioCallsTabWidget');

var revPluginMenuItem = () => {
    return {
        'rev_plugin_name': 'rev_plugin_audio_call',
        'revNameId': 'revMenuItemAudioCallsTab',
        'revOverrideView': revMenuItemAudioCallsTabMWidget.revMenuItemWidget.toString(),
        'revContainerMenuAreas': [
            'revMenuAreaCommsServices'
        ],
        'revMenuItems': [],
        'revBefore': ['revMenuItemVideoCallsTab']
    }
};

module.exports.revPluginMenuItem = revPluginMenuItem;