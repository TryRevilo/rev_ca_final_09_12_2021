const revPageViewNewChatAlertsListingAreaWidget = require("./rev_page_view_widgets/revPageViewNewChatAlertsListingAreaWidget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_chat",
        "revNameId": "revPageViewNewChatAlertsListingArea",
        "revPageViewContainerName": "revPageViewNewChatAlertsListingArea",
        "revPageViewName": "revPageViewNewChatAlertsListingArea",
        "revPageView": revPageViewNewChatAlertsListingAreaWidget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_chat/rev_views/rev_page_views/rev_page_view_widgets/revPageViewNewChatAlertsListingAreaWidget.css']
    };
};

module.exports.revPluginPageView = revPluginPageView;
