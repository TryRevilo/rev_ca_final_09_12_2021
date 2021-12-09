const revResolutionRequestAnswerForm_Widget = require("./rev_form_view_widgets/revResolutionRequestAnswerForm_Widget");

var revPluginOverrideView = () => {
    return {
        "rev_plugin_name": "rev_plugin_resolution",
        "revNameId": "revResolutionRequestAnswerForm",
        "revOverrideView": revResolutionRequestAnswerForm_Widget.revFormViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_resolution/rev_views/rev_forms/rev_form_view_widgets/revResolutionRequestAnswerForm_Widget.css']
    };
};

module.exports.revPluginOverrideView = revPluginOverrideView;
