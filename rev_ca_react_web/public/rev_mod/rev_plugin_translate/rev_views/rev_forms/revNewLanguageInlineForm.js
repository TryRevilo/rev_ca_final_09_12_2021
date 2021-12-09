const revNewLanguageInlineForm_Widget = require("./rev_form_view_widgets/revNewLanguageInlineForm_Widget");

/** REV START LANGS */
const revNewLanguageInlineForm = require("../../rev_langs/revNewLanguageInlineForm");
/** REV END LANGS */

var revPluginOverrideView = () => {
    return {
        "rev_plugin_name": "rev_plugin_translate",
        "revNameId": "revNewLanguageInlineForm",
        "revLangs": [revNewLanguageInlineForm.revLang.toString()],
        "revOverrideView": revNewLanguageInlineForm_Widget.revFormViewWidget.toString(),
        "revStyleSheetFile": "",
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_translate/rev_views/rev_forms/rev_form_view_widgets/revNewLanguageInlineForm_Widget.css']
    };
};

module.exports.revPluginOverrideView = revPluginOverrideView;
