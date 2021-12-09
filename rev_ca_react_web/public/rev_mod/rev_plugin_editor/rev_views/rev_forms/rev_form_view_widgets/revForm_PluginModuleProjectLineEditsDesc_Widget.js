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

    /** REV START FROM LINE NUMBER **/
    let revPluginModuleProjectFromLineInput_Id = "revPluginModuleProjectFromLineInput_Id_" + window.revGenUniqueId();

    let revPluginModuleProjectFromLine_InputText = window.revInputText_Flat({
        "revId": revPluginModuleProjectFromLineInput_Id,
        "revInputTextHeader": false,
        "revBorderStyle": "revAllBordersInput",
        "revPlaceholderText": "stArt",
    });

    let revPluginModuleProjectFromLineInputArea = `
        <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper_WidthAuto revPluginModuleProjectFromToLineInputAreaWrapper">${revPluginModuleProjectFromLine_InputText}</div>
    `;
    /** REV END FROM LINE NUMBER **/

    /** REV START TO LINE NUMBER **/
    let revPluginModuleProjectToLineInput_Id = "revPluginModuleProjectToLineInput_Id_" + window.revGenUniqueId();

    let revPluginModuleProjectToLine_InputText = window.revInputText_Flat({
        "revId": revPluginModuleProjectToLineInput_Id,
        "revInputTextHeader": false,
        "revBorderStyle": "revAllBordersInput",
        "revPlaceholderText": "eNd",
    });

    let revPluginModuleProjectToLineInputArea = `
        <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper_WidthAuto revPluginModuleProjectFromToLineInputAreaWrapper">${revPluginModuleProjectToLine_InputText}</div>
    `;
    /** REV END TO LINE NUMBER **/

    /** REV START FROM TO LINES INPUT **/
    let revPluginModuleProjectFromToLineInputArea = `
            <div class="revFlexContainer">
                <div class="revFlexContainer revPluginEditProjectDescFooterContainer">
                    <div class="revTimeCreatedStyle revPluginEditProjectDescHomeUserEditorLastUpdateWrapper">tHE liNes you'vE woRkEd on</div>
                </div>
                <div class="revPosRelative revFlexContainer revPluginModuleProjectDescContainer">
                    <div class="revPosRelative revFlexWrapper revPluginEditProjectDescHomeTellContainer_BackgroundBorder revPluginModuleProjectDescInput_BackBorder_Wrapper"></div>
                    <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper_WidthAuto revPluginModuleProjectDurationInputWrapper">
                        ${revPluginModuleProjectFromLineInputArea}
                        ${revPluginModuleProjectToLineInputArea}
                    </div>
                </div>
            </div>
    `;
    /** REV END FROM TO LINES INPUT **/

    /** REV START PROJECT DESC **/
    let revPluginModuleProjectDesc_InputText_Id = "revPluginModuleProjectDescInputText_Id_" + window.revGenUniqueId();

    let revPluginModuleProjectDesc_InputText = window.revInputText_Flat({
        "revId": revPluginModuleProjectDesc_InputText_Id,
        "revInputTextHeader": false,
        "revBorderStyle": "revNoRightBorderBordersInput",
        "revPlaceholderText": "dEsc . . .",
    });

    let revPluginModuleProjectDescArea = `
        <div class="revFlexWrapper revPluginEditProjectDescItemWrapper">
            <div class="revFlexContainer revPluginModuleProjectDescContainer">
                <div class="revPosRelative revFlexWrapper revPluginEditProjectDescHomeTellContainer_BackgroundBorder revPluginModuleProjectDescInput_BackBorder_Wrapper"></div>
                <div class="revPosRelative revFlexContainer">
                    <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper revPluginModuleProjectDescInputWrapper">${revPluginModuleProjectDesc_InputText}</div>
                </div>
                <div class="revFlexContainer revPluginEditProjectDescFooterContainer">
                    <div class="revTimeCreatedStyle revPluginEditProjectDescHomeUserEditorLastUpdateWrapper">-100 (brieFly dEscribE tHe liNEs)</div>
                </div>
            </div>
        </div>
    `;
    /** REV END PROJECT DESC **/

    /** REV START PROJECT CODE **/
    let revPluginModuleProjectCode_InputText_Id = "revPluginModuleProjectCode_InputText_Id_" + window.revGenUniqueId();

    let revPluginModuleProjectCode_InputText = window.revInputText_Flat({
        "revId": revPluginModuleProjectCode_InputText_Id,
        "revInputTextHeader": false,
        "revBorderStyle": "revNoRightBorderBordersInput",
        "revPlaceholderText": "</> . . .",
    });

    let revPluginModuleProjectCode_InputText_Area = `
        <div class="revFlexWrapper revPluginEditProjectDescItemWrapper">
            <div class="revFlexContainer revPluginModuleProjectDescContainer">
                <div class="revFlexContainer revPluginEditProjectDescFooterContainer">
                    <div class="revTimeCreatedStyle revPluginEditProjectDescHomeUserEditorLastUpdateWrapper">tHE CoDE</div>
                </div>
                <div class="revPosRelative revFlexWrapper revPluginEditProjectDescHomeTellContainer_BackgroundBorder revPluginModuleProjectDescInput_BackBorder_Wrapper"></div>
                <div class="revPosRelative revFlexContainer">
                    <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper revPluginModuleProjectDescInputWrapper">${revPluginModuleProjectCode_InputText}</div>
                </div>
            </div>
        </div>
    `;
    /** REV END PROJECT CODE **/

    let revSavePluginModuleEditProjectTab_Id = "revSavePluginModuleEditProjectTab_Id_" + window.revGenUniqueId();

    let revSavePluginModuleEditProjectSubmitTab = window.revSubmitTabCurvedPointerRight({
        "revId": revSavePluginModuleEditProjectTab_Id,
        "revTitle": "sAvE pRojEcT LiNEs",
        "revSubmitCallback": () => {
            window.revToggleSwitchArea("");
        },
    });

    let revSavePluginModuleEditProjectSubmitTabArea = `
        <div class="revFlexWrapper_WidthAuto revSavePluginModuleEditProjectSubmitTabWrapper">${revSavePluginModuleEditProjectSubmitTab}</div>
    `;

    let revTellTxt = `&nbsp;tHis wilL hELp tHE moDuLE aDmiN kNow exactly wHat upDAtes you have done`;

    let revTellPluginModuleProjectDescArea = `
        <div class="revFlexWrapper revPluginEditProjectDescItemWrapper revTellPluginEditProjectDescItemWrapper">
            <div class="revFlexContainer">
                <div class="revPosRelative revFlexContainer revPluginModuleProjectDescContainer">
                    <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper revPluginModuleProjectDescInputWrapper"><i class="fas fa-exclamation revFontSizeSmall"></i>${revTellTxt}</div>
                </div>
            </div>
        </div>
    `;

    let revPluginEditProjectDescsContainerView = `
        <div class="revFlexContainer revPluginProjectLineEditsContainer">
            <div class="revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revPluginEditProjectDescItemWrapper">
                <div class="revSmall-H-Line revPluginEditProjectDescProject_H_Line"></div>
                <div class="revPluginEditProjectDescItemIcon"><i class="fas fa-file-code fa-lg"></i></div>
                <div class="revTabLink revFlexWrapper_WidthAuto revPluginEditProjectDescItemTxt">${revLoadedPlugin_Id}</div>
                <div class="revPluginEditProjectDescItemWrapper_revSmallDividerWrapper_BorderRight">${window.revSmallDividerWrapper_BorderRight()}</div>
                <div class="revPluginEditProjectDescorUserEditProjectDetailsTab"><i class="fas fa-plus"></i></div>
            </div>
            <div class="revFlexContainer revPluginLineEditProjectDescMenuItemsTabsContainer">
                ${revUserEditorArea}
                ${revPluginModuleProjectFromToLineInputArea}
                ${revPluginModuleProjectDescArea}
                ${revPluginModuleProjectCode_InputText_Area}
                ${revSavePluginModuleEditProjectSubmitTabArea}
                ${revTellPluginModuleProjectDescArea}
            </div>
        </div>
    `;

    let revPluginEditProjectDescHomeCurrentActiveprojectsTxt = "sTart a nEw moduLE EdiT pRojEct . . .";

    if (revLoadedPluginEditsArr.length) {
        revPluginEditProjectDescHomeCurrentActiveprojectsTxt = revLoadedPluginEditsArr.length + ` acTivE projects you'RE currently working on`;
    }

    let revPageView = `
        <div class="revFlexContainer revPluginProjectsLineEditsViewContainer">
            <div class="revFlexWrapper revFontSiteGreyTxtColor revFontSizeNormal revPluginProjectLineEditsTtlWrapper">${revPluginEditProjectDescHomeCurrentActiveprojectsTxt}</div>
            <div class="revFlexContainer">${revPluginEditProjectDescsContainerView}</div>
        </div>
    `;

    return revPageView;
};

module.exports.revFormViewWidget = revFormViewWidget;
