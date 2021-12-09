const revFormViewFilterPageContentSearch_Widget = require("./rev_form_view_widgets/revFormViewFilterPageContentSearch_Widget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_filter",
        "revNameId": "revFormViewFilterPageContentSearch",
        "revOverrideView": revFormViewFilterPageContentSearch_Widget.revFormViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        "revCSSFiles": [],
    };
};

module.exports.revPluginPageView = revPluginPageView;
