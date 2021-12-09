const revPageViewMintMessagesMessagesWidget = require("./rev_page_view_widgets/revPageViewMintMessagesWidget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_mint_messages",
        "revNameId": "revPageViewMintMessagesMessages",
        "revPageViewContainerName": "revPageViewMintMessagesMessages",
        "revBefore": [],
        "revPageViewName": "revPageViewMintMessagesMessages",
        "revPageView": revPageViewMintMessagesMessagesWidget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
    };
};

module.exports.revPluginPageView = revPluginPageView;
