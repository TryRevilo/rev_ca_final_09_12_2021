const revPageViewTimelineWidget = require('./rev_page_view_widgets/revPageViewTimelineWidget');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_activity',
        'revNameId': 'revPageViewTimeline',
        'revPageViewContainerName': 'revPageViewTimeline',
        'revPageViewName': 'revPageViewTimeline',
        'revPageView': revPageViewTimelineWidget.revPageViewWidget.toString(),
        'revContainerMenuAreas': [
        ],
        'revMenuAreas': [],
        'revMenuItems': [],
        'revPluginHooks': ['revTimelinePreTimelineHook'],
        'revPluginHookHandlers': [],
        // 'revCSSFiles': ['/rev_plugin_activity/rev_views/rev_page_views/rev_page_view_widgets/revPageViewTimelineWidget.css']
    }
};

module.exports.revPluginPageView = revPluginPageView;