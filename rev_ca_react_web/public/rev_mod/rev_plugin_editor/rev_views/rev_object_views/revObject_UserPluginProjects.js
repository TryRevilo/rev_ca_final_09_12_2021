const revObject_UserPluginProjects_Widget = require("./rev_object_view_widgets/revObject_UserPluginProjects_Widget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_editor",
        "revNameId": "revObject_UserPluginProjects",
        "revPageViewContainerName": "revObject_UserPluginProjects",
        "revBefore": [],
        "revPageViewName": "revObject_UserPluginProjects",
        "revPageView": revObject_UserPluginProjects_Widget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
    };
};

module.exports.revPluginPageView = revPluginPageView;
