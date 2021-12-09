const revKiwiWidget = require("./rev_form_view_widgets/revKiwiWidget");

/** REV START LANGS */
const revKiwi = require("../../rev_langs/revKiwi");
/** REV END LANGS */

var revPluginOverrideView = () => {
    return {
        "rev_plugin_name": "rev_plugin_kiwi",
        "revNameId": "rev_kiwi",
        "revLangs": [revKiwi.revLang.toString()],
        "revOverrideView": revKiwiWidget.revFormViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_kiwi/rev_views/rev_forms/rev_form_view_widgets/revKiwiWidget.css']
    };
};

module.exports.revPluginOverrideView = revPluginOverrideView;
