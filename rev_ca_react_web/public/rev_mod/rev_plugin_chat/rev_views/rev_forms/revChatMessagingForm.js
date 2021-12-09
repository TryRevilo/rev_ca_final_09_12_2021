const revChatMessagingFormWidget = require('./rev_form_view_widgets/revChatMessagingFormWidget');

var revPluginOverrideView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_chat',
        'revNameId': 'rev_chat_message',
        'revOverrideView': revChatMessagingFormWidget.revFormViewWidget.toString(),
        'revMenuAreas': [],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_comments/rev_views/rev_forms/rev_form_view_widgets/revChatMessagingFormWidget.css']
    }
};

module.exports.revPluginOverrideView = revPluginOverrideView;