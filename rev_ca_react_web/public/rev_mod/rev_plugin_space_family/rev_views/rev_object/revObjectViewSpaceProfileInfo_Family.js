const revObjectViewSpaceProfileInfoWidget = require('./rev_object_widgets/revObjectViewSpaceProfileInfoWidget');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_space_family',
        'revNameId': 'rev_space_info',
        'revPageViewContainerName': 'revSpaceObject',
        'revBefore': [],
        'revPageViewName': 'revSpaceObject',
        'revPageView': revObjectViewSpaceProfileInfoWidget.revObjectWidget.toString(),
        'revContainerMenuAreas': [
        ],
        'revMenuAreas': [],
        'revMenuItems': [],
        'rev_override_view_styles': [

        ]
    }
};

module.exports.revPluginPageView = revPluginPageView;