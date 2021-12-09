const revMintConversationOverrideViewWidget = require("./rev_override_view_widgets/revMintConversationOverrideViewWidget");

var revPluginOverrideView = () => {
    return {
        "rev_plugin_name": "rev_plugin_mint_messages",
        "revNameId": "revMintConversationOverrideView",
        "revOverrideView": revMintConversationOverrideViewWidget.revPluginOverrideViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_mint_messages/rev_views/rev_override_views/rev_override_view_widgets/revMintConversationOverrideViewWidget.css']
    };
};

module.exports.revPluginOverrideView = revPluginOverrideView;
