const revPageViewListingSpaceInvitationsWidget = require("./rev_page_view_widgets/revPageViewListingSpaceInvitationsWidget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_space",
        "revNameId": "revPageViewListingSpaceInvitations",
        "revPageViewContainerName": "revPageViewListingSpaceInvitations",
        "revBefore": [],
        "revPageViewName": "revPageViewListingSpaceInvitations",
        "revPageView": revPageViewListingSpaceInvitationsWidget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
    };
};

module.exports.revPluginPageView = revPluginPageView;
