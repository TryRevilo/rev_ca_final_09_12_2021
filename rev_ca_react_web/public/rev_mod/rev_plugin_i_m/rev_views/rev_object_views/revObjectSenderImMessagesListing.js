const revObjectSenderImMessagesListingWidget = require("./rev_object_view_widgets/revObjectSenderImMessagesListingWidget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_i_m",
        "revNameId": "revObjectSenderImMessagesListing",
        "revPageViewContainerName": "revObjectSenderImMessagesListing",
        "revBefore": [],
        "revPageViewName": "revObjectSenderImMessagesListing",
        "revPageView": revObjectSenderImMessagesListingWidget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
    };
};

module.exports.revPluginPageView = revPluginPageView;
