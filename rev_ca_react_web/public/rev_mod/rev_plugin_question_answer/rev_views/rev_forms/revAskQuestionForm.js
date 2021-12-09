const revAskQuestionForm_Widget = require("./rev_form_view_widgets/revAskQuestionForm_Widget");

var revPluginOverrideView = () => {
    return {
        "rev_plugin_name": "rev_plugin_question_answer",
        "revNameId": "revQuestion",
        "revOverrideView": revAskQuestionForm_Widget.revFormViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_kiwi/rev_views/rev_forms/rev_form_view_widgets/revAskQuestionForm_Widget.css']
    };
};

module.exports.revPluginOverrideView = revPluginOverrideView;
