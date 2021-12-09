const revMintConversationAlertOverrideViewWidget = require("./rev_override_view_widgets/revMintConversationAlertOverrideViewWidget");

var revPluginOverrideView = () => {
    return {
        "rev_plugin_name": "rev_plugin_mint_messages",
        "revNameId": "revMintConversationAlertOverrideView",
        "revOverrideView": revMintConversationAlertOverrideViewWidget.revPluginOverrideViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_kiwi/rev_views/rev_override_views/rev_override_view_widgets/revMintConversationAlertOverrideViewWidget.css']
    };
};

module.exports.revPluginOverrideView = revPluginOverrideView;
