const revPageViewFamilyFriendsConnections_Widget = require("./rev_page_view_widgets/revPageViewFamilyFriendsConnections_Widget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_space_family",
        "revNameId": "revPageViewFamilyFriendsConnections",
        "revPageViewContainerName": "revPageViewFamilyFriendsConnections",
        "revBefore": [],
        "revPageViewName": "revPageViewFamilyFriendsConnections",
        "revPageView": revPageViewFamilyFriendsConnections_Widget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
    };
};

module.exports.revPluginPageView = revPluginPageView;
