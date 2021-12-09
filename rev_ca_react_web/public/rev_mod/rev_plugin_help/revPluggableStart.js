/** REV START FORMS */
/** REV END FORMS */

/** REV START PAGE VIEWS */
/** REV END PAGE VIEWS */

/** REV START LISTING VIEWS */
const revListingViewHelpTagTopics = require("./rev_views/rev_listing_views/revListingViewHelpTagTopics");
/** REV END LISTING VIEWS */

/** REV START REMOTE HOOK HANDLERS */
const revHookRemoteHandler_ReadHelpTagsEntities = require("./rev_lib_functions_hook_remote_handlers/revHookRemoteHandler_ReadHelpTagsEntities");
/** REV END REMOTE HOOK HANDLERS */

var revStart = () => {
    return {
        "revPluginName": "rev_plugin_help",
        "revMenuItems": [],
        "revForms": [],
        "revPageViews": [revListingViewHelpTagTopics.revPluginPageView],
        "revModules": [],
        "revPluginHookContextsRemoteArr": ["revHookRemoteHandler_ReadHelpTagsEntities"],
        "revPluginHookHandlersRemote": [{ "revNameID": "revHookRemoteHandler_ReadHelpTagsEntities", "revPluginHookContextRemote": "revHookRemoteHandler_ReadHelpTagsEntities", "revHandler": revHookRemoteHandler_ReadHelpTagsEntities.revHookRemoteHandlerCallback.toString() }],
    };
};

module.exports.revStart = revStart;
