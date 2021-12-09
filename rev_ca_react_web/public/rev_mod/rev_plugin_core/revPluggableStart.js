const revMenuItemFileExplorerTab = require("./rev_views/rev_menu_items/revMenuItemFileExplorerTab");
const revMenuItemEditEntity = require("./rev_views/rev_menu_items/revMenuItemEditEntity");
const revMenuItemDeleteEntity = require("./rev_views/rev_menu_items/revMenuItemDeleteEntity");

const revMenuItemGenericAddEntitySubTypeTab = require("./rev_views/rev_menu_items/revMenuItemGenericAddEntitySubTypeTab");
const revHiddenMenuItemFileExplorerTab = require("./rev_views/rev_menu_items/revHiddenMenuItemFileExplorerTab");
const revMenuItemMoreOptionsPageEntityTab = require("./rev_views/rev_menu_items/revMenuItemMoreOptionsPageEntityTab");
const revMenuItemPageOwnerOptionsSettingsTab = require("./rev_views/rev_menu_items/revMenuItemPageOwnerOptionsSettingsTab");
const revMenuItemPageOwnerOptionsReloadTab = require("./rev_views/rev_menu_items/revMenuItemPageOwnerOptionsReloadTab");

const revLeftStripSiteNavMenuArea = require("./rev_views/rev_menu_areas/revLeftStripSiteNavMenuArea");
const revMenuAreaTopBarMoreOptions = require("./rev_views/rev_menu_areas/revMenuAreaTopBarMoreOptions");
const revListingItemOptionsMenuArea = require("./rev_views/rev_menu_areas/revListingItemOptionsMenuArea");
const revRightSideBarTopBarMenuArea = require("./rev_views/rev_menu_areas/revRightSideBarTopBarMenuArea");
const revMenuAreaPageFloatingOptions = require("./rev_views/rev_menu_areas/revMenuAreaPageFloatingOptions");
const revMenuAreaPageFloatingOptions_UserProfileActivity = require("./rev_views/rev_menu_areas/revMenuAreaPageFloatingOptions_UserProfileActivity");

const revHookRemoteHandlerGetMetadaValPublishers = require("./rev_libs_functions/revHookRemoteHandlerGetMetadaValPublishers");

/** REV START FORMS */
const revPublisherForm = require("./rev_views/rev_forms/revPublisherForm");
/** REV END FORMS */

/** REV START PAGE VIEWS */
const revPageViewCore = require("./rev_views/rev_page_views/revPageViewCore");
const revPageViewPageNavHeader = require("./rev_views/rev_page_views/revPageViewPageNavHeader");
/** REV END PAGE VIEWS */

/** REV START DELETE OVERRIDE VIEW */
const revDefaultDeleteEntity = require("./rev_views/rev_delete_override_views/revDefaultDeleteEntity");
/** REV END DELETE OVERRIDE VIEW */

var revStart = () => {
    return {
        "revPluginName": "rev_plugin_core",
        "revMenuItems": [
            revHiddenMenuItemFileExplorerTab.revPluginMenuItem,
            revMenuItemFileExplorerTab.revPluginMenuItem,
            revMenuItemEditEntity.revPluginMenuItem,
            revMenuItemDeleteEntity.revPluginMenuItem,
            revMenuItemGenericAddEntitySubTypeTab.revPluginMenuItem,
            revMenuItemMoreOptionsPageEntityTab.revPluginMenuItem,
            revMenuItemPageOwnerOptionsSettingsTab.revPluginMenuItem,
            revMenuItemPageOwnerOptionsReloadTab.revPluginMenuItem,
            revListingItemOptionsMenuArea.revPluginMenuArea,
            revLeftStripSiteNavMenuArea.revPluginMenuArea,
            revRightSideBarTopBarMenuArea.revPluginMenuArea,
            revMenuAreaTopBarMoreOptions.revPluginMenuArea,
            revMenuAreaPageFloatingOptions.revPluginMenuArea,
            revMenuAreaPageFloatingOptions_UserProfileActivity.revPluginMenuArea,
        ],
        "revForms": [revPublisherForm.revPluginOverrideView],
        "revOverrideViews": [revDefaultDeleteEntity.revPluginOverrideView],
        "revPageViews": [revPageViewCore.revPluginPageView, revPageViewPageNavHeader.revPluginPageView],
        "revModules": [{ "revNameId": "revPluginModuleUploadFileObjectsLib", "revPath": "/revPluginModuleUploadFileObjectsLib.js" }],
        "revPluginHookContextsRemoteArr": ["revHookRemoteGetMetadaValPublishers"],
        "revPluginHookHandlersRemote": [{ "revNameID": "revHookRemoteHandlerGetMetadaValPublishers", "revPluginHookContextRemote": "revHookRemoteGetMetadaValPublishers", "revHandler": revHookRemoteHandlerGetMetadaValPublishers.revHookRemoteHandlerCallback.toString() }],
    };
};

module.exports.revStart = revStart;
