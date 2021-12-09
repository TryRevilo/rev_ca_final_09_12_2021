const revComment = require("./rev_views/rev_forms/revComment");
const revCommentsListingItemOverrideView = require("./rev_views/rev_override_views/revCommentsListingItemOverrideView");
const revItemListingCommentsCountMenuItem = require("./rev_views/rev_menu_items/revItemListingCommentsCountMenuItem");

const revCommentListingObjectView = require("./rev_views/rev_object_views/revCommentListingObjectView");
const revCommentDetailObjectView = require("./rev_views/rev_object_views/revCommentDetailObjectView");

const revHookRemoteHandlerReadContainerCommentsArr = require("./rev_lib_functions/revHookRemoteHandlerReadContainerCommentsArr");

var revStart = () => {
    return {
        "revPluginName": "rev_plugin_comments",
        "revMenuItems": [revItemListingCommentsCountMenuItem.revPluginMenuItem],
        "revMenuAreas": [],
        "revPageViews": [revCommentListingObjectView.revPluginPageView, revCommentDetailObjectView.revPluginPageView],
        "revOverrideViews": [revCommentsListingItemOverrideView.revPluginOverrideView],
        "revForms": [revComment.revPluginOverrideView],
        "revPluginHookContextsRemoteArr": ["revHookRemoteReadContainerCommentsArr"],
        "revPluginHookHandlersRemote": [{ "revNameID": "revHookRemoteHandlerReadContainerCommentsArr", "revPluginHookContextRemote": "revHookRemoteReadContainerCommentsArr", "revHandler": revHookRemoteHandlerReadContainerCommentsArr.revHookRemoteHandlerCallback.toString() }],
    };
};

module.exports.revStart = revStart;
