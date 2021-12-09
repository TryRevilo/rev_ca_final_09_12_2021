const revObjectPluginItemListing = require("./rev_views/rev_object_views/revObjectPluginItemListing");
const revPageViewListingPlugins = require("./rev_views/rev_page_views/revPageViewListingPlugins.js");

const revPluginInstallForm = require("./rev_views/rev_forms/revPluginInstallForm");

/** REV START REMOTE HOOK HANDLERS */
const revHookRemoteHandler_GetAllListedPlugins = require("./rev_lib_functions_hook_remote_handlers/revHookRemoteHandler_GetAllListedPlugins");
/** REV END REMOTE HOOK HANDLERS */

var revStart = () => {
    return {
        "revPluginName": "rev_plugin_plugins",
        "revPageViews": [revObjectPluginItemListing.revPluginPageView, revPageViewListingPlugins.revPluginPageView],
        "revContextViews": [],
        "revMenuItems": [],
        "revForms": [revPluginInstallForm.revPluginOverrideView],
        "revPluginHookContextsRemoteArr": ["revHookRemoteHandler_GetAllListedPlugins"],
        "revPluginHookHandlersRemote": [{ "revNameID": "revHookRemoteHandler_GetAllListedPlugins", "revPluginHookContextRemote": "revHookRemoteHandler_GetAllListedPlugins", "revHandler": revHookRemoteHandler_GetAllListedPlugins.revHookRemoteHandlerCallback.toString() }],
    };
};

module.exports.revStart = revStart;
