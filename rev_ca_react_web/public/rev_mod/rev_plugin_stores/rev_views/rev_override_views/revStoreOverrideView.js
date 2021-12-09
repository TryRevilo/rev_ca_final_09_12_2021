const revStoreOverrideView_Widget = require("./rev_override_view_widgets/revStoreOverrideView_Widget");

var revPluginOverrideView = () => {
    return {
        "rev_plugin_name": "rev_plugin_stores",
        "revNameId": "rev_store_item",
        "revOverrideView": revStoreOverrideView_Widget.revPluginOverrideViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_stores/rev_views/rev_override_views/rev_override_view_widgets/revStoreOverrideView_Widget.css']
    };
};

module.exports.revPluginOverrideView = revPluginOverrideView;
