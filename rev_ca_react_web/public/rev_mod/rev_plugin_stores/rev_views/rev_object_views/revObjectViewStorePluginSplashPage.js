const revObjectViewStorePluginSplashPage_Widget = require("./rev_page_view_widgets/revObjectViewStorePluginSplashPage_Widget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "revStore",
        "revNameId": "revObjectViewStorePluginSplashPage",
        "revPageViewContainerName": "revObjectViewStorePluginSplashPage",
        "revBefore": [],
        "revPageViewName": "revObjectViewStorePluginSplashPage",
        "revPageView": revObjectViewStorePluginSplashPage_Widget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
    };
};

module.exports.revPluginPageView = revPluginPageView;
