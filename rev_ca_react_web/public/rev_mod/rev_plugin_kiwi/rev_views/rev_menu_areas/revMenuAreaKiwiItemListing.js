const revMenuAreaKiwiItemListingWidget = require('./rev_menu_area_widgets/revMenuAreaKiwiItemListingWidget');

var revPluginMenuArea = () => {
    return {
        'rev_plugin_name': 'rev_plugin_kiwi',
        'revNameId': 'revMenuAreaKiwiItemListing',
        'revMenuAreaViewName': 'revMenuAreaKiwiItemListing',
        'revPageViewName': 'revActivityItemsListingView',
        'revOverrideView': revMenuAreaKiwiItemListingWidget.revWidget.toString(),
        'revContainerMenuAreas': [],
        'revMenuItems': [],
    }
};

module.exports.revPluginMenuArea = revPluginMenuArea;