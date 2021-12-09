const revObjectViewQuestionItemListingWidget = require("./rev_page_view_widgets/revObjectViewQuestionItemListingWidget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_question_answer",
        "revNameId": "revObjectViewQuestionItemListing",
        "revPageViewContainerName": "revObjectViewQuestionItemListing",
        "revBefore": [],
        "revPageViewName": "revObjectViewQuestionItemListing",
        "revPageView": revObjectViewQuestionItemListingWidget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
    };
};

module.exports.revPluginPageView = revPluginPageView;
