const revItemObjectViewOngoingCallWidget = require('./rev_object_view_widgets/revItemObjectViewOngoingCallWidget');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_audio_call',
        'revNameId': 'revItemObjectViewOngoingCall',
        'revPageViewContainerName': 'revItemObjectViewOngoingCall',
        'revPageViewName': 'revItemObjectViewOngoingCall',
        'revPageView': revItemObjectViewOngoingCallWidget.revView.toString(),
        'revMenuAreas': [],
        // 'revCSSFiles': ['/rev_plugin_audio_call/rev_views/rev_object_view/rev_object_view_widgets/revItemObjectViewOngoingCallWidget.css']
    }
};

module.exports.revPluginPageView = revPluginPageView;