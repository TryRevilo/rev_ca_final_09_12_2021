const revPageViewReceivedChatViewWidget = require("./rev_page_view_widgets/revPageViewReceivedChatViewWidget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_chat",
        "revNameId": "revPageViewReceivedChatView",
        "revPageViewContainerName": "revPageViewReceivedChatView",
        "revPageViewName": "revPageViewReceivedChatView",
        "revPageView": revPageViewReceivedChatViewWidget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_chat/rev_views/rev_page_views/rev_page_view_widgets/revPageViewReceivedChatViewWidget.css']
    };
};

module.exports.revPluginPageView = revPluginPageView;
