const revPageViewProfileInfoWidget = require('./rev_page_view_widgets/revPageViewProfileInfoWidget');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_profile',
        'revNameId': 'revPageViewProfileInfo',
        'revPageViewContainerName': 'revPageViewProfileInfo',
        'revPageViewName': 'revPageViewProfileInfo',
        'revPageView': revPageViewProfileInfoWidget.revPageViewWidget.toString(),
        'revContainerMenuAreas': [
        ],
        'revMenuAreas': [],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_profile/rev_views/rev_page_views/rev_page_view_widgets/revPageViewProfileInfoWidget.css']
    }
};

module.exports.revPluginPageView = revPluginPageView;