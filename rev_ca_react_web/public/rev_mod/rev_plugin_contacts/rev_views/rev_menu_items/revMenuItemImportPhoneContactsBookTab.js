const revMenuItemImportPhoneContactsBookTabWidget = require('./rev_menu_items_widgets/revMenuItemImportPhoneContactsBookTabWidget');

var revPluginMenuItem = () => {
    return {
        'rev_plugin_name': 'rev_plugin_contacts',
        'revNameId': 'revMenuItemImportPhoneContactsBookTab',
        'revOverrideView': revMenuItemImportPhoneContactsBookTabWidget.revMenuItemWidget.toString(),
        'revContainerMenuAreas': [
            'revMenuAreaImportContacts'
        ],
        'revMenuItems': [],
        'revBefore': []
    }
};

module.exports.revPluginMenuItem = revPluginMenuItem;