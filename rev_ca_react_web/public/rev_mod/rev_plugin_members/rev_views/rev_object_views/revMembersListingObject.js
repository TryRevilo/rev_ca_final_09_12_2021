const revMembersListingObjectWidget = require("./rev_object_views_widgets/revMembersListingObjectWidget");

var revPluginPageView = () => {
  return {
    "rev_plugin_name": "rev_plugin_members",
    "revNameId": "revMembersListingObject",
    "revPageViewContainerName": "revMembersListingObject",
    "revBefore": [],
    "revPageViewName": "revMembersListingObject",
    "revPageView": revMembersListingObjectWidget.revPageViewWidget.toString(),
    "revContainerMenuAreas": [],
    "revMenuAreas": [],
    "revMenuItems": [],
    "rev_override_view_styles": [],
  };
};

module.exports.revPluginPageView = revPluginPageView;
