const revPluginInstallFormWidget = require("./rev_form_view_widgets/revPluginInstallFormWidget");

var revPluginOverrideView = () => {
    return {
        "rev_plugin_name": "rev_plugin_plugins",
        "revNameId": "revPluginInstallForm",
        "revOverrideView": revPluginInstallFormWidget.revFormViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_plugins/rev_views/rev_forms/rev_form_view_widgets/revPluginInstallFormWidget.css']
    };
};

module.exports.revPluginOverrideView = revPluginOverrideView;
