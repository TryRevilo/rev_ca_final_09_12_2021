const revPageViewSpaceHeaderArea_Academic_Widget = require("./rev_page_view_widgets/revPageViewSpaceHeaderArea_Academic_Widget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_space_academic",
        "revNameId": "revPageViewSpaceHeaderArea_Academic",
        "revPageViewContainerName": "revPageViewSpaceHeaderArea_Academic",
        "revBefore": [],
        "revPageViewName": "revPageViewSpaceHeaderArea_Academic",
        "revPageView": revPageViewSpaceHeaderArea_Academic_Widget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_comms/rev_views/rev_page_views/rev_page_view_widgets/revPageViewSpaceHeaderArea_Academic_Widget.css']
    };
};

module.exports.revPluginPageView = revPluginPageView;
