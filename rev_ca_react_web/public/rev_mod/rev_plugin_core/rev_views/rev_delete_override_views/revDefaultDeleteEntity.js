const revDefaultDeleteEntity_Widget = require("./rev_delete_override_views_widgets/revDefaultDeleteEntity_Widget");

var revPluginOverrideView = () => {
    return {
        "rev_plugin_name": "rev_plugin_core",
        "revNameId": "revDefaultDeleteEntity",
        "revOverrideView": revDefaultDeleteEntity_Widget.revDeleteOverrideViewWidget.toString(),
        "revStyleSheetFile": "",
        "revMenuAreas": [],
        "revMenuItems": [],
        "revCSSFiles": ["/rev_plugin_core/rev_views/rev_delete_override_views/rev_delete_override_views_widgets/revDefaultDeleteEntity_Widget.css"],
    };
};

module.exports.revPluginOverrideView = revPluginOverrideView;
