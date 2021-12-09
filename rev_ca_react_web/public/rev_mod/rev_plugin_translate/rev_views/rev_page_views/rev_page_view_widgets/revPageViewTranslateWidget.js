var revPageViewWidget = async (revVarArgs) => {
    let revLoggedInEntityGUID = window.REV_LOGGED_IN_ENTITY_GUID;

    let revTransFromLangDetails;
    let revTransToLangDetails;

    let revLangKeysArr = [];

    try {
        let revPath = `${window.REV_SITE_BASE_PATH}/rev_api?rev_logged_in_entity_guid=${revLoggedInEntityGUID}&revPluginHookContextsRemoteArr=revPluginHookRemoteEnvironment_GetLangKeys`;

        let revData = await window.revGetServerData_JSON_Async(revPath);

        if (revData) {
            revLangKeysArr = revData.revLangsDetailsArr;
        }
    } catch (error) {
        console.log("ERR -> revPageViewTranslateWidget.js -> revPluginHookRemoteEnvironment_GetLangKeys -> " + error);
    }

    let revPluginPhrasesArea_Id = "revPluginPhrasesArea_Id_" + window.revGenUniqueId();

    let revMenuItemsArr = [];

    let revDrawTranslations = async (revToPluginViewTranslations) => {
        let revFromPluginViewTranslations;

        if (window.revIsEmptyVar(revTransFromLangDetails) || window.revIsEmptyVar(revTransToLangDetails)) {
            return;
        }

        let revDefLang;

        try {
            let revLangCodesArr = [revTransToLangDetails.revLangCode, revTransFromLangDetails.revLangCode];

            let revPath = `${window.REV_SITE_BASE_PATH}/rev_api?rev_logged_in_entity_guid=${revLoggedInEntityGUID}&rev_lang_codes=${revLangCodesArr.join(",")}&revPluginHookContextsRemoteArr=revPluginHookRemoteEnvironment_GetPluginLangs`;

            let revData = await window.revGetServerData_JSON_Async(revPath);

            if (revData) {
                if (!revToPluginViewTranslations) {
                    let revToLang = revTransToLangDetails.revLangCode;
                    revToPluginViewTranslations = revData[revToLang];
                    revDefLang = revData.revDefLang;
                }

                revFromPluginViewTranslations = revData[revTransFromLangDetails.revLangCode];
            }
        } catch (error) {
            console.log("ERR -> revPageViewTranslateWidget.js -> revPluginHookRemoteEnvironment_GetPluginLangs -> " + error);
        }

        let revPluginNameId = revToPluginViewTranslations.revPluginNameId;

        let revPluginPhrasesArr = [];

        let revPluginNameHeaderTab_Id = "revPluginNameHeaderTab_Id_" + window.revGenUniqueId();

        window.revSetInterval(revPluginNameHeaderTab_Id, () => {
            document.getElementById(revPluginNameHeaderTab_Id).innerHTML = revPluginNameId;
        });

        let revPluginName_Id = "revPluginName_Id_" + window.revGenUniqueId();

        window.revSetInterval(revPluginName_Id, () => {
            document.getElementById(revPluginName_Id).addEventListener("click", (event) => {
                revDrawTranslations(revToPluginViewTranslations);
            });
        });

        revMenuItemsArr.push(`<div id="${revPluginName_Id}" class="revTabLink dropdown-item revFlexWrapper">${revPluginNameId}</div>`);

        let revOverrideViewTranslateSuggestion = await window.revGetLoadedOverrideView("revOverrideViewTranslateSuggestion", {
            "revDefLang": revDefLang,
            "revTransFromLangDetails": revTransFromLangDetails,
            "revTransToLangDetails": revTransToLangDetails,
            "revFromPluginViewTranslations": revFromPluginViewTranslations,
            "revToPluginViewTranslations": revToPluginViewTranslations,
        });

        revPluginPhrasesArr.push(revOverrideViewTranslateSuggestion);

        window.revSetInterval(revPluginPhrasesArea_Id, () => {
            document.getElementById(revPluginPhrasesArea_Id).innerHTML = `
                <div class="revTabLink revFlexWrapper revTranslateTabbedHeaderTabWrapper">
                    <div id="${revPluginNameHeaderTab_Id}" class="revFontSiteBlueTxtColor revFontSizeNormal"></div>
                    <div class="revFlexWrapper revTranslatePluginSelectorWrapper">${revDropDownMenuArea_Plugins}</div>
                </div>
                <div class="revFlexContainer revPluginTransContainer">${revPluginPhrasesArr.join("")}</div>
            `;

            revTransFromLangDetails = null;
            revTransToLangDetails = null;
        });
    };

    /** REV START PLUGINS DROP MENU AREA */
    let revDropDownMenuAreaVarArgs_Plugins = {
        "revMenuItemsArr": revMenuItemsArr,
    };

    let revDropDownMenuArea_Plugins = await window.revDropdownMenu(revDropDownMenuAreaVarArgs_Plugins);
    /** REV END PLUGINS DROP MENU AREA */

    let revAddNewLangArea_Id = "revAddNewLangArea_Id_" + window.revGenUniqueId();

    let revDropDownMenuItemConst = (revItemMenuTxt, revMenuItem_Id, revCallBack) => {
        window.revSetInterval(revMenuItem_Id, () => {
            document.getElementById(revMenuItem_Id).addEventListener("click", async (event) => {
                revCallBack();
            });
        });

        return `<div id="${revMenuItem_Id}" class="revTabLink dropdown-item revFlexWrapper">${revItemMenuTxt}</div>`;
    };

    let revLangSelectorArea = async () => {
        let revFrom_Txt_Id = "revFrom_Txt_Id_" + window.revGenUniqueId();
        let revTo_Txt_Id = "revTo_Txt_Id_" + window.revGenUniqueId();

        /** REV START FROM-TO DROP MENU AREA */
        let revMenuItemEn_Id = "revMenuItemEn_Id_" + window.revGenUniqueId();

        window.revSetInterval(revMenuItemEn_Id, () => {
            document.getElementById(revMenuItemEn_Id).addEventListener("click", (event) => {});
        });

        let revMenuItemSwa_Id = "revMenuItemSwa_Id_" + window.revGenUniqueId();

        window.revSetInterval(revMenuItemSwa_Id, () => {
            document.getElementById(revMenuItemSwa_Id).addEventListener("click", (event) => {});
        });

        let revDropDownMenuAreaFromLangsVarArgs = {
            "revMenuItemsArr": [],
        };

        let revDropDownMenuAreaToLangsVarArgs = {
            "revMenuItemsArr": [],
        };

        for (let i = 0; i < revLangKeysArr.length; i++) {
            let revLangDetails = revLangKeysArr[i];

            /** REV START FROM TRANS KEYS */
            let revMenuItemFromLang_Id = i + "_revMenuItemFromLang_Id_" + window.revGenUniqueId();

            let revMenuItemFromCallBackFunc = () => {
                revTransFromLangDetails = revLangDetails;

                document.getElementById(revFrom_Txt_Id).innerHTML = window.revTruncateString(revTransFromLangDetails.revLangCode, 4);

                revDrawTranslations();
            };

            revDropDownMenuAreaFromLangsVarArgs.revMenuItemsArr.push(revDropDownMenuItemConst(revLangDetails.revLangName, revMenuItemFromLang_Id, revMenuItemFromCallBackFunc));
            /** REV END TO TRANS KEYS */

            /** REV START TO TRANS KEYS */
            let revMenuItemToLang_Id = i + "_revMenuItemToLang_Id_" + window.revGenUniqueId();

            let revMenuItemToCallBackFunc = () => {
                revTransToLangDetails = revLangDetails;

                document.getElementById(revTo_Txt_Id).innerHTML = window.revTruncateString(revTransToLangDetails.revLangCode, 4);

                revDrawTranslations();
            };

            revDropDownMenuAreaToLangsVarArgs.revMenuItemsArr.push(revDropDownMenuItemConst(revLangDetails.revLangName, revMenuItemToLang_Id, revMenuItemToCallBackFunc));
            /** REV END TO TRANS KEYS */
        }

        let revDropDownMenuArea_FromLangs = await window.revDropdownMenu(revDropDownMenuAreaFromLangsVarArgs);
        let revDropDownMenuArea_ToLangs = await window.revDropdownMenu(revDropDownMenuAreaToLangsVarArgs);
        /** REV END FROM-TO DROP MENU AREA */

        let revAddNewLangTab_Id = "revAddNewLangTab_Id_" + window.revGenUniqueId();

        window.revSetInterval(revAddNewLangTab_Id, () => {
            document.getElementById(revAddNewLangTab_Id).addEventListener("click", async (event) => {
                let revCancelCallBack = () => {
                    document.getElementById(revAddNewLangArea_Id).innerHTML = "";
                };

                let revPassVarArgs = window.revCloneJsObject(revVarArgs);
                revPassVarArgs["revCancelCallBack"] = revCancelCallBack;

                let revNewLanguageInlineForm = await window.revGetForm("revNewLanguageInlineForm", revPassVarArgs);

                document.getElementById(revAddNewLangArea_Id).innerHTML = `<div class="revFlexContainer revAddNewLangAreaContainer">${revNewLanguageInlineForm}</div>`;
            });
        });

        return `
        <div class="revFlexWrapper revLangSelectorWrapperContainer">
            <div class="revFlexWrapper revTranslateLangSelectorWrapper">
                <div class="revTabLink revSmalllBoldBlue revTranslateLangTxt">FRom</div>
                <div class="revTranslateLangSelectorDropDown">${revDropDownMenuArea_FromLangs}</div>
                <div id="${revFrom_Txt_Id}" class="revFontSiteGreyTxtColor revFontSizeNormal revFrom_To_Txt"></div>
            </div>
            <div class="revFlexWrapper revTranslateLangSelectorWrapper">
                <div class="revTabLink revSmalllBoldBlue revTranslateLangTxt">to</div>
                <div class="revTranslateLangSelectorDropDown">${revDropDownMenuArea_ToLangs}</div>
                <div id="${revTo_Txt_Id}" class="revFontSiteGreyTxtColor revFontSizeNormal revFrom_To_Txt"></div>
            </div>
            <div id="${revAddNewLangTab_Id}" class="revTabLink revFlexWrapper revAddNewLanguageWrapper">
                <div class="revFontSiteBlueTxtColor revFontSizeLarge"><i class="fas fa-plus"></i></div>
                <div class="revFontSiteBlueTxtColor revFontSizeNormal revAddNewLanguageTxt">ADd nEw LaNGuage</div>
            </div>
        </div>
        `;
    };

    let revTranslateTxtTell = `
    <div>HELp translate CampAnn to youR Language.</div>
    <div class="revAccessTranslateTell">mAkE it moRE accEssiBLe to peoplE in youR LiFE and REGion.</div>`;

    /** REV START HEADER AREA */
    let revHeaderTx = "TraNsLATe CampAnn foR tHE woRLD ARouNd you";

    let revPageViewPageNavHeader = await window.revGetLoadedPageView("revPageViewPageNavHeader", { "revDafaultPagePagination": true });
    let revUserOptionsMenuArea = await window.revGetMenuArea("revActivityItemsListingView", window.REV_LOGGED_IN_ENTITY);
    let revPageHeader = window.revPageHeader(revHeaderTx);
    /** REV END HEADER AREA */

    return `
    <div class="revFlexContainer">
        <div class="revFlexContainer revPageHeaderAreaContainer">
            <div class="revFlexWrapper revPageViewTitledPageNavHeaderWrapper_AdForm">${revPageViewPageNavHeader}</div>
            <div class="revFlexWrapper revUserOptionsMenuAreaWrapper_AdForm">${revUserOptionsMenuArea}</div>
            ${revPageHeader}
        </div>
        ${await revLangSelectorArea()}
        <div id="${revAddNewLangArea_Id}" class="revFlexContainer"></div>
        <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexContainer revTranslateTellContainer">${revTranslateTxtTell}</div>
        <div id="${revPluginPhrasesArea_Id}" class="revFlexContainer revMainTabbedViewContainer_Translate"></div>
    </div>
    `;
};

module.exports.revPageViewWidget = revPageViewWidget;
