const revFormView_FamilyConnectionRequestsListing_Widget = require("./rev_form_view_widgets/revFormView_FamilyConnectionRequestsListing_Widget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_space_family",
        "revNameId": "revFormView_FamilyConnectionRequestsListing",
        "revOverrideView": revFormView_FamilyConnectionRequestsListing_Widget.revFormViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        "revCSSFiles": [],
    };
};

module.exports.revPluginPageView = revPluginPageView;
