const revPageViewListingResolutionsWidget = require("./rev_page_view_widgets/revPageViewListingResolutions_Widget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_resolution",
        "revNameId": "revPageViewListingResolutions",
        "revPageViewContainerName": "revPageViewListingResolutions",
        "revBefore": [],
        "revPageViewName": "revPageViewListingResolutions",
        "revPageView": revPageViewListingResolutionsWidget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_resolution/rev_views/rev_page_views/rev_page_view_widgets/revPageViewListingResolutionsWidget.css']
    };
};

module.exports.revPluginPageView = revPluginPageView;
