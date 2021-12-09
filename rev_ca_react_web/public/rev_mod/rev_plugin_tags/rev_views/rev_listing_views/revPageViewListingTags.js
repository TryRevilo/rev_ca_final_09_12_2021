const revPageViewListingTagsWidget = require("./rev_page_view_widgets/revPageViewListingTags_Widget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_tags",
        "revNameId": "revPageViewListingTags",
        "revPageViewContainerName": "revPageViewListingTags",
        "revBefore": [],
        "revPageViewName": "revPageViewListingTags",
        "revPageView": revPageViewListingTagsWidget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_tags/rev_views/rev_page_views/rev_page_view_widgets/revPageViewListingTagsWidget.css']
    };
};

module.exports.revPluginPageView = revPluginPageView;
