const revPageViewComms = require("./rev_views/rev_page_views/revPageViewComms");
const revMenuAreaCommsServices = require("./rev_views/rev_menu_areas/revMenuAreaCommsServices");
const revMenuItemCommsServicesActivity = require("./rev_views/rev_menu_items/revMenuItemCommsServicesActivity");

var revStart = () => {
    return {
        "revPluginName": "rev_plugin_comms",
        "revPageViews": [revPageViewComms.revPluginPageView],
        "revMenuItems": [revMenuAreaCommsServices.revPluginMenuArea, revMenuItemCommsServicesActivity.revPluginMenuItem],
        "revMenuAreas": [revMenuAreaCommsServices.revPluginMenuArea],
    };
};

module.exports.revStart = revStart;
