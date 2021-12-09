const revPageViewCommsViewAreaTrendsWidget = require('./rev_page_view_widgets/revPageViewCommsViewAreaTrendsWidget');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_trends',
        'revNameId': 'revPageViewCommsViewAreaTrends',
        'revPageViewContainerName': 'revPageViewCommsViewAreaTrends',
        'revBefore': [],
        'revPageViewName': 'revPageViewCommsViewAreaTrends',
        'revPageView': revPageViewCommsViewAreaTrendsWidget.revPageViewWidget.toString(),
        'revContainerMenuAreas': [
        ],
        'revMenuAreas': [],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_comms/rev_views/rev_page_views/rev_page_view_widgets/revPageViewCommsViewAreaTrendsWidget.css']
    }
};

module.exports.revPluginPageView = revPluginPageView;