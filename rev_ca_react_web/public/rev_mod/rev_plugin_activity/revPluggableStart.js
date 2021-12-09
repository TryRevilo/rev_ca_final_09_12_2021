/** REV START PAGE VIEWS */
const revPageViewActivity = require("./rev_views/rev_page_views/revPageViewActivity");
const revPageViewTimeline = require("./rev_views/rev_page_views/revPageViewTimeline");
const revPageViewAllPublicActivity = require("./rev_views/rev_page_views/revPageViewAllPublicActivity");
/** REV END PAGE VIEWS */

const revHookRemoteHandlerReadTimelineEntities = require("./rev_lib_functions/revHookRemoteHandlerReadTimelineEntities");

var revStart = () => {
    return {
        "revPluginName": "rev_plugin_activity",
        "revPageViews": [revPageViewActivity.revPluginPageView, revPageViewTimeline.revPluginPageView, revPageViewAllPublicActivity.revPluginPageView],
        "revPluginHookContextsRemoteArr": ["revHookRemoteReadTimelineEntities"],
        "revPluginHookHandlersRemote": [{ "revNameID": "revHookRemoteHandlerReadTimelineEntities", "revPluginHookContextRemote": "revHookRemoteReadTimelineEntities", "revHandler": revHookRemoteHandlerReadTimelineEntities.revHookRemoteHandlerCallback.toString() }],
    };
};

module.exports.revStart = revStart;
