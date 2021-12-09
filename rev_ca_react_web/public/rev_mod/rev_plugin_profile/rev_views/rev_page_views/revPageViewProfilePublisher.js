const revPageViewProfilePublisherWidget = require('./rev_page_view_widgets/revPageViewProfilePublisherWidget');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_profile',
        'revNameId': 'rev_profile_publisher',
        'revPageViewContainerName': 'revMainCenterScrollArea',
        'revBefore': ['rev_activity'],
        'revPageViewName': 'revProfilePublisher',
        'revPageView': revPageViewProfilePublisherWidget.revPageViewWidget.toString(),
        'revContainerMenuAreas': [
        ],
        'revMenuAreas': [],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_profile/rev_views/rev_page_views/rev_page_view_widgets/revPageViewProfilePublisherWidget.css']
    }
};

module.exports.revPluginPageView = revPluginPageView;