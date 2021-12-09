const revPageViewActivityWidget = require('./rev_page_view_widgets/revPageViewActivityWidget');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_activity',
        'revNameId': 'rev_activity',
        'revPageViewContainerName': 'revMainCenterScrollArea',
        'revPageViewName': 'revActivityItemsListingView',
        'revPageView': revPageViewActivityWidget.revPageViewWidget.toString(),
        'revContainerMenuAreas': [
        ],
        'revMenuAreas': [],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_activity/rev_views/rev_page_views/rev_page_view_widgets/revPageViewActivityWidget.css']
    }
};

module.exports.revPluginPageView = revPluginPageView;