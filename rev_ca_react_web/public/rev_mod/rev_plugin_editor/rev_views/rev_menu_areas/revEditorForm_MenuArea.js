const revEditorForm_MenuArea_Widget = require("./rev_menu_area_widgets/revEditorForm_MenuArea_Widget");

var revPluginMenuArea = () => {
    return {
        "rev_plugin_name": "rev_plugin_editor",
        "revNameId": "revForms",
        "revMenuAreaViewName": "revForms",
        "revPageViewName": "revForms",
        "revOverrideView": revEditorForm_MenuArea_Widget.revWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuItems": [],
    };
};

module.exports.revPluginMenuArea = revPluginMenuArea;
