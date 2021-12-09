const revPageViewAllPublicActivityWidget = require("./rev_page_view_widgets/revPageViewAllPublicActivityWidget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_activity",
        "revNameId": "rev_activity",
        "revPageViewContainerName": "revPageViewAllPublicActivity",
        "revPageViewName": "revPageViewAllPublicActivity",
        "revPageView": revPageViewAllPublicActivityWidget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_activity/rev_views/rev_page_views/rev_page_view_widgets/revPageViewAllPublicActivityWidget.css']
    };
};

module.exports.revPluginPageView = revPluginPageView;
