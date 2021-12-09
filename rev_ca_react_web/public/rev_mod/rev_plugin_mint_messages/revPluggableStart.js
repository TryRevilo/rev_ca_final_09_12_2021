/** REV START FORMS */
const revFormViewComposeMintMsg = require("./rev_views/rev_forms/revFormViewComposeMintMsg");
const revFormViewComposeMintCommentMsg = require("./rev_views/rev_forms/revFormViewComposeMintCommentMsg");
/** REV END FORMS */

/** REV START PAGE VIEWS */
const revPageViewMintMessages = require("./rev_views/rev_page_views/revPageViewMintMessages");
const revPageViewMintMessagesInline = require("./rev_views/rev_page_views/revPageViewMintMessagesInline");
/** REV END PAGE VIEWS */

/** REV START OBJECT VIEWS */
const revMintConversationObjectView = require("./rev_views/rev_object_views/revMintConversationObjectView");
/** REV END OBJECT VIEWS */

/** REV START OVERRIDE VIEWS */
const revSuggestedMintOverrideView = require("./rev_views/rev_override_views/revSuggestedMintOverrideView");
const revMintConversationOverrideView = require("./rev_views/rev_override_views/revMintConversationOverrideView");
const revMintTagOverrideView = require("./rev_views/rev_override_views/revMintTagOverrideView");
const revMintConversationAlertOverrideView = require("./rev_views/rev_override_views/revMintConversationAlertOverrideView");
/** REV END OVERRIDE VIEWS */

/** REV START REMOTE HOOK HANDLERS */
const revHookRemoteHandlerLogIn_MintMessages = require("./rev_libs_functions/revHookRemoteHandlerLogIn_MintMessages");
/** REV END REMOTE HOOK HANDLERS */

var revStart = () => {
    return {
        "revPluginName": "rev_plugin_mint_messages",
        "revOverrideViews": [revSuggestedMintOverrideView.revPluginOverrideView, revMintConversationOverrideView.revPluginOverrideView, revMintTagOverrideView.revPluginOverrideView, revMintConversationAlertOverrideView.revPluginOverrideView],
        "revPageViews": [revPageViewMintMessages.revPluginPageView, revPageViewMintMessagesInline.revPluginPageView, revMintConversationObjectView.revPluginPageView],
        "revContextViews": [],
        "revForms": [revFormViewComposeMintMsg.revPluginPageView, revFormViewComposeMintCommentMsg.revPluginPageView],
        "revContextForms": [],
        "revMenuItems": [],
        "revPluginHookHandlers": [],
        "revPluginHookContextsRemoteArr": ["revHookRemoteHandlerLogIn"],
        "revPluginHookHandlersRemote": [{ "revNameID": "revHookRemoteHandlerLogIn_MintMessages", "revPluginHookContextRemote": "revHookRemoteHandlerLogIn", "revHandler": revHookRemoteHandlerLogIn_MintMessages.revHookRemoteHandlerCallback.toString() }],
    };
};

module.exports.revStart = revStart;
