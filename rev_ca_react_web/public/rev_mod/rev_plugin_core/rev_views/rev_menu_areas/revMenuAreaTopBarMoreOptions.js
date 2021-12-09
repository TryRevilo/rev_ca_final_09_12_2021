const revMenuAreaTopBarMoreOptionsWidget = require('./rev_menu_area_widgets/revMenuAreaTopBarMoreOptionsWidget');

var revPluginMenuArea = () => {
    return {
        'rev_plugin_name': 'rev_plugin_core',
        'revNameId': 'revMenuAreaTopBarMoreOptions',
        'revMenuAreaViewName': 'revMenuAreaTopBarMoreOptions',
        'revPageViewName': 'revMenuAreaTopBarMoreOptions',
        'revOverrideView': revMenuAreaTopBarMoreOptionsWidget.revWidget.toString(),
        'revContainerMenuAreas': [],
        'revMenuItems': [],
    }
};

module.exports.revPluginMenuArea = revPluginMenuArea;