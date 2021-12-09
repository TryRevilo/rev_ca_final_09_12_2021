const revLangTranslationForm_Widget = require("./rev_form_view_widgets/revLangTranslationForm_Widget");

var revPluginOverrideView = () => {
    return {
        "rev_plugin_name": "rev_plugin_translate",
        "revNameId": "revLangTranslationForm",
        // "revLangs": [revLangTranslationForm.revLang.toString()],
        "revOverrideView": revLangTranslationForm_Widget.revFormViewWidget.toString(),
        "revStyleSheetFile": "",
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_translate/rev_views/rev_forms/rev_form_view_widgets/revLangTranslationForm_Widget.css']
    };
};

module.exports.revPluginOverrideView = revPluginOverrideView;
