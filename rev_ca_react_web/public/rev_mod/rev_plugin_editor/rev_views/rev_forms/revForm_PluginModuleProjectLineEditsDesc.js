const revForm_PluginModuleProjectLineEditsDesc_Widget = require("./rev_form_view_widgets/revForm_PluginModuleProjectLineEditsDesc_Widget");

var revPluginOverrideView = () => {
    return {
        "rev_plugin_name": "rev_plugin_editor",
        "revNameId": "revForm_PluginModuleProjectLineEditsDesc",
        "revOverrideView": revForm_PluginModuleProjectLineEditsDesc_Widget.revFormViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_editor/rev_views/rev_forms/rev_form_view_widgets/revForm_PluginModuleProjectLineEditsDesc_Widget.css']
    };
};

module.exports.revPluginOverrideView = revPluginOverrideView;
