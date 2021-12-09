/** REV START OBJECT VIEWS */
const revObjectPluginItemListing = require("./rev_views/rev_object_views/revObjectPluginItemListing");
const revObject_PluginEditorHome = require("./rev_views/rev_object_views/revObject_PluginEditorHome");
const revObject_UserPluginProjects = require("./rev_views/rev_object_views/revObject_UserPluginProjects");
const revObject_PluginModuleProjectEditDetails = require("./rev_views/rev_object_views/revObject_PluginModuleProjectEditDetails");
const revObject_PluginModuleProjectEditActivity = require("./rev_views/rev_object_views/revObject_PluginModuleProjectEditActivity");
/** REV END OBJECT VIEWS */

/** REV START PAGE VIEWS */
const revPageViewListingPlugins = require("./rev_views/rev_page_views/revPageViewListingPlugins.js");
/** REV END PAGE VIEWS */

/** REV START FORMS */
const revFormPluginEditor = require("./rev_views/rev_forms/revFormPluginEditor");
const revFormStartNewPluginModuleEditsProject = require("./rev_views/rev_forms/revFormStartNewPluginModuleEditsProject");
const revForm_PluginModuleProjectLineEditsDesc = require("./rev_views/rev_forms/revForm_PluginModuleProjectLineEditsDesc");
/** REV END FORMS */

/** REV START MENU AREAS */
const revPluginHookHandlersRemote_MenuArea = require("./rev_views/rev_menu_areas/revPluginHookHandlersRemote_MenuArea");
const revPluginHookHandlers_MenuArea = require("./rev_views/rev_menu_areas/revPluginHookHandlers_MenuArea");
const revPluginHookHandlersRemoteEnvironment_MenuArea = require("./rev_views/rev_menu_areas/revPluginHookHandlersRemoteEnvironment_MenuArea");
const revEditorForm_MenuArea = require("./rev_views/rev_menu_areas/revEditorForm_MenuArea");
/** REV START MENU AREAS */

/** REV START REMOTE HOOK HANDLERS */
const revHookRemoteHandler_GetAllListedPlugins = require("./rev_lib_functions_hook_remote_handlers/revHookRemoteHandler_GetAllListedPlugins");
const revHookRemoteHandler_GetLoadedPlugin = require("./rev_lib_functions_hook_remote_handlers/revHookRemoteHandler_GetLoadedPlugin");
const revHookRemoteHandler_GetLoadedPluginsNamesArr = require("./rev_lib_functions_hook_remote_handlers/revHookRemoteHandler_GetLoadedPluginsNamesArr");
const revHookRemoteHandler_PluginFormPullCommit = require("./rev_lib_functions_hook_remote_handlers/revHookRemoteHandler_PluginFormPullCommit");
const revHookRemoteHandler_GetPluginPullProjects = require("./rev_lib_functions_hook_remote_handlers/revHookRemoteHandler_GetPluginPullProjects");
/** REV END REMOTE HOOK HANDLERS */

var revStart = () => {
    return {
        "revPluginName": "rev_plugin_editor",
        "revPageViews": [
            /** REV START OBJECT VIEWS */
            revObjectPluginItemListing.revPluginPageView,
            revObject_PluginEditorHome.revPluginPageView,
            revObject_UserPluginProjects.revPluginPageView,
            revObject_PluginModuleProjectEditDetails.revPluginPageView,
            revObject_PluginModuleProjectEditActivity.revPluginPageView,
            /** REV END OBJECT VIEWS */
            revPageViewListingPlugins.revPluginPageView,
            /** */
        ],
        "revContextViews": [],
        "revMenuItems": [
            /** REV START MENU AREAS */
            revPluginHookHandlersRemote_MenuArea.revPluginMenuArea,
            revPluginHookHandlers_MenuArea.revPluginMenuArea,
            revPluginHookHandlersRemoteEnvironment_MenuArea.revPluginMenuArea,
            revEditorForm_MenuArea.revPluginMenuArea,
        ],
        "revForms": [
            revFormPluginEditor.revPluginOverrideView,
            revFormStartNewPluginModuleEditsProject.revPluginOverrideView,
            revForm_PluginModuleProjectLineEditsDesc.revPluginOverrideView,
            /** */
        ],
        "revModules": [
            { "revNameId": "revPluginModule_PluginFormPullCommitLib", "revPath": "/revPluginModule_PluginFormPullCommitLib.js" },
            { "revNameId": "revPluginModule_MsMonacoEditor", "revPath": "/revPluginModule_MsMonacoEditor.js" },
            /** */
        ],
        "revPluginHookContextsRemoteArr": ["revHookRemoteHandler_GetAllListedPlugins"],
        "revPluginHookHandlersRemote": [
            { "revNameID": "revHookRemoteHandler_GetAllListedPlugins", "revPluginHookContextRemote": "revHookRemoteHandler_GetAllListedPlugins", "revHandler": revHookRemoteHandler_GetAllListedPlugins.revHookRemoteHandlerCallback.toString() },
            { "revNameID": "revHookRemoteHandler_GetLoadedPlugin", "revPluginHookContextRemote": "revHookRemoteHandler_GetLoadedPlugin", "revHandler": revHookRemoteHandler_GetLoadedPlugin.revHookRemoteHandlerCallback.toString() },
            { "revNameID": "revHookRemoteHandler_GetLoadedPluginsNamesArr", "revPluginHookContextRemote": "revHookRemoteHandler_GetLoadedPluginsNamesArr", "revHandler": revHookRemoteHandler_GetLoadedPluginsNamesArr.revHookRemoteHandlerCallback.toString() },
            { "revNameID": "revHookRemoteHandler_PluginFormPullCommit", "revPluginHookContextRemote": "revHookRemoteHandler_PluginFormPullCommit", "revHandler": revHookRemoteHandler_PluginFormPullCommit.revHookRemoteHandlerCallback.toString() },
            { "revNameID": "revHookRemoteHandler_GetPluginPullProjects", "revPluginHookContextRemote": "revHookRemoteHandler_GetPluginPullProjects", "revHandler": revHookRemoteHandler_GetPluginPullProjects.revHookRemoteHandlerCallback.toString() },
            /** */
        ],
    };
};

module.exports.revStart = revStart;
