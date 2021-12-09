const revContextViewSearchItemListing_Widget = require("./rev_override_view_widgets/revContextViewSearchItemListing_Widget");

var revPluginOverrideView = () => {
    return {
        "rev_plugin_name": "rev_plugin_question_answer",
        "revNameId": "rev_question",
        "revContexts": ["revContextViewSearchItemListing"],
        "revContextView": revContextViewSearchItemListing_Widget.revPageViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_question_answer/rev_views/rev_override_views/rev_override_view_widgets/revContextViewSearchItemListing_Widget.css']
    };
};

module.exports.revPluginOverrideView = revPluginOverrideView;
