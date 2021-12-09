const revPageViewVideoCallWidget = require('./rev_page_view_widgets/revPageViewVideoCallWidget');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_video_call',
        'revNameId': 'revPageViewVideoCall',
        'revPageViewContainerName': 'revPageViewVideoCall',
        'revPageViewName': 'revPageViewVideoCall',
        'revPageView': revPageViewVideoCallWidget.revPageViewWidget.toString(),
        'revMenuAreas': [],
        // 'revCSSFiles': ['/rev_plugin_video_call/rev_views/rev_page_views/rev_page_view_widgets/revPageViewVideoCallWidget.css']
    }
};

module.exports.revPluginPageView = revPluginPageView;