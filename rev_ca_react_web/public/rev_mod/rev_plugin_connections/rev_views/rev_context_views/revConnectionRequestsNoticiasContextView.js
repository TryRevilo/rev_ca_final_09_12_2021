const revConnectionRequestsNoticiasContextViewWidget = require("./rev_context_view_widgets/revConnectionRequestsNoticiasContextViewWidget");

var revPluginOverrideView = () => {
    return {
        "rev_plugin_name": "rev_plugin_connections",
        "revNameId": "revContextView_ConnectionRequest",
        "revContexts": ["revPageContextViewNoticiasListings"],
        "revContextView": revConnectionRequestsNoticiasContextViewWidget.revPluginOverrideViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_kiwi/rev_views/rev_override_views/rev_override_view_widgets/revConnectionRequestsNoticiasContextViewWidget.css']
    };
};

module.exports.revPluginOverrideView = revPluginOverrideView;
