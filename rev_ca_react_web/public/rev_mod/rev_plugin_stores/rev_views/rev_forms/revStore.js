const revStoreWidget = require("./rev_form_view_widgets/revStoreWidget");

/** REV START LANGS */
const rev_stores_en = require("../../rev_langs/rev_stores_en");
/** REV END LANGS */

var revPluginOverrideView = () => {
    return {
        "rev_plugin_name": "rev_plugin_stores",
        "revNameId": "revStore",
        // "revLangs": [rev_stores_en.revLang.toString()],
        "revOverrideView": revStoreWidget.revFormViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_stores/rev_views/rev_forms/rev_form_view_widgets/revStoreWidget.css']
    };
};

module.exports.revPluginOverrideView = revPluginOverrideView;
