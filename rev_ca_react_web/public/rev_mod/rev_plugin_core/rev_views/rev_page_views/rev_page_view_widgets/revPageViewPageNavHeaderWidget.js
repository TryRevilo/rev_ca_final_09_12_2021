var revPageViewWidget = async (revVarArgs) => {
    let revPageAreaHeaderPageNewFamilyRelTab_Id = "revPageAreaHeaderPageNewFamilyRelTab_Id_" + window.revGenUniqueId();
    let revPageAreaHeaderPageNewSubTypeTab_Id = "revPageAreaHeaderPageNewSubTypeTab_Id_" + window.revGenUniqueId();

    let revEntitySubType = "";
    let revNewStoreForm = "";
    let revPageAreaHeaderNewSubTypeCallback;

    if (revVarArgs) {
        if (revVarArgs.revPageAreaHeaderNewSubTypeCallback) {
            revPageAreaHeaderNewSubTypeCallback = revVarArgs.revPageAreaHeaderNewSubTypeCallback;
        } else if (revVarArgs.revEntity && revVarArgs.revEntity._revEntitySubType) {
            revEntitySubType = revVarArgs.revEntity._revEntitySubType;
            revNewStoreForm = await window.revGetForm(revEntitySubType, revVarArgs);
        }
    }

    let revPageAreaHeaderPageNewSubTypeTabAreaId = "revPageAreaHeaderPageNewSubTypeTabAreaId_" + window.revGenUniqueId();

    window.revSetInterval(revPageAreaHeaderPageNewFamilyRelTab_Id, () => {
        document.getElementById(revPageAreaHeaderPageNewFamilyRelTab_Id).addEventListener("click", async (event) => {
            let revPageViewFamilyConnections = await window.revGetLoadedPageView("revPageViewFamilyConnections", revVarArgs.revVarArgsData);
            window.revDrawMainContentArea({ "revData": revVarArgs.revVarArgsData, "revLoadedPageView": revPageViewFamilyConnections, "revFloatingOptionsMenuName": "123" });
        });
    });

    window.revSetInterval(revPageAreaHeaderPageNewSubTypeTabAreaId, () => {
        if (revNewStoreForm || revPageAreaHeaderNewSubTypeCallback) {
            document.getElementById(revPageAreaHeaderPageNewSubTypeTabAreaId).innerHTML = `
            <div class="revFlexWrapper revPageAreaHeaderPageNewWrapper">
                <div id="${revPageAreaHeaderPageNewFamilyRelTab_Id}" class="revTabLink revFlexWrapper revFamilyTabWrapper">
                    <div><span><i class="fas fa-braille"></i></span></div>
                    <div class="revOptionsStabFamilyTxt">FAmiLy</div>
                </div>
                <div class="revFlexWrapper revPageAreaHeaderPageNewFamilyRelTabDividerWrapper">
                    <div class="revTiny-H-Line"></div>
                    <div class="revTiny-V-Line"></div>
                    <div class="revTiny-H-Line"></div>
                </div>
                <div class="revOptionsStab"><i id="${revPageAreaHeaderPageNewSubTypeTab_Id}" class="revTabLink fa fa-plus"></i></div>
            </div>
            `;

            window.revSetInterval(revPageAreaHeaderPageNewSubTypeTab_Id, () => {
                document.getElementById(revPageAreaHeaderPageNewSubTypeTab_Id).addEventListener("click", (event) => {
                    if (revPageAreaHeaderNewSubTypeCallback) {
                        revPageAreaHeaderNewSubTypeCallback(revVarArgs);
                    } else {
                        document.getElementById("revPageHome").innerHTML = revNewStoreForm;
                    }
                });
            });
        }
    });

    let revBackHistTab_Id = "revBackHistTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revBackHistTab_Id, () => {
        document.getElementById(revBackHistTab_Id).addEventListener("click", (event) => {
            window.revLoadModules("revPluginModuleLocalHistoryLib", (revScriptModule) => {
                let revHistVarArgsData = window.revPluginModuleLocalHistoryLib.revGetLastHistoryItem();

                if (revHistVarArgsData) {
                    let revHistCallbackFunc = revHistVarArgsData.revHistCallbackFunc;
                    revHistCallbackFunc(revHistVarArgsData);
                }
            });
        });
    });

    let revDafaultPagePagination = ``;

    let revSiteNavPaginationTabs = "";

    if (!window.revStringEmpty(revEntitySubType) || (revVarArgs && revVarArgs.revDafaultPagePagination)) {
        let revAllSiteEntitySubTypesSite_Id = "revAllSiteEntitySubTypesSite_Id_" + window.revGenUniqueId();
        let revAllSiteEntitySubTypesMine_Id = "revAllSiteEntitySubTypesMine_Id_" + window.revGenUniqueId();
        let revAllSiteEntitySubTypespopular_Id = "revAllSiteEntitySubTypespopular_Id_" + window.revGenUniqueId();

        revSiteNavPaginationTabs = `
            <div class="revPaginationItemDivider"></div>
            <div class="revFlexWrapper revPaginationItemWrapper">
                <div id="${revAllSiteEntitySubTypesSite_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revPaginationItem">Site</div>
                <div class="revPaginationItemDivider"></div>
            </div>
            <div class="revFlexWrapper revPaginationItemWrapper">
                <div id="${revAllSiteEntitySubTypesMine_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revPaginationItem">Mine</div>
                <div class="revPaginationItemDivider"></div>
            </div>
            <div class="revFlexWrapper revPaginationItemWrapper">
                <div id="${revAllSiteEntitySubTypespopular_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revPaginationItem">Popular</div>
            </div>
        `;

        window.revSetInterval(revAllSiteEntitySubTypesSite_Id, () => {
            document.getElementById(revAllSiteEntitySubTypesSite_Id).addEventListener("click", (event) => {
                console.log("revAllSiteEntitySubTypesSite_Id CLICK >>> " + revEntitySubType);
            });
        });
    }

    let revPageEditorsContainer_Id = "revPageEditorsContainer_Id_" + window.revGenUniqueId();

    window.revSetInterval(revPageEditorsContainer_Id, () => {
        let revEditorsIconsTabViewsArr = [];

        let revPageEditorIcon_Id = "revPageEditorIcon_Id_" + window.revGenUniqueId();

        window.revSetInterval(revPageEditorIcon_Id, () => {
            document.getElementById(revPageEditorIcon_Id).addEventListener("click", async function () {
                try {
                    let revPhrasePublisherGUID = window.REV_LOGGED_IN_ENTITY_GUID;

                    let revPath = `${window.REV_SITE_BASE_PATH}/rev_api?rev_entity_guid=${revPhrasePublisherGUID}&revPluginHookContextsRemoteArr=revPluginHookRemoteEnvironment_GetPluginViewLangs_By_OwnerGUID`;

                    let revData = await window.revGetServerData_JSON_Async(revPath);

                    let revOverrideView_UserLangTransSuggestion = await window.revGetLoadedOverrideView("rev_lang_phrase", revData);
                    window.revDrawMainContentArea({ "revData": window.REV_LOGGED_IN_ENTITY, "revLoadedPageView": revOverrideView_UserLangTransSuggestion, "revFloatingOptionsMenuName": "123" });
                } catch (error) {
                    console.log("ERR -> revPageViewPageNavHeaderWidget.js -> revPluginHookRemoteEnvironment_GetPluginViewLangs_By_OwnerGUID -> " + error);
                }
            });

            window.revLoadUserIcon(window.REV_LOGGED_IN_ENTITY, revPageEditorIcon_Id);
        });

        let revEditorsIconsTabView = `
            <div class="revTabLink revFlexContainer revPageViewEditorIconContainer">
                <div id="${revPageEditorIcon_Id}" class="revPageViewEditorIcon"></div>
            </div>`;

        revEditorsIconsTabViewsArr.push(revEditorsIconsTabView);

        document.getElementById(revPageEditorsContainer_Id).innerHTML = `
        <div class="revFlexContainer">
            <div class="revFlexWrapper_WidthAuto">
                <div class="revFontSiteBlueTxtColor revFontSizeNormal">eDiToRs</div>
                <div class="revFlexWrapper revTranslateViewTabWrapper">
                    ${window.revSmallDividerWrapper_BorderRight()}
                    <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revTranslateViewTabTxt">TRANsLATE</div>
                </div>
            </div>
            <div class="revFlexWrapper_WidthAuto revPageEditorsWrapperWrapper">
                <div class="revFontSiteGreyTxtColor revFontSizeNormal"><i class="fas fa-level-up-alt revRotate90"></i></div>
                <div class="revFlexWrapper revFlexWrapperScroll revPageEditorsWrapper">${revEditorsIconsTabViewsArr.join("")}</div>
            </div>
        </div>
        `;
    });

    revDafaultPagePagination = `
    <div class="revFlexWrapper">
        <div class="revFlexWrapper revPageAreaPaginationWrapper">
            ${revSiteNavPaginationTabs}
        </div>
        <div id="${revPageEditorsContainer_Id}" class="revFlexContainer revPageEditorsContainer"></div>
    </div>
    `;

    let revPage = `
    <div class="revFlexContainer">
        <div class="revPosRelative revFlexWrapper revPageAreaHeaderNavWrapper">
            <div class="revPosAbsolute revFlexWrapper revPageAreaHeaderPageBack_H_Rule"></div>
            <div class="revPosAbsolute revFlexWrapper">
                <div id="${revBackHistTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revPageAreaHeaderPageBackTabWrapper">
                    <div><i class="fas fa-long-arrow-alt-left"></i></div>
                    <div class="revPageAreaHeaderPageBackTabTxt">Back</div>
                </div>
                <div id="${revPageAreaHeaderPageNewSubTypeTabAreaId}" class="revFontSiteBlueTxtColor revFontSizeNormal revPageAreaHeaderPageNewSubTypeTab"></div>
            </div>
        </div>
        ${revDafaultPagePagination}
    </div>
    `;

    return revPage;
};

module.exports.revPageViewWidget = revPageViewWidget;
