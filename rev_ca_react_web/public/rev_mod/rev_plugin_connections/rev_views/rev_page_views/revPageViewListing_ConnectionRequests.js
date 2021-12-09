const revPageViewListing_ConnectionRequestsWidget = require("./rev_page_view_widgets/revPageViewListing_ConnectionRequests_Widget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_connections",
        "revNameId": "revPageViewListing_ConnectionRequests",
        "revPageViewContainerName": "revPageViewListing_ConnectionRequests",
        "revBefore": [],
        "revPageViewName": "revPageViewListing_ConnectionRequests",
        "revPageView": revPageViewListing_ConnectionRequestsWidget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
    };
};

module.exports.revPluginPageView = revPluginPageView;
