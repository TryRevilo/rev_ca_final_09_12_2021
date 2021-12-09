const revPageViewFamilyGrandParentsConnections_Widget = require("./rev_page_view_widgets/revPageViewFamilyGrandParentsConnections_Widget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_space_family",
        "revNameId": "revPageViewFamilyGrandParentsConnections",
        "revPageViewContainerName": "revPageViewFamilyGrandParentsConnections",
        "revBefore": [],
        "revPageViewName": "revPageViewFamilyGrandParentsConnections",
        "revPageView": revPageViewFamilyGrandParentsConnections_Widget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
    };
};

module.exports.revPluginPageView = revPluginPageView;
