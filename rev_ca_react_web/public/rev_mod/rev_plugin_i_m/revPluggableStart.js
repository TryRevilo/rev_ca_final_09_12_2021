const revObjectViewIM = require("./rev_views/rev_object_views/revObjectViewIM");
const revListPageViewImMessages = require("./rev_views/rev_page_views/revListPageViewImMessages");
const revMenuItemCommsServicesIM = require("./rev_views/rev_menu_items/revMenuItemCommsServicesIM");
const revObjectSenderImMessagesListing = require("./rev_views/rev_object_views/revObjectSenderImMessagesListing");

/** REV START REMOTE HOOK HANDLERS */
const revHookRemoteHandler_GetNewMsgsStats = require("./rev_lib_functions_remote_hooks/revHookRemoteHandler_GetNewMsgsStats");
/** REV END REMOTE HOOK HANDLERS */

var revStart = () => {
    return {
        "revPluginName": "rev_plugin_i_m",
        "revPageViews": [revObjectViewIM.revPluginPageView, revListPageViewImMessages.revPluginPageView, revObjectSenderImMessagesListing.revPluginPageView],
        "revMenuItems": [revMenuItemCommsServicesIM.revPluginMenuItem],
        "revPluginHookHandlersRemote": [
            { "revNameID": "revHookRemoteHandler_GetNewMsgsStats", "revPluginHookContextRemote": "revHookRemoteHandler_GetNewMsgsStats", "revHandler": revHookRemoteHandler_GetNewMsgsStats.revHookRemoteHandlerCallback.toString() },
            /** */
        ],
    };
};

module.exports.revStart = revStart;
