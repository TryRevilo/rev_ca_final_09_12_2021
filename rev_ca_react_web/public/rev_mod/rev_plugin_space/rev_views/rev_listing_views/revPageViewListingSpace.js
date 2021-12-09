const revPageViewListingSpaceWidget = require('./rev_page_view_widgets/revPageViewListingSpaceWidget');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_space',
        'revNameId': 'revPageViewListingSpace',
        'revPageViewContainerName': 'revPageViewListingSpace',
        'revBefore': [],
        'revPageViewName': 'revPageViewListingSpace',
        'revPageView': revPageViewListingSpaceWidget.revPageViewWidget.toString(),
        'revContainerMenuAreas': [
        ],
        'revMenuAreas': [],
        'revMenuItems': [],
    }
};

module.exports.revPluginPageView = revPluginPageView;