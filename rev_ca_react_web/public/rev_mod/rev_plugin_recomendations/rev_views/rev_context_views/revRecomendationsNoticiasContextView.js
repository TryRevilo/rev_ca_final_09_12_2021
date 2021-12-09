const revRecomendationsNoticiasContextViewWidget = require("./rev_context_view_widgets/revRecomendationsNoticiasContextViewWidget");

var revPluginOverrideView = () => {
    return {
        "rev_plugin_name": "rev_plugin_recomendations",
        "revNameId": "revContextViewNoticiasRecomendations",
        "revContexts": ["revPageContextViewNoticiasListings_"],
        "revContextView": revRecomendationsNoticiasContextViewWidget.revPluginOverrideViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_kiwi/rev_views/rev_override_views/rev_override_view_widgets/revRecomendationsNoticiasContextViewWidget.css']
    };
};

module.exports.revPluginOverrideView = revPluginOverrideView;
