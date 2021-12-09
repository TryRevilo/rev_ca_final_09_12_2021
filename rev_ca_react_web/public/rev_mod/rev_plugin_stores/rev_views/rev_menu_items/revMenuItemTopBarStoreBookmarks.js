const revMenuItemTopBarStoreBookmarksWidget = require('./rev_menu_items_widgets/revMenuItemTopBarStoreBookmarksWidget');

var revPluginMenuItem = () => {
    return {
        'rev_plugin_name': 'rev_plugin_stores',
        'revNameId': 'revMenuItemTopBarStoreBookmarks',
        'revOverrideView': revMenuItemTopBarStoreBookmarksWidget.revMenuItemWidget.toString(),
        'revContainerMenuAreas': ['revMenuAreaTopBarMoreOptions'],
        'revMenuItems': [],
    }
};

module.exports.revPluginMenuItem = revPluginMenuItem;