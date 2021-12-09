var revPageViewWidget = async (revVarArgs) => {
    /** REV START SEARCH RES LISTING */
    let revSearchResListingContainer_Id = "revSearchResListingContainer_Id_" + window.revGenUniqueId();
    /** REV END SEARCH RES LISTING */

    /** REV START HEADER AREA */
    let revPageViewPageNavHeader = await window.revGetLoadedPageView("revPageViewPageNavHeader", { "revDafaultPagePagination": true });

    let revSearchResCount_Id = "revSearchResCount_Id_" + window.revGenUniqueId();
    let revPageHeader = window.revPageHeader(`<div id="${revSearchResCount_Id}"></div>`);
    /** REV END HEADER AREA */

    /** REV START PAGE TITLE */
    let revSearchListingQuerryTxt_Id = "revSearchListingQuerryTxt_Id_" + window.revGenUniqueId();

    let revHelpTagTopicsListingPageHeader = window.revPageHeader(`
        <div class="revFlexWrapper revSerchListingQueryWrapper">
            <div class="revSmall-H-Line"></div>
            <div class="revTiny-V-Line"></div>
            <div id="${revSearchListingQuerryTxt_Id}" class="revSearchListingQuerryTxt"></div>
        </div>
    `);
    /** REV END PAGE TITLE */

    /** REV START SUB TYPES ARR */
    let revEntitySubTypesArr = [];

    if (revVarArgs.revEntitySubTypesArr) {
        revEntitySubTypesArr = revEntitySubTypesArr.concat(revVarArgs.revEntitySubTypesArr);
    }
    /** REV END SUB TYPES ARR */

    /** REV START OWNER GUID */
    let revEntityOwnerGUID = -1;

    if (revVarArgs.revEntityOwnerGUID) {
        revEntityOwnerGUID = revVarArgs.revEntityOwnerGUID;
    }
    /** REV END OWNER GUID */

    /** REV START OWNER GUID */
    let revContainerGUID = -1;

    if (revVarArgs.revContainerGUID) {
        revContainerGUID = revVarArgs.revContainerGUID;
    }
    /** REV END OWNER GUID */

    let revSearch = async (revSearchTxt) => {
        window.revSetInterval(revSearchListingQuerryTxt_Id, () => {
            if (revSearchTxt.localeCompare("rev_all") == 0) {
                revSearchTxt = "ALL";
            }

            document.getElementById(revSearchListingQuerryTxt_Id).innerHTML = ` ${window.revTruncateString(revSearchTxt, 35)} . . .`;
        });

        let url = `${window.REV_SITE_BASE_PATH}/rev_api/?rev_logged_in_entity_guid="${window.REV_LOGGED_IN_ENTITY_GUID}&rev_search_txt=${revSearchTxt}&rev_entity_subtypes_arr=${revEntitySubTypesArr.join(",")}&rev_entity_owner_guid=${revEntityOwnerGUID}&rev_container_guid=${revContainerGUID}&revPluginHookContextsRemoteArr=revHookRemoteHandler_GetFullTextSearchEntities`;

        try {
            let revData = await window.revGetServerData_JSON_Async(url);
            let revResFilterArr = revData.filter;

            let revEntityPublishersArr = revData.revEntityPublishersArr;

            let revSearchItemsViewsArr = [];

            for (let i = 0; i < revResFilterArr.length; i++) {
                let revPassVarArgs = window.revCloneJsObject(revResFilterArr[i]);

                let revProps = { "revEntity": revPassVarArgs, "revEntityPublishersArr": revEntityPublishersArr };

                let revContextViewSearchItemListing = await revDownloadContextView("revContextViewSearchItemListing", revPassVarArgs._revEntitySubType, revProps);

                if (!revContextViewSearchItemListing) {
                    revContextViewSearchItemListing = await window.revGetLoadedOverrideView(revPassVarArgs._revEntitySubType, revProps);
                }

                if (!revContextViewSearchItemListing) {
                    continue;
                }

                let revEntityOptionsMenuArea = await window.revGetMenuAreaView("revListingItemOptionsMenuArea", revPassVarArgs);

                let revEntityListingItemWrapper = `
                    <div class="revFlexContainer revPosRelative">
                        <div class="revFlexContainer">${revContextViewSearchItemListing}</div>
                        <div class="revTabLink revFontSiteBlueTxtColor revFontSizeMedium revFlexContainer revPosAbsolute revEntityListingItemWrapperStyle_Control">${revEntityOptionsMenuArea}</div>
                    </div>
                    `;

                revSearchItemsViewsArr.push(revEntityListingItemWrapper);
            }

            window.revSetInterval(revSearchResListingContainer_Id, () => {
                if (revSearchItemsViewsArr.length > 0) {
                    let revPlularity = "";
                    let revResultsPlularity = "";

                    if (revSearchItemsViewsArr.length > 1) {
                        revPlularity = "over ";
                        revResultsPlularity = "s";
                    }

                    document.getElementById(revSearchResCount_Id).innerHTML = `${revPlularity + revResFilterArr.length} REsulT<span class="revFontSizeTiny">${revResultsPlularity}</span>`;
                    document.getElementById(revSearchResListingContainer_Id).innerHTML = revSearchItemsViewsArr.join("");
                } else {
                    document.getElementById(revSearchResListingContainer_Id).innerHTML = `<div class="revFontSiteGreyTxtColor revFontSizeNormal revNullSearchMatches"><span class="revFontSizeMedium">0</span> mATcHEs Found</div>`;
                }
            });
        } catch (error) {
            console.log("error -> revPageViewListingSerachResults_Widget.js -> revData -> " + error);
        }
    };

    let revSearchTxt = "";

    if (revVarArgs.revSearchTxt) {
        revSearchTxt = revVarArgs.revSearchTxt;

        revSearch(revSearchTxt);
    }

    let revSearchSubmitTab_Id = "revSearchSubmitTab_Id_" + window.revGenUniqueId();
    /** REV START SEARCH INPUT */
    let revSearchInputText_Id = "revSearchInputText_Id_" + window.revGenUniqueId();

    window.revSetInterval(revSearchInputText_Id, () => {
        document.getElementById(revSearchInputText_Id).addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                revSearch(window.revGetTextInputVal(revSearchInputText_Id));
            }
        });
    });

    let revFormViewSearchTxtInput = await window.revGetForm("revFormViewSearchTxtInput", { "revSearchInputStyle": "revSearchResInputInput", "revSearchInputCallBack": revSearch, "revSearchButtonTab_id": revSearchSubmitTab_Id });
    /** REV END  SEARCH INPUT */

    /** REV START SEARCH INPUT */
    let revAddNewQuestionHeaderTab_Id = "revAddNewQuestionHeaderTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revAddNewQuestionHeaderTab_Id, () => {
        document.getElementById(revAddNewQuestionHeaderTab_Id).addEventListener("click", async (event) => {
            let revQuestionForm = await window.revGetForm("revQuestion", window.REV_LOGGED_IN_ENTITY);
            window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revQuestionForm, "revFloatingOptionsMenuName": "123" });
        });
    });

    let revFormSubmitTab = window.revSubmitTabCurvedPointerRight({
        "revId": revSearchSubmitTab_Id,
        "revTitle": "Search",
        "revSubmitCallback": () => {
            revSearch(window.revGetTextInputVal(revSearchInputText_Id));
        },
    });
    /** REV END SEARCH INPUT */

    let revRetPageView = `
    <div class="revFlexContainer">
        <div class="revFlexContainer revPageHeaderAreaContainer">
            <div class="revFlexWrapper revPageViewTitledPageNavHeaderSearchWrapper">${revPageViewPageNavHeader}</div>
            <div class="revFlexWrapper revSearchResListingSearchFormInputWrapper">
                <div class="revFlexWrapper revSearchResListingSearchInputWrapper">${revFormViewSearchTxtInput}</div>
                ${revFormSubmitTab}
            </div>
            <div class="revFlexWrapper">${revHelpTagTopicsListingPageHeader}</div>
            <div class="revFlexWrapper revPageHeaderSearchWrapper">
                ${revPageHeader}
                <div class="revFlexWrapper revAddNewServiceQuestionHeaderWrapper">
                    <div class="revSmall-V-Line-1em"></div>
                    <div class="revSmall-H-Line"></div>
                    <div id="${revAddNewQuestionHeaderTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revAddNewServiceQuestionTabWrapper">
                        <div class="revAddNewQuestionHeaderTabIcon"><i class="fa fa-plus"></i></div>
                        <div class="revAddNewQuestionHeaderTabTxt">Ask QuEsTioN</div>
                    </div>
                </div>
            </div>
        </div>
        <div id="${revSearchResListingContainer_Id}" class="revFlexContainer revFlexContainerScroll revSearchItemsListingContainer"></div>
    </div>
    `;

    return revRetPageView;
};

module.exports.revPageViewWidget = revPageViewWidget;
