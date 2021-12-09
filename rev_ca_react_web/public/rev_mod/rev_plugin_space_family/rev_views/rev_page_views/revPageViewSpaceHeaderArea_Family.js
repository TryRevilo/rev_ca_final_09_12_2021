const revPageViewSpaceHeaderArea_Family_Widget = require("./rev_page_view_widgets/revPageViewSpaceHeaderArea_Family_Widget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_space_family",
        "revNameId": "revPageViewSpaceHeaderArea_Family",
        "revPageViewContainerName": "revPageViewSpaceHeaderArea_Family",
        "revBefore": [],
        "revPageViewName": "revPageViewSpaceHeaderArea_Family",
        "revPageView": revPageViewSpaceHeaderArea_Family_Widget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_comms/rev_views/rev_page_views/rev_page_view_widgets/revPageViewSpaceHeaderArea_Family_Widget.css']
    };
};

module.exports.revPluginPageView = revPluginPageView;
