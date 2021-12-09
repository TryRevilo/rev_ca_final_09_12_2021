const revFormViewContextSearchWidget = require("./rev_form_view_widgets/revFormViewContextSearchWidget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_mint_messages",
        "revNameId": "revFormViewContextSearch",
        "revOverrideView": revFormViewContextSearchWidget.revFormViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        "revCSSFiles": [],
    };
};

module.exports.revPluginPageView = revPluginPageView;
