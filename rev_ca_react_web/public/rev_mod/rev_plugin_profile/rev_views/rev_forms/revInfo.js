const revInfoWidget = require("./rev_form_view_widgets/revInfoWidget");

var revPluginOverrideView = () => {
    return {
        "rev_plugin_name": "rev_plugin_profile",
        "revNameId": "revInfo",
        "revOverrideView": revInfoWidget.revFormViewWidget.toString(),
        "revStyleSheetFile": "",
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_profile/rev_views/rev_forms/rev_form_view_widgets/revSpaceWidget.css']
    };
};

module.exports.revPluginOverrideView = revPluginOverrideView;
