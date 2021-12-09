const revListingItemOptionsMenuAreaWidget = require('./rev_menu_area_widgets/revListingItemOptionsMenuAreaWidget');

var revPluginMenuArea = () => {
    return {
        'rev_plugin_name': 'rev_plugin_core',
        'revNameId': 'revListingItemOptionsMenuArea',
        'revMenuAreaViewName': 'revListingItemOptionsMenuArea',
        'revPageViewName': 'revActivityItemsListingView',
        'revOverrideView': revListingItemOptionsMenuAreaWidget.revWidget.toString(),
        'revContainerMenuAreas': [],
        'revMenuItems': [],
    }
};

module.exports.revPluginMenuArea = revPluginMenuArea;