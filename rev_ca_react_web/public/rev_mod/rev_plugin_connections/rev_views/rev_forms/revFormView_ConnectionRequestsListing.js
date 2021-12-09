const revFormView_ConnectionRequestsListing_Widget = require("./rev_form_view_widgets/revFormView_ConnectionRequestsListing_Widget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_connections",
        "revNameId": "revFormView_ConnectionRequestsListing",
        "revOverrideView": revFormView_ConnectionRequestsListing_Widget.revFormViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        "revCSSFiles": [],
    };
};

module.exports.revPluginPageView = revPluginPageView;
