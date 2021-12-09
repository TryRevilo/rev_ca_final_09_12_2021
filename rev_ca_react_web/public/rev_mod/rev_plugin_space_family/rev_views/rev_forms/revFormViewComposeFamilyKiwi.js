const revFormViewComposeFamilyKiwi_Widget = require("./rev_form_view_widgets/revFormViewComposeFamilyKiwi_Widget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_space_family",
        "revNameId": "revFormViewComposeFamilyKiwi",
        "revOverrideView": revFormViewComposeFamilyKiwi_Widget.revFormViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        "revCSSFiles": [],
    };
};

module.exports.revPluginPageView = revPluginPageView;
