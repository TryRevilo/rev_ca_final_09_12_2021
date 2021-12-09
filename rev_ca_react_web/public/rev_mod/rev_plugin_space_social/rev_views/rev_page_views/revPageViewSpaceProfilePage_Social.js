const revPageViewSpaceProfilePage_Social_Widget = require('./rev_page_view_widgets/revPageViewSpaceProfilePage_Social_Widget');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_space_social',
        'revNameId': 'revPageViewSpaceProfilePage_Social',
        'revPageViewContainerName': 'revPageViewSpaceProfilePage_Social',
        'revBefore': [],
        'revPageViewName': 'revPageViewSpaceProfilePage_Social',
        'revPageView': revPageViewSpaceProfilePage_Social_Widget.revPageViewWidget.toString(),
        'revContainerMenuAreas': [
        ],
        'revMenuAreas': [],
        'revMenuItems': [],
    }
};

module.exports.revPluginPageView = revPluginPageView;