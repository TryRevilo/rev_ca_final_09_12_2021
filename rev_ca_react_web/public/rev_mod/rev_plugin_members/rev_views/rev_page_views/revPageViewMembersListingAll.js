const revPageViewMembersListingAllWidget = require('./rev_page_view_widgets/revPageViewMembersListingAllWidget');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_members',
        'revNameId': 'revPageViewMembersListingAll',
        'revPageViewContainerName': 'revPageViewMembersListingAll',
        'revBefore': [],
        'revPageViewName': 'revPageViewMembersListingAll',
        'revPageView': revPageViewMembersListingAllWidget.revPageViewWidget.toString(),
        'revContainerMenuAreas': [
        ],
        'revMenuAreas': [],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_members/rev_views/rev_page_views/rev_page_view_widgets/revPageViewMembersListingAllWidget.css']
    }
};

module.exports.revPluginPageView = revPluginPageView;