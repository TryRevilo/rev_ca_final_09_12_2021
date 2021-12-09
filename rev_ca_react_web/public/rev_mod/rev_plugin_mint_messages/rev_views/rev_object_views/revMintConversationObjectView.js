const revMintConversationObjectViewWidget = require("./rev_object_view_widgets/revMintConversationObjectViewWidget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_mint_messages",
        "revNameId": "revMintConversationObjectView",
        "revPageViewContainerName": "revMintConversationObjectView",
        "revBefore": [],
        "revPageViewName": "revMintConversationObjectView",
        "revPageView": revMintConversationObjectViewWidget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
    };
};

module.exports.revPluginPageView = revPluginPageView;
