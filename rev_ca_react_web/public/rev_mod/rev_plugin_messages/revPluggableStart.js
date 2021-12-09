const revMenuItemMessagesTab = require('./rev_views/rev_menu_items/revMenuItemMessagesTab');
const revInlineFormComposeMessage = require('./rev_views/rev_forms/revInlineFormComposeMessage');

const revNewMsgHook = require('./rev_lib_functions/revNewMsgHook');

const revHookRemoteHandlerNewMessagesPers = require('./rev_lib_functions/revHookRemoteHandlerNewMessagesPers');

var revStart = () => {
    return {
        'revPluginName': 'rev_plugin_messages',
        'revMenuItems': [
            // revMenuItemMessagesTab.revPluginMenuItem
        ],
        'revForms': [
            revInlineFormComposeMessage.revPluginOverrideView
        ],
        'revPluginHookHandlers': [
            { 'revNameID': 'revNewMsgHook', 'revPluginHookName': 'revRemotePersHookNewMsg', 'revHandler': revNewMsgHook.revHookRemoteHandlerCallback.toString() },
        ],
        'revPluginHookContextsRemoteArr': ['revHookRemoteNewEntityPers'],
        'revPluginHookHandlersRemote': [
            { 'revNameID': 'revHookRemoteHandlerNewMessagesPers', 'revPluginHookContextRemote': 'revHookRemoteNewEntityPers', 'revHandler': revHookRemoteHandlerNewMessagesPers.revHookRemoteHandlerCallback.toString() },
        ],
    }
};

module.exports.revStart = revStart;