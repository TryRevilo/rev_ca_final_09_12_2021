var revFormViewWidget = async (revVarArgs) => {
    let revPluginTreeTabPopUpView_Id = "revPluginTreeTabPopUpView_Id_" + window.revGenUniqueId();
    let revCodePluginsContainer_Id = "revCodePluginsContainer_Id_" + window.revGenUniqueId();
    let revObject_PluginEditorHomeContainer_Id = "revObject_PluginEditorHomeContainer_Id_" + window.revGenUniqueId();

    let revMonacoCodeEditor;

    if (window.revIsEmptyVar(window.REV_PLUGIN_EDITOR_OBJECTS)) {
        window.REV_PLUGIN_EDITOR_OBJECTS = { "revLoadedPluginName": "", "revLoadedPluginsArr": [], "revLoadedSavedPluginProjectEditsArr": [] };
    }

    let revPluginEditorHomeData = {};
    let revPluginEditorHomeFunctions = {};

    let revSetPluginEditorHomeData = (revDataVarArgs) => {
        let revData_Id = revDataVarArgs.revData_Id;
        let revDataVal = revDataVarArgs.revDataVal;

        revPluginEditorHomeData[revData_Id] = revDataVal;
    };

    let revGetPluginEditorHomeDataVal = (revData_Id) => {
        return revPluginEditorHomeData[revData_Id];
    };

    let revSetPluginEditorHomeFunction = (revFunctionVarArgs) => {
        let revFunc_Id = revFunctionVarArgs.revFunc_Id;
        let revFunc = revFunctionVarArgs.revFunc;

        revPluginEditorHomeFunctions[revFunc_Id] = revFunc;
    };

    let revGetPluginEditorHomeFunction = (revFunc_Id) => {
        return revPluginEditorHomeFunctions[revFunc_Id];
    };

    let revShowPluginProjectsHomeView = (revHomeView) => {
        window.revHideVisibility(revCodePluginsContainer_Id);
        window.revShowVisibility(revObject_PluginEditorHomeContainer_Id);
    };

    revSetPluginEditorHomeFunction({ "revFunc_Id": "revShowPluginProjectsHomeView", "revFunc": revShowPluginProjectsHomeView });

    let revSetPluginProjectsHomeView = (revHomeView) => {
        revGetPluginEditorHomeFunction("revShowPluginProjectsHomeView")();

        document.getElementById(revObject_PluginEditorHomeContainer_Id).innerHTML = revHomeView;
    };

    revSetPluginEditorHomeFunction({ "revFunc_Id": "revSetPluginProjectsHomeView", "revFunc": revSetPluginProjectsHomeView });

    /** REV START LOAD CURRENT PROJECTS */
    let revFormIsAddedToScope = (revArr, revPluginEditEntity) => {
        let revIsAdded = false;

        let revPluginEditEntityPlugin_Id = window.revGetMetadataValue(revPluginEditEntity._revInfoEntity._revEntityMetadataList, "rev_plugin_edit_name_id");
        let revPluginEditEntityFormNameId = window.revGetMetadataValue(revPluginEditEntity._revInfoEntity._revEntityMetadataList, "rev_plugin_edit_form_name_id");

        for (let i = 0; i < revArr.length; i++) {
            let revLoadedPlugin = revArr[i];

            let revLoadedPluginNameId = revLoadedPlugin.rev_plugin_name;
            let revLoadedObjectNameId = revLoadedPlugin.revNameId;

            if (revPluginEditEntityPlugin_Id.localeCompare(revLoadedPluginNameId) == 0 && revPluginEditEntityFormNameId.localeCompare(revLoadedObjectNameId) == 0) {
                revIsAdded = true;

                break;
            }
        }

        return revIsAdded;
    };

    let revPluginEntityFormIsAddedToScope = (revPluginEntitiesArr, revPluginEditEntity) => {
        let revIsAdded = false;

        let revPluginEditEntityPlugin_Id = window.revGetMetadataValue(revPluginEditEntity._revInfoEntity._revEntityMetadataList, "rev_plugin_edit_name_id");
        let revPluginEditEntityFormNameId = window.revGetMetadataValue(revPluginEditEntity._revInfoEntity._revEntityMetadataList, "rev_plugin_edit_form_name_id");

        for (let i = 0; i < revPluginEntitiesArr.length; i++) {
            let revPluginEntity = revPluginEntitiesArr[i];

            let revLoadedPluginNameId = window.revGetMetadataValue(revPluginEntity._revInfoEntity._revEntityMetadataList, "rev_plugin_edit_name_id");
            let revLoadedObjectNameId = window.revGetMetadataValue(revPluginEntity._revInfoEntity._revEntityMetadataList, "rev_plugin_edit_form_name_id");

            if (revPluginEditEntityPlugin_Id.localeCompare(revLoadedPluginNameId) == 0 && revPluginEditEntityFormNameId.localeCompare(revLoadedObjectNameId) == 0) {
                revIsAdded = true;

                break;
            }
        }

        return revIsAdded;
    };

    window.revSetInterval(revCodePluginsContainer_Id, async () => {
        revMonacoCodeEditor = window.revMonacoCodeEditorLoader(revCodePluginsContainer_Id, "", "");
    });

    let revGetMonacoPluginEditor = () => {
        return revMonacoCodeEditor;
    };

    try {
        let revURL = `${window.REV_SITE_BASE_PATH}/rev_api?rev_logged_in_entity_guid=${window.REV_LOGGED_IN_ENTITY_GUID}&revPluginHookContextsRemoteArr=revHookRemoteHandler_GetPluginPullProjects`;

        let revData = await window.revGetServerData_JSON_Async(revURL);

        let revPluginEditsArr = revData.revPluginEditsArr;

        if (revPluginEditsArr.length) {
            window.revShowVisibility(revCodePluginsContainer_Id);
            window.revHideVisibility(revObject_PluginEditorHomeContainer_Id);
        }

        for (let i = 0; i < revPluginEditsArr.length; i++) {
            let revCurrPluginEdit = revPluginEditsArr[i];

            let revLoadedPlugin_Id = window.revGetMetadataValue(revCurrPluginEdit._revInfoEntity._revEntityMetadataList, "rev_plugin_edit_name_id");
            let revPluginEditFormNameId = window.revGetMetadataValue(revCurrPluginEdit._revInfoEntity._revEntityMetadataList, "rev_plugin_edit_form_name_id");
            let revPluginEditCode = window.revGetMetadataValue(revCurrPluginEdit._revInfoEntity._revEntityMetadataList, "rev_plugin_edit_code");

            let revPluginEntityGUID = revCurrPluginEdit._remoteRevEntityGUID;

            let revCurrClickForm = {
                "revMonacoCodeEditor": revMonacoCodeEditor,
                "revCodeLang": "javascript",
                "revPluginEntityGUID": revPluginEntityGUID,
                "rev_plugin_name": revLoadedPlugin_Id,
                "revNameId": revPluginEditFormNameId,
                "revOverrideView": revPluginEditCode,
            };

            if (i == 0) {
                window.REV_PLUGIN_EDITOR_OBJECTS["revLoadedPluginName"] = revLoadedPlugin_Id;
                revCurrClickForm["revViewPriorityStatus"] = "revActive";
            }

            if (!revFormIsAddedToScope(window.REV_PLUGIN_EDITOR_OBJECTS.revLoadedPluginsArr, revCurrPluginEdit)) {
                window.REV_PLUGIN_EDITOR_OBJECTS.revLoadedPluginsArr.push(revCurrClickForm);
            }

            if (!revPluginEntityFormIsAddedToScope(window.REV_PLUGIN_EDITOR_OBJECTS.revLoadedSavedPluginProjectEditsArr, revCurrPluginEdit)) {
                window.REV_PLUGIN_EDITOR_OBJECTS.revLoadedSavedPluginProjectEditsArr.push(revCurrPluginEdit);
            }
        }
    } catch (error) {
        console.log("ERR -> revFormPluginEditor_Widget.js -> revHookRemoteHandler_GetPluginPullProjects -> " + error);
    }
    /** REV START LOAD CURRENT PROJECTS */

    for (let i = 0; i < window.REV_PLUGIN_EDITOR_OBJECTS.revLoadedPluginsArr.length; i++) {
        window.REV_PLUGIN_EDITOR_OBJECTS.revLoadedPluginsArr[i]["revTabStatus"] = "revRemoved";
    }

    let revSaveTabCallBack = async () => {
        console.log("ERR -> UNSET");
    };

    let revSetSaveTabCallBack = (_revSaveTabCallBack) => {
        revSaveTabCallBack = _revSaveTabCallBack;
    };

    let revPluginNameTabView = (revPluginNameTab) => {
        return `
            <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper_WidthAuto revPluginNameTabWrapper">
                <div class="revPluginNameTabViewicon"><i class="fas fa-folder-open fa-lg"></i></div>
                <div class="revPluginNameTabViewTxt">${revPluginNameTab}</div>
            </div>
        `;
    };

    let revContentResetterCallBack = (revMonacoCodeEditorData) => {
        if (window.revIsEmptyJSONObject(revMonacoCodeEditorData)) {
            window.revHideVisibility(revCodePluginsContainer_Id);
            window.revShowVisibility(revObject_PluginEditorHomeContainer_Id);

            return;
        }

        window.revShowVisibility(revCodePluginsContainer_Id);
        window.revHideVisibility(revObject_PluginEditorHomeContainer_Id);

        for (let i = 0; i < window.REV_PLUGIN_EDITOR_OBJECTS.revLoadedPluginsArr.length; i++) {
            let revLoadedPlugin = window.REV_PLUGIN_EDITOR_OBJECTS.revLoadedPluginsArr[i];
            revLoadedPlugin["revViewPriorityStatus"] = "revNotActive";
        }

        let revModel_Id = revMonacoCodeEditorData.revModel_Id;

        if (window.revJSONArrContains_NameId(window.REV_PLUGIN_EDITOR_OBJECTS.revLoadedPluginsArr, "revModel_Id", revModel_Id) == false) {
            window.REV_PLUGIN_EDITOR_OBJECTS.revLoadedPluginsArr.push(revMonacoCodeEditorData);
        }
    };

    let revPluginTreeTabCallBack = (revPluginId) => {
        if (window.revIsEmptyVar(revPluginId)) {
            return;
        }

        window.revShowVisibility(revCodePluginsContainer_Id);
        window.revHideVisibility(revObject_PluginEditorHomeContainer_Id);

        window.revSetInterval(revCodePluginsContainer_Id, async () => {
            try {
                let revPluginViewsArr = [];

                let revURL = `${window.REV_SITE_BASE_PATH}/rev_api?rev_logged_in_entity_guid=${window.REV_LOGGED_IN_ENTITY_GUID}&rev_plugin_id=${revPluginId}&revPluginHookContextsRemoteArr=revHookRemoteHandler_GetLoadedPlugin`;

                let revData = await window.revGetServerData_JSON_Async(revURL);

                if (window.revIsEmptyVar(revData) || window.revIsEmptyVar(revData.revLoadedPlugin)) {
                    console.log("window.revIsEmptyVar(revData) || window.revIsEmptyVar(revData.revLoadedPlugin)");

                    return;
                }

                let revLoadedPlugin = revData.revLoadedPlugin;

                window.REV_PLUGIN_EDITOR_OBJECTS["revLoadedPlugin"] = revLoadedPlugin;

                for (revLoadedPluginStartObject_Id in revLoadedPlugin) {
                    if (window.revStringEmpty(revLoadedPluginStartObject_Id)) {
                        continue;
                    }

                    let revMenuAreaPluginViewsGroupTab = await window.revGetMenuAreaView(revLoadedPluginStartObject_Id, {
                        "revMonacoCodeEditor": revMonacoCodeEditor,
                        "revLoadedPlugin_Id": revPluginId,
                        "revCodeLang": "javascript",
                        "revLoadedPluginStartObject_Id": revLoadedPluginStartObject_Id,
                        "revLoadedPluginStartObject": revLoadedPlugin[revLoadedPluginStartObject_Id],
                        "revContentResetterCallBack": revContentResetterCallBack,
                        "revPluginTreeTabPopUpView_Id": revPluginTreeTabPopUpView_Id,
                        "revSetSaveTabCallBack": revSetSaveTabCallBack,
                    });

                    revPluginViewsArr.push(revMenuAreaPluginViewsGroupTab);
                }

                let revPluginTreeTabPopUpView = `
                    <div id="${revPluginTreeTabPopUpView_Id}" class="revPosAbsolute revFlexContainer revPluginTreeTabPopUpViewContainer">
                        <div class="revPluginNameTabView">${revPluginNameTabView(revPluginId)}</div>
                        <div class="revFlexContainer revPluginTreeTabsContainer">${revPluginViewsArr.join("")}</div>
                    </div>
                `;

                window.revSetInterval(revCodePluginsContainer_Id, () => {
                    window.revAddRemoveToggleView("afterbegin", revCodePluginsContainer_Id, revPluginTreeTabPopUpView_Id, revPluginTreeTabPopUpView);
                });
            } catch (error) {
                console.log("ERR -> revFormPluginEditor_Widget.js -> revHookRemoteHandler_GetLoadedPlugin -> " + error);
            }
        });
    };

    if (!window.revIsEmptyVar(window.REV_PLUGIN_EDITOR_OBJECTS.revLoadedPluginName)) {
        revPluginTreeTabCallBack(window.REV_PLUGIN_EDITOR_OBJECTS.revLoadedPluginName);
    }

    /** REV START LOAD PLUGIN NAMES DROP-DOWN */
    let revLoadedPluginsNamesTabViewsArr = [];

    try {
        let revURL = `${window.REV_SITE_BASE_PATH}/rev_api?rev_logged_in_entity_guid=${window.REV_LOGGED_IN_ENTITY_GUID}&revPluginHookContextsRemoteArr=revHookRemoteHandler_GetLoadedPluginsNamesArr`;

        let revData = await window.revGetServerData_JSON_Async(revURL);

        let revLoadedPluginsNamesArr = revData.revLoadedPluginsNamesArr;

        for (let i = 0; i < revLoadedPluginsNamesArr.length; i++) {
            let revLoadedPluginName = revLoadedPluginsNamesArr[i];

            let revLoadedPluginsNameTabView_Id = i + "_revLoadedPluginsNameTabView_Id_" + window.revGenUniqueId();

            window.revSetInterval(revLoadedPluginsNameTabView_Id, () => {
                document.getElementById(revLoadedPluginsNameTabView_Id).addEventListener("click", (event) => {
                    revPluginTreeTabCallBack(revLoadedPluginName);

                    window.REV_PLUGIN_EDITOR_OBJECTS["revLoadedPluginName"] = revLoadedPluginName;
                });
            });

            revLoadedPluginsNamesTabViewsArr.push(`
                <div id="${revLoadedPluginsNameTabView_Id}" class="revTabLink dropdown-item revFlexWrapper">${revLoadedPluginName}</div>
            `);
        }
    } catch (error) {
        console.log("ERR -> revFormPluginEditor_Widget.js -> revHookRemoteHandler_GetLoadedPluginsNamesArr -> " + error);
    }

    let revDropDownMenuAreaPluginNamesVarArgs = {
        "revMenuItemsArr": revLoadedPluginsNamesTabViewsArr,
    };

    let revDropDownMenuArea_PluginNames = await window.revDropdownMenu(revDropDownMenuAreaPluginNamesVarArgs);
    /** REV END LOAD PLUGIN NAMES DROP-DOWN */

    let revPluginEditorHeaderTabsConst = (revPluginEditorTab, revCallBack, revLeftDivider) => {
        let revLeftDividerView = `<div class="revPluginEditorTabSmallDivider">${window.revSmallDividerWrapper()}</div>`;

        if (revLeftDivider || revLeftDivider == "") {
            revLeftDividerView = revLeftDivider;
        }

        let revPluginEditorTab_Id = "revPluginEditorTab_Id_" + window.revGenUniqueId();

        if (revCallBack) {
            window.revSetInterval(revPluginEditorTab_Id, async () => {
                document.getElementById(revPluginEditorTab_Id).addEventListener("click", async (event) => {
                    await revCallBack(window.REV_PLUGIN_EDITOR_OBJECTS.revLoadedPluginName);
                });
            });
        }

        return `
            <div id="${revPluginEditorTab_Id}" class="revTabLink revFlexWrapper_WidthAuto revCodeEditorHeaderTabItemWrapper">
                ${revLeftDividerView}
                <div class="revCodeEditorHeaderTab">${revPluginEditorTab}</div>
            </div>
        `;
    };

    let revSavePluginEditsTabCallBack = async () => {
        await revSaveTabCallBack();
    };

    let revPluginEditorInputTabsHeaderArea_Id = "revPluginEditorInputTabsHeaderArea_Id";

    let revHomeTabInit = () => {
        let revPluginEditorHomeTab_Id = "revPluginEditorHomeTab_Id_" + window.revGenUniqueId();

        window.revSetInterval(revObject_PluginEditorHomeContainer_Id, async () => {
            let revObject_PluginEditorHome = await window.revGetLoadedPageViewAreaContainer("revObject_PluginEditorHome", {
                "revLoadedPluginEditsArr": window.REV_PLUGIN_EDITOR_OBJECTS.revLoadedSavedPluginProjectEditsArr,
                "revGetMonacoPluginEditor": revGetMonacoPluginEditor,
                "revSetSaveTabCallBack": revSetSaveTabCallBack,
                "revContentResetterCallBack": revContentResetterCallBack,
                "revSetPluginEditorHomeData": revSetPluginEditorHomeData,
                "revGetPluginEditorHomeDataVal": revGetPluginEditorHomeDataVal,
                "revSetPluginEditorHomeFunction": revSetPluginEditorHomeFunction,
                "revGetPluginEditorHomeFunction": revGetPluginEditorHomeFunction,
            });

            document.getElementById(revObject_PluginEditorHomeContainer_Id).innerHTML = revObject_PluginEditorHome;
        });

        window.revSetIntervalMulti([revCodePluginsContainer_Id, revPluginEditorHomeTab_Id], () => {
            document.getElementById(revPluginEditorHomeTab_Id).addEventListener("click", async (event) => {
                window.revHideVisibility(revCodePluginsContainer_Id);
                window.revShowVisibility(revObject_PluginEditorHomeContainer_Id);

                await window.revLoadModules("revPluginModule_MsMonacoEditor");

                window.revPluginModule_MsMonacoEditor.revChangeTab();
                window.revPluginModule_MsMonacoEditor.revUnSetPluginsEditorTabsActive();
            });
        });

        let revPluginEditorHomeTab = `
            <div class="revFlexWrapper_WidthAuto revPluginProjectssEditorTabHomeWrapper">
                <div id="${revPluginEditorHomeTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal visible revPluginProjectssEditorTabHome"><i class="fas fa-home"></i></div>
                <div class="revSmall-H-Line revPluginProjectssEditorTabHomeBackground"></div>
            </div>
        `;

        return revPluginEditorHomeTab;
    };

    let revPluginEditsInfoDetailsTab_Id = "revPluginEditsInfoDetailsTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revPluginEditsInfoDetailsTab_Id, () => {
        document.getElementById(revPluginEditsInfoDetailsTab_Id).addEventListener("click", async () => {
            let revPassVarArgs = {
                "revLoadedPluginEditsArr": window.REV_PLUGIN_EDITOR_OBJECTS.revLoadedSavedPluginProjectEditsArr,
                "revGetMonacoPluginEditor": revGetMonacoPluginEditor,
                "revSetSaveTabCallBack": revSetSaveTabCallBack,
                "revContentResetterCallBack": revContentResetterCallBack,
                "revSetPluginEditorHomeData": revSetPluginEditorHomeData,
                "revGetPluginEditorHomeDataVal": revGetPluginEditorHomeDataVal,
                "revSetPluginEditorHomeFunction": revSetPluginEditorHomeFunction,
                "revGetPluginEditorHomeFunction": revGetPluginEditorHomeFunction,
            };

            let revObject_PluginModuleProjectEditDetails = await window.revGetLoadedPageView("revObject_PluginModuleProjectEditDetails", revPassVarArgs);
            let revSetPluginEditorHomeObjectView = revGetPluginEditorHomeFunction("revSetPluginEditorHomeObjectView");
            revSetPluginEditorHomeObjectView(revObject_PluginModuleProjectEditDetails);

            revGetPluginEditorHomeFunction("revShowPluginProjectsHomeView")();
        });
    });

    let revCodePluginsEditor = `
        <div class="revPosRelative revFlexContainer revCodePluginsEditorAreaContainer">
            <div class="revPosAbsolute revFlexWrapper revCodePluginsEditorAreaTopBackground"></div>
            <div class="revPosAbsolute revFlexWrapper_WidthAuto revCodeEditorHeaderTabsWrapper">
                <div class="revFlexWrapper_WidthAuto revCodeEditorHeaderTabsLeftGrpWrapper">
                    <div class="revFlexWrapper revDropDownMenuArea_PluginNamesWrapper">${revDropDownMenuArea_PluginNames}</div>
                    <div class="revSmall-H-Line"></div>
                    ${revPluginEditorHeaderTabsConst('<i class="fas fa-project-diagram revFontSiteBlueTxtColor"></i>', revPluginTreeTabCallBack, "")}
                    ${revPluginEditorHeaderTabsConst('<i class="fas fa-eye fa-lg revFontSiteBlueTxtColor revPluginEditorPreviewTab"></i>', revPluginTreeTabCallBack)}
                    ${revPluginEditorHeaderTabsConst('<i class="fas fa-save fa-lg revFontSiteBlueTxtColor"></i>', revSavePluginEditsTabCallBack)}
                    ${revPluginEditorHeaderTabsConst('<i class="fas fa-code-branch fa-lg revFontSiteBlueTxtColor"></i>', revPluginTreeTabCallBack)}
                    ${revPluginEditorHeaderTabsConst('<i class="fa fa-upload fa-lg revFontSiteGreenTxtColor"></i>', revPluginTreeTabCallBack)}
                    ${revPluginEditorHeaderTabsConst('<i class="far fa-trash-alt fa-lg revFontSiteRedTxtColor"></i>', revPluginTreeTabCallBack)}                    
                    ${revPluginEditorHeaderTabsConst('<i class="fas fa-folder-open fa-lg"></i>', revPluginTreeTabCallBack)}
                </div>
                <div class="revTabLink revFontSizeNormal revOriginalFileTab"><i class="fas fa-file-import fa-lg"></i></div>
                <div class="revTabLink revFontSizeNormal revPluginFileEditorsTab"><i class="fas fa-chalkboard-teacher fa-lg"></i></div>
                <div class="revFlexWrapper_WidthAuto revCodeEditorHeaderTabsRightGrpWrapper">
                    <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFileEditOptionsTab">obJEcT</div>
                    <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFileEditOptionsTab">Js</div>
                    <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFileEditOptionsTab">CSS</div>
                    <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revPluginEditorPreviewEditTab"><i class="fas fa-eye fa-lg"></i></div>
                    <div id="${revPluginEditsInfoDetailsTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFileEditOptionsTab">manifest</div>
                    <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFileEditOptionsTab">API</div>
                </div>
            </div>
            <div id="${revPluginEditorInputTabsHeaderArea_Id}" class="revPosRelative revFlexWrapper revFlexWrapperScroll revPluginEditorInputTabsHeaderAreaWrapper">
                ${revHomeTabInit()}
            </div>
            <div class="revPosRelative revFlexContainer revFlexContainerScroll revCodePluginsEditorContentBodyContainer">
                <div id="${revCodePluginsContainer_Id}" class="invisible revPosRelative revFlexContainer_FullHeight revFlexContainerScroll"></div>
                <div id="${revObject_PluginEditorHomeContainer_Id}" class="visible revPosRelative revFlexContainer_FullHeight revFlexContainerScroll"></div>
            </div>
        </div>
    `;

    return revCodePluginsEditor;
};

module.exports.revFormViewWidget = revFormViewWidget;
