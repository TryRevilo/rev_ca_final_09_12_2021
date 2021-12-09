const revObjectViewAnswerItemListing_Widget = require("./rev_page_view_widgets/revObjectViewAnswerItemListing_Widget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_question_answer",
        "revNameId": "revObjectViewAnswerItemListing",
        "revPageViewContainerName": "revObjectViewAnswerItemListing",
        "revBefore": [],
        "revPageViewName": "revObjectViewAnswerItemListing",
        "revPageView": revObjectViewAnswerItemListing_Widget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
    };
};

module.exports.revPluginPageView = revPluginPageView;
