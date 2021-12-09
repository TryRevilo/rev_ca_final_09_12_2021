/** REV START PAGE VIEWS */
const revPageViewStoreBriefInfo = require("./rev_views/rev_page_views/revPageViewStoreBriefInfo");
const revPageViewTimeLineStores = require("./rev_views/rev_page_views/revPageViewTimeLineStores");

const revPageViewTimeLineStoresWidget = require("./rev_views/rev_page_views/rev_page_view_widgets/revPageViewTimeLineStoresWidget");

const revPageViewListingStores = require("./rev_views/rev_listing_views/revPageViewListingStores");
/** REV END PAGE VIEWS */

/** REV START OBJECT VIEWS */
const revObjectViewStorePluginSplashPage = require("./rev_views/rev_object_views/revObjectViewStorePluginSplashPage");
const revObjectViewStore = require("./rev_views/rev_object_views/revObjectViewStore");
/** REV END OBJECT VIEWS */

/** REV START FORMS */
const revPageViewStoreItem = require("./rev_views/rev_page_views/revPageViewStoreItem");
const revStoreForm = require("./rev_views/rev_forms/revStore");
const revStoreItemForm = require("./rev_views/rev_forms/revStoreItem");
const revSelectStoreForm = require("./rev_views/rev_forms/revSelectStore");
const revContactSellerForm = require("./rev_views/rev_forms/revContactSellerForm");
/** REV START FORMS */

const revMenuItemTopBarStorePlugin = require("./rev_views/rev_menu_items/revMenuItemTopBarStorePlugin");
const revMenuItemTopBarStoreBookmarks = require("./rev_views/rev_menu_items/revMenuItemTopBarStoreBookmarks");

const revStoreOverrideView = require("./rev_views/rev_override_views/revStoreOverrideView");

/** REV START LOCAL LIB FUNCTIONS */
const revPluginInstallCallback = require("./rev_lib_functions/revPluginInstallCallback");
const revPluginRemoveCallback = require("./rev_lib_functions/revPluginRemoveCallback");
/** REV END LOCAL LIB FUNCTIONS */

/** REV START REMOTE HOOK HANDLERS */
const revHookRemoteHandler_DeleteEntityStorePlugin = require("./rev_lib_functions_hook_remote_handlers/revHookRemoteHandler_DeleteEntityStorePlugin");
const revHookRemoteHandler_UpdateStoreEntity = require("./rev_lib_functions_hook_remote_handlers/revHookRemoteHandler_UpdateStoreEntity");
const revHookRemoteHandler_GetStoreEntity = require("./rev_lib_functions_hook_remote_handlers/revHookRemoteHandler_GetStoreEntity");
const revHookRemoteHandler_GetListedStoreEntities = require("./rev_lib_functions_hook_remote_handlers/revHookRemoteHandler_GetListedStoreEntities");
const revHookRemoteHandler_GetListedStoreChildEntities = require("./rev_lib_functions_hook_remote_handlers/revHookRemoteHandler_GetListedStoreChildEntities");
/** REV END REMOTE HOOK HANDLERS */

var revStart = () => {
    return {
        "revPluginName": "rev_plugin_stores",
        "revPageViews": [
            revPageViewStoreItem.revPluginPageView,
            revPageViewStoreBriefInfo.revPluginPageView,
            revPageViewTimeLineStores.revPluginPageView,
            revPageViewListingStores.revPluginPageView,
            revObjectViewStorePluginSplashPage.revPluginPageView,
            revObjectViewStore.revPluginPageView,
            /** */
        ],
        "revOverrideViews": [revStoreOverrideView.revPluginOverrideView],
        "revContextViews": [],
        "revForms": [
            revStoreForm.revPluginOverrideView,
            revStoreItemForm.revPluginOverrideView,
            revSelectStoreForm.revPluginOverrideView,
            revContactSellerForm.revPluginOverrideView,
            /** */
        ],
        "revContextForms": [],
        "revMenuItems": [revMenuItemTopBarStorePlugin.revPluginMenuItem, revMenuItemTopBarStoreBookmarks.revPluginMenuItem],
        "revPluginHookHandlers": [
            { "revNameID": "revContextViewTimeLineStoresWidget", "revPluginHookName": "revTimelinePreTimelineHook", "revHandler": revPageViewTimeLineStoresWidget.revPageViewWidget.toString() },
            /** */
        ],
        "revPluginHookContextsRemoteArr": ["revHookRemoteHandler_DeleteEntityStorePlugin"],
        "revPluginHookHandlersRemote": [
            { "revNameID": "revHookRemoteHandler_DeleteEntityStorePlugin", "revPluginHookContextRemote": "revHookRemoteHandler_DeleteEntityStorePlugin", "revHandler": revHookRemoteHandler_DeleteEntityStorePlugin.revHookRemoteHandlerCallback.toString() },
            { "revNameID": "revHookRemoteHandler_UpdateStoreEntity", "revPresinctCall": "revPre_PersistenceCalls", "revPluginHookContextRemote": "revHookRemoteHandler_UpdateStoreEntity", "revHandler": revHookRemoteHandler_UpdateStoreEntity.revHookRemoteHandlerCallback.toString() },
            { "revNameID": "revHookRemoteHandler_GetStoreEntity", "revPluginHookContextRemote": "revHookRemoteHandler_GetStoreEntity", "revHandler": revHookRemoteHandler_GetStoreEntity.revHookRemoteHandlerCallback.toString() },
            { "revNameID": "revHookRemoteHandler_GetListedStoreEntities", "revPluginHookContextRemote": "revHookRemoteHandler_GetListedStoreEntities", "revHandler": revHookRemoteHandler_GetListedStoreEntities.revHookRemoteHandlerCallback.toString() },
            { "revNameID": "revHookRemoteHandler_GetListedStoreChildEntities", "revPluginHookContextRemote": "revHookRemoteHandler_GetListedStoreChildEntities", "revHandler": revHookRemoteHandler_GetListedStoreChildEntities.revHookRemoteHandlerCallback.toString() },
            /** */
        ],
        "revManifest": {
            "revName": "Store / Shop",
            "revId": "rev_store",
            "revAuthor": "Oliver Muchai",
            "revVersion": "1.0",
            "revCategory": ["Esxtension Module"],
            "revDescription": "Adds merchant capabilities. It enables you to Create and Manage Stores from which you can List and Sell Products",
            "revCopyright": "1.0",
            "revPrice": "FREE - Includes Paid Features",
            "revLicence": "GNU General Public License version 2",
            "revDependencies": [],
            "revActiveState": "revCustomInstall",
            "revPluginInstallCallback": revPluginInstallCallback.revPluginInstallCallback.toString(),
            "revPluginRemoveCallback": revPluginRemoveCallback.revPluginRemoveCallback.toString(),
        },
    };
};

module.exports.revStart = revStart;
