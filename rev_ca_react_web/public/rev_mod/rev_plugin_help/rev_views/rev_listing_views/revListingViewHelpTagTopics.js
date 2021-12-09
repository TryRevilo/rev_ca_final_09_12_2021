const revListingViewHelpTagTopicsWidget = require("./rev_page_view_widgets/revListingViewHelpTagTopics_Widget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_help",
        "revNameId": "revListingViewHelpTagTopics",
        "revPageViewContainerName": "revListingViewHelpTagTopics",
        "revBefore": [],
        "revPageViewName": "revListingViewHelpTagTopics",
        "revPageView": revListingViewHelpTagTopicsWidget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_help/rev_views/rev_page_views/rev_page_view_widgets/revListingViewHelpTagTopicsWidget.css']
    };
};

module.exports.revPluginPageView = revPluginPageView;
