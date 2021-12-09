const revPageViewStoreBriefInfoWidget = require("./rev_page_view_widgets/revPageViewStoreBriefInfoWidget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_stores",
        "revNameId": "revPageViewStoreBriefInfo",
        "revPageViewContainerName": "revPageViewStoreBriefInfo",
        "revBefore": [],
        "revPageViewName": "revPageViewStoreBriefInfo",
        "revPageView": revPageViewStoreBriefInfoWidget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_comms/rev_views/rev_page_views/rev_page_view_widgets/revPageViewStoreBriefInfoWidget.css']
    };
};

module.exports.revPluginPageView = revPluginPageView;
