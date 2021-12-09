const revActivityKiwiOverrideView = require("./rev_views/rev_override_views/revActivityKiwiOverrideView");
const revKiwi = require("./rev_views/rev_forms/revKiwi");
const revKiwiDelete = require("./rev_views/rev_delete_override_views/revKiwiDelete");
const revMenuAreaKiwiItemListing = require("./rev_views/rev_menu_areas/revMenuAreaKiwiItemListing");

/** REV START CONTEXT VIEWS */
const revContextViewKiwiTimeLine = require("./rev_views/rev_context_views/revContextViewKiwiTimeLine");
const revContextViewKiwiRecomendation = require("./rev_views/rev_context_views/revContextViewKiwiRecomendation");
/** REV END CONTEXT VIEWS */

var revStart = () => {
    return {
        "revPluginName": "rev_plugin_kiwi",
        "revMenuItems": [revMenuAreaKiwiItemListing.revPluginMenuArea],
        "revOverrideViews": [revActivityKiwiOverrideView.revPluginOverrideView],
        "revContextViews": [revContextViewKiwiTimeLine.revContextView, revContextViewKiwiRecomendation.revContextView],
        "revDeleteOverrideViews": [revKiwiDelete.revDeleteOverrideView],
        "revForms": [revKiwi.revPluginOverrideView],
    };
};

module.exports.revStart = revStart;
