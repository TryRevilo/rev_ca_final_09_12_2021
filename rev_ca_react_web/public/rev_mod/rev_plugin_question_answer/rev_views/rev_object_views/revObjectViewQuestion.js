const revObjectViewQuestionWidget = require("./rev_page_view_widgets/revObjectViewQuestionWidget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_question_answer",
        "revNameId": "revObjectViewQuestion",
        "revPageViewContainerName": "revObjectViewQuestion",
        "revBefore": [],
        "revPageViewName": "revObjectViewQuestion",
        "revPageView": revObjectViewQuestionWidget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
    };
};

module.exports.revPluginPageView = revPluginPageView;
