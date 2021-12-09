const revFormViewNoticiaEntityListingConfirmWidget = require("./rev_form_view_widgets/revFormViewNoticiaEntityListingConfirmWidget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_noticias",
        "revNameId": "revFormViewNoticiaEntityListingConfirm",
        "revOverrideView": revFormViewNoticiaEntityListingConfirmWidget.revFormViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        "revCSSFiles": [],
    };
};

module.exports.revPluginPageView = revPluginPageView;
