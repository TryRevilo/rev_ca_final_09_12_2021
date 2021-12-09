const revObjectViewStore_Widget = require("./rev_page_view_widgets/revObjectViewStore_Widget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "revStore",
        "revNameId": "revObjectViewStore",
        "revPageViewContainerName": "revObjectViewStore",
        "revBefore": [],
        "revPageViewName": "revObjectViewStore",
        "revPageView": revObjectViewStore_Widget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
    };
};

module.exports.revPluginPageView = revPluginPageView;
