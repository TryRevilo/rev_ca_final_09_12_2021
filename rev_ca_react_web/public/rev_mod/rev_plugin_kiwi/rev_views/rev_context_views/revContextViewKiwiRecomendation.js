const revContextViewKiwiRecomendation = require("./rev_context_view_widgets/revContextViewKiwiRecomendationWidget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_kiwi",
        "revNameId": "revKiwi",
        "revContexts": ["revContextNoticiasRecomendation"],
        "revContextView": revContextViewKiwiRecomendation.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_comms/rev_views/rev_page_views/rev_page_view_widgets/revContextViewKiwiRecomendationWidget.css']
    };
};

module.exports.revContextView = revPluginPageView;
