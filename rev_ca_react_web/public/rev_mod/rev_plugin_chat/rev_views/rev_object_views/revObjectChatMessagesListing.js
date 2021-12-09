const revObjectChatMessagesListingWidget = require("./rev_object_view_widgets/revObjectChatMessagesListingWidget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_i_m",
        "revNameId": "revObjectChatMessagesListing",
        "revPageViewContainerName": "revObjectChatMessagesListing",
        "revBefore": [],
        "revPageViewName": "revObjectChatMessagesListing",
        "revPageView": revObjectChatMessagesListingWidget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
    };
};

module.exports.revPluginPageView = revPluginPageView;
