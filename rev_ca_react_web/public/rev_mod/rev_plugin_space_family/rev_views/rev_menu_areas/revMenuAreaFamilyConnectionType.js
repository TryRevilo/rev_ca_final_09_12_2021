const revMenuAreaFamilyConnectionType_Widget = require("./rev_menu_area_widgets/revMenuAreaFamilyConnectionType_Widget");

var revPluginMenuArea = () => {
    return {
        "rev_plugin_name": "rev_plugin_space_family",
        "revNameId": "revMenuAreaFamilyConnectionType",
        "revMenuAreaViewName": "revMenuAreaFamilyConnectionType",
        "revPageViewName": "",
        "revOverrideView": revMenuAreaFamilyConnectionType_Widget.revWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuItems": [],
    };
};

module.exports.revPluginMenuArea = revPluginMenuArea;
