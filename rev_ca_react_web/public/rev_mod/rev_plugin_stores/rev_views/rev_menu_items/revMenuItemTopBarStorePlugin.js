const revMenuItemTopBarStorePluginWidget = require('./rev_menu_items_widgets/revMenuItemTopBarStorePluginWidget');

var revPluginMenuItem = () => {
    return {
        'rev_plugin_name': 'rev_plugin_stores',
        'revNameId': 'revMenuItemTopBarStorePlugin',
        'revOverrideView': revMenuItemTopBarStorePluginWidget.revMenuItemWidget.toString(),
        'revContainerMenuAreas': ['revMenuAreaTopBarMoreOptions'],
        'revMenuItems': [],
    }
};

module.exports.revPluginMenuItem = revPluginMenuItem;