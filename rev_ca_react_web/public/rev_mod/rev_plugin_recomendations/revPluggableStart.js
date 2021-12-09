const revRecomendationsNoticiasContextView = require("./rev_views/rev_context_views/revRecomendationsNoticiasContextView");
const revContextViewNoticiasRecomendations = require("./rev_views/rev_context_views/revContextViewNoticiasRecomendations");

/** REV START REMOTE HOOKS */
const revHookRemoteHandlerLoadRecomendations = require("./rev_libs_functions/revHookRemoteHandlerLoadRecomendations");
/** REV END REMOTE HOOKS */

var revStart = () => {
    return {
        "revPluginName": "rev_plugin_recomendations",
        "revMenuItems": [],
        "revPageViews": [],
        "revContextViews": [revRecomendationsNoticiasContextView.revPluginOverrideView, revContextViewNoticiasRecomendations.revContextView],
        "revDeleteOverrideViews": [],
        "revForms": [],
        "revPluginHookContextsRemoteArr": ["revHookRemoteLoadRecomendations"],
        "revPluginHookHandlersRemote": [{ "revNameID": "revHookRemoteHandlerLoadRecomendations", "revPluginHookContextRemote": "revHookRemoteLoadNoticias", "revHandler": revHookRemoteHandlerLoadRecomendations.revHookRemoteHandlerCallback.toString() }],
    };
};

module.exports.revStart = revStart;
