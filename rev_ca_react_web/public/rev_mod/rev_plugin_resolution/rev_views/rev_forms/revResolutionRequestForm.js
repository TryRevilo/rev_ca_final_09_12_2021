const revResolutionRequestForm_Widget = require("./rev_form_view_widgets/revResolutionRequestForm_Widget");

var revPluginOverrideView = () => {
    return {
        "rev_plugin_name": "rev_plugin_resolution",
        "revNameId": "revResolutionRequestForm",
        "revOverrideView": revResolutionRequestForm_Widget.revFormViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_resolution/rev_views/rev_forms/rev_form_view_widgets/revResolutionRequestForm_Widget.css']
    };
};

module.exports.revPluginOverrideView = revPluginOverrideView;
