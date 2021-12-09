const revFormAdSettings_Widget = require("./rev_form_view_widgets/revFormAdSettings_Widget");

var revPluginOverrideView = () => {
    return {
        "rev_plugin_name": "rev_plugin_ads",
        "revNameId": "revFormAdSettings",
        "revOverrideView": revFormAdSettings_Widget.revFormViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_ads/rev_views/rev_forms/rev_form_view_widgets/revFormAdSettings_Widget.css']
    };
};

module.exports.revPluginOverrideView = revPluginOverrideView;
