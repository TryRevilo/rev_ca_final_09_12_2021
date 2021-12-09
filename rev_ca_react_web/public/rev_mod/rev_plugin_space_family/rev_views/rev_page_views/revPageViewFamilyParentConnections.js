const revPageViewFamilyParentConnections_Widget = require("./rev_page_view_widgets/revPageViewFamilyParentConnections_Widget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_space_family",
        "revNameId": "revPageViewFamilyParentConnections",
        "revPageViewContainerName": "revPageViewFamilyParentConnections",
        "revBefore": [],
        "revPageViewName": "revPageViewFamilyParentConnections",
        "revPageView": revPageViewFamilyParentConnections_Widget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
    };
};

module.exports.revPluginPageView = revPluginPageView;
