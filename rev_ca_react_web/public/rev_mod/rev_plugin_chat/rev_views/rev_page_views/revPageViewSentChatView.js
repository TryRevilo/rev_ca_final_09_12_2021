const revPageViewSentChatViewWidget = require("./rev_page_view_widgets/revPageViewSentChatViewWidget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_chat",
        "revNameId": "revPageViewSentChatView",
        "revPageViewContainerName": "revPageViewSentChatView",
        "revPageViewName": "revPageViewSentChatView",
        "revPageView": revPageViewSentChatViewWidget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_chat/rev_views/rev_page_views/rev_page_view_widgets/revPageViewSentChatViewWidget.css']
    };
};

module.exports.revPluginPageView = revPluginPageView;
