const revMenuItemLikeWidget = require('./rev_menu_items_widgets/revMenuItemLikeWidget');

var revPluginMenuItem = () => {
    return {
        'rev_plugin_name': 'rev_plugin_like',
        'revNameId': 'revMenuItemLike',
        'revOverrideView': revMenuItemLikeWidget.revMenuItemWidget.toString(),
        'revContainerMenuAreas': [],
        'revMenuItems': [],
        'revBefore': []
    }
};

module.exports.revPluginMenuItem = revPluginMenuItem;