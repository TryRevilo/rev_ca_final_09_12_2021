/** REV START MENU AREAS */
const revMenuAreaFamilyConnectionType = require("./rev_views/rev_menu_areas/revMenuAreaFamilyConnectionType");
/** REV END MENU AREAS */

/** REV START OVERRIDE VIEWS */
const revFamilyKiwiOverrideView = require("./rev_views/rev_override_views/revFamilyKiwiOverrideView");
/** REV END OVERRIDE VIEWS */

/** REV START PAGE VIEWS */
const revPageViewSpaceHeaderArea_Family = require("./rev_views/rev_page_views/revPageViewSpaceHeaderArea_Family");
const revPageViewSpaceProfilePage_Family = require("./rev_views/rev_page_views/revPageViewSpaceProfilePage_Family");
const revPageViewFamilyConnections = require("./rev_views/rev_page_views/revPageViewFamilyConnections");
const revPageViewFamilyParentConnections = require("./rev_views/rev_page_views/revPageViewFamilyParentConnections");
const revPageViewFamilySiblingConnections = require("./rev_views/rev_page_views/revPageViewFamilySiblingConnections");
const revPageViewFamilyGrandParentsConnections = require("./rev_views/rev_page_views/revPageViewFamilyGrandParentsConnections");
const revPageViewFamilyCousinsConnection = require("./rev_views/rev_page_views/revPageViewFamilyCousinsConnection");
const revPageViewFamilyOtherConnections = require("./rev_views/rev_page_views/revPageViewFamilyOtherConnections");
const revPageViewFamilyFriendsConnections = require("./rev_views/rev_page_views/revPageViewFamilyFriendsConnections");

const revPageViewListing_FamilyConnectionRequests = require("./rev_views/rev_listing_views/revPageViewListing_FamilyConnectionRequests");
/** REV END PAGE VIEWS */

/** REV START CONTEXT VIEWS */
const revPageViewSpaceBriefInfo_Family = require("./rev_views/rev_context_views/revPageViewSpaceBriefInfo_Family");
const revFamilyConnectionRequestsNoticiasContextView = require("./rev_views/rev_context_views/revFamilyConnectionRequestsNoticiasContextView");
const revPageViewSpaceActivity_Family = require("./rev_views/rev_context_views/revPageViewSpaceActivity_Family");
/** REV END CONTEXT VIEWS */

/** REV START FORMS */
const revFormViewComposeFamilyKiwi = require("./rev_views/rev_forms/revFormViewComposeFamilyKiwi");
const revSpaceType_Family = require("./rev_views/rev_forms/revSpaceType_Family");
const revSpace_FamilyForm = require("./rev_views/rev_forms/revSpace_Family");
const revCreateNewFamilyRelationshipForm = require("./rev_views/rev_forms/revCreateNewFamilyRelationshipForm");
const revFormView_FamilyConnectionRequestsListing = require("./rev_views/rev_forms/revFormView_FamilyConnectionRequestsListing");
/** REV END FORMS */

/** REV START REMOTE ENV HOOK HANDLERS */
const revPluginHookRemoteEnv_RequestFamilyConn = require("./rev_lib_functions_remote_env/revPluginHookRemoteEnv_RequestFamilyConn");
/** REV END REMOTE ENV HOOK HANDLERS */

/** REV START REMOTE HOOK HANDLERS */
const revHookRemoteHandler_createNewFamilyKiwi = require("./rev_lib_functions_hook_remote_handlers/revHookRemoteHandler_createNewFamilyKiwi");
const revHookRemoteHandler_readFamilyKiwi = require("./rev_lib_functions_hook_remote_handlers/revHookRemoteHandler_readFamilyKiwi");
const revHookRemoteHandler_Create_Update_Del_FamilyRel = require("./rev_lib_functions_hook_remote_handlers/revHookRemoteHandler_Create_Update_Del_FamilyRel");

const revHookRemoteHandler_ReadFamilyEntityRels = require("./rev_lib_functions_hook_remote_handlers/revHookRemoteHandler_ReadFamilyEntityRels");
const revHookRemoteHandler_LoadFamilyConnectionRequests = require("./rev_lib_functions_hook_remote_handlers/revHookRemoteHandler_LoadFamilyConnectionRequests");
const revHookRemoteHandler_GetFamilyConnRequestEntities = require("./rev_lib_functions_hook_remote_handlers/revHookRemoteHandler_GetFamilyConnRequestEntities");
/** REV END REMOTE HOOK HANDLERS */

var revStart = () => {
    return {
        "revPluginName": "rev_plugin_space_family",
        "revOverrideViews": [revFamilyKiwiOverrideView.revPluginOverrideView],
        "revPageViews": [
            revPageViewSpaceHeaderArea_Family.revPluginPageView,
            revPageViewSpaceProfilePage_Family.revPluginPageView,
            revPageViewFamilyConnections.revPluginPageView,
            revPageViewFamilyParentConnections.revPluginPageView,
            revPageViewFamilySiblingConnections.revPluginPageView,
            revPageViewFamilyGrandParentsConnections.revPluginPageView,
            revPageViewFamilyCousinsConnection.revPluginPageView,
            revPageViewFamilyFriendsConnections.revPluginPageView,
            revPageViewFamilyOtherConnections.revPluginPageView,

            revPageViewListing_FamilyConnectionRequests.revPluginPageView,
        ],
        "revContextViews": [
            revPageViewSpaceBriefInfo_Family.revContextView,
            revFamilyConnectionRequestsNoticiasContextView.revContextView,
            revPageViewSpaceActivity_Family.revContextView,
            /** */
        ],
        "revForms": [
            revFormViewComposeFamilyKiwi.revPluginPageView,
            revSpaceType_Family.revPluginOverrideView,
            revSpace_FamilyForm.revPluginOverrideView,
            revCreateNewFamilyRelationshipForm.revPluginOverrideView,
            revFormView_FamilyConnectionRequestsListing.revPluginPageView,
            /** */
        ],
        "revMenuItems": [revMenuAreaFamilyConnectionType.revPluginMenuArea],
        "revModules": [{ "revNameId": "revPluginModuleFamilyRelationships", "revPath": "/revPluginModuleFamilyRelationships.js" }],
        "revPluginHookContextsRemoteArr": ["revHookRemoteHandler_Create_Update_Del_FamilyRel", "revHookRemoteHandler_ReadFamilyEntityRels"],
        "revPluginHookHandlersRemote": [
            { "revNameID": "revHookRemoteHandler_createNewFamilyKiwi", "revPresinctCall": "revPre_PersistenceCalls", "revPluginHookContextRemote": "revHookRemoteHandler_createNewFamilyKiwi", "revHandler": revHookRemoteHandler_createNewFamilyKiwi.revHookRemoteHandlerCallback.toString() },
            { "revNameID": "revHookRemoteHandler_readFamilyKiwi", "revPluginHookContextRemote": "revHookRemoteHandler_readFamilyKiwi", "revHandler": revHookRemoteHandler_readFamilyKiwi.revHookRemoteHandlerCallback.toString() },
            { "revNameID": "revHookRemoteHandler_Create_Update_Del_FamilyRel", "revPresinctCall": "revPre_PersistenceCalls", "revPluginHookContextRemote": "revHookRemoteHandler_Create_Update_Del_FamilyRel", "revHandler": revHookRemoteHandler_Create_Update_Del_FamilyRel.revHookRemoteHandlerCallback.toString() },
            { "revNameID": "revHookRemoteHandler_ReadFamilyEntityRels", "revPluginHookContextRemote": "revHookRemoteHandler_ReadFamilyEntityRels", "revHandler": revHookRemoteHandler_ReadFamilyEntityRels.revHookRemoteHandlerCallback.toString() },
            { "revNameID": "revHookRemoteHandler_LoadFamilyConnectionRequests", "revPluginHookContextRemote": "revHookRemoteLoadNoticias", "revHandler": revHookRemoteHandler_LoadFamilyConnectionRequests.revHookRemoteHandlerCallback.toString() },
            { "revNameID": "revHookRemoteHandler_LoadFamilyConnectionRequests", "revPluginHookContextRemote": "revHookRemoteHandler_LoadFamilyConnectionRequests", "revHandler": revHookRemoteHandler_LoadFamilyConnectionRequests.revHookRemoteHandlerCallback.toString() },
            { "revNameID": "revHookRemoteHandler_GetFamilyConnRequestEntities", "revPluginHookContextRemote": "revHookRemoteHandler_GetFamilyConnRequestEntities", "revHandler": revHookRemoteHandler_GetFamilyConnRequestEntities.revHookRemoteHandlerCallback.toString() },
            /** */
        ],
        "revPluginHookHandlersRemoteEnvironment": [
            { "revNameID": "revPluginHookRemoteEnv_RequestFamilyConn", "revHandler": revPluginHookRemoteEnv_RequestFamilyConn.revHookRemoteHandlerCallback.toString() },
            /** */
        ],
    };
};

module.exports.revStart = revStart;
