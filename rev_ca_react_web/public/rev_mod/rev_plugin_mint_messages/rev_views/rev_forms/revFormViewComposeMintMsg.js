const revFormViewComposeMintMsgWidget = require("./rev_form_view_widgets/revFormViewComposeMintMsgWidget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_mint_messages",
        "revNameId": "revFormViewComposeMintMsg",
        "revOverrideView": revFormViewComposeMintMsgWidget.revFormViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        "revCSSFiles": [],
    };
};

module.exports.revPluginPageView = revPluginPageView;
