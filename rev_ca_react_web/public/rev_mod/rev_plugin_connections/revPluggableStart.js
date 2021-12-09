const revConnectionRequestsNoticiasContextView = require("./rev_views/rev_context_views/revConnectionRequestsNoticiasContextView");

/** REV START FORMS */
const revCreateUserConnectionsForm = require("./rev_views/rev_forms/revCreateUserConnectionsForm");
const revFormView_ConnectionRequestsListing = require("./rev_views/rev_forms/revFormView_ConnectionRequestsListing");
/** REV END FORMS */

/** REV START PAGE VIEWS */
const revPageViewProfileConnections = require("./rev_views/rev_page_views/revPageViewProfileConnections");
const revPageViewListing_ConnectionRequests = require("./rev_views/rev_page_views/revPageViewListing_ConnectionRequests");
/** REV END PAGE VIEWS */

/** REV START REMOTE HOOK HANDLERS */
const revHookRemoteHandler_UpdateEntityRelationships = require("./rev_lib_functions_remote_hooks/revHookRemoteHandler_UpdateEntityRelationships");
const revHookRemoteHandler_LoadConnectionRequests = require("./rev_lib_functions_remote_hooks/revHookRemoteHandler_LoadConnectionRequests");
const revHookRemoteHandler_GetEntityConnRels = require("./rev_lib_functions_remote_hooks/revHookRemoteHandler_GetEntityConnRels");
const revHookRemoteHandler_GetConnRequestEntities = require("./rev_lib_functions_remote_hooks/revHookRemoteHandler_GetConnRequestEntities");
const revHookRemoteHandler_GetEntityConnections = require("./rev_lib_functions_remote_hooks/revHookRemoteHandler_GetEntityConnections");
/** REV END REMOTE HOOK HANDLERS */

/** REV START REMOTE ENV HOOK HANDLERS */
const revPluginHookRemoteEnvironment_UpdateConnectionRelationships = require("./rev_lib_functions_remote_env/revPluginHookRemoteEnvironment_UpdateConnectionRelationships");
const revPluginHookRemoteEnv_GetEntityConnRels = require("./rev_lib_functions_remote_env/revPluginHookRemoteEnv_GetEntityConnRels");
const revPluginHookRemoteEnvironment_GetEntityConns = require("./rev_lib_functions_remote_env/revPluginHookRemoteEnvironment_GetEntityConns");
/** REV END REMOTE ENV HOOK HANDLERS */

var revStart = () => {
    return {
        "revPluginName": "rev_plugin_connections",
        "revMenuItems": [],
        "revPageViews": [revPageViewProfileConnections.revPluginPageView, revPageViewListing_ConnectionRequests.revPluginPageView],
        "revContextViews": [revConnectionRequestsNoticiasContextView.revPluginOverrideView],
        "revDeleteOverrideViews": [],
        "revForms": [
            revCreateUserConnectionsForm.revPluginOverrideView,
            revFormView_ConnectionRequestsListing.revPluginPageView,
            /** */
        ],
        "revPluginHookContextsRemoteArr": ["revHookRemoteHandlerProfile", "revHookRemoteHandler_GetEntityConnRels"],
        "revPluginHookHandlersRemote": [
            { "revNameID": "revHookRemoteHandler_UpdateEntityRelationships", "revPresinctCall": "revPre_PersistenceCalls", "revPluginHookContextRemote": "revHookRemoteHandler_UpdateEntityRelationships", "revHandler": revHookRemoteHandler_UpdateEntityRelationships.revHookRemoteHandlerCallback.toString() },
            { "revNameID": "revHookRemoteHandler_LoadConnectionRequests", "revPluginHookContextRemote": "revHookRemoteLoadNoticias", "revHandler": revHookRemoteHandler_LoadConnectionRequests.revHookRemoteHandlerCallback.toString() },
            { "revNameID": "revHookRemoteHandler_GetEntityConnRels", "revPluginHookContextRemote": "revHookRemoteHandler_GetEntityConnRels", "revHandler": revHookRemoteHandler_GetEntityConnRels.revHookRemoteHandlerCallback.toString() },
            { "revNameID": "revHookRemoteHandler_GetConnRequestEntities", "revPluginHookContextRemote": "revHookRemoteHandler_GetConnRequestEntities", "revHandler": revHookRemoteHandler_GetConnRequestEntities.revHookRemoteHandlerCallback.toString() },
            { "revNameID": "revHookRemoteHandler_GetEntityConnections", "revPluginHookContextRemote": "revHookRemoteHandler_GetEntityConnections", "revHandler": revHookRemoteHandler_GetEntityConnections.revHookRemoteHandlerCallback.toString() },
            /** */
        ],
        "revPluginHookHandlersRemoteEnvironment": [
            { "revNameID": "revPluginHookRemoteEnvironment_UpdateConnectionRelationships", "revHandler": revPluginHookRemoteEnvironment_UpdateConnectionRelationships.revHookRemoteHandlerCallback.toString() },
            { "revNameID": "revPluginHookRemoteEnv_GetEntityConnRels", "revHandler": revPluginHookRemoteEnv_GetEntityConnRels.revHookRemoteHandlerCallback.toString() },
            { "revNameID": "revPluginHookRemoteEnvironment_GetEntityConns", "revHandler": revPluginHookRemoteEnvironment_GetEntityConns.revHookRemoteHandlerCallback.toString() },
            /** */
        ],
    };
};

module.exports.revStart = revStart;
