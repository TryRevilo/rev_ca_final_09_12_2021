const revLeftStripSiteNavMenuAreaWidget = require('./rev_menu_area_widgets/revLeftStripSiteNavMenuAreaWidget');

var revPluginMenuArea = () => {
    return {
        'rev_plugin_name': 'rev_plugin_core',
        'revNameId': 'revLeftStripSiteNavMenuArea',
        'revMenuAreaViewName': 'revLeftStripSiteNavMenuArea',
        'revPageViewName': 'revActivityItemsListingView',
        'revOverrideView': revLeftStripSiteNavMenuAreaWidget.revWidget.toString(),
        'revContainerMenuAreas': [],
        'revMenuItems': [],
    }
};

module.exports.revPluginMenuArea = revPluginMenuArea;