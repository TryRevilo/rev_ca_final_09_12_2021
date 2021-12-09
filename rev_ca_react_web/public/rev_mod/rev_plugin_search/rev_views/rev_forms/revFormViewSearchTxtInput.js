const revFormViewSearchTxtInputWidget = require("./rev_form_view_widgets/revFormViewSearchTxtInput_Widget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_mint_messages",
        "revNameId": "revFormViewSearchTxtInput",
        "revOverrideView": revFormViewSearchTxtInputWidget.revFormViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        "revCSSFiles": [],
    };
};

module.exports.revPluginPageView = revPluginPageView;
