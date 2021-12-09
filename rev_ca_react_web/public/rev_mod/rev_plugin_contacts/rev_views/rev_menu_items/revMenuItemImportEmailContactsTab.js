const revMenuItemImportEmailContactsTabWidget = require("./rev_menu_items_widgets/revMenuItemImportEmailContactsTabWidget");

var revPluginMenuItem = () => {
    return {
        "rev_plugin_name": "rev_plugin_contacts",
        "revNameId": "revMenuItemImportEmailContactsTab",
        "revOverrideView": revMenuItemImportEmailContactsTabWidget.revMenuItemWidget.toString(),
        "revContainerMenuAreas": ["revMenuAreaImportContacts"],
        "revMenuItems": [],
        "revBefore": [],
    };
};

module.exports.revPluginMenuItem = revPluginMenuItem;
