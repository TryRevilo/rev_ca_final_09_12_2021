const revObject_PluginEditorHome_Widget = require("./rev_object_view_widgets/revObject_PluginEditorHome_Widget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_editor",
        "revNameId": "revObject_PluginEditorHome",
        "revPageViewContainerName": "revObject_PluginEditorHome",
        "revBefore": [],
        "revPageViewName": "revObject_PluginEditorHome",
        "revPageView": revObject_PluginEditorHome_Widget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
    };
};

module.exports.revPluginPageView = revPluginPageView;
