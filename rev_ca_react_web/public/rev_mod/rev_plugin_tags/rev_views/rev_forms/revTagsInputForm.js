const revTagsInputForm = require("./rev_form_view_widgets/revTagsInputForm_Widget");

var revPluginOverrideView = () => {
    return {
        "rev_plugin_name": "rev_plugin_tags",
        "revNameId": "revTagsInputForm",
        "revOverrideView": revTagsInputForm.revFormViewWidget.toString(),
        "revStyleSheetFile": "",
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_tags/rev_views/rev_forms/rev_form_view_widgets/revTagsInputForm.css']
    };
};

module.exports.revPluginOverrideView = revPluginOverrideView;
