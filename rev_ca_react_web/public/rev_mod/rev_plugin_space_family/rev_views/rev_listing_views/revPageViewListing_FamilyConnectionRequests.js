const revPageViewListing_FamilyConnectionRequestsWidget = require("./rev_listing_views_widgets/revPageViewListing_FamilyConnectionRequests_Widget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_space_family",
        "revNameId": "revPageViewListing_FamilyConnectionRequests",
        "revPageViewContainerName": "revPageViewListing_FamilyConnectionRequests",
        "revBefore": [],
        "revPageViewName": "revPageViewListing_FamilyConnectionRequests",
        "revPageView": revPageViewListing_FamilyConnectionRequestsWidget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
    };
};

module.exports.revPluginPageView = revPluginPageView;
