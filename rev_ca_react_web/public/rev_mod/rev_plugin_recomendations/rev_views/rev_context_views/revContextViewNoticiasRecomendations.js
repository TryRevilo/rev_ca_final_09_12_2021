const revContextViewNoticiasRecomendations = require("./rev_context_view_widgets/revContextViewNoticiasRecomendationsWidget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_recomendations",
        "revNameId": "revContextViewNoticiasRecomendations",
        "revContexts": ["revPageContextViewNoticiasListings"],
        "revContextView": revContextViewNoticiasRecomendations.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_comms/rev_views/rev_page_views/rev_page_view_widgets/revContextViewNoticiasRecomendationsWidget.css']
    };
};

module.exports.revContextView = revPluginPageView;
