const revPageViewSpaceProfilePage_Family_Widget = require('./rev_page_view_widgets/revPageViewSpaceProfilePage_Family_Widget');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_space_family',
        'revNameId': 'revPageViewSpaceProfilePage_Family',
        'revPageViewContainerName': 'revPageViewSpaceProfilePage_Family',
        'revBefore': [],
        'revPageViewName': 'revPageViewSpaceProfilePage_Family',
        'revPageView': revPageViewSpaceProfilePage_Family_Widget.revPageViewWidget.toString(),
        'revContainerMenuAreas': [
        ],
        'revMenuAreas': [],
        'revMenuItems': [],
    }
};

module.exports.revPluginPageView = revPluginPageView;