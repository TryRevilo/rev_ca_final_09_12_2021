var revPageViewWidget = async (revVarArgs) => {
    if (!revVarArgs || !revVarArgs.revTagsArr) {
        return;
    }

    let revTagsArr = revVarArgs.revTagsArr;

    let revEntitySubTypesArr = [];

    if (revVarArgs.revEntitySubTypesArr) {
        revEntitySubTypesArr = revEntitySubTypesArr.concat(revVarArgs.revEntitySubTypesArr);
    }

    let revServiceDescription = "";

    if (revVarArgs.revServiceDescription) {
        revServiceDescription = revVarArgs.revServiceDescription;
    }

    let revPageViewPageNavHeaderId = "revPageViewPageNavHeaderId_" + window.revGenUniqueId();

    window.revSetInterval(revPageViewPageNavHeaderId, async () => {
        let revLoadedPageView = await window.revGetLoadedPageView("revPageViewPageNavHeader", { revEntity: { "_revEntitySubType": "revSpaceType" } });
        document.getElementById(revPageViewPageNavHeaderId).innerHTML = revLoadedPageView;
    });

    let revHelpTagTopicsListingPageHeader = window.revPageHeader("HELp - miNT coNvERsATioNs");

    /** REV START HELP TAGS DATA */
    let revHelpTagTopicsListingContainer_Id = "revHelpTagTopicsListingContainer_Id_" + window.revGenUniqueId();

    let revHelpTagEntitiesViewsArr = [];

    if (!revVarArgs.revQuestionPublisher || !revVarArgs.revQuestionPublisher._remoteRevEntityGUID) {
        let url = `${window.REV_SITE_BASE_PATH}/rev_api/?rev_logged_in_entity_guid="${window.REV_LOGGED_IN_ENTITY_GUID}&rev_tags=${revTagsArr.join(",")}&rev_entity_subtypes_arr=${revEntitySubTypesArr.join(",")}&revPluginHookContextsRemoteArr=revHookRemoteHandler_ReadHelpTagsEntities`;

        try {
            let revData = await window.revGetServerData_JSON_Async(url);
            let revQuestionsArr = revData.filter;

            let revQuestionPublishersArr = revData.revEntityPublishersArr;

            for (let i = 0; i < revQuestionsArr.length; i++) {
                let revPassVarArgs = window.revCloneJsObject(revQuestionsArr[i]);
                revPassVarArgs["revQuestionPublisher"] = window.revGetPublisherEntity(revQuestionPublishersArr, revPassVarArgs._revEntityOwnerGUID);

                let revObjectViewQuestionItemListing = await window.revGetLoadedPageView("revObjectViewQuestionItemListing", revPassVarArgs);
                revHelpTagEntitiesViewsArr.push(`<div class="revFlexContainer revQuestionListingItemContainer">${revObjectViewQuestionItemListing}</div>`);
            }

            if (revHelpTagEntitiesViewsArr.length > 0) {
                window.revSetInterval(revHelpTagTopicsListingContainer_Id, () => {
                    document.getElementById(revHelpTagTopicsListingContainer_Id).innerHTML = revHelpTagEntitiesViewsArr.join("");
                });
            }
        } catch (error) {
            console.log("error -> revListingViewHelpTagTopics_Widget.js -> revData -> " + error);
        }
    }
    /** REV END HELP TAGS DATA */

    /** REV START HEADER AREA */
    let revPageViewPageNavHeader = await window.revGetLoadedPageView("revPageViewPageNavHeader", { "revDafaultPagePagination": true });
    let revPageHeader = window.revPageHeader(`over 141, 656 Q<span class="revFontSizeTiny">s</span>`);
    /** REV END HEADER AREA */

    let revAddNewQuestionHeaderTab_Id = "revAddNewQuestionHeaderTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revAddNewQuestionHeaderTab_Id, () => {
        document.getElementById(revAddNewQuestionHeaderTab_Id).addEventListener("click", async (event) => {
            let revPassVarArgs = window.revCloneJsObject(window.REV_LOGGED_IN_ENTITY);
            revPassVarArgs["revServiceDescription"] = revServiceDescription;
            revPassVarArgs["revAddedTagsArr"] = revTagsArr;

            let revQuestionForm = await window.revGetForm("revQuestion", revPassVarArgs);
            window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revQuestionForm, "revFloatingOptionsMenuName": "123" });
        });
    });

    let revRetPageView = `
    <div class="revFlexContainer">
        <div class="revFlexContainer revPageHeaderAreaContainer">
            <div class="revFlexService revPageViewTitledPageNavHeaderHelpServiceWrapper">${revPageViewPageNavHeader}</div>
            <div class="revFlexWrapper revPageViewTitledPageHelpServiceWrapper">${revHelpTagTopicsListingPageHeader}</div>
            <div class="revFlexWrapper revPageHeaderHelpServiceWrapper">
                ${revPageHeader}
                <div class="revFlexWrapper revAddNewServiceHelpQuestionHeaderWrapper">
                    <div class="revSmall-V-Line-1em"></div>
                    <div class="revSmall-H-Line"></div>
                    <div id="${revAddNewQuestionHeaderTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revAddNewServiceQuestionTabWrapper">
                        <div class="revAddNewQuestionHeaderTabIcon"><i class="fa fa-plus"></i></div>
                        <div class="revAddNewQuestionHeaderTabTxt">Ask about miNT coNvERsATioNs</div>
                    </div>
                </div>
            </div>
        </div>
        <div id="${revHelpTagTopicsListingContainer_Id}" class="revFlexContainer revHelpTagTopicsListingContainer"></div>
    </div>
    `;

    return revRetPageView;
};

module.exports.revPageViewWidget = revPageViewWidget;
