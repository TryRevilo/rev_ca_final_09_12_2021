const revPageOwnerOptionsMenuAreaWidget = require("./rev_menu_item_widgets/revPageOwnerOptionsMenuAreaWidget");

var revPluginMenuItem = () => {
    return {
        "rev_plugin_name": "rev_plugin_profile",
        "revNameId": "rev_page_owner_profile_menu_options",
        "revMenuAreaViewName": "revActivityItemsListingView",
        "revPageViewName": "revActivityItemsListingView",
        "revOverrideView": revPageOwnerOptionsMenuAreaWidget.revMenuItemWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuItems": [],
    };
};

module.exports.revPluginMenuItem = revPluginMenuItem;
