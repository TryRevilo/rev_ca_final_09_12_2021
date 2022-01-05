const revVideosListingOverrideView = require("./rev_views/rev_override_views/revVideosListingOverrideView");
const revVideo = require("./rev_views/rev_context_views/revVideo");

const revObjectVideoView = require("./rev_views/rev_object_views/revObjectVideoView");

/** REV START REMOTE HOOK HANDLERS */
const revHookRemoteHandler_VideoClick = require("./rev_lib_functions_remote_hooks/revHookRemoteHandler_VideoClick");
const revHookRemoteHandler_VideoPlayCount = require("./rev_lib_functions_remote_hooks/revHookRemoteHandler_VideoPlayCount");
/** REV END REMOTE HOOK HANDLERS */

/** REV START REMOTE PRE-PLUGIN INIT */
const revPrePluginInit_TrendingVids = require("../rev_plugin_videos/rev_lib_functions_remote_pre_plugin_init/revPrePluginInit_TrendingVids");
/** REV END REMOTE PRE-PLUGIN INIT */

var revStart = () => {
    return {
        "revPluginName": "rev_plugin_videos",
        "revMenuAreas": [],
        "revPageViews": [revObjectVideoView.revPluginPageView],
        "revOverrideViews": [revVideosListingOverrideView.revPluginOverrideView],
        "revContextViews": [revVideo.revContextView],
        "revModules": [
            { "revNameId": "revPluginModuleVideoAlbumPers", "revPath": "/revPluginModuleVideoAlbumPers.js" },
            { "revNameId": "revPluginModuleVideoCaptionGenerator", "revPath": "/revPluginModuleVideoCaptionGenerator.js" },
            // { "revNameId": "revPluginModuleVideoPlayStatsLib", "revPath": "/revPluginModuleVideoPlayStatsLib.js" },
        ],
        "revRemotePrePluginInitArr": [revPrePluginInit_TrendingVids.revPrePluginInitCallback.toString()],
        "revPluginHookHandlersRemote": [
            { "revNameID": "revHookRemoteHandler_VideoClick", "revPluginHookContextRemote": "revHookRemoteHandler_VideoClick", "revHandler": revHookRemoteHandler_VideoClick.revHookRemoteHandlerCallback.toString() },
            { "revNameID": "revHookRemoteHandler_VideoPlayCount", "revPluginHookContextRemote": "revHookRemoteHandler_VideoPlayCount", "revHandler": revHookRemoteHandler_VideoPlayCount.revHookRemoteHandlerCallback.toString() },
            /** */
        ],
    };
};

module.exports.revStart = revStart;
