const revMenuItemDeleteEntityWidget = require('./rev_menu_items_widgets/revMenuItemDeleteEntityWidget');

var revPluginMenuItem = () => {
    return {
        'rev_plugin_name': 'rev_plugin_core',
        'revNameId': 'revMenuItemDeleteEntity',
        'revOverrideView': revMenuItemDeleteEntityWidget.revMenuItemWidget.toString(),
        'revContainerMenuAreas': ['revListingItemOptionsMenuArea'],
        'revMenuItems': [],
    }
};

module.exports.revPluginMenuItem = revPluginMenuItem;