(function (revPluginModuleLocalHistoryLib, $, undefined) {
    let revPluginModuleLocalHistoryLibInit = () => {
        if (!window.REV_HISTORY_OBJECTS_ARR) {
            let revLoggedInEntity = window.REV_LOGGED_IN_ENTITY;

            let revHistCallbackFunc = async (revHistVarArgsData) => {
                let revPassVarArgsData = revHistVarArgsData.revVarArgsData;

                try {
                    let revLoadedPageView = await window.revGetLoadedPageViewAreaContainer("revMainCenterScrollArea", revPassVarArgsData);
                    window.revDrawMainContentArea({ "revData": revPassVarArgsData, "revLoadedPageView": revLoadedPageView, "revFloatingOptionsMenuName": "123" });
                } catch (error) {
                    console.log("ERR -> revPluginModuleLocalHistoryLib.js -> " + error);
                }
            };

            window.REV_HISTORY_OBJECTS_ARR = [{ "revDataEntityGUID": revLoggedInEntity._remoteRevEntityGUID, "revVarArgsData": revLoggedInEntity, "revHistCallbackFunc": revHistCallbackFunc }];

            window.REV_HISTORY_OBJECTS_ARR_POINTER = window.REV_HISTORY_OBJECTS_ARR.length;
        }
    };

    revPluginModuleLocalHistoryLib.revAddNewHistoryItem = (revVarArgs) => {
        revPluginModuleLocalHistoryLibInit();

        let newHistItemGUID = revVarArgs.revDataEntityGUID;

        let revCurrPointer = window.REV_HISTORY_OBJECTS_ARR_POINTER;

        let revLastHistoryItem;

        if (revCurrPointer < 1) {
            revLastHistoryItem = window.REV_HISTORY_OBJECTS_ARR[0];
        } else {
            revLastHistoryItem = window.REV_HISTORY_OBJECTS_ARR[revCurrPointer - 1];
        }

        if (!revLastHistoryItem || revLastHistoryItem.revDataEntityGUID !== newHistItemGUID) {
            if (revCurrPointer < 1) {
                ++revCurrPointer;
            }

            window.REV_HISTORY_OBJECTS_ARR.splice(revCurrPointer, 0, revVarArgs);
            window.REV_HISTORY_OBJECTS_ARR_POINTER = revCurrPointer + 1;
        }
    };

    revPluginModuleLocalHistoryLib.revGetLastHistoryItem = () => {
        revPluginModuleLocalHistoryLibInit();

        if (window.REV_HISTORY_OBJECTS_ARR_POINTER > 0) {
            window.REV_HISTORY_OBJECTS_ARR_POINTER = window.REV_HISTORY_OBJECTS_ARR_POINTER - 1;
        }

        let revCurrPointer = window.REV_HISTORY_OBJECTS_ARR_POINTER;

        let revLastHistoryItem;

        if (revCurrPointer < 1) {
            revLastHistoryItem = window.REV_HISTORY_OBJECTS_ARR[0];
        } else {
            revLastHistoryItem = window.REV_HISTORY_OBJECTS_ARR[revCurrPointer - 1];
        }

        return revLastHistoryItem;
    };
})((window.revPluginModuleLocalHistoryLib = window.revPluginModuleLocalHistoryLib || {}), jQuery);
