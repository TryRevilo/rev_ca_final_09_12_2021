const revMembersListingObject = require("./rev_views/rev_object_views/revMembersListingObject");
const revPageViewMembersListingAll = require("./rev_views/rev_page_views/revPageViewMembersListingAll");
const revPageViewMembesReccomendRight = require("./rev_views/rev_page_views/revPageViewMembesReccomendRight");

var revStart = () => {
  return {
    "revPluginName": "rev_plugin_members",
    "revPageViews": [revMembersListingObject.revPluginPageView, revPageViewMembersListingAll.revPluginPageView, revPageViewMembesReccomendRight.revPluginPageView],
    "revMenuItems": [],
  };
};

module.exports.revStart = revStart;
