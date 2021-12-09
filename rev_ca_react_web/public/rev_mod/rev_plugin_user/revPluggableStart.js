const revFormUserSettings = require("./rev_views/rev_forms/revFormUserSettings");

var revStart = () => {
    return {
        "revPluginName": "rev_plugin_user",
        "revPageViews": [],
        "revContextViews": [],
        "revForms": [revFormUserSettings.revPluginPageView],
        "revContextForms": [],
        "revMenuItems": [],
        "revPluginHookHandlers": [],
    };
};

module.exports.revStart = revStart;
