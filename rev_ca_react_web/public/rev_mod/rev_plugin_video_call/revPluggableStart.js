const revMenuItemVideoCallsTab = require("./rev_views/rev_menu_items/revMenuItemVideoCallsTab");

/** REV START REV PAGE VIEWS */
const revPageViewVideoCall = require("./rev_views/rev_page_views/revPageViewVideoCall");
const revPageViewIncomingVideoCall = require("./rev_views/rev_page_views/revPageViewIncomingVideoCall");
/** REV END REV PAGE VIEWS */

var revStart = () => {
    return {
        "revPluginName": "rev_plugin_video_call",
        "revPageViews": [revPageViewVideoCall.revPluginPageView, revPageViewIncomingVideoCall.revPluginPageView],
        "revMenuItems": [revMenuItemVideoCallsTab.revPluginMenuItem],
    };
};

module.exports.revStart = revStart;
