/** REV START OVERRIDE VIEWS */
const revQuestionOverrideView = require("./rev_views/rev_override_views/revQuestionOverrideView");
/** REV END OVERRIDE VIEWS */

/** REV START CONTEXT VIEWS */
const revContextViewSearchItemListing = require("./rev_views/rev_context_views/revContextViewSearchItemListing");
/** REV END CONTEXT VIEWS */

/** REV START PAGE VIEWS */
const revPageViewListingQuestions = require("./rev_views/rev_listing_views/revPageViewListingQuestions");
/** REV END PAGE VIEWS */

/** REV START OBJECT VIEWS */
const revObjectViewQuestion = require("./rev_views/rev_object_views/revObjectViewQuestion");
const revObjectViewQuestionItemListing = require("./rev_views/rev_object_views/revObjectViewQuestionItemListing");
const revObjectViewAnswerItemListing = require("./rev_views/rev_object_views/revObjectViewAnswerItemListing");
/** REV END OBJECT VIEWS */

/** REV START FORMS */
const revAskQuestionForm = require("./rev_views/rev_forms/revAskQuestionForm");
const revQuestionAnswerForm = require("./rev_views/rev_forms/revQuestionAnswerForm");
/** REV END FORMS */

/** REV START REMOTE HANDLERS */
const revHookRemoteHandler_GetSiteQuestions = require("./rev_lib_functions_remote_hooks/revHookRemoteHandler_GetSiteQuestions");
const revHookRemoteHandler_GetSiteAnswers = require("./rev_lib_functions_remote_hooks/revHookRemoteHandler_GetSiteAnswers");
const revHookRemoteHandler_UpdateQuestionViewsStats = require("./rev_lib_functions_remote_hooks/revHookRemoteHandler_UpdateQuestionViewsStats");
const revHookRemoteHandler_RevEntityTotQuestionAnswerProfileStats = require("./rev_lib_functions_remote_hooks/revHookRemoteHandler_RevEntityTotQuestionAnswerProfileStats");
const revHookRemoteHandler_AcceptQuestionAnswer = require("./rev_lib_functions_remote_hooks/revHookRemoteHandler_AcceptQuestionAnswer");
const revHookRemoteHandler_DeleteQuestionAnnPers = require("./rev_lib_functions_remote_hooks/revHookRemoteHandler_DeleteQuestionAnnPers");
/** REV END REMOTE HANDLERS */

/** REV START REMOTE ENV HOOK HANDLERS */
const revPluginHookRemoteEnvironment_QuestionStats = require("./rev_lib_functions_remote_env/revPluginHookRemoteEnvironment_QuestionStats");
const revPluginHookRemoteEnvironment_TotEntityQuestions_Answers_CountStats = require("./rev_lib_functions_remote_env/revPluginHookRemoteEnvironment_TotEntityQuestions_Answers_CountStats");
/** REV END REMOTE ENV HOOK HANDLERS */

var revStart = () => {
    return {
        "revPluginName": "rev_plugin_question_answer",
        "revOverrideViews": [revQuestionOverrideView.revPluginOverrideView],
        "revPageViews": [
            revPageViewListingQuestions.revPluginPageView,
            revObjectViewQuestion.revPluginPageView,
            revObjectViewQuestionItemListing.revPluginPageView,
            revObjectViewAnswerItemListing.revPluginPageView,
            /** */
        ],
        "revContextViews": [revContextViewSearchItemListing.revPluginOverrideView],
        "revMenuItems": [],
        "revForms": [revAskQuestionForm.revPluginOverrideView, revQuestionAnswerForm.revPluginOverrideView],
        "revPluginHookContextsRemoteArr": ["revHookRemoteContext_ReadQuestionsLists, revHookRemoteContext_GetSiteAnswers, revHookRemoteHandler_UpdateQuestionViewsStats"],
        "revPluginHookHandlersRemote": [
            { "revNameID": "revHookRemoteHandler_GetSiteQuestions", "revPluginHookContextRemote": "revHookRemoteContext_ReadQuestionsLists", "revHandler": revHookRemoteHandler_GetSiteQuestions.revHookRemoteHandlerCallback.toString() },
            { "revNameID": "revHookRemoteHandler_GetSiteAnswers", "revPluginHookContextRemote": "revHookRemoteContext_GetSiteAnswers", "revHandler": revHookRemoteHandler_GetSiteAnswers.revHookRemoteHandlerCallback.toString() },
            { "revNameID": "revHookRemoteHandler_UpdateQuestionViewsStats", "revPluginHookContextRemote": "revHookRemoteContext_UpdateQuestionViewsStats", "revHandler": revHookRemoteHandler_UpdateQuestionViewsStats.revHookRemoteHandlerCallback.toString() },
            { "revNameID": "revHookRemoteHandler_RevEntityTotQuestionAnswerProfileStats", "revPluginHookContextRemote": "revHookRemoteHandler_RevEntityTotQuestionAnswerProfileStats", "revHandler": revHookRemoteHandler_RevEntityTotQuestionAnswerProfileStats.revHookRemoteHandlerCallback.toString(), "revRemoteAfter": ["revHookRemoteHandlerProfile"] },
            { "revNameID": "revHookRemoteHandler_AcceptQuestionAnswer", "revPluginHookContextRemote": "revHookRemoteHandler_AcceptQuestionAnswer", "revHandler": revHookRemoteHandler_AcceptQuestionAnswer.revHookRemoteHandlerCallback.toString() },
            { "revNameID": "revHookRemoteHandler_DeleteQuestionAnnPers", "revPluginHookContextRemote": "revHookRemoteHandler_DeleteQuestionAnnPers", "revHandler": revHookRemoteHandler_DeleteQuestionAnnPers.revHookRemoteHandlerCallback.toString() },
        ],
        "revPluginHookHandlersRemoteEnvironment": [
            { "revNameID": "revPluginHookRemoteEnvironment_QuestionStats", "revHandler": revPluginHookRemoteEnvironment_QuestionStats.revHookRemoteHandlerCallback.toString() },
            { "revNameID": "revPluginHookRemoteEnvironment_TotEntityQuestions_Answers_CountStats", "revPluginHookContextRemote": "revPluginHookRemoteEnvironment_TotEntityQuestions_Answers_CountStats", "revHandler": revPluginHookRemoteEnvironment_TotEntityQuestions_Answers_CountStats.revHookRemoteHandlerCallback.toString() },
            /** */
        ],
    };
};

module.exports.revStart = revStart;
