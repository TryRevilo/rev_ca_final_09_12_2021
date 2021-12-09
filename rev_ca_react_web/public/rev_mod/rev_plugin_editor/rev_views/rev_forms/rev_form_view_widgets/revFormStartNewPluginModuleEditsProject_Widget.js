var revFormViewWidget = async (revVarArgs) => {
    let revGetMonacoPluginEditor = null;
    let revContentResetterCallBack = () => {};
    let revSetSaveTabCallBack = () => {};

    let revLoadedPluginEditsArr = [];

    let revPluginEditProjectDescHomeBodyContainer_Id = "revPluginEditProjectDescHomeBodyContainer_Id_" + window.revGenUniqueId();

    let revLoadedPlugin_Id = "_revLoadedPlugin_Id_" + window.revGenUniqueId();

    let revPluginUserEditorFullNames = "Oliver Muchai";
    let revPluginEditProjectDescCode = 1 + "_revPluginEditProjectDescCode_" + window.revGenUniqueId();

    let revInfoStatusTab = `<div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revPluginEditProjectDescorProjectDetailsTab"><i class="fas fa-exclamation"></i></div>`;

    revInfoStatusTab = `<div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revPluginEditProjectDescorProjectDetailsTab"><i class="fas fa-folder-open"></i></div>`;

    let revPluginUserEditorNameTab_Id = 1 + "_revPluginUserEditorNameTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revPluginUserEditorNameTab_Id, () => {
        document.getElementById(revPluginUserEditorNameTab_Id).addEventListener("click", async (event) => {});
    });

    let revUserEditorArea = `
        <div class="revFlexWrapper revPluginEditProjectDescItemWrapper">
            <div class="revSmall-H-Line revPluginEditProjectDescItemWrapper_H_Line"></div>
            <div class="revFlexContainer">
                <div class="revFlexWrapper_WidthAuto">
                    <div class="revPluginEditProjectDescHomeUserEditorTabIcon"></div>
                    <div class="revFlexWrapper_WidthAuto revPluginEditProjectDescHomeFormNameWrapper">
                        <div id="${revPluginUserEditorNameTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal">
                            <div class="revrevPluginEditProjectDescHomeUserEditorFullNamesTxt">${revPluginUserEditorFullNames}</div>
                        </div>
                        <div class="revPluginEditProjectDescHomeFormNameWrapper_revSmallDividerWrapper_BorderRight">${window.revSmallDividerWrapper_BorderRight()}</div>
                        ${revInfoStatusTab}
                        <div class="revTimeCreatedStyle revPluginEditProjectDescUserEditorModuleProjectDurationWrapper">4 oTHers workinG on tHis moduLE</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    let revPluginModuleProjectDesc_InputText_Id = "revPluginModuleProjectDescInputText_Id_" + window.revGenUniqueId();

    let revPluginModuleProjectDesc_InputText = window.revInputText_Flat({
        "revId": revPluginModuleProjectDesc_InputText_Id,
        "revInputTextHeader": false,
        "revBorderStyle": "revNoRightBorderBordersInput",
        "revPlaceholderText": "module EdiT dEsc . . .",
    });

    let revPluginModuleProjectDescArea = `
        <div class="revFlexWrapper revPluginEditProjectDescItemWrapper">
            <div class="revFlexContainer">
                <div class="revPosRelative revFlexContainer revPluginModuleProjectDescContainer">
                    <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper revPluginModuleProjectDescInputWrapper">${revPluginModuleProjectDesc_InputText}</div>
                </div>
                <div class="revFlexContainer revPluginEditProjectDescFooterContainer">
                    <div class="revTimeCreatedStyle revPluginEditProjectDescHomeUserEditorLastUpdateWrapper">-100 (What changes are you making in this module)</div>
                </div>
            </div>
        </div>
    `;

    let revPluginModuleProjectDuration_InputText_Id = "revPluginModuleProjectDescInputText_Id_" + window.revGenUniqueId();

    let revPluginModuleProjectDuration_InputText = window.revInputText_Flat({
        "revId": revPluginModuleProjectDuration_InputText_Id,
        "revInputTextHeader": false,
        "revBorderStyle": "revAllBordersInput",
        "revPlaceholderText": "pRojEct end daTe",
    });

    let revPluginModuleProjectDurationArea = `
            <div class="revFlexContainer">
                <div class="revPosRelative revFlexContainer revPluginModuleProjectDescContainer">
                    <div class="revPosRelative revFlexWrapper revPluginEditProjectDescHomeTellContainer_BackgroundBorder revPluginModuleProjectDescInput_BackBorder_Wrapper"></div>
                    <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper_WidthAuto revPluginModuleProjectDurationInputWrapper">${revPluginModuleProjectDuration_InputText}</div>
                </div>
                <div class="revFlexContainer revPluginEditProjectDescFooterContainer">
                    <div class="revTimeCreatedStyle revPluginEditProjectDescHomeUserEditorLastUpdateWrapper">whEn do you thiNk you wouLD bE FiNisHing up witH youR ediTs</div>
                </div>
            </div>
    `;

    let revSavePluginModuleEditProjectTab_Id = "revSavePluginModuleEditProjectTab_Id_" + window.revGenUniqueId();

    let revSavePluginModuleEditProjectSubmitTab = window.revSubmitTabCurvedPointerRight({
        "revId": revSavePluginModuleEditProjectTab_Id,
        "revTitle": "stARt pRojEcT",
        "revSubmitCallback": () => {},
    });

    let revSavePluginModuleEditProjectSubmitTabArea = `
        <div class="revFlexWrapper_WidthAuto revSavePluginModuleEditProjectSubmitTabWrapper">${revSavePluginModuleEditProjectSubmitTab}</div>
    `;

    let revTellTxt = `&nbsp;FilL tHis to prevent pEopLE fRom stARtiNg woRk on tHe same moduLe EdiTs that you'vE aLrEady stARted working on`;

    let revTellPluginModuleProjectDescArea = `
        <div class="revFlexWrapper revPluginEditProjectDescItemWrapper revTellPluginEditProjectDescItemWrapper">
            <div class="revFlexContainer">
                <div class="revPosRelative revFlexContainer revPluginModuleProjectDescContainer">
                    <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper revPluginModuleProjectDescInputWrapper">
                    <i class="fas fa-exclamation revFontSizeSmall"></i>${revTellTxt}</div>
                </div>
            </div>
        </div>
    `;

    let revPluginEditProjectDescsContainerView = `
        <div class="revFlexContainer revPluginEditProjectDescHomePluginEditHomeCurrentActiveContainer">
            <div class="revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revPluginEditProjectDescItemWrapper">
                <div class="revSmall-H-Line revPluginEditProjectDescProject_H_Line"></div>
                <div class="revPluginEditProjectDescItemIcon"><i class="fas fa-file-code fa-lg"></i></div>
                <div class="revTabLink revFlexWrapper_WidthAuto revPluginEditProjectDescItemTxt">${revLoadedPlugin_Id}</div>
                <div class="revPluginEditProjectDescItemWrapper_revSmallDividerWrapper_BorderRight">${window.revSmallDividerWrapper_BorderRight()}</div>
                <div class="revPluginEditProjectDescorUserEditProjectDetailsTab"><i class="fas fa-plus"></i></div>
            </div>
            <div class="revFlexContainer revPluginEditProjectDescHomeHookRemoteHandlerMenuItemsTabsContainer">
                ${revUserEditorArea}
                ${revPluginModuleProjectDescArea}
                ${revPluginModuleProjectDurationArea}
                ${revSavePluginModuleEditProjectSubmitTabArea}
                ${revTellPluginModuleProjectDescArea}
            </div>
        </div>
    `;

    let revPluginEditProjectDescHomeCurrentActiveprojectsTxt = "sTart a nEw moduLE EdiT pRojEct . . .";

    if (revLoadedPluginEditsArr.length) {
        revPluginEditProjectDescHomeCurrentActiveprojectsTxt = revLoadedPluginEditsArr.length + ` acTivE projects you'RE currently working on`;
    }

    window.revSetInterval(revPluginEditProjectDescHomeBodyContainer_Id, () => {
        let revCurrPluginProjectsListingView = `
            <div  id="${revPluginEditProjectDescHomeBodyContainer_Id}" class="revFlexContainer revPluginProjectsEditsViewContainer">
                <div class="revFlexWrapper revFontSiteGreyTxtColor revFontSizeNormal revNoActiveProjectsWrapper">${revPluginEditProjectDescHomeCurrentActiveprojectsTxt}</div>
                <div class="revFlexContainer">${revPluginEditProjectDescsContainerView}</div>
            </div>
        `;

        document.getElementById(revPluginEditProjectDescHomeBodyContainer_Id).innerHTML = revCurrPluginProjectsListingView;
    });

    let revPageView = `
        <div class="revFlexContainer">
            <div id="${revPluginEditProjectDescHomeBodyContainer_Id}" class="revFlexContainer"></div>
        </div>
    `;

    return revPageView;
};

module.exports.revFormViewWidget = revFormViewWidget;
