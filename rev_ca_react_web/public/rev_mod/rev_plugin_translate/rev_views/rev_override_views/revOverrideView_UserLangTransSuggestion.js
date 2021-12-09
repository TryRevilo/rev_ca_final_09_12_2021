const revOverrideView_UserLangTransSuggestion_Widget = require("./rev_override_view_widgets/revOverrideView_UserLangTransSuggestion_Widget");

var revPluginOverrideView = () => {
    return {
        "rev_plugin_name": "rev_plugin_translate",
        "revNameId": "rev_lang_phrase",
        "revOverrideView": revOverrideView_UserLangTransSuggestion_Widget.revPluginOverrideViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_translate/rev_views/rev_override_views/rev_override_view_widgets/revOverrideView_UserLangTransSuggestion_Widget.css']
    };
};

module.exports.revPluginOverrideView = revPluginOverrideView;
