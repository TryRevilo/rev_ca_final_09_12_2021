const revLogInWidget = require("./rev_form_view_widgets/revLogInWidget");

/** REV START LANGS */
const rev_log_in_view_en = require("../../rev_langs/rev_log_in_view_en");
/** REV END LANGS */

var revPluginOverrideView = () => {
    return {
        "rev_plugin_name": "rev_plugin_sessions",
        "revNameId": "revLogIn",
        "revLangs": [rev_log_in_view_en.revLang.toString()],
        "revOverrideView": revLogInWidget.revFormViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_sessions/rev_views/rev_forms/rev_form_view_widgets/revLogInWidget.css']
    };
};

module.exports.revPluginOverrideView = revPluginOverrideView;
