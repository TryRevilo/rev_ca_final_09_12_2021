const revPageViewFamilyConnections_Widget = require("./rev_page_view_widgets/revPageViewFamilyConnections_Widget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_space_family",
        "revNameId": "revPageViewFamilyConnections",
        "revPageViewContainerName": "revPageViewFamilyConnections",
        "revBefore": [],
        "revPageViewName": "revPageViewFamilyConnections",
        "revPageView": revPageViewFamilyConnections_Widget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
    };
};

module.exports.revPluginPageView = revPluginPageView;
