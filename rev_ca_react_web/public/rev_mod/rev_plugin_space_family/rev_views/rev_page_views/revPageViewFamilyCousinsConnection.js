const revPageViewFamilyCousinsConnections_Widget = require("./rev_page_view_widgets/revPageViewFamilyCousinsConnections_Widget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_space_family",
        "revNameId": "revPageViewFamilyCousinsConnections",
        "revPageViewContainerName": "revPageViewFamilyCousinsConnections",
        "revBefore": [],
        "revPageViewName": "revPageViewFamilyCousinsConnections",
        "revPageView": revPageViewFamilyCousinsConnections_Widget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
    };
};

module.exports.revPluginPageView = revPluginPageView;
