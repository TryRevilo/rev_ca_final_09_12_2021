const revMenuItemSessionsTab = require("./rev_views/rev_menu_items/revMenuItemSessionsTab");
const revMenuItemLogOutTab = require("./rev_views/rev_menu_items/revMenuItemLogOutTab");
const revNewAccount = require("./rev_views/rev_forms/revNewAccount");
const revLogIn = require("./rev_views/rev_forms/revLogIn");
const revConfirmAccount = require("./rev_views/rev_forms/revConfirmAccount");

/** REV START REMOTE HOOK HANDLERS */
const revHookRemoteHandlerSendLoggedInPresenceToConnections = require("./rev_libs_functions/revHookRemoteHandlerSendLoggedInPresenceToConnections");
const revHookRemoteHandlerLogIn = require("./rev_libs_functions/revHookRemoteHandlerLogIn");
/** REV END REMOTE HOOK HANDLERS */

var revStart = () => {
    return {
        "revPluginName": "rev_plugin_sessions",
        "revMenuItems": [revMenuItemSessionsTab.revPluginMenuItem, revMenuItemLogOutTab.revPluginMenuItem],
        "revModules": [{ "revNameId": "revPluginModuleSessions", "revPath": "/revPluginModuleSessions.js" }],
        "revForms": [revNewAccount.revPluginOverrideView, revLogIn.revPluginOverrideView, revConfirmAccount.revPluginOverrideView],
        "revPluginHookContextsRemoteArr": ["revHookRemoteHandlerLogIn, revHookRemoteSendLoggedInPresenceToConnections"],
        "revPluginHookHandlersRemote": [
            { "revNameID": "revHookRemoteHandlerLogIn", "revPluginHookContextRemote": "revHookRemoteHandlerLogIn", "revHandler": revHookRemoteHandlerLogIn.revHookRemoteHandlerCallback.toString() },
            { "revNameID": "revHookRemoteHandlerSendLoggedInPresenceToConnections", "revPluginHookContextRemote": "revHookRemoteSendLoggedInPresenceToConnections", "revHandler": revHookRemoteHandlerSendLoggedInPresenceToConnections.revHookRemoteHandlerCallback.toString() },
            /** */
        ],
    };
};

module.exports.revStart = revStart;
