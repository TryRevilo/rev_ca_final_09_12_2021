const revPageViewListingStores_Widget = require("./rev_page_view_widgets/revPageViewListingStores_Widget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "revStore",
        "revNameId": "revPageViewListingStores",
        "revPageViewContainerName": "revPageViewListingStores",
        "revBefore": [],
        "revPageViewName": "revPageViewListingStores",
        "revPageView": revPageViewListingStores_Widget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/revStore/rev_views/rev_page_views/rev_page_view_widgets/revPageViewListingStores_Widget.css']
    };
};

module.exports.revPluginPageView = revPluginPageView;
