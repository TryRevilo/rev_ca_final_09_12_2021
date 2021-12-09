const revFormViewFlagEntityWidget = require("./rev_form_view_widgets/revFormViewFlagEntityWidget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_flag",
        "revNameId": "revFormViewFlagEntity",
        "revOverrideView": revFormViewFlagEntityWidget.revFormViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        "revCSSFiles": [],
    };
};

module.exports.revPluginPageView = revPluginPageView;
