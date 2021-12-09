var revPageViewWidget = async (revVarArgs) => {
    let revGetMonacoPluginEditor = revVarArgs.revGetMonacoPluginEditor;
    let revContentResetterCallBack = revVarArgs.revContentResetterCallBack;
    let revSetSaveTabCallBack = revVarArgs.revSetSaveTabCallBack;

    let revSetPluginEditorHomeData = revVarArgs.revSetPluginEditorHomeData;
    let revGetPluginEditorHomeDataVal = revVarArgs.revGetPluginEditorHomeDataVal;

    let revSetPluginEditorHomeFunction = revVarArgs.revSetPluginEditorHomeFunction;
    let revGetPluginEditorHomeFunction = revVarArgs.revGetPluginEditorHomeFunction;

    let revPluginEditHomeBodyContainer_Id = "revPluginEditHomeBodyContainer_Id_" + window.revGenUniqueId();

    let revLoadedPlugin_Id = "revLoadedPlugin_Id_" + window.revGenUniqueId();

    window.revSetInterval(revLoadedPlugin_Id, () => {
        document.getElementById(revLoadedPlugin_Id).addEventListener("click", async (event) => {
            let revObject_PluginModuleProjectEditActivity = await window.revGetLoadedPageView("revObject_PluginModuleProjectEditActivity", revVarArgs);

            let revSetPluginEditorHomeObjectView = revGetPluginEditorHomeFunction("revSetPluginEditorHomeObjectView");
            revSetPluginEditorHomeObjectView(revObject_PluginModuleProjectEditActivity);
        });
    });

    let revPluginUserEditorFullNames = "Oliver Muchai";
    let revPluginEditCode = "_revPluginEditCode_" + window.revGenUniqueId();

    let revInfoStatusTab = `<div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revPluginEditorProjectDetailsTab"><i class="fas fa-exclamation"></i></div>`;

    revInfoStatusTab = `<div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revPluginEditorProjectDetailsTab"><i class="fas fa-folder-open"></i></div>`;

    let revPluginUserEditorNameTab_Id = "_revPluginUserEditorNameTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revPluginUserEditorNameTab_Id, () => {
        document.getElementById(revPluginUserEditorNameTab_Id).addEventListener("click", async (event) => {});
    });

    let revFormMenuItemTab = `
        <div class="revTabLink  revFlexWrapper revPluginModuleProjectEditWrapper">
            <div class="revSmall-H-Line revPluginModuleProjectEditWrapper_H_Line"></div>
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

    let revUserModuleEditProjectDetails = () => {
        let revPretty_Id = "revPretty_Id_" + window.revGenUniqueId();

        window.revSetInterval(revPretty_Id, () => {
            prettyPrint();
        });

        let revCodeStringVal = `
window.revSetInterval("revPluginUserEditorNameTab_Id", () => {
    document.getElementById("revPluginUserEditorNameTab_Id").addEventListener("click", async (event) => {
        console.log('HELLO WORLD!');
    });
});`;

        revCodeStringVal = `<pre id="${revPretty_Id}" class="ql-syntax prettyprint" spellcheck="false">${revCodeStringVal}</pre>`;

        let revUserProjectEditDetails = `
            <div class="revFlexWrapper revUserProjectEditDetailsWrapper">
                <div class="revSmall-H-Line revUserProjectEditDetailsWrapper_H_Line"></div>
                <div class="revFlexContainer revUserProjectEditDetailsContainer">
                    <div class="revFlexWrapper revUserProjectEditDetailsHeaderWrapper">
                        <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal">22 - 41</div>
                        <div class="revTimeCreatedStyle revUserProjectEditDetailsLastUpdateTxt">lAsT upDATED Sunday 12:35pm 11 Apr 2021</div>
                    </div>
                    <div class="revFontSiteGreyTxtColor revFontSizeNormal">creaTe new pLuGiNs & woRk on tHem witH other developers from around the woRLD</div>
                    <div class="revUserProjectEditDetailsCode">${revCodeStringVal}</div>
                    <div class="revUserProjectEditDetailsContainer_Border"></div>
                </div>
            </div>
        `;

        return revUserProjectEditDetails;
    };

    let revPluginEditsViewsArr = [];

    for (let i = 0; i < 3; i++) {
        revPluginEditsViewsArr.push(revUserModuleEditProjectDetails());
    }

    let revForm_PluginModuleProjectLineEditsDescTab_Id = "revForm_PluginModuleProjectLineEditsDescTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revForm_PluginModuleProjectLineEditsDescTab_Id, () => {
        document.getElementById(revForm_PluginModuleProjectLineEditsDescTab_Id).addEventListener("click", async (event) => {
            window.revToggleSwitchArea("");
            let revForm_PluginModuleProjectLineEditsDesc = await window.revGetForm("revForm_PluginModuleProjectLineEditsDesc", revVarArgs);
            window.revToggleSwitchArea(`<div class="revFlexContainer revForm_PluginModuleProjectLineEditsDescSwitchContainer">${revForm_PluginModuleProjectLineEditsDesc}</div>`);
        });
    });

    let revPluginEditsContainerView = `
        <div class="revFlexContainer revPluginEditHomePluginEditHomeCurrentActiveContainer">
            <div class="revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revPluginModuleProjectEditWrapper">
                <div class="revSmall-H-Line revPluginEditHomeGroupProject_H_Line"></div>
                <div class="revPluginEditHomeGroupTabItemIcon"><i class="fas fa-file-code fa-lg"></i></div>
                <div id="${revLoadedPlugin_Id}" class="revTabLink revFlexWrapper_WidthAuto revPluginEditHomeGroupTabItemTxt">${revLoadedPlugin_Id}</div>
                <div class="revPluginModuleProjectEditWrapper_revSmallDividerWrapper_BorderRight">${window.revSmallDividerWrapper_BorderRight()}</div>
                <div id="${revForm_PluginModuleProjectLineEditsDescTab_Id}" class="revTabLink revPluginEditorUserEditProjectDetailsTab"><i class="fas fa-plus"></i></div>
            </div>
            <div class="revFlexContainer revPluginEditHomeHookRemoteHandlerMenuItemsTabsContainer">
                ${revFormMenuItemTab}
                <div class="revSmall-H-Line revPluginEditsViewsArr_H_Line"></div>
                <div class="revFlexContainer">${revPluginEditsViewsArr.join("")}</div>
            </div>
        </div>
    `;

    let revPluginEditHomeCurrentActiveprojectsTxt = "There are no projects you'RE currently working on . . .";

    window.revSetInterval(revPluginEditHomeBodyContainer_Id, () => {
        let revCurrPluginProjectsListingView = `
            <div  id="${revPluginEditHomeBodyContainer_Id}" class="revFlexContainer revPluginProjectsEditsViewContainer">
                <div class="revFlexWrapper revFontSiteGreyTxtColor revFontSizeNormal revNewPluginProjectLineNumberDescWrapper">${revPluginEditHomeCurrentActiveprojectsTxt}</div>
                <div class="revFlexContainer">${revPluginEditsContainerView}</div>
            </div>
        `;

        document.getElementById(revPluginEditHomeBodyContainer_Id).innerHTML = revCurrPluginProjectsListingView;
    });

    let revPageView = `<div id="${revPluginEditHomeBodyContainer_Id}" class="revFlexContainer"></div>`;

    return revPageView;
};

module.exports.revPageViewWidget = revPageViewWidget;
