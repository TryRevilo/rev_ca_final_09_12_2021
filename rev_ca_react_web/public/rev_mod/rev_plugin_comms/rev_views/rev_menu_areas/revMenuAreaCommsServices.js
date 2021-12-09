const revMenuAreaCommsServicesWidget = require('./rev_menu_area_widgets/revMenuAreaCommsServicesWidget');

var revPluginMenuArea = () => {
    return {
        'rev_plugin_name': 'rev_plugin_comms',
        'revNameId': 'revMenuAreaCommsServices',
        'revMenuAreaViewName': 'revMenuAreaCommsServices',
        'revPageViewName': 'revActivityItemsListingView',
        'revOverrideView': revMenuAreaCommsServicesWidget.revWidget.toString(),
        'revContainerMenuAreas': [],
        'revMenuItems': [],
    }
};

module.exports.revPluginMenuArea = revPluginMenuArea;