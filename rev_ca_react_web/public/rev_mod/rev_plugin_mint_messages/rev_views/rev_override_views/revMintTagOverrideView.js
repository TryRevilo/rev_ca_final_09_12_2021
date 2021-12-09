const revMintTagOverrideViewWidget = require("./rev_override_view_widgets/revMintTagOverrideViewWidget");

var revPluginOverrideView = () => {
    return {
        "rev_plugin_name": "rev_plugin_mint_messages",
        "revNameId": "revMintTagOverrideView",
        "revOverrideView": revMintTagOverrideViewWidget.revPluginOverrideViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_mint_messages/rev_views/rev_override_views/rev_override_view_widgets/revMintTagOverrideViewWidget.css']
    };
};

module.exports.revPluginOverrideView = revPluginOverrideView;
