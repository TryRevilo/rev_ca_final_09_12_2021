var revPageViewWidget = async (revVarArgs) => {
    let revGetMonacoPluginEditor = revVarArgs.revGetMonacoPluginEditor;
    let revContentResetterCallBack = revVarArgs.revContentResetterCallBack;
    let revSetSaveTabCallBack = revVarArgs.revSetSaveTabCallBack;

    let revSetPluginEditorHomeData = revVarArgs.revSetPluginEditorHomeData;
    let revGetPluginEditorHomeDataVal = revVarArgs.revGetPluginEditorHomeDataVal;

    let revSetPluginEditorHomeFunction = revVarArgs.revSetPluginEditorHomeFunction;
    let revGetPluginEditorHomeFunction = revVarArgs.revGetPluginEditorHomeFunction;

    let revLoadedPluginEditsArr = revVarArgs.revLoadedPluginEditsArr;

    let revLoadedPluginContainers = {};

    for (let i = 0; i < revLoadedPluginEditsArr.length; i++) {
        let revCurrPluginEdit = revLoadedPluginEditsArr[i];

        let revLoadedPlugin_Id = window.revGetMetadataValue(revCurrPluginEdit._revInfoEntity._revEntityMetadataList, "rev_plugin_edit_name_id");

        if (!revLoadedPluginContainers.hasOwnProperty(revLoadedPlugin_Id)) {
            revLoadedPluginContainers[revLoadedPlugin_Id] = [];
        }

        revLoadedPluginContainers[revLoadedPlugin_Id].push(revCurrPluginEdit);
    }

    let revPluginEditsContainerViewsArr = [];

    for (let revLoadedPlugin_Id in revLoadedPluginContainers) {
        let revFormMenuItemsTabsArr = [];

        if (Object.hasOwnProperty.call(revLoadedPluginContainers, revLoadedPlugin_Id)) {
            let revCurrLoadedPluginEditsArr = revLoadedPluginContainers[revLoadedPlugin_Id];

            for (let i = 0; i < revCurrLoadedPluginEditsArr.length; i++) {
                let revCurrPluginEdit = revCurrLoadedPluginEditsArr[i];

                let revLoadedPlugin_Id = window.revGetMetadataValue(revCurrPluginEdit._revInfoEntity._revEntityMetadataList, "rev_plugin_edit_name_id");
                let revPluginEditFormNameId = window.revGetMetadataValue(revCurrPluginEdit._revInfoEntity._revEntityMetadataList, "rev_plugin_edit_form_name_id");
                let revPluginEditCode = window.revGetMetadataValue(revCurrPluginEdit._revInfoEntity._revEntityMetadataList, "rev_plugin_edit_code");

                let revInfoStatusTab = `<div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revPluginEditHomeGroupItemAddNewFileTab"><i class="fas fa-exclamation"></i></div>`;

                if (i / 2 !== 0) {
                    revInfoStatusTab = `<div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revPluginEditHomeGroupItemAddNewFileTab"><i class="fas fa-folder-open"></i></div>`;
                }

                let revPluginEditFormNameTab_Id = i + "_revPluginEditFormNameTab_Id_" + window.revGenUniqueId();

                window.revSetInterval(revPluginEditFormNameTab_Id, () => {
                    document.getElementById(revPluginEditFormNameTab_Id).addEventListener("click", async (event) => {
                        let revPluginEntityGUID = revCurrPluginEdit._remoteRevEntityGUID;

                        let revCurrClickForm = {
                            "revCodeLang": "javascript",
                            "revPluginEntityGUID": revPluginEntityGUID,
                            "rev_plugin_name": revLoadedPlugin_Id,
                            "revNameId": revPluginEditFormNameId,
                            "revOverrideView": revPluginEditCode,
                        };

                        // await window.revLoadModules("revPluginModule_MsMonacoEditor");

                        // await window.revPluginModule_MsMonacoEditor.revPluginEditorFormCodeTabClickAction({
                        //     "revMonacoCodeEditor": revGetMonacoPluginEditor(),
                        //     "revContentResetterCallBack": revContentResetterCallBack,
                        //     "revSetSaveTabCallBack": revSetSaveTabCallBack,
                        //     "revCurrClickForm": revCurrClickForm,
                        // });

                        let revObject_PluginModuleProjectEditDetails = await window.revGetLoadedPageView("revObject_PluginModuleProjectEditDetails", revVarArgs);

                        let revSetPluginEditorHomeObjectView = revGetPluginEditorHomeFunction("revSetPluginEditorHomeObjectView");
                        revSetPluginEditorHomeObjectView(revObject_PluginModuleProjectEditDetails);
                    });
                });

                let revFormMenuItemTab = `
                    <div class="revFlexWrapper revPluginEditHomeGroupTabItemWrapper">
                        <div class="revSmall-H-Line"></div>
                        <div id="${revPluginEditFormNameTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper_WidthAuto revPluginEditHomeFormNameWrapper">
                            <div class="revPluginEditHomeGroupTabItemIcon"><i class="fas fa-file-code fa-lg"></i></div>
                            <div class="revPluginEditHomeGroupTabItemTxt">${revPluginEditFormNameId}</div>
                        </div>
                        ${window.revSmallDividerWrapper_BorderRight()}
                        ${revInfoStatusTab}
                    </div>
                `;

                revFormMenuItemsTabsArr.push(revFormMenuItemTab);
            }
        }

        let revPluginEditsContainerView = `
            <div class="revFlexContainer revPluginEditHomePluginEditHomeCurrentActiveContainer">
                <div class="revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revPluginEditHomeGroupTabItemWrapper">
                    <div class="revSmall-H-Line"></div>
                    <div class="revPluginEditHomeGroupTabItemIcon"><i class="fas fa-file-code fa-lg"></i></div>
                    <div class="revTabLink revFlexWrapper_WidthAuto revPluginEditHomeGroupTabItemTxt">${revLoadedPlugin_Id}</div>
                    ${window.revSmallDividerWrapper_BorderRight()}
                    <div class="revPluginEditHomeGroupItemAddNewFileTab"><i class="fas fa-plus"></i></div>
                </div>
                <div class="revFlexContainer revPluginEditHomeHookRemoteHandlerMenuItemsTabsContainer">${revFormMenuItemsTabsArr.join("")}</div>
            </div>
        `;

        revPluginEditsContainerViewsArr.push(revPluginEditsContainerView);
    }

    let revPluginEditHomeCurrentActiveprojectsTxt = "There are no projects you'RE currently working on . . .";

    if (revLoadedPluginEditsArr.length) {
        revPluginEditHomeCurrentActiveprojectsTxt = revLoadedPluginEditsArr.length + ` acTivE projects you'RE currently working on`;
    }

    let revPageView = `
        <div class="revFlexContainer revPluginProjectsEditsViewContainer">
            <div class="revFlexWrapper revFontSiteGreyTxtColor revFontSizeNormal revNoActiveProjectsWrapper">${revPluginEditHomeCurrentActiveprojectsTxt}</div>
            <div class="revFlexContainer">${revPluginEditsContainerViewsArr.join("")}</div>
        </div>
    `;

    return revPageView;
};

module.exports.revPageViewWidget = revPageViewWidget;
