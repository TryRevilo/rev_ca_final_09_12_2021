const revPageViewTranslateWidget = require("./rev_page_view_widgets/revPageViewTranslateWidget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_translate",
        "revNameId": "revPageViewTranslate",
        "revPageViewContainerName": "revPageViewTranslate",
        "revBefore": [],
        "revPageViewName": "revPageViewTranslate",
        "revPageView": revPageViewTranslateWidget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
    };
};

module.exports.revPluginPageView = revPluginPageView;
