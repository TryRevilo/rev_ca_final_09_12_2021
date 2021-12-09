const revPageViewSpaceProfilePageWidget = require('./rev_page_view_widgets/revPageViewSpaceProfilePageWidget');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_space',
        'revNameId': 'revPageViewSpaceProfilePage',
        'revPageViewContainerName': 'revPageViewSpaceProfilePage',
        'revBefore': [],
        'revPageViewName': 'revPageViewSpaceProfilePage',
        'revPageView': revPageViewSpaceProfilePageWidget.revPageViewWidget.toString(),
        'revContainerMenuAreas': [
        ],
        'revMenuAreas': [],
        'revMenuItems': [],
    }
};

module.exports.revPluginPageView = revPluginPageView;