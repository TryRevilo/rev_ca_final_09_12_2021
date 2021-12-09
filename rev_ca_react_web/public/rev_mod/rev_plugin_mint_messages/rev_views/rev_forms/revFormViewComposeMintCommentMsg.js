const revFormViewComposeMintCommentMsgWidget = require("./rev_form_view_widgets/revFormViewComposeMintCommentMsgWidget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_mint_messages",
        "revNameId": "revFormViewComposeMintCommentMsg",
        "revOverrideView": revFormViewComposeMintCommentMsgWidget.revFormViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        "revCSSFiles": [],
    };
};

module.exports.revPluginPageView = revPluginPageView;
