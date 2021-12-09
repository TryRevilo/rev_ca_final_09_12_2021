const revListingViewContactsWidget = require('./rev_listing_view_widgets/revListingViewContactsWidget');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_contacts',
        'revNameId': 'revListingViewContacts',
        'revPageViewContainerName': 'revListingViewContacts',
        'revBefore': [],
        'revPageViewName': 'revListingViewContacts',
        'revPageView': revListingViewContactsWidget.revView.toString(),
        'revContainerMenuAreas': [
        ],
        'revMenuAreas': [],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_contacts/rev_views/rev_listing_views/rev_listing_view_widgets/revListingViewContactsWidget.css']
    }
};

module.exports.revPluginPageView = revPluginPageView;