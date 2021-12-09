const revFamilyKiwiOverrideView_Widget = require("./rev_override_view_widgets/revFamilyKiwiOverrideView_Widget");

var revPluginOverrideView = () => {
    return {
        "rev_plugin_name": "rev_plugin_space_family",
        "revNameId": "rev_family_kiwi",
        "revOverrideView": revFamilyKiwiOverrideView_Widget.revPluginOverrideViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_space_family/rev_views/rev_override_views/rev_override_view_widgets/revFamilyKiwiOverrideView_Widget.css']
    };
};

module.exports.revPluginOverrideView = revPluginOverrideView;
