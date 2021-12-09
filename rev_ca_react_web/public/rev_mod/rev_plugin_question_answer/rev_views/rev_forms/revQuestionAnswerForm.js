const revQuestionAnswerForm_Widget = require("./rev_form_view_widgets/revQuestionAnswerForm_Widget");

var revPluginOverrideView = () => {
    return {
        "rev_plugin_name": "rev_plugin_question_answer",
        "revNameId": "revQuestionAnswer",
        "revOverrideView": revQuestionAnswerForm_Widget.revFormViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_kiwi/rev_views/rev_forms/rev_form_view_widgets/revQuestionAnswerForm_Widget.css']
    };
};

module.exports.revPluginOverrideView = revPluginOverrideView;
