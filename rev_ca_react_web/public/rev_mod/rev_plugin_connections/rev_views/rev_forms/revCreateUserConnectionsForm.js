const revCreateUserConnectionsFormWidget = require("./rev_form_view_widgets/revCreateUserConnectionsFormWidget");

var revPluginOverrideView = () => {
    return {
        "rev_plugin_name": "rev_plugin_connections",
        "revNameId": "revCreateUserConnectionsForm",
        "revOverrideView": revCreateUserConnectionsFormWidget.revFormViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_connectionss/rev_views/rev_forms/rev_form_view_widgets/revCreateUserConnectionsFormWidget.css']
    };
};

module.exports.revPluginOverrideView = revPluginOverrideView;
