const revRightSideBarTopBarMenuAreaWidget = require('./rev_menu_area_widgets/revRightSideBarTopBarMenuAreaWidget');

var revPluginMenuArea = () => {
    return {
        'rev_plugin_name': 'rev_plugin_core',
        'revNameId': 'revRightSideBarTopBarMenuArea',
        'revMenuAreaViewName': 'revRightSideBarTopBarMenuArea',
        'revPageViewName': 'revRightSideBarTopBarMenuArea',
        'revOverrideView': revRightSideBarTopBarMenuAreaWidget.revWidget.toString(),
        'revContainerMenuAreas': [],
        'revMenuItems': [],
    }
};

module.exports.revPluginMenuArea = revPluginMenuArea;