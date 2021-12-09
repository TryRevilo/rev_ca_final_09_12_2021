(function (revPluginModuleDownloadUserProfileData, $, undefined) {
    revPluginModuleDownloadUserProfileData.revDownloadUserProfileData = async (revVarArgs, callback) => {
        let revPath = window.REV_SITE_BASE_PATH + "/rev_api/get_flat_entity?remote_rev_entity_guid=" + revVarArgs.remoteRevEntityGUID + "&rev_logged_in_entity_guid=" + revVarArgs.revLoggedInEntityGUID + "&revPluginHookContextsRemoteArr=revHookRemoteHandlerProfile,revHookRemoteHandlerProfileStats,revHookRemoteHandler_GetEntityConnRels";

        try {
            let revData = await window.revGetServerData_JSON_Async(revPath);
            revData = revData.filter[0];

            window.revLoadModules("revPluginModuleLocalHistoryLib", (revScriptModule) => {
                let revDataEntityGUID = revData._remoteRevEntityGUID;

                let revHistCallbackFunc = async (revHistVarArgsData) => {
                    let revVarArgsData = revHistVarArgsData.revVarArgsData;

                    try {
                        let revLoadedPageView = await window.revGetLoadedPageViewAreaContainer("revMainCenterScrollArea", revVarArgsData);
                        window.revDrawMainContentArea({ "revData": revVarArgsData, "revLoadedPageView": revLoadedPageView, "revFloatingOptionsMenuName": "123" });
                    } catch (error) {
                        console.log("ERR -> revPluginModuleDownloadUserProfileData.js -> " + error);
                    }
                };

                window.revPluginModuleLocalHistoryLib.revAddNewHistoryItem({ "revDataEntityGUID": revDataEntityGUID, "revVarArgsData": revData, "revHistCallbackFunc": revHistCallbackFunc });
            });

            callback(revData);
        } catch (error) {
            console.log("ERR -> revPluginModuleDownloadUserProfileData.js -> !revData -> " + error);
        }
    };
})((window.revPluginModuleDownloadUserProfileData = window.revPluginModuleDownloadUserProfileData || {}), jQuery);
