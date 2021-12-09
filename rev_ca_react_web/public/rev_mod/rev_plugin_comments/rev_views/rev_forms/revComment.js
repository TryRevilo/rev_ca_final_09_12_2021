const revCommentWidget = require("./rev_form_view_widgets/revCommentWidget");

var revPluginOverrideView = () => {
    return {
        "rev_plugin_name": "rev_plugin_comments",
        "revNameId": "rev_comment",
        "revOverrideView": revCommentWidget.revFormViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_comments/rev_views/rev_forms/rev_form_view_widgets/revCommentWidget.css']
    };
};

module.exports.revPluginOverrideView = revPluginOverrideView;
