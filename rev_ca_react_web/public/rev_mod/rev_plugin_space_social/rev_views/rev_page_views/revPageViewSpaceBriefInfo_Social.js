const revPageViewSpaceBriefInfo_Social_Widget = require('./rev_page_view_widgets/revPageViewSpaceBriefInfo_Social_Widget');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_space_social',
        'revNameId': 'revPageViewSpaceBriefInfo_Social',
        'revPageViewContainerName': 'revPageViewSpaceBriefInfo_Social',
        'revBefore': [],
        'revPageViewName': 'revPageViewSpaceBriefInfo_Social',
        'revPageView': revPageViewSpaceBriefInfo_Social_Widget.revPageViewWidget.toString(),
        'revContainerMenuAreas': [
        ],
        'revMenuAreas': [],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_comms/rev_views/rev_page_views/rev_page_view_widgets/revPageViewSpaceBriefInfo_Social_Widget.css']
    }
};

module.exports.revPluginPageView = revPluginPageView;