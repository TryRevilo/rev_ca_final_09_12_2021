const revAdWidget = require("./rev_form_view_widgets/revAdWidget");

var revPluginOverrideView = () => {
    return {
        "rev_plugin_name": "rev_plugin_ads",
        "revNameId": "revAd",
        "revOverrideView": revAdWidget.revFormViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_ads/rev_views/rev_forms/rev_form_view_widgets/revAdWidget.css']
    };
};

module.exports.revPluginOverrideView = revPluginOverrideView;
