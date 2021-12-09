const revChatMessagingSetingsFormWidget = require("./rev_form_view_widgets/revChatMessagingSetingsFormWidget");

var revPluginOverrideView = () => {
    return {
        "rev_plugin_name": "rev_plugin_chat",
        "revNameId": "revChatMessagingSetingsForm",
        "revOverrideView": revChatMessagingSetingsFormWidget.revFormViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_chat/rev_views/rev_forms/rev_form_view_widgets/revChatMessagingSetingsFormWidget.css']
    };
};

module.exports.revPluginOverrideView = revPluginOverrideView;
