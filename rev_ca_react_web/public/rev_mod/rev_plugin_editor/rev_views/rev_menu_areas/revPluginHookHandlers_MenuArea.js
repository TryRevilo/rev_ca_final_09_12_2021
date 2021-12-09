const revPluginHookHandlers_MenuArea_Widget = require("./rev_menu_area_widgets/revPluginHookHandlers_MenuArea_Widget");

var revPluginMenuArea = () => {
    return {
        "rev_plugin_name": "rev_plugin_editor",
        "revNameId": "revPluginHookHandlers",
        "revMenuAreaViewName": "revPluginHookHandlers",
        "revPageViewName": "revPluginHookHandlers",
        "revOverrideView": revPluginHookHandlers_MenuArea_Widget.revWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuItems": [],
    };
};

module.exports.revPluginMenuArea = revPluginMenuArea;
