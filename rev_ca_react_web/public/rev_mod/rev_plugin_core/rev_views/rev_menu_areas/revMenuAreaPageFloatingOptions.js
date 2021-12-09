const revMenuAreaPageFloatingOptionsWidget = require("./rev_menu_area_widgets/revMenuAreaPageFloatingOptionsWidget");

var revPluginMenuArea = () => {
    return {
        "rev_plugin_name": "rev_plugin_core",
        "revNameId": "revMenuAreaPageFloatingOptions",
        "revMenuAreaViewName": "revMenuAreaPageFloatingOptions",
        "revPageViewName": "",
        "revOverrideView": revMenuAreaPageFloatingOptionsWidget.revWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuItems": [],
    };
};

module.exports.revPluginMenuArea = revPluginMenuArea;
