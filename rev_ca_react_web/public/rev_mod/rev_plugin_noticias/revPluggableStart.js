const revPageViewMainNoticiasViewArea = require("./rev_views/rev_page_views/revPageViewMainNoticiasViewArea.js");
const revNoticiaItemOverrideView = require("./rev_views/rev_override_views/revNoticiaItemOverrideView");

/** REV START OBJECT VIEWS */
const revFormViewNoticiaEntityListingConfirm = require("./rev_views/rev_forms/revFormViewNoticiaEntityListingConfirm");

var revStart = () => {
    return {
        "revPluginName": "rev_plugin_noticias",
        "revOverrideViews": [revNoticiaItemOverrideView.revPluginOverrideView],
        "revPageViews": [revPageViewMainNoticiasViewArea.revPluginPageView],
        "revMenuItems": [],
        "revForms": [revFormViewNoticiaEntityListingConfirm.revPluginPageView],
    };
};

module.exports.revStart = revStart;
