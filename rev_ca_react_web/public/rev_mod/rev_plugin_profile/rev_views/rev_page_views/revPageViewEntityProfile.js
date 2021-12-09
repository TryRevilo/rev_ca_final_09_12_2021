const revPageViewEntityProfileWidget = require("./rev_page_view_widgets/revPageViewEntityProfileWidget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_profile",
        "revNameId": "revPageViewEntityProfile",
        "revPageViewContainerName": "revPageViewEntityProfile",
        "revPageViewName": "revPageViewEntityProfile",
        "revPageView": revPageViewEntityProfileWidget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_profile/rev_views/rev_page_views/rev_page_view_widgets/revPageViewEntityProfileWidget.css']
    };
};

module.exports.revPluginPageView = revPluginPageView;
