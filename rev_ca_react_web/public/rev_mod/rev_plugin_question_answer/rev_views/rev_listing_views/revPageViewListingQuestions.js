const revPageViewListingQuestionsWidget = require("./rev_page_view_widgets/revPageViewListingQuestions_Widget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_question_answer",
        "revNameId": "revPageViewListingQuestions",
        "revPageViewContainerName": "revPageViewListingQuestions",
        "revBefore": [],
        "revPageViewName": "revPageViewListingQuestions",
        "revPageView": revPageViewListingQuestionsWidget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_question_answer/rev_views/rev_page_views/rev_page_view_widgets/revPageViewListingQuestionsWidget.css']
    };
};

module.exports.revPluginPageView = revPluginPageView;
