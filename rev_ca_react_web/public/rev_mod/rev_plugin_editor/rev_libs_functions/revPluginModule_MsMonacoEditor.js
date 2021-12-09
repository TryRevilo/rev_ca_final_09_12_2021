(function (revPluginModule_MsMonacoEditor, $, undefined) {
    let revSetSaveCallBack = (revVarArgs) => {
        let revrevCurrClickForm = revVarArgs.revrevCurrClickForm;

        let revSavePluginEditsTabCallBack = async () => {
            await window.revLoadModules("revPluginModule_PluginFormPullCommitLib");

            if (window.revPluginModule_MsMonacoEditor) {
                let revLoadedPlugin_Id = revrevCurrClickForm.rev_plugin_name;
                let revCurrClickForm_Id = revrevCurrClickForm.revNameId;
                let revMonacoCodeEditorValue = revrevCurrClickForm.revModel.getValue();

                await window.revPluginModule_MsMonacoEditor.revSaveFile({
                    "revLoadedPlugin_Id": revLoadedPlugin_Id,
                    "revNameId": revCurrClickForm_Id,
                    "revMonacoCodeEditorValue": revMonacoCodeEditorValue,
                });
            }
        };

        revVarArgs.revSetSaveTabCallBack(revSavePluginEditsTabCallBack);
    };

    revPluginModule_MsMonacoEditor.revGetExistingFormIndex = (revForm) => {
        if (window.revIsEmptyVar(revForm)) {
            return -1;
        }

        let revRetFormIndex = -1;

        for (let i = 0; i < window.REV_PLUGIN_EDITOR_OBJECTS.revLoadedPluginsArr.length; i++) {
            let revLoadedPlugin = window.REV_PLUGIN_EDITOR_OBJECTS.revLoadedPluginsArr[i];

            if (window.revIsEmptyVar(revLoadedPlugin) || !revLoadedPlugin.hasOwnProperty("revNameId")) {
                continue;
            }

            let revLoadedPluginNameId = revLoadedPlugin.rev_plugin_name;
            let revLoadedObjectNameId = revLoadedPlugin.revNameId;

            if (revForm.rev_plugin_name.localeCompare(revLoadedPluginNameId) == 0 && revForm.revNameId.localeCompare(revLoadedObjectNameId) == 0) {
                revRetFormIndex = i;

                break;
            }
        }

        return revRetFormIndex;
    };

    revPluginModule_MsMonacoEditor.revUnSetPluginsEditorTabsActive = () => {
        let revPluginsEditorCurrentProjectTab_Id = "revPluginsEditorCurrentProjectTab_Id";

        if (window.revIsDomElementIdExists(revPluginsEditorCurrentProjectTab_Id)) {
            document.getElementById(revPluginsEditorCurrentProjectTab_Id).remove();
        }
    };

    revPluginModule_MsMonacoEditor.revSetPluginsEditorTabActive = (revCurrClickForm) => {
        if (window.revIsEmptyVar(revCurrClickForm) || window.revIsEmptyJSONObject(revCurrClickForm)) {
            return;
        }

        let revCurrClickFormIndex = window.revPluginModule_MsMonacoEditor.revGetExistingFormIndex(revCurrClickForm);

        if (revCurrClickFormIndex > -1) {
            revCurrClickForm = window.REV_PLUGIN_EDITOR_OBJECTS.revLoadedPluginsArr[revCurrClickFormIndex];

            for (let i = 0; i < window.REV_PLUGIN_EDITOR_OBJECTS.revLoadedPluginsArr.length; i++) {
                if (revCurrClickFormIndex !== i) {
                    window.REV_PLUGIN_EDITOR_OBJECTS.revLoadedPluginsArr[i]["revViewPriorityStatus"] = "revNotActive";
                } else {
                    window.REV_PLUGIN_EDITOR_OBJECTS.revLoadedPluginsArr[i]["revViewPriorityStatus"] = "revActive";
                }
            }
        }

        let revPluginsEditorCurrentProjectTab_Id = "revPluginsEditorCurrentProjectTab_Id";

        if (window.revIsDomElementIdExists(revPluginsEditorCurrentProjectTab_Id)) {
            document.getElementById(revPluginsEditorCurrentProjectTab_Id).remove();
        }

        let revPluginsEditorCurrentProjectTab = `
            <div id="${revPluginsEditorCurrentProjectTab_Id}" class="revPosAbsolute revFontSiteBlueTxtColor revFontSizeNormal revPluginEditActiveProjectTabPointer"><i class="fas fa-long-arrow-alt-down"></i></div>
        `;

        document.getElementById(revCurrClickForm.revPluginsEditorProjectTabContainer_Id).insertAdjacentHTML("beforeend", revPluginsEditorCurrentProjectTab);
    };

    revPluginModule_MsMonacoEditor.revAddPluginEditorFormCodeTab = async (revVarArgs) => {
        let revCurrClickForm = revVarArgs.revCurrClickForm;

        let revFormIndex = window.revPluginModule_MsMonacoEditor.revGetExistingFormIndex(revCurrClickForm);

        if (revFormIndex > -1) {
            revCurrClickForm = window.REV_PLUGIN_EDITOR_OBJECTS.revLoadedPluginsArr[revFormIndex];
        }

        if (revCurrClickForm.hasOwnProperty("revPluginFormCodeTab")) {
            window.revPluginModule_MsMonacoEditor.revChangeTab(revVarArgs);

            return;
        }

        let revPluginEditorFormCodeTab_Id = "revPluginEditorFormCodeTab_Id_" + window.revGenUniqueId();

        window.revSetInterval("revPluginEditorInputTabsHeaderArea_Id", () => {
            let revTruncatedNameId = window.revTruncateString(revCurrClickForm.revNameId, 22, false);

            let revPluginsEditorProjectTabContainer_Id = "revPluginsEditorProjectTabContainer_Id_" + window.revGenUniqueId();
            let revPluginsEditorProjectCloseTab_Id = "revPluginsEditorProjectCloseTab_Id_" + window.revGenUniqueId();

            window.revSetInterval(revPluginsEditorProjectCloseTab_Id, () => {
                document.getElementById(revPluginsEditorProjectCloseTab_Id).addEventListener("click", (event) => {
                    let revContentResetterCallBack = revVarArgs.revContentResetterCallBack;

                    let revCurrClipFormIndex = window.revPluginModule_MsMonacoEditor.revGetExistingFormIndex(revCurrClickForm);

                    let revCurrClipPriorityStatus = "";

                    if (!window.revIsEmptyVar(revCurrClickForm) && window.revIsEmptyJSONObject(revCurrClickForm)) {
                        revCurrClipPriorityStatus = revCurrClickForm.revViewPriorityStatus;
                    }

                    window.REV_PLUGIN_EDITOR_OBJECTS.revLoadedPluginsArr.splice(revCurrClipFormIndex, 1);

                    let revActiveIndex = revCurrClipFormIndex - 1;

                    if (revActiveIndex < 0 && window.REV_PLUGIN_EDITOR_OBJECTS.revLoadedPluginsArr.length > 0) {
                        revActiveIndex = 0;
                    }

                    let revCurrActiveForm = window.REV_PLUGIN_EDITOR_OBJECTS.revLoadedPluginsArr[revActiveIndex];

                    for (let i = 0; i < window.REV_PLUGIN_EDITOR_OBJECTS.revLoadedPluginsArr.length; i++) {
                        let revCurrActiveTest = window.REV_PLUGIN_EDITOR_OBJECTS.revLoadedPluginsArr[i];
                        let revCurrActiveTestPriorityStatus = window.REV_PLUGIN_EDITOR_OBJECTS.revLoadedPluginsArr[i].revViewPriorityStatus;

                        if (!window.revIsEmptyVar(revCurrActiveTestPriorityStatus) && revCurrActiveTestPriorityStatus.localeCompare("revActive") == 0) {
                            revCurrActiveForm = revCurrActiveTest;
                        }

                        window.REV_PLUGIN_EDITOR_OBJECTS.revLoadedPluginsArr[i]["revViewPriorityStatus"] = "revNotActive";
                    }

                    if (window.REV_PLUGIN_EDITOR_OBJECTS.revLoadedPluginsArr.length == 0) {
                        revVarArgs.revMonacoCodeEditor.setModel(null);
                        revContentResetterCallBack({});
                    } else {
                        revVarArgs["revCurrClickForm"] = revCurrActiveForm;
                        window.revPluginModule_MsMonacoEditor.revChangeTab(revVarArgs);
                    }

                    document.getElementById(revPluginsEditorProjectTabContainer_Id).remove();
                });
            });

            let revPluginFormCodeTab = `
                <div id="${revPluginsEditorProjectTabContainer_Id}" class="revPosRelative revFlexContainer revPluginsEditorProjectTabRelativeContainer">
                    <div class="revPosRelative revFlexWrapper_WidthAuto revPluginsEditorProjectTabWrapper">
                        <div id="${revPluginEditorFormCodeTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal">${revTruncatedNameId}</div>
                        <div id="${revPluginsEditorProjectCloseTab_Id}" class="revTabLink revFontSiteWhitextColor revFontSizeNormal revPluginsEditorProjectCloseTab">x</div>
                    </div>
                </div>
            `;

            revCurrClickForm["revPluginsEditorProjectTabContainer_Id"] = revPluginsEditorProjectTabContainer_Id;
            revCurrClickForm["revPluginFormCodeTab"] = revPluginFormCodeTab;

            document.getElementById("revPluginEditorInputTabsHeaderArea_Id").insertAdjacentHTML("beforeend", revPluginFormCodeTab);

            revCurrClickForm["revTabStatus"] = "revAdded";

            /** REV START UPDATE CODE CLICK TAB */
            let revCurrClickFormIndex = window.revPluginModule_MsMonacoEditor.revGetExistingFormIndex(revCurrClickForm);
            window.REV_PLUGIN_EDITOR_OBJECTS.revLoadedPluginsArr[revCurrClickFormIndex] = revCurrClickForm;

            window.revPluginModule_MsMonacoEditor.revChangeTab(revVarArgs);
            /** REV END UPDATE CODE CLICK TAB */

            window.revSetInterval(revPluginEditorFormCodeTab_Id, () => {
                document.getElementById(revPluginEditorFormCodeTab_Id).addEventListener("click", (event) => {
                    if (revVarArgs.hasOwnProperty("revContentResetterCallBack")) {
                        let revCurrClipFormIndex = window.revPluginModule_MsMonacoEditor.revGetExistingFormIndex(revCurrClickForm);

                        if (revCurrClipFormIndex > -1) {
                            revVarArgs["revCurrClickForm"] = window.REV_PLUGIN_EDITOR_OBJECTS.revLoadedPluginsArr[revCurrClipFormIndex];
                        }

                        window.revPluginModule_MsMonacoEditor.revChangeTab(revVarArgs);
                    }
                });
            });
        });
    };

    revPluginModule_MsMonacoEditor.revChangeTab = (revVarArgs) => {
        if (window.revIsEmptyVar(revVarArgs)) {
            return;
        }

        let revCurrClickForm = revVarArgs.revCurrClickForm;
        let revMonacoCodeEditor = revVarArgs.revMonacoCodeEditor;

        let revCurrClickFormIndex = window.revPluginModule_MsMonacoEditor.revGetExistingFormIndex(revCurrClickForm);

        if (!revCurrClickForm.hasOwnProperty("revModel") || window.revIsEmptyVar(revCurrClickForm.revModel)) {
            if (!revCurrClickForm.hasOwnProperty("revModel")) {
                revCurrClickForm["revModel_Id"] = "revModel_Id_" + window.revGenUniqueId();
            }

            revCurrClickForm["revModel"] = monaco.editor.createModel(revCurrClickForm.revOverrideView, revCurrClickForm.revCodeLang);
        }

        if (revCurrClickFormIndex == -1) {
            window.REV_PLUGIN_EDITOR_OBJECTS.revLoadedPluginsArr.push(revCurrClickForm);
        } else {
            revCurrClickForm = window.REV_PLUGIN_EDITOR_OBJECTS.revLoadedPluginsArr[revCurrClickFormIndex];
        }

        let revSelectedModel = revCurrClickForm.revModel;

        let currentState = revMonacoCodeEditor.saveViewState();

        revSelectedModel.state = currentState;

        revMonacoCodeEditor.setModel(revSelectedModel);
        revMonacoCodeEditor.restoreViewState(revSelectedModel.state);
        revMonacoCodeEditor.focus();

        let revCurrentModel = revMonacoCodeEditor.getModel();

        if (window.revIsEmptyVar(revCurrClickForm.revCodeLang)) {
            revCurrClickForm["revCodeLang"] = "javascript";
        }

        monaco.editor.setModelLanguage(revCurrentModel, revCurrClickForm.revCodeLang);

        if (revVarArgs.hasOwnProperty("revContentResetterCallBack")) {
            revVarArgs.revContentResetterCallBack(revCurrClickForm);
        }

        window.revPluginModule_MsMonacoEditor.revSetPluginsEditorTabActive(revCurrClickForm);
    };

    revPluginModule_MsMonacoEditor.revPluginEditorFormCodeTabClickAction = async (revVarArgs) => {
        let revMonacoCodeEditor = revVarArgs.revMonacoCodeEditor;
        let revContentResetterCallBack = revVarArgs.revContentResetterCallBack;
        let revCurrClickForm = revVarArgs.revCurrClickForm;

        let revCurrClickFormIndex = window.revPluginModule_MsMonacoEditor.revGetExistingFormIndex(revCurrClickForm);

        if (revCurrClickFormIndex > -1) {
            revCurrClickForm = window.REV_PLUGIN_EDITOR_OBJECTS.revLoadedPluginsArr[revCurrClickFormIndex];
        }

        if (window.revIsEmptyVar(revCurrClickForm) || window.revIsEmptyJSONObject(revCurrClickForm)) {
            revContentResetterCallBack({});
            return;
        }

        if (!revCurrClickForm.hasOwnProperty("revModel")) {
            revCurrClickForm["revModel_Id"] = "revModel_Id_" + window.revGenUniqueId();
            revCurrClickForm["revModel"] = monaco.editor.createModel(revCurrClickForm.revOverrideView, revCurrClickForm.revCodeLang);
        }

        revSetSaveCallBack({ "revCurrClickForm": revCurrClickForm, "revSetSaveTabCallBack": revVarArgs.revSetSaveTabCallBack });

        if (window.revIsEmptyVar(revCurrClickForm) || window.revIsEmptyJSONObject(revCurrClickForm)) {
            revContentResetterCallBack({});
            return;
        }

        /** REV START EDIT TAB */
        if (!revCurrClickForm.hasOwnProperty("revPluginsEditorProjectTabContainer_Id")) {
            window.revPluginModule_MsMonacoEditor.revAddPluginEditorFormCodeTab({
                "revMonacoCodeEditor": revMonacoCodeEditor,
                "revContentResetterCallBack": revContentResetterCallBack,
                "revSetSaveTabCallBack": revVarArgs.revSetSaveTabCallBack,
                "revCurrClickForm": revCurrClickForm,
            });
        }
        /** REV END EDIT TAB */

        revCurrClickForm["revViewPriorityStatus"] = "revActive";

        revContentResetterCallBack(revCurrClickForm);

        window.revPluginModule_MsMonacoEditor.revChangeTab({ "revCurrClickForm": revCurrClickForm, "revMonacoCodeEditor": revMonacoCodeEditor });
    };
})((window.revPluginModule_MsMonacoEditor = window.revPluginModule_MsMonacoEditor || {}), jQuery);
