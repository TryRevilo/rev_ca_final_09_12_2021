/** REV START OVERRIDE VIEWS */
const revPhotosListingOverrideView = require("./rev_views/rev_override_views/revPhotosListingOverrideView");
/** REV END OVERRIDE VIEWS */

/** REV START REMOTE HANDLERS */
const revHookRemoteHandler_SearchFilter_PhotoAlbums = require("./rev_lib_functions_remote_hooks/revHookRemoteHandler_SearchFilter_PhotoAlbums");
/** REV END REMOTE HANDLERS */

var revStart = () => {
    return {
        "revPluginName": "rev_plugin_photos",
        "revMenuAreas": [],
        "revOverrideViews": [revPhotosListingOverrideView.revPluginOverrideView],
        "revModules": [{ "revNameId": "revPluginModulePicsAlbumPers", "revPath": "/revPluginModulePicsAlbumPers.js" }],
        "revPluginHookContextsRemoteArr": ["revHookRemoteHandler_SearchFilter_PhotoAlbums"],
        "revPluginHookHandlersRemote": [
            { "revNameID": "revHookRemoteHandler_SearchFilter_PhotoAlbums", "revPluginHookContextRemote": "revHookRemoteHandler_SearchFilter_PhotoAlbums", "revHandler": revHookRemoteHandler_SearchFilter_PhotoAlbums.revHookRemoteHandlerCallback.toString(), "revRemoteAfter": ["revHookRemoteHandler_GetFullTextSearchEntities"] },
            /** */
        ],
    };
};

module.exports.revStart = revStart;
