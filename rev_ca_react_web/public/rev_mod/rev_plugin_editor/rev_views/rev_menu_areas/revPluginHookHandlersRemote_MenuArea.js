const revPluginHookHandlersRemote_MenuArea_Widget = require("./rev_menu_area_widgets/revPluginHookHandlersRemote_MenuArea_Widget");

var revPluginMenuArea = () => {
    return {
        "rev_plugin_name": "rev_plugin_editor",
        "revNameId": "revPluginHookHandlersRemote",
        "revMenuAreaViewName": "revPluginHookHandlersRemote",
        "revPageViewName": "revPluginHookHandlersRemote",
        "revOverrideView": revPluginHookHandlersRemote_MenuArea_Widget.revWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuItems": [],
    };
};

module.exports.revPluginMenuArea = revPluginMenuArea;
