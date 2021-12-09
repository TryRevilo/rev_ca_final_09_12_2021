const revContactSellerForm_Widget = require("./rev_form_view_widgets/revContactSellerForm_Widget");

var revPluginOverrideView = () => {
    return {
        "rev_plugin_name": "rev_plugin_stores",
        "revNameId": "revContactSellerForm",
        "revOverrideView": revContactSellerForm_Widget.revFormViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_stores/rev_views/rev_forms/rev_form_view_widgets/revContactSellerForm_Widget.css']
    };
};

module.exports.revPluginOverrideView = revPluginOverrideView;
