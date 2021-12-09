const revMenuItemCommsServicesIMWidget = require("./rev_menu_items_widgets/revMenuItemContactsTabWidget");

var revPluginMenuItem = () => {
    return {
        "rev_plugin_name": "rev_plugin_contacts",
        "revNameId": "revMenuItemContactsTab",
        "revOverrideView": revMenuItemCommsServicesIMWidget.revMenuItemWidget.toString(),
        "revContainerMenuAreas": ["revMenuAreaCommsServices"],
        "revMenuItems": [],
        "revBefore": ["revMenuItemSessionsTab"],
    };
};

module.exports.revPluginMenuItem = revPluginMenuItem;
