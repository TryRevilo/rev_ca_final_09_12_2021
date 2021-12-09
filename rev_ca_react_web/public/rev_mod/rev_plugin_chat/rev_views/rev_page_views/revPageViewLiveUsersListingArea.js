const revPageViewLiveUsersListingAreaWidget = require('./rev_page_view_widgets/revPageViewLiveUsersListingAreaWidget');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_chat',
        'revNameId': 'revPageViewLiveUsersListingArea',
        'revPageViewContainerName': 'revPageViewLiveUsersListingArea',
        'revPageViewName': 'revPageViewLiveUsersListingArea',
        'revPageView': revPageViewLiveUsersListingAreaWidget.revPageViewWidget.toString(),
        'revContainerMenuAreas': [
        ],
        'revMenuAreas': [],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_core/rev_views/rev_page_views/rev_page_view_widgets/revPageViewLiveUsersListingAreaWidget.css']
    }
};

module.exports.revPluginPageView = revPluginPageView;