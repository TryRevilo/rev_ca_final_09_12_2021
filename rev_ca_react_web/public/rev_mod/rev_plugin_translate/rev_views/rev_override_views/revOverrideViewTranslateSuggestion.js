const revOverrideViewTranslateSuggestionWidget = require("./rev_override_view_widgets/revOverrideViewTranslateSuggestionWidget");

var revPluginOverrideView = () => {
    return {
        "rev_plugin_name": "rev_plugin_translate",
        "revNameId": "revOverrideViewTranslateSuggestion",
        "revOverrideView": revOverrideViewTranslateSuggestionWidget.revPluginOverrideViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_translate/rev_views/rev_override_views/rev_override_view_widgets/revOverrideViewTranslateSuggestionWidget.css']
    };
};

module.exports.revPluginOverrideView = revPluginOverrideView;
