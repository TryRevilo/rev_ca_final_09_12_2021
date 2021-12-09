const revObject_PluginModuleProjectEditDetails_Widget = require("./rev_object_view_widgets/revObject_PluginModuleProjectEditDetails_Widget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_editor",
        "revNameId": "revObject_PluginModuleProjectEditDetails",
        "revPageViewContainerName": "revObject_PluginModuleProjectEditDetails",
        "revBefore": [],
        "revPageViewName": "revObject_PluginModuleProjectEditDetails",
        "revPageView": revObject_PluginModuleProjectEditDetails_Widget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
    };
};

module.exports.revPluginPageView = revPluginPageView;
