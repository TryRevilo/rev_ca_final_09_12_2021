const revPluginHookHandlersRemoteEnvironment_MenuArea_Widget = require("./rev_menu_area_widgets/revPluginHookHandlersRemoteEnvironment_MenuArea_Widget");

var revPluginMenuArea = () => {
    return {
        "rev_plugin_name": "rev_plugin_editor",
        "revNameId": "revPluginHookHandlersRemoteEnvironment",
        "revMenuAreaViewName": "revPluginHookHandlersRemoteEnvironment",
        "revPageViewName": "revPluginHookHandlersRemoteEnvironment",
        "revOverrideView": revPluginHookHandlersRemoteEnvironment_MenuArea_Widget.revWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuItems": [],
    };
};

module.exports.revPluginMenuArea = revPluginMenuArea;
