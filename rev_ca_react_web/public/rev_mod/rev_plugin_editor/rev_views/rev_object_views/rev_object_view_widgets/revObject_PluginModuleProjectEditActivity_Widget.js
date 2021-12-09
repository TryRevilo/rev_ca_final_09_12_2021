var revPageViewWidget = async (revVarArgs) => {
    let revGetMonacoPluginEditor = revVarArgs.revGetMonacoPluginEditor;
    let revContentResetterCallBack = revVarArgs.revContentResetterCallBack;
    let revSetSaveTabCallBack = revVarArgs.revSetSaveTabCallBack;

    let revSetPluginEditorHomeData = revVarArgs.revSetPluginEditorHomeData;
    let revGetPluginEditorHomeDataVal = revVarArgs.revGetPluginEditorHomeDataVal;

    let revSetPluginEditorHomeFunction = revVarArgs.revSetPluginEditorHomeFunction;
    let revGetPluginEditorHomeFunction = revVarArgs.revGetPluginEditorHomeFunction;

    let revLoadedPluginEditsArr = [];

    let revPluginEditHomeBodyContainer_Id = "revPluginEditHomeBodyContainer_Id_" + window.revGenUniqueId();

    let revCurrLoadedPluginEditsArr = [];

    for (i = 0; i < 10; i++) {
        revCurrLoadedPluginEditsArr.push(i + 1);
    }

    let revPluginEditsContainerViewsArr = [];

    let revFormMenuItemsTabsArr = [];

    let revLoadedPlugin_Id = "revLoadedPlugin_Id_" + window.revGenUniqueId();

    window.revSetInterval(revLoadedPlugin_Id, () => {
        document.getElementById(revLoadedPlugin_Id).addEventListener("click", async (event) => {
            let revObject_PluginModuleProjectEditDetails = await window.revGetLoadedPageView("revObject_PluginModuleProjectEditDetails", revVarArgs);

            let revSetPluginEditorHomeObjectView = revGetPluginEditorHomeFunction("revSetPluginEditorHomeObjectView");
            revSetPluginEditorHomeObjectView(revObject_PluginModuleProjectEditDetails);
        });
    });

    for (let i = 0; i < revCurrLoadedPluginEditsArr.length; i++) {
        let revCurrPluginEdit = revCurrLoadedPluginEditsArr[i];
        let revPluginUserEditorFullNames = "Oliver Muchai";
        let revPluginEditCode = i + "_revPluginEditCode_" + window.revGenUniqueId();

        let revInfoStatusTab = `<div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revPluginEditorProjectDetailsTab"><i class="fas fa-exclamation"></i></div>`;

        if (i / 2 !== 0) {
            revInfoStatusTab = `<div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revPluginEditorProjectDetailsTab"><i class="fas fa-folder-open"></i></div>`;
        }

        let revPluginUserEditorNameTab_Id = i + "_revPluginUserEditorNameTab_Id_" + window.revGenUniqueId();

        window.revSetInterval(revPluginUserEditorNameTab_Id, () => {
            document.getElementById(revPluginUserEditorNameTab_Id).addEventListener("click", async (event) => {});
        });

        let revUserPluginModuleProjectEditTab_Id = "revUserPluginModuleProjectEditTab_Id_" + window.revGenUniqueId();

        window.revSetInterval(revUserPluginModuleProjectEditTab_Id, () => {
            document.getElementById(revUserPluginModuleProjectEditTab_Id).addEventListener("click", async (event) => {
                let revPassVarArgs = {
                    "revLoadedPluginEditsArr": window.REV_PLUGIN_EDITOR_OBJECTS.revLoadedSavedPluginProjectEditsArr,
                    "revGetMonacoPluginEditor": revGetMonacoPluginEditor,
                    "revSetSaveTabCallBack": revSetSaveTabCallBack,
                    "revContentResetterCallBack": revContentResetterCallBack,
                    "revSetPluginEditorHomeData": revSetPluginEditorHomeData,
                    "revGetPluginEditorHomeDataVal": revGetPluginEditorHomeDataVal,
                    "revSetPluginEditorHomeFunction": revSetPluginEditorHomeFunction,
                    "revGetPluginEditorHomeFunction": revGetPluginEditorHomeFunction,
                    "revCurrPluginEdit": revCurrPluginEdit,
                };

                let revObject_PluginModuleProjectEditDetails = await window.revGetLoadedPageView("revObject_PluginModuleProjectEditDetails", revPassVarArgs);
                document.getElementById(revPluginEditHomeBodyContainer_Id).innerHTML = revObject_PluginModuleProjectEditDetails;
            });
        });

        let revUserPluginModuleProjectEditTab = `
            <div id="${revUserPluginModuleProjectEditTab_Id}" class="revTabLink  revFlexWrapper revPluginEditHomeGroupTabItemWrapper">
                <div class="revSmall-H-Line revPluginEditHomeGroupTabItemWrapper_H_Line"></div>
                <div class="revFlexContainer">
                    <div class="revFlexWrapper_WidthAuto">
                        <div class="revPluginEditHomeUserEditorTabIcon"></div>
                        <div class="revFlexWrapper_WidthAuto revPluginEditHomeFormNameWrapper">
                            <div id="${revPluginUserEditorNameTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal">
                                <div class="revrevPluginEditHomeUserEditorFullNamesTxt">${revPluginUserEditorFullNames}</div>
                            </div>
                            <div class="revPluginEditHomeFormNameWrapper_revSmallDividerWrapper_BorderRight">${window.revSmallDividerWrapper_BorderRight()}</div>
                            ${revInfoStatusTab}
                            <div class="revTimeCreatedStyle revPluginEditUserEditorModuleProjectDurationWrapper">FinisHinG Sunday 12:35pm 11 Apr 2021</div>
                        </div>
                    </div>
                    <div class="revFontSiteGreyTxtColor revFontSizeNormal revPluginEditProjectBriefDesc">an open-source Internet platform to crowdsource peer-review on information everywhere.</div>
                    <div class="revTimeCreatedStyle revPluginEditHomeUserEditorLastUpdateWrapper">lAsT upDATED Sunday 12:35pm 11 Apr 2021</div>
                </div>
            </div>
        `;

        revFormMenuItemsTabsArr.push(revUserPluginModuleProjectEditTab);
    }

    let revStartNewPluginModuleEditsProjectTab_Id = "revStartNewPluginModuleEditsProjectTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revStartNewPluginModuleEditsProjectTab_Id, () => {
        document.getElementById(revStartNewPluginModuleEditsProjectTab_Id).addEventListener("click", async (event) => {
            let revFormStartNewPluginModuleEditsProject = await window.revGetForm("revFormStartNewPluginModuleEditsProject", revVarArgs);
            document.getElementById(revPluginEditHomeBodyContainer_Id).innerHTML = revFormStartNewPluginModuleEditsProject;
        });
    });

    let revPluginEditsContainerView = `
        <div class="revFlexContainer revPluginEditHomePluginEditHomeCurrentActiveContainer">
            <div class="revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revPluginEditHomeGroupTabItemWrapper">
                <div class="revSmall-H-Line revPluginEditHomeGroupProject_H_Line"></div>
                <div class="revPluginEditHomeGroupTabItemIcon"><i class="fas fa-file-code fa-lg"></i></div>
                <div id="${revLoadedPlugin_Id}" class="revTabLink revFlexWrapper_WidthAuto revPluginEditHomeGroupTabItemTxt">${revLoadedPlugin_Id}</div>
                <div class="revPluginEditHomeGroupTabItemWrapper_revSmallDividerWrapper_BorderRight">${window.revSmallDividerWrapper_BorderRight()}</div>
                <div id="${revStartNewPluginModuleEditsProjectTab_Id}" class="revTabLink revPluginEditorUserEditProjectDetailsTab"><i class="fas fa-plus"></i></div>
            </div>
            <div class="revFlexContainer revPluginEditHomeHookRemoteHandlerMenuItemsTabsContainer">${revFormMenuItemsTabsArr.join("")}</div>
        </div>
    `;

    revPluginEditsContainerViewsArr.push(revPluginEditsContainerView);

    let revPluginEditHomeCurrentActiveprojectsTxt = "There are no projects you'RE currently working on . . .";

    if (revLoadedPluginEditsArr.length) {
        revPluginEditHomeCurrentActiveprojectsTxt = revLoadedPluginEditsArr.length + ` acTivE projects you'RE currently working on`;
    }

    window.revSetInterval(revPluginEditHomeBodyContainer_Id, () => {
        let revCurrPluginProjectsListingView = `
            <div  id="${revPluginEditHomeBodyContainer_Id}" class="revFlexContainer revPluginProjectsEditsViewContainer">
                <div class="revFlexWrapper revFontSiteGreyTxtColor revFontSizeNormal revNoActiveProjectsWrapper">${revPluginEditHomeCurrentActiveprojectsTxt}</div>
                <div class="revFlexContainer">${revPluginEditsContainerViewsArr.join("")}</div>
            </div>
        `;

        document.getElementById(revPluginEditHomeBodyContainer_Id).innerHTML = revCurrPluginProjectsListingView;
    });

    let revPluginEditHomeTell = `
        <div class="revFlexContainer revPluginEditActivityBodyNewPluginContainer">
            <div class="revTabLink revFontSiteBlueTxtColor revFlexWrapper revPluginEditHomeBodyNewPluginWrapper">
                <div class="revFontSizeMedium revPluginEditHomeBodyNewPluginIcon"><i class="fa fa-plus"></i></div>
                <div class="revFontSizeNormal revPluginEditHomeBodyNewPluginTxt">nEw pLuGiN</div>
            </div>
            <div class="revPosRelative revFlexContainer revPluginEditHomeTellContainer">
                <div class="revPosAbsolute revFlexWrapper revPluginEditHomeTellContainer_BackgroundBorder"></div>
                <div class="revPosAbsolute revFontSizeNormal revFontSiteGreyTxtColor revFlexContainer revPluginEditActivityBodyNewPluginTellContainer">
                    <div>Plugins help you extend your experiences with FAmiLy | FRiEnds | coLEaGuEs</div>
                    <div class="revPluginEditHomeBodyNewPluginTell_Par">creaTe new pLuGiNs & woRk on tHem witH other developers from around the woRLD</div>
                    <div class="revPluginEditHomeBodyNewPluginTell_Par"></div>
                    <div class="revPluginEditHomeBodyNewPluginTell_Par"></div>
                    <div class="revPluginEditHomeBodyNewPluginTell_Par">You could also EDiT and HELp improve current pLuGiNs</div>
                </div>
            </div>
        </div>
    `;

    let revPageView = `<div id="${revPluginEditHomeBodyContainer_Id}" class="revFlexContainer"></div>`;

    return revPageView;
};

module.exports.revPageViewWidget = revPageViewWidget;
