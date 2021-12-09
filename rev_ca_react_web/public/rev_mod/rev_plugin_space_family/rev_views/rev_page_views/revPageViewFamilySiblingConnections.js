const revPageViewFamilySiblingConnections_Widget = require("./rev_page_view_widgets/revPageViewFamilySiblingConnections_Widget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_space_family",
        "revNameId": "revPageViewFamilySiblingConnections",
        "revPageViewContainerName": "revPageViewFamilySiblingConnections",
        "revBefore": [],
        "revPageViewName": "revPageViewFamilySiblingConnections",
        "revPageView": revPageViewFamilySiblingConnections_Widget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
    };
};

module.exports.revPluginPageView = revPluginPageView;
