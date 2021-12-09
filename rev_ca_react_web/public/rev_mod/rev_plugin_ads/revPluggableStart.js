const revPageViewCommsFooterAd = require("./rev_views/rev_page_views/revPageViewCommsFooterAd.js");
const revAdContextView = require("./rev_views/rev_context_views/revAd");

/** REV START FORM */
const revAd = require("./rev_views/rev_forms/revAd");
const revFormAdSettings = require("./rev_views/rev_forms/revFormAdSettings");
/** REV END FORM */

var revStart = () => {
    return {
        "revPluginName": "rev_plugin_ads",
        "revPageViews": [revPageViewCommsFooterAd.revPluginPageView],
        "revContextViews": [revAdContextView.revContextView],
        "revMenuItems": [],
        "revForms": [
            revAd.revPluginOverrideView,
            revFormAdSettings.revPluginOverrideView,
            /** */
        ],
    };
};

module.exports.revStart = revStart;
