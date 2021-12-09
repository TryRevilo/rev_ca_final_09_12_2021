/** REV START FORMS */
const revTagsInputForm = require("./rev_views/rev_forms/revTagsInputForm");
/** REV END FORMS */

/** REV START LISTING PAGE VIEWS */
const brevPageViewListingTags = require("./rev_views/rev_listing_views/revPageViewListingTags");
/** REV END LISTING PAGE VIEWS */

var revStart = () => {
    return {
        "revPluginName": "rev_plugin_tags",
        "revPageViews": [brevPageViewListingTags.revPluginPageView],
        "revContextViews": [],
        "revMenuItems": [],
        "revForms": [revTagsInputForm.revPluginOverrideView],
        "revPluginHookContextsRemoteArr": [],
        "revPluginHookHandlersRemote": [],
        "revPluginHookHandlersRemoteEnvironment": [],
    };
};

module.exports.revStart = revStart;
