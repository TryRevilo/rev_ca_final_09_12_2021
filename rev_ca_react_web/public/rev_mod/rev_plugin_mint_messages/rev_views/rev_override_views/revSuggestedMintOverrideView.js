const revSuggestedMintOverrideViewWidget = require("./rev_override_view_widgets/revSuggestedMintOverrideViewWidget");

var revPluginOverrideView = () => {
    return {
        "rev_plugin_name": "rev_plugin_mint_messages",
        "revNameId": "revSuggestedMintOverrideView",
        "revOverrideView": revSuggestedMintOverrideViewWidget.revPluginOverrideViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_kiwi/rev_views/rev_override_views/rev_override_view_widgets/revSuggestedMintOverrideViewWidget.css']
    };
};

module.exports.revPluginOverrideView = revPluginOverrideView;
