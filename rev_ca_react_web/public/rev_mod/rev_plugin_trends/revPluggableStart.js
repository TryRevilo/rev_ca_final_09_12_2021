const revPageViewCommsViewAreaTrends = require("./rev_views/rev_page_views/revPageViewCommsViewAreaTrends.js");

/** REV START REMOTE HOOK HANDLERS */
const revHookRemoteHandler_GetTrendingVids = require("./rev_lib_functions_remote_hooks/revHookRemoteHandler_GetTrendingVids");
/** REV END REMOTE HOOK HANDLERS */

var revStart = () => {
    return {
        "revPluginName": "rev_plugin_trends",
        "revPageViews": [revPageViewCommsViewAreaTrends.revPluginPageView],
        "revMenuItems": [],
        "revPluginHookHandlersRemote": [
            { "revNameID": "revHookRemoteHandler_GetTrendingVids", "revPluginHookContextRemote": "revHookRemoteHandler_GetTrendingVids", "revHandler": revHookRemoteHandler_GetTrendingVids.revHookRemoteHandlerCallback.toString() },
            /** */
        ],
    };
};

module.exports.revStart = revStart;
