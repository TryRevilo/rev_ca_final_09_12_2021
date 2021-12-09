var revPageViewWidget = async (revVarArgs) => {
    let revURL = window.REV_SITE_BASE_PATH + "/rev_api?" + "rev_logged_in_entity_guid=" + window.REV_LOGGED_IN_ENTITY_GUID + "&revPluginHookContextsRemoteArr=revHookRemoteContext_ReadQuestionsLists";

    let revQuestionsArr = [];
    let revQuestionPublishersArr;

    try {
        let revData = await window.revGetServerData_JSON_Async(revURL);
        revQuestionsArr = revData.filter;

        revQuestionPublishersArr = revData.revPublishers;
    } catch (error) {
        console.log("ERR -> revPageViewTimelineWidget.js -> !revData" + error);
    }

    let revQuestionsAskedView = "";
    let revQuestionsAskedArr = [];

    for (let i = 0; i < revQuestionsArr.length; i++) {
        let revPassVarArgs = window.revCloneJsObject(revQuestionsArr[i]);
        revPassVarArgs["revQuestionPublisher"] = window.revGetPublisherEntity(revQuestionPublishersArr, revPassVarArgs._revEntityOwnerGUID);

        let revObjectViewQuestionItemListing = await window.revGetLoadedPageView("revObjectViewQuestionItemListing", revPassVarArgs);
        revQuestionsAskedArr.push(`<div class="revFlexContainer revQuestionListingItemContainer">${revObjectViewQuestionItemListing}</div>`);
    }

    if (!Array.isArray(revQuestionsArr) || revQuestionsArr.length < 1) {
        let revNoPostsTxt = "No Posts on tHis pRoFiLE BOARD YET";

        revNoPostsTxt = "No quEstioNs askEd YET";

        revQuestionsAskedView = `
            <div class="revFontSiteGreyTxtColor revFontSizeNormal revNoPostsView">${revNoPostsTxt}</div>
        `;
    } else {
        revQuestionsAskedView = revQuestionsAskedArr.join("");
    }

    /** REV START HEADER AREA */
    let revPageViewPageNavHeader = await window.revGetLoadedPageView("revPageViewPageNavHeader", { "revDafaultPagePagination": true });
    let revPageHeader = window.revPageHeader(`over 141, 656 Q<span class="revFontSizeTiny">s</span>`);
    /** REV END HEADER AREA */

    let revAddNewQuestionHeaderTab_Id = "revAddNewQuestionHeaderTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revAddNewQuestionHeaderTab_Id, () => {
        document.getElementById(revAddNewQuestionHeaderTab_Id).addEventListener("click", async (event) => {
            let revQuestionForm = await window.revGetForm("revQuestion", window.REV_LOGGED_IN_ENTITY);
            window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revQuestionForm, "revFloatingOptionsMenuName": "123" });
        });
    });

    let revRetPageView = `
    <div class="revFlexContainer">
        <div class="revFlexContainer revPageHeaderAreaContainer">
            <div class="revFlexWrapper revPageViewTitledPageNavHeaderWrapper_AdForm">
                ${revPageViewPageNavHeader}
            </div>
            <div class="revFlexWrapper revPageHeaderQuestionWrapper">
                ${revPageHeader}
                <div class="revFlexWrapper revAddNewQuestionHeaderWrapper">
                    ${window.revSmallDividerWrapper_BorderLeft_1em()}
                    <div id="${revAddNewQuestionHeaderTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revAddNewQuestionTabWrapper">
                        <div class="revAddNewQuestionHeaderTabIcon"><i class="fa fa-plus"></i></div>
                        <div class="revAddNewQuestionHeaderTabTxt">Ask A QuEsTioN</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="revFlexContainer revFlexContainerScroll revQuestionsAskedContainer">${revQuestionsAskedView}</div>
    </div>
    `;

    return revRetPageView;
};

module.exports.revPageViewWidget = revPageViewWidget;
