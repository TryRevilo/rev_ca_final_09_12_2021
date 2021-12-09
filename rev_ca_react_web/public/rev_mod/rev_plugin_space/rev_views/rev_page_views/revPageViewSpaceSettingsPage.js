const revPageViewSpaceSettingsPageWidget = require('./rev_page_view_widgets/revPageViewSpaceSettingsPageWidget');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_space',
        'revNameId': 'revPageViewSpaceSettingsPage',
        'revPageViewContainerName': 'revPageViewSpaceSettingsPage',
        'revBefore': [],
        'revPageViewName': 'revPageViewSpaceSettingsPage',
        'revPageView': revPageViewSpaceSettingsPageWidget.revPageViewWidget.toString(),
        'revContainerMenuAreas': [
        ],
        'revMenuAreas': [],
        'revMenuItems': [],
    }
};

module.exports.revPluginPageView = revPluginPageView;