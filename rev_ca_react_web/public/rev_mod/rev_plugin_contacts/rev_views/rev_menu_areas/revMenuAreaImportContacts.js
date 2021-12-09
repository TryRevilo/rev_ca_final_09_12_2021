const revMenuAreaImportContactsWidget = require('./rev_menu_area_widgets/revMenuAreaImportContactsWidget');

var revPluginMenuArea = () => {
    return {
        'rev_plugin_name': 'rev_plugin_contacts',
        'revNameId': 'revMenuAreaImportContacts',
        'revMenuAreaViewName': 'revMenuAreaImportContacts',
        'revPageViewName': 'revActivityItemsListingView',
        'revOverrideView': revMenuAreaImportContactsWidget.revWidget.toString(),
        'revContainerMenuAreas': [],
        'revMenuItems': [],
    }
};

module.exports.revPluginMenuArea = revPluginMenuArea;