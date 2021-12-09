(function (revPluginModule_PluginFormPullCommitLib, $, undefined) {
    revPluginModule_PluginFormPullCommitLib.revSaveFile = async (revVarArgs) => {
        if (!revVarArgs || !revVarArgs.revLoadedPlugin_Id || !revVarArgs.revMonacoCodeEditorValue) {
            console.log("!revVarArgs || !revVarArgs.revLoadedPlugin_Id || !revVarArgs.revMonacoCodeEditorValue");

            return;
        }

        let revLoadedPlugin_Id = revVarArgs.revLoadedPlugin_Id;
        let revPluginFormNameId = revVarArgs.revNameId;

        let revMonacoCodeEditorValue = revVarArgs.revMonacoCodeEditorValue;

        let revPluginEditNotes = "";

        if (revVarArgs.revPluginEditNotes) {
            revPluginEditNotes = revVarArgs.revPluginEditNotes;
        }

        let revPluginCodeCSS = "";

        if (revVarArgs.revPluginCodeCSS) {
            revPluginCodeCSS = revVarArgs.revPluginCodeCSS;
        }

        console.log(revPluginFormNameId + " : revMonacoCodeEditorValue : " + revMonacoCodeEditorValue);

        let revPluginFormVarArgs = {
            "revLoggedInEntityGUID": window.REV_LOGGED_IN_ENTITY_GUID,
            "revPluginNameId": revLoadedPlugin_Id,
            "revPluginFormNameId": revPluginFormNameId,
            "revPluginCode": revMonacoCodeEditorValue,
            "revPluginEditNotes": revPluginEditNotes,
            "revPluginCodeCSS": revPluginCodeCSS,
        };

        // let revURL = window.REV_SITE_BASE_PATH + "/rev_base_api_post?revPluginHookContextsRemoteArr=revHookRemoteHandler_PluginFormPullCommit";

        // window.revPostServerData(revURL, revPluginFormVarArgs, async (revRetData) => {
        //     console.log("revRetData : " + JSON.stringify(revRetData));
        // });
    };
})((window.revPluginModule_PluginFormPullCommitLib = window.revPluginModule_PluginFormPullCommitLib || {}), jQuery);
