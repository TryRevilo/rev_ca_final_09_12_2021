const revItemListingCommentsCountMenuItemWidget = require('./rev_menu_items_widgets/revItemListingCommentsCountMenuItemWidget');

var revPluginMenuItem = () => {
    return {
        'rev_plugin_name': 'rev_plugin_comments',
        'revNameId': 'rev_comment',
        'revOverrideView': revItemListingCommentsCountMenuItemWidget.revMenuItemWidget.toString(),
        'revContainerMenuAreas': [
            'revMenuAreaKiwiItemListing'
        ],
        'revMenuItems': [],
        'rev_override_view_styles': [

        ]
    }
};

module.exports.revPluginMenuItem = revPluginMenuItem;