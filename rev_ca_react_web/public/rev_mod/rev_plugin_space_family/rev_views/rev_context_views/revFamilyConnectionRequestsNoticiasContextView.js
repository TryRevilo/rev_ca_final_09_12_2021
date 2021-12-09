const revFamilyConnectionRequestsNoticiasContextView_Widget = require("./rev_context_view_widgets/revFamilyConnectionRequestsNoticiasContextView_Widget");

var revContextView = () => {
    return {
        "rev_plugin_name": "rev_plugin_space_family",
        "revNameId": "revFamilyConnectionRequestsNoticiasContextView",
        "revContexts": ["revPageContextViewNoticiasListings"],
        "revContextView": revFamilyConnectionRequestsNoticiasContextView_Widget.revPluginOverrideViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_kiwi/rev_views/rev_override_views/rev_override_view_widgets/revFamilyConnectionRequestsNoticiasContextView_Widget.css']
    };
};

module.exports.revContextView = revContextView;
