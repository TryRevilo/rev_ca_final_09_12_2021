const revPageViewProfileConnectionsWidget = require("./rev_page_view_widgets/revPageViewProfileConnectionsWidget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_connections",
        "revNameId": "revPageViewProfileConnections",
        "revPageViewContainerName": "revPageViewProfileConnections",
        "revPageViewName": "revPageViewProfileConnections",
        "revPageView": revPageViewProfileConnectionsWidget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_connections/rev_views/rev_page_views/rev_page_view_widgets/revPageViewProfileConnectionsWidget.css']
    };
};

module.exports.revPluginPageView = revPluginPageView;
