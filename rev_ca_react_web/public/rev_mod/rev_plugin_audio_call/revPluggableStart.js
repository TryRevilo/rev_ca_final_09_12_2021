const revMenuItemContactsTab = require('./rev_views/rev_menu_items/revMenuItemAudioCallsTab');
const revItemObjectViewOngoingCall = require('./rev_views/rev_object_view/revItemObjectViewOngoingCall');

var revStart = () => {
    return {
        'revPluginName': 'rev_plugin_audio_call',
        'revPageViews': [
            revItemObjectViewOngoingCall.revPluginPageView
        ],
        'revMenuItems': [
            // revMenuItemContactsTab.revPluginMenuItem
        ],
    }
};

module.exports.revStart = revStart;