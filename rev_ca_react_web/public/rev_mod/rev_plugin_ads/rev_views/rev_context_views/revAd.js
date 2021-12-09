const revAdWidget = require('./rev_context_view_widgets/revAdWidget');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_ads',
        'revNameId': 'revAd',
        'revContexts': ['revTimelineView'],
        'revContextView': revAdWidget.revPageViewWidget.toString(),
        'revContainerMenuAreas': [
        ],
        'revMenuAreas': [],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_comms/rev_views/rev_page_views/rev_page_view_widgets/revAdWidget.css']
    }
};

module.exports.revContextView = revPluginPageView;