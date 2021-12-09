const revStoreItemWidget = require("./rev_form_view_widgets/revStoreItemWidget");

var revPluginOverrideView = () => {
    return {
        "rev_plugin_name": "rev_plugin_stores",
        "revNameId": "revStoreItem",
        "revOverrideView": revStoreItemWidget.revFormViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_stores/rev_views/rev_forms/rev_form_view_widgets/revStoreItemWidget.css']
    };
};

module.exports.revPluginOverrideView = revPluginOverrideView;
