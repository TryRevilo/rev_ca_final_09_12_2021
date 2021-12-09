const revObject_PluginModuleProjectEditActivity_Widget = require("./rev_object_view_widgets/revObject_PluginModuleProjectEditActivity_Widget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_editor",
        "revNameId": "revObject_PluginModuleProjectEditActivity",
        "revPageViewContainerName": "revObject_PluginModuleProjectEditActivity",
        "revBefore": [],
        "revPageViewName": "revObject_PluginModuleProjectEditActivity",
        "revPageView": revObject_PluginModuleProjectEditActivity_Widget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
    };
};

module.exports.revPluginPageView = revPluginPageView;
