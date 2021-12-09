const revObjectViewResolutionRequest_Widget = require("./rev_page_view_widgets/revObjectViewResolutionRequest_Widget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_pay",
        "revNameId": "revObjectViewResolutionRequest",
        "revPageViewContainerName": "revObjectViewResolutionRequest",
        "revBefore": [],
        "revPageViewName": "revObjectViewResolutionRequest",
        "revPageView": revObjectViewResolutionRequest_Widget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
    };
};

module.exports.revPluginPageView = revPluginPageView;
