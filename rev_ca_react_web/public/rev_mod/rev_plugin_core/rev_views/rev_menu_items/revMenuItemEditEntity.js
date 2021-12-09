const revMenuItemEditEntityWidget = require('./rev_menu_items_widgets/revMenuItemEditEntityWidget');

var revPluginMenuItem = () => {
    return {
        'rev_plugin_name': 'rev_plugin_core',
        'revNameId': 'revEditEntityMenuItem',
        'revOverrideView': revMenuItemEditEntityWidget.revMenuItemWidget.toString(),
        'revContainerMenuAreas': ['revListingItemOptionsMenuArea'],
        'revMenuItems': [],
    }
};

module.exports.revPluginMenuItem = revPluginMenuItem;