const revPageViewListingAllHistoryWidget = require('./rev_page_view_widgets/revPageViewListingAllHistoryWidget');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_history',
        'revNameId': 'revPageViewListingAllHistory',
        'revPageViewName': 'revPageViewListingAllHistory',
        'revPageViewContainerName': 'revPageViewListingAllHistory',
        'revPageView': revPageViewListingAllHistoryWidget.revPageViewWidget.toString(),
        'revContainerMenuAreas': [
        ],
        'revMenuAreas': [],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_comms/rev_views/rev_page_views/rev_page_view_widgets/revPageViewListingAllHistoryWidget.css']
    }
};

module.exports.revPluginPageView = revPluginPageView;