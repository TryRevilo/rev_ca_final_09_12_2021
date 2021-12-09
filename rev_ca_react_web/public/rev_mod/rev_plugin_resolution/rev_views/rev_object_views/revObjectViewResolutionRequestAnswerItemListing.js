const revObjectViewResolutionRequestAnswerItemListing_Widget = require("./rev_page_view_widgets/revObjectViewResolutionRequestAnswerItemListing_Widget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_resolution",
        "revNameId": "revObjectViewResolutionRequestAnswerItemListing",
        "revPageViewContainerName": "revObjectViewResolutionRequestAnswerItemListing",
        "revBefore": [],
        "revPageViewName": "revObjectViewResolutionRequestAnswerItemListing",
        "revPageView": revObjectViewResolutionRequestAnswerItemListing_Widget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
    };
};

module.exports.revPluginPageView = revPluginPageView;
