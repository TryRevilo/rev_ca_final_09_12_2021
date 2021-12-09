const revPageViewFamilyOtherConnections_Widget = require("./rev_page_view_widgets/revPageViewFamilyOtherConnections_Widget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_space_family",
        "revNameId": "revPageViewFamilyOtherConnections",
        "revPageViewContainerName": "revPageViewFamilyOtherConnections",
        "revBefore": [],
        "revPageViewName": "revPageViewFamilyOtherConnections",
        "revPageView": revPageViewFamilyOtherConnections_Widget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
    };
};

module.exports.revPluginPageView = revPluginPageView;
