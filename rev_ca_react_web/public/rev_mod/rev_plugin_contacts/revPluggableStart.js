const revMenuItemContactsTab = require("./rev_views/rev_menu_items/revMenuItemContactsTab");
const revMenuItemContactsEntityTab = require("./rev_views/rev_menu_items/revMenuItemContactsEntityTab");
const revMenuItemImportPhoneContactsBookTab = require("./rev_views/rev_menu_items/revMenuItemImportPhoneContactsBookTab");
const revMenuItemImportEmailContactsTab = require("./rev_views/rev_menu_items/revMenuItemImportEmailContactsTab");

const revMenuAreaImportContacts = require("./rev_views/rev_menu_areas/revMenuAreaImportContacts");

const revObjectViewContactItem = require("./rev_views/rev_object_views/revObjectViewContactItem");
const revObjectGoogleImportedContactItem = require("./rev_views/rev_object_views/revObjectGoogleImportedContactItem");

const revListingViewContacts = require("./rev_views/rev_listing_views/revListingViewContacts");
const revPageViewImportContacts = require("./rev_views/rev_page_views/revPageViewImportContacts");

const revSelectableContacts = require("./rev_views/rev_forms/revSelectableContacts");
const revInviteContacts = require("./rev_views/rev_forms/revInviteContacts");
const revImportGooglePhoneBookForm = require("./rev_views/rev_forms/revImportGooglePhoneBookForm");

var revStart = () => {
    return {
        "revPluginName": "rev_plugin_contacts",
        "revPageViews": [revObjectViewContactItem.revPluginPageView, revObjectGoogleImportedContactItem.revPluginPageView, revListingViewContacts.revPluginPageView, revPageViewImportContacts.revPluginPageView],
        "revMenuItems": [revMenuItemContactsTab.revPluginMenuItem, revMenuItemContactsEntityTab.revPluginMenuItem, revMenuItemImportPhoneContactsBookTab.revPluginMenuItem, revMenuItemImportEmailContactsTab.revPluginMenuItem, revMenuAreaImportContacts.revPluginMenuArea],
        "revForms": [revSelectableContacts.revPluginOverrideView, revInviteContacts.revPluginOverrideView, revImportGooglePhoneBookForm.revPluginOverrideView],
        "revModules": [],
        "revPluginHookContextsRemoteArr": [],
        "revPluginHookHandlersRemote": [],
    };
};

module.exports.revStart = revStart;
