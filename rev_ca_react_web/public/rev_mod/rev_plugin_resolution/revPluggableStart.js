/** REV START FORMS */
const revResolutionRequestForm = require("./rev_views/rev_forms/revResolutionRequestForm");
const revResolutionRequestAnswerForm = require("./rev_views/rev_forms/revResolutionRequestAnswerForm");
/** REV END FORMS */

/** REV START PAGE VIEWS */
const revObjectViewResolutionRequestItemListing = require("./rev_views/rev_object_views/revObjectViewResolutionRequestItemListing");
const revPageViewListingResolutions = require("./rev_views/rev_listing_views/revPageViewListingResolutions");
const revObjectViewResolutionRequest = require("./rev_views/rev_object_views/revObjectViewResolutionRequest");
const revObjectViewResolutionRequestAnswerItemListing = require("./rev_views/rev_object_views/revObjectViewResolutionRequestAnswerItemListing");
/** REV END PAGE VIEWS */

/** REV START REMOTE HANDLERS */
const revHookRemoteHandler_GetEntityResolutionRequests = require("./rev_lib_functions_remote_hooks/revHookRemoteHandler_GetEntityResolutionRequests");
const revHookRemote_UpdateResolutionRequestViewsStats = require("./rev_lib_functions_remote_hooks/revHookRemote_UpdateResolutionRequestViewsStats");
const revHookRemoteHandler_GetResolutionRequestAnswers = require("./rev_lib_functions_remote_hooks/revHookRemoteHandler_GetResolutionRequestAnswers");
/** REV END REMOTE HANDLERS */

/** REV START REMOTE ENV HOOK HANDLERS */
const revPluginHookRemoteEnvironment_ResolutionStats = require("./rev_lib_functions_remote_env/revPluginHookRemoteEnvironment_ResolutionStats");
/** REV END REMOTE ENV HOOK HANDLERS */

var revStart = () => {
    return {
        "revPluginName": "rev_plugin_resolution",
        "revPageViews": [
            revObjectViewResolutionRequestItemListing.revPluginPageView,
            revPageViewListingResolutions.revPluginPageView,
            revObjectViewResolutionRequest.revPluginPageView,
            revObjectViewResolutionRequestAnswerItemListing.revPluginPageView,
            /** */
        ],
        "revContextViews": [],
        "revForms": [
            revResolutionRequestForm.revPluginOverrideView,
            revResolutionRequestAnswerForm.revPluginOverrideView,
            /** */
        ],
        "revMenuItems": [],
        "revPluginHookContextsRemoteArr": [
            "revHookRemoteContext_GetEntityResolutionRequests",
            "revHookRemoteContext_GetResolutionRequestAnswers",
            /** */
        ],
        "revPluginHookHandlersRemote": [
            { "revNameID": "revHookRemoteHandler_GetEntityResolutionRequests", "revPluginHookContextRemote": "revHookRemoteContext_GetEntityResolutionRequests", "revHandler": revHookRemoteHandler_GetEntityResolutionRequests.revHookRemoteHandlerCallback.toString() },
            { "revNameID": "revHookRemote_UpdateResolutionRequestViewsStats", "revPluginHookContextRemote": "revHookRemoteContext_UpdateResolutionRequestViewsStats", "revHandler": revHookRemote_UpdateResolutionRequestViewsStats.revHookRemoteHandlerCallback.toString() },
            { "revNameID": "revHookRemoteHandler_GetResolutionRequestAnswers", "revPluginHookContextRemote": "revHookRemoteContext_GetResolutionRequestAnswers", "revHandler": revHookRemoteHandler_GetResolutionRequestAnswers.revHookRemoteHandlerCallback.toString() },
            /** */
        ],
        "revPluginHookHandlersRemoteEnvironment": [
            { "revNameID": "revPluginHookRemoteEnvironment_ResolutionStats", "revHandler": revPluginHookRemoteEnvironment_ResolutionStats.revHookRemoteHandlerCallback.toString() },
            /** */
        ],
    };
};

module.exports.revStart = revStart;
