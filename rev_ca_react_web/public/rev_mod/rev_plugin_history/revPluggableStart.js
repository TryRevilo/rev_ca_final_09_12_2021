const revPageViewListingAllHistory = require("./rev_views/rev_page_views/revPageViewListingAllHistory");
const revHookRemoteHandlerHistoryItemPers = require("./rev_libs_functions/revHookRemoteHandlerHistoryItemPers");

var revStart = () => {
  return {
    "revPluginName": "rev_plugin_history",
    "revMenuItems": [],
    "revPageViews": [revPageViewListingAllHistory.revPluginPageView],
    "revContextViews": [],
    "revModules": [{ "revNameId": "revPluginModuleLocalHistoryLib", "revPath": "/revPluginModuleLocalHistoryLib.js" }],
    "revPluginHookContextsRemoteArr": ["revHookRemoteHistoryItemPers"],
    "revPluginHookHandlersRemote": [{ "revNameID": "revHookRemoteHandlerHistoryItemPers", "revPluginHookContextRemote": "revHookRemoteHistoryItemPers", "revHandler": revHookRemoteHandlerHistoryItemPers.revHookRemoteHandlerCallback.toString() }],
  };
};

module.exports.revStart = revStart;
