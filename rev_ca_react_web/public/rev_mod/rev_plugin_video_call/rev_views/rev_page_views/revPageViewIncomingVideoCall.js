const revPageViewIncomingVideoCallWidget = require("./rev_page_view_widgets/revPageViewIncomingVideoCallWidget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_video_call",
        "revNameId": "revPageViewIncomingVideoCall",
        "revPageViewContainerName": "revPageViewIncomingVideoCall",
        "revPageViewName": "revPageViewIncomingVideoCall",
        "revPageView": revPageViewIncomingVideoCallWidget.revPageViewWidget.toString(),
        "revMenuAreas": [],
        // 'revCSSFiles': ['/rev_plugin_video_call/rev_views/rev_page_views/rev_page_view_widgets/revPageViewIncomingVideoCallWidget.css']
    };
};

module.exports.revPluginPageView = revPluginPageView;
