const revPublisherFormWidget = require("./rev_form_view_widgets/revPublisherFormWidget");

var revPluginOverrideView = () => {
    return {
        "rev_plugin_name": "rev_plugin_core",
        "revNameId": "revPublisherForm",
        "revOverrideView": revPublisherFormWidget.revFormViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_cores/rev_views/rev_forms/rev_form_view_widgets/revPublisherFormWidget.css']
    };
};

module.exports.revPluginOverrideView = revPluginOverrideView;
