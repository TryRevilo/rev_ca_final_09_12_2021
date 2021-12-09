const revMenuItemLike = require('./rev_views/rev_menu_items/revMenuItemLike');

var revStart = () => {
    return {
        'revPluginName': 'rev_plugin_like',
        'revMenuItems': [revMenuItemLike.revPluginMenuItem],
    }
};

module.exports.revStart = revStart;