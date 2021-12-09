const revSelectStoreWidget = require("./rev_form_view_widgets/revSelectStoreWidget");

var revPluginOverrideView = () => {
    return {
        "rev_plugin_name": "rev_plugin_stores",
        "revNameId": "revSelectStore",
        "revOverrideView": revSelectStoreWidget.revFormViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_stores/rev_views/rev_forms/rev_form_view_widgets/revSelectStoreWidget.css']
    };
};

module.exports.revPluginOverrideView = revPluginOverrideView;
