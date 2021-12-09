const revMenuAreaPageFloatingOptions_UserProfileActivityWidget = require("./rev_menu_area_widgets/revMenuAreaPageFloatingOptions_UserProfileActivity_Widget");

var revPluginMenuArea = () => {
    return {
        "rev_plugin_name": "rev_plugin_core",
        "revNameId": "revMenuAreaPageFloatingOptions_UserProfileActivity",
        "revMenuAreaViewName": "rev_floating_menu_area_user_profile_activity_page",
        "revPageViewName": "",
        "revOverrideView": revMenuAreaPageFloatingOptions_UserProfileActivityWidget.revWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuItems": [],
    };
};

module.exports.revPluginMenuArea = revPluginMenuArea;
