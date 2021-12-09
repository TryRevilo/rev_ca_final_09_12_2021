const revPaypalCardInputForm = require("./rev_form_view_widgets/revPaypalCardInputForm_Widget");

var revPluginOverrideView = () => {
    return {
        "rev_plugin_name": "rev_plugin_pay_pay_pal",
        "revNameId": "revPaypalCardInputForm",
        "revOverrideView": revPaypalCardInputForm.revFormViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_pay_pay_pal/rev_views/rev_forms/rev_form_view_widgets/revPaypalCardInputForm.css']
    };
};

module.exports.revPluginOverrideView = revPluginOverrideView;
