const revQuestionOverrideView_Widget = require("./rev_override_view_widgets/revQuestionOverrideView_Widget");

var revPluginOverrideView = () => {
    return {
        "rev_plugin_name": "rev_plugin_question_answer",
        "revNameId": "rev_question",
        "revOverrideView": revQuestionOverrideView_Widget.revPluginOverrideViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_question_answer/rev_views/rev_override_views/rev_override_view_widgets/revQuestionOverrideView_Widget.css']
    };
};

module.exports.revPluginOverrideView = revPluginOverrideView;
