const revObjectViewResolutionRequestItemListing_Widget = require("./rev_page_view_widgets/revObjectViewResolutionRequestItemListing_Widget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_resolution",
        "revNameId": "revObjectViewResolutionRequestItemListing",
        "revPageViewContainerName": "revObjectViewResolutionRequestItemListing",
        "revBefore": [],
        "revPageViewName": "revObjectViewResolutionRequestItemListing",
        "revPageView": revObjectViewResolutionRequestItemListing_Widget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
    };
};

module.exports.revPluginPageView = revPluginPageView;
