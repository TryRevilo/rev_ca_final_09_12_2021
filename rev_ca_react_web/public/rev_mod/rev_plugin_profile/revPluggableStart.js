const revPageViewProfilePublisher = require("./rev_views/rev_page_views/revPageViewProfilePublisher");
const revPageOwnerOptionsMenuArea = require("./rev_views/rev_menu_items/revPageOwnerOptionsMenuArea");
const revPageViewProfileInfo = require("./rev_views/rev_page_views/revPageViewProfileInfo");
const revPageViewEntityProfile = require("./rev_views/rev_page_views/revPageViewEntityProfile");
const revInfo = require("./rev_views/rev_forms/revInfo");

/** REV START REMOTE ENV HANDLERS */
const revPluginHookRemoteEnvironment_GetUserEntitiesArr = require("./rev_lib_functions_remote_env/revPluginHookRemoteEnvironment_GetUserEntitiesArr");
/** REV END REMOTE ENV HANDLERS */

var revStart = () => {
    return {
        "revPluginName": "rev_plugin_profile",
        "revPageViews": [
            // revPageViewProfilePublisher.revPluginPageView
            revPageViewProfileInfo.revPluginPageView,
            revPageViewEntityProfile.revPluginPageView,
        ],
        "revMenuItems": [revPageOwnerOptionsMenuArea.revPluginMenuItem],
        "revForms": [revInfo.revPluginOverrideView],
        "revModules": [
            { "revNameId": "revPluginModuleDownloadUserProfileData", "revPath": "/revPluginModuleDownloadUserProfileData.js" },
            { "revNameId": "revPluginModuleUserProfileFunctions", "revPath": "/revPluginModuleUserProfileFunctions.js" },
        ],
        "revPluginHookHandlersRemoteEnvironment": [{ "revNameID": "revPluginHookRemoteEnvironment_GetUserEntitiesArr", "revHandler": revPluginHookRemoteEnvironment_GetUserEntitiesArr.revHookRemoteHandlerCallback.toString() }],
    };
};

module.exports.revStart = revStart;
