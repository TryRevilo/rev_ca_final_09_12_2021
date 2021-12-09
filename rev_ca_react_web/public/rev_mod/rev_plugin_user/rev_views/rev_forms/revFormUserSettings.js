const revFormUserSettingsWidget = require("./rev_form_view_widgets/revFormUserSettingsWidget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_user",
        "revNameId": "revFormUserSettings",
        "revOverrideView": revFormUserSettingsWidget.revFormViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        "revCSSFiles": [],
    };
};

module.exports.revPluginPageView = revPluginPageView;
