const revContextViewSpaceInvitations = require("./rev_context_view_widgets/revContextViewSpaceInvitationsWidget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_space",
        "revNameId": "revContextViewSpaceInvitations",
        "revContexts": ["revPageContextViewNoticiasListings"],
        "revContextView": revContextViewSpaceInvitations.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_comms/rev_views/rev_page_views/rev_page_view_widgets/revContextViewSpaceInvitationsWidget.css']
    };
};

module.exports.revContextView = revPluginPageView;
