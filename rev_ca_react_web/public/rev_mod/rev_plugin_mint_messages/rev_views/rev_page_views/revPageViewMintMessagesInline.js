const revPageViewMintMessagesInlineMessagesWidget = require("./rev_page_view_widgets/revPageViewMintMessagesInlineWidget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_mint_messages",
        "revNameId": "revPageViewMintMessagesInlineMessages",
        "revPageViewContainerName": "revPageViewMintMessagesInlineMessages",
        "revBefore": [],
        "revPageViewName": "revPageViewMintMessagesInlineMessages",
        "revPageView": revPageViewMintMessagesInlineMessagesWidget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
    };
};

module.exports.revPluginPageView = revPluginPageView;
