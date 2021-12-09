/** REV START MENU ITEMS */
const revMenuItemSearchPageEntityTab = require("./rev_views/rev_menu_items/revMenuItemSearchPageEntityTab");
/** REV END MENU ITEMS */

/** REV START LISTING VIES */
const revPageViewListingSerachResults = require("./rev_views/rev_listing_views/revPageViewListingSerachResults");
/** REV END LISTING VIES */

/** REV START FORMS */
const revFormViewContextSearch = require("./rev_views/rev_forms/revFormViewContextSearch");
const revFormViewSearchTxtInput = require("./rev_views/rev_forms/revFormViewSearchTxtInput");
/** REV END FORMS */

/** REV START REMOTE HOOK HANDLERS */
const revHookRemoteHandler_GetFullTextSearchEntities = require("./rev_lib_functions_hook_remote_handlers/revHookRemoteHandler_GetFullTextSearchEntities");
/** REV END REMOTE HOOK HANDLERS */

var revStart = () => {
    return {
        "revPluginName": "rev_plugin_search",
        "revMenuItems": [revMenuItemSearchPageEntityTab.revPluginMenuItem],
        "revForms": [revFormViewContextSearch.revPluginPageView, revFormViewSearchTxtInput.revPluginPageView],
        "revPageViews": [revPageViewListingSerachResults.revPluginPageView],
        "revModules": [],
        "revPluginHookContextsRemoteArr": ["revHookRemoteHandler_GetFullTextSearchEntities"],
        "revPluginHookHandlersRemote": [{ "revNameID": "revHookRemoteHandler_GetFullTextSearchEntities", "revPluginHookContextRemote": "revHookRemoteHandler_GetFullTextSearchEntities", "revHandler": revHookRemoteHandler_GetFullTextSearchEntities.revHookRemoteHandlerCallback.toString() }],
    };
};

module.exports.revStart = revStart;
