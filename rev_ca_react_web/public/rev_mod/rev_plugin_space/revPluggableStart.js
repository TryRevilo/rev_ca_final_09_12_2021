const revSpace = require("./rev_views/rev_forms/revSpace");
const revSpaceTypeForm = require("./rev_views/rev_forms/revSpaceType");
const revSpaceSelectableListingForm = require("./rev_views/rev_forms/revSpaceSelectableListingForm");

const revSpaceDelete = require("./rev_views/rev_delete_override_views/revSpaceDelete");

const revSpaceOverrideView = require("./rev_views/rev_override_views/revSpaceOverrideView");

/** REV START CONTEXT VIEWS */
const revContextViewSpaceInvitations = require("./rev_views/rev_context_views/revContextViewSpaceInvitations");
/** REV END CONTEXT VIEWS */

const revPageViewSpaceProfilePage = require("./rev_views/rev_page_views/revPageViewSpaceProfilePage");
const revPageViewListingSpace = require("./rev_views/rev_listing_views/revPageViewListingSpace");
const revPageViewListingSpaceInvitations = require("./rev_views/rev_listing_views/revPageViewListingSpaceInvitations");

const revPageViewSpaceSettingsPage = require("./rev_views/rev_page_views/revPageViewSpaceSettingsPage");

const revMenuItemSpaceInfoEntityTab = require("./rev_views/rev_menu_items/revMenuItemSpaceInfoEntityTab");
const revMenuItemJoinSpacePageEntityTab = require("./rev_views/rev_menu_items/revMenuItemJoinSpacePageEntityTab");
const revMenuItemSpacePageEntityActivityTab = require("./rev_views/rev_menu_items/revMenuItemSpacePageEntityActivityTab");

/** REV START REMOTE HOOKS */
const revHookRemoteHandlerLoadSpaceInvitations = require("./rev_libs_functions/revHookRemoteHandlerLoadSpaceInvitations");
/** REV END REMOTE HOOKS */

var revStart = () => {
    return {
        "revPluginName": "rev_plugin_space",
        "revOverrideViews": [revSpaceOverrideView.revPluginOverrideView],
        "revContextViews": [revContextViewSpaceInvitations.revContextView],
        "revPageViews": [revPageViewSpaceProfilePage.revPluginPageView, revPageViewListingSpace.revPluginPageView, revPageViewListingSpaceInvitations.revPluginPageView, revPageViewSpaceSettingsPage.revPluginPageView],
        "revMenuItems": [revMenuItemSpaceInfoEntityTab.revPluginMenuItem, revMenuItemJoinSpacePageEntityTab.revPluginMenuItem, revMenuItemSpacePageEntityActivityTab.revPluginMenuItem],
        "revForms": [revSpace.revPluginOverrideView, revSpaceTypeForm.revPluginOverrideView, revSpaceSelectableListingForm.revPluginOverrideView],
        "revDeleteOverrideViews": [revSpaceDelete.revDeleteOverrideView],
        "revPluginHookContextsRemoteArr": ["revHookRemoteLoadSpaceInvitations"],
        "revPluginHookHandlersRemote": [{ "revNameID": "revHookRemoteHandlerLoadSpaceInvitations", "revPluginHookContextRemote": "revHookRemoteLoadNoticias", "revHandler": revHookRemoteHandlerLoadSpaceInvitations.revHookRemoteHandlerCallback.toString() }],
    };
};

module.exports.revStart = revStart;
