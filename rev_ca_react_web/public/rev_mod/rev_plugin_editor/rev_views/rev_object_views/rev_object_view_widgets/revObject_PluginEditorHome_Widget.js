var revPageViewWidget = async (revVarArgs) => {
    let revGetMonacoPluginEditor = revVarArgs.revGetMonacoPluginEditor;
    let revContentResetterCallBack = revVarArgs.revContentResetterCallBack;
    let revSetSaveTabCallBack = revVarArgs.revSetSaveTabCallBack;

    let revSetPluginEditorHomeData = revVarArgs.revSetPluginEditorHomeData;
    let revGetPluginEditorHomeDataVal = revVarArgs.revGetPluginEditorHomeDataVal;

    let revSetPluginEditorHomeFunction = revVarArgs.revSetPluginEditorHomeFunction;
    let revGetPluginEditorHomeFunction = revVarArgs.revGetPluginEditorHomeFunction;

    let revLoadedPluginEditsArr = revVarArgs.revLoadedPluginEditsArr;

    let revGetUserProjectsView = async () => {
        return await window.revGetLoadedPageView("revObject_UserPluginProjects", revVarArgs);
    };

    let revPluginEditHomeBodyContainer_Id = "revPluginEditHomeBodyContainer_Id_" + window.revGenUniqueId();

    window.revSetInterval(revPluginEditHomeBodyContainer_Id, () => {
        revSetPluginEditorHomeData({ "revData_Id": "revPluginEditHomeBodyContainer_Id", "revDataVal": revPluginEditHomeBodyContainer_Id });
    });

    let revSetPluginEditorHomeObjectView = (revView) => {
        let revSetPluginEditHomeBodyContainer_Id = revGetPluginEditorHomeDataVal("revPluginEditHomeBodyContainer_Id");

        console.log("revSetPluginEditHomeBodyContainer_Id : " + revSetPluginEditHomeBodyContainer_Id);

        window.revSetInterval(revSetPluginEditHomeBodyContainer_Id, () => {
            document.getElementById(revSetPluginEditHomeBodyContainer_Id).innerHTML = revView;
        });
    };

    revSetPluginEditorHomeFunction({
        "revFunc_Id": "revSetPluginEditorHomeObjectView",
        "revFunc": revSetPluginEditorHomeObjectView,
    });

    let revUserModuleProjectsTab_Id = "revUserModuleProjectsTab_Id_Id_" + window.revGenUniqueId();

    window.revSetInterval(revUserModuleProjectsTab_Id, () => {
        document.getElementById(revUserModuleProjectsTab_Id).addEventListener("click", async (event) => {
            revSetPluginEditorHomeObjectView(await revGetUserProjectsView());
        });
    });

    let revPluginEditHomeBody = `
        <div class="revFlexContainer">
            <div class="revFlexWrapper revPluginEditHomeHeaderTabsWrapper">
                <div class="revPosRelative revFlexContainer revPluginEditHomeHeaderTabContainer">
                    <div id="${revUserModuleProjectsTab_Id}" class="revPosRelative revTabLink revFontSiteBlueTxtColor revFontSizeNormal revPluginEditHomeHeaderTabTxt">my pRoJEcTs</div>
                    <div class="revPosAbsolute revFontSiteBlueTxtColor revFontSizeNormal revPluginEditHomeHeaderTabActivePointer"><i class="fas fa-long-arrow-alt-down"></i></div>
                </div>
                <div class="revPosRelative revFlexContainer revPluginEditHomeHeaderTabContainer">
                    <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revPluginEditHomeHeaderTabTxt">puLLs</div>
                </div>
                <div class="revPosRelative revFlexContainer revPluginEditHomeHeaderTabContainer">
                    <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revPluginEditHomeHeaderTabTxt">pushEs</div>
                </div>
                <div class="revPosRelative revFlexContainer revPluginEditHomeHeaderTabContainer">
                    <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revPluginEditHomeHeaderTabTxt">RFCs</div>
                </div>
            </div>
        </div>
    `;

    window.revSetInterval(revPluginEditHomeBodyContainer_Id, async () => {
        document.getElementById(revPluginEditHomeBodyContainer_Id).innerHTML = await revGetUserProjectsView();
    });

    let revPluginEditHomeTell = `
        <div class="revFlexContainer revPluginEditHomeBodyNewPluginContainer">
            <div class="revTabLink revFontSiteBlueTxtColor revFlexWrapper revPluginEditHomeBodyNewPluginWrapper">
                <div class="revFontSizeMedium revPluginEditHomeBodyNewPluginIcon"><i class="fa fa-plus"></i></div>
                <div class="revFontSizeNormal revPluginEditHomeBodyNewPluginTxt">nEw pLuGiN</div>
            </div>
            <div class="revPosRelative revFlexContainer revPluginEditHomeTellContainer">
                <div class="revPosAbsolute revFlexWrapper revPluginEditHomeTellContainer_BackgroundBorder"></div>
                <div class="revPosAbsolute revFontSizeNormal revFontSiteGreyTxtColor revFlexContainer revPluginEditHomeBodyNewPluginTellContainer">
                    <div>Plugins help you extend your experiences with FAmiLy | FRiEnds | coLEaGuEs</div>
                    <div class="revPluginEditHomeBodyNewPluginTell_Par">creaTe new pLuGiNs & woRk on tHem witH other developers from around the woRLD</div>
                    <div class="revPluginEditHomeBodyNewPluginTell_Par"></div>
                    <div class="revPluginEditHomeBodyNewPluginTell_Par"></div>
                    <div class="revPluginEditHomeBodyNewPluginTell_Par">You could also EDiT and HELp improve current pLuGiNs</div>
                </div>
            </div>
        </div>
    `;

    let revPageView = `
        <div class="revFlexContainer">
            ${revPluginEditHomeBody}
            <div id="${revPluginEditHomeBodyContainer_Id}" class="revFlexContainer"></div>
            ${revPluginEditHomeTell}
        </div>
    `;

    return revPageView;
};

module.exports.revPageViewWidget = revPageViewWidget;
