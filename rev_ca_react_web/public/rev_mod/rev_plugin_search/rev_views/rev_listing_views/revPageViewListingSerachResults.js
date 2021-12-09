const revPageViewListingSerachResultsWidget = require("./rev_page_view_widgets/revPageViewListingSerachResults_Widget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_search",
        "revNameId": "revPageViewListingSerachResults",
        "revPageViewContainerName": "revPageViewListingSerachResults",
        "revBefore": [],
        "revPageViewName": "revPageViewListingSerachResults",
        "revPageView": revPageViewListingSerachResultsWidget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_search/rev_views/rev_page_views/rev_page_view_widgets/revPageViewListingSerachResultsWidget.css']
    };
};

module.exports.revPluginPageView = revPluginPageView;
