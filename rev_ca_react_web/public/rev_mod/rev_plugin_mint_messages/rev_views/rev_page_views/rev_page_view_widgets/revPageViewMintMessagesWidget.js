var revPageViewWidget = async (revVarArgs) => {
    let revMintConversationsArr = revVarArgs.revMintConversationsArr;

    let revTotNewMintConverstationsAlerts = 0;

    for (let i = 0; i < revMintConversationsArr.length; i++) {
        let revMintConversationAlert = revMintConversationsArr[i];

        if (!revMintConversationAlert) continue;

        revTotNewMintConverstationsAlerts = revTotNewMintConverstationsAlerts + revMintConversationAlert.revMintConversationMessagesArr.length;
    }

    /** REV START MINT HEADER COMPOSER */
    let revRemarksFormAreaView_Id = "revRemarksFormAreaView_Id_" + window.revGenUniqueId();

    let revGetMintMessagePublisherPlaceholder = () => {
        let revFlagRemarksInputArea_Id = "revFlagRemarksInputArea_Id_" + window.revGenUniqueId();

        window.revSetInterval(revFlagRemarksInputArea_Id, () => {
            document.getElementById(revFlagRemarksInputArea_Id).addEventListener("click", async function (event) {
                let revPassVarArgs = window.revCloneJsObject(revVarArgs);

                revPassVarArgs["revPublisherFormHintText"] = "composE miNT mEssAGE";

                revPassVarArgs["revCancelPublisherFormCallback"] = () => {
                    document.getElementById(revRemarksFormAreaView_Id).innerHTML = revGetMintMessagePublisherPlaceholder();
                };

                revPassVarArgs["revFilesSelectedCallback"] = (revFiles) => {
                    console.log("revFiles : " + JSON.stringify(revFiles));
                };

                let revRemarksFormView = await window.revGetForm("revPublisherForm", revPassVarArgs);
                document.getElementById(revRemarksFormAreaView_Id).innerHTML = `<div class="revFlexContainer">${revRemarksFormView}</div>`;
            });
        });

        return `<div id="${revFlagRemarksInputArea_Id}" class="revTabLink revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper">&nbsp;&nbsp;&nbsp;&nbsp;composE miNT mEssAGE</div>`;
    };

    let revNewMintTagsArr = [];

    for (let i = 0; i < 2; i++) {
        let revMintTagOverrideView = await window.revGetLoadedOverrideView("revMintTagOverrideView", i);
        revNewMintTagsArr.push(revMintTagOverrideView);
    }

    let revMintSugestedEntitiesArr = [];

    for (let i = 0; i < 2; i++) {
        let revSuggestedMintOverrideView = await window.revGetLoadedOverrideView("revSuggestedMintOverrideView", i);
        revMintSugestedEntitiesArr.push(revSuggestedMintOverrideView);
    }

    let revRecItemListingsCalArea = `
    <div class="revFlexContainer revSuggestedMintsContainer">
        <div class="revSmalllBold">SugGested miNTs</div>
        <div class="revFlexContainer">${revMintSugestedEntitiesArr.join("")}</div>
        <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revViewAllMintsTab">moRE miNT coNvERsATioNs</div>
    </div>
    `;

    let revNewMintConversationsArr = [];

    let revPublishersArr = revVarArgs.revPublishersArr;

    for (let i = 0; i < revMintConversationsArr.length; i++) {
        let revPassVarArgs = window.revCloneJsObject(revMintConversationsArr[i]);
        revPassVarArgs["revPublishersArr"] = revPublishersArr;
        revPassVarArgs["revMintConversations"] = revVarArgs;

        let revMintConversationOverrideView = await window.revGetLoadedOverrideView("revMintConversationOverrideView", revPassVarArgs);
        revNewMintConversationsArr.push(`<div class="revFlexContainer revMintConversationOverrideViewItemListingContainer">${revMintConversationOverrideView}</div>`);
    }

    /** REV START MINT HEADER COMPOSER */

    let revNewMintTagsViewArea = `
    <div class="revFlexContainer revNewMintTagsContainer">
        <div class="revSmalllBold">New miNT tags</div>
        <div class="revFlexContainer revNewMintTagsListItemsContainer">
            ${revNewMintTagsArr.join("")}
        </div>
        <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revMoreMintTags">+ 12 more miNT tags</div>
    </div>
    `;

    let revMintConversations = `
    <div class="revFlexContainer revNewMintConversationsContainer">
        <div class="revFlexWrapper revNewMintConversationsHeaderWrapper">
            <div class="revSmalllBold">miNT conversations </div>
            <div class="revFontSiteGreyTxtColor revFontSizeNormal revNewMintConversationsHeaderPointer"><i class="fas fa-level-down-alt"></i></div>
        </div>
        <div class="revFlexContainer revNewMintTagsListItemsContainer">${revNewMintConversationsArr.join("")}</div>
        <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revMoreMintTags">+ 12 more miNT monversations</div>
    </div>
    `;

    let revFormViewComposeMintMsg = await revGetForm("revFormViewComposeMintMsg", revVarArgs);

    let revNewMintsAlertLen = "";

    if (revTotNewMintConverstationsAlerts > 0) {
        let revMintMessagesNoticiasTab_Id = "revMintMessagesNoticiasTab_Id_" + window.revGenUniqueId();

        window.revSetInterval(revMintMessagesNoticiasTab_Id, () => {
            document.getElementById(revMintMessagesNoticiasTab_Id).addEventListener("click", async (event) => {
                let revPageViewMintMessagesMessages = await window.revGetLoadedPageView("revPageViewMintMessagesMessages", revVarArgs);
                window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revPageViewMintMessagesMessages, "revFloatingOptionsMenuName": "123" });
            });
        });

        revNewMintsAlertLen = `
        <div id="${revMintMessagesNoticiasTab_Id}" class="revTabLink revFlexWrapper revMintPublisherFormHeaderTabWrapper">
            <div class="revSmallFooterBorder"></div>
            <div class="revSmalllBoldRed revMintPublisherFormHeaderTab"><i class="fas fa-exclamation revFontSizeSmall"></i> ${revTotNewMintConverstationsAlerts}&nbsp;nEw</div>
            <div class="revSmallFooterBorder"></div>
        </div>
        `;
    }

    let revComposeMintFormArea = `
    <div class="revFlexContainer revMainMintViewContainer">
        <div class="revFlexContainer revMintPublisherFormContainer">
            <div class="revFlexWrapper revMintPublishersWrapper">
                ${revNewMintsAlertLen}
                <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revAbtMintsFormTab">aBouT miNTs <i class="fas fa-question"></i></div>
            </div>
            ${revFormViewComposeMintMsg}
        </div>
        ${revRecItemListingsCalArea}
        ${revNewMintTagsViewArea}
        ${revMintConversations}
    </div>
    `;
    /** REV END MINT HEADER COMPOSER */

    /** PAGE OWNER MENU AREA OPTIONS */
    let revUserOptionsMenuArea = await window.revGetMenuArea("revActivityItemsListingView", window.REV_LOGGED_IN_ENTITY);

    let revPageViewPageNavHeader = await window.revGetLoadedPageView("revPageViewPageNavHeader", null);

    return `
    <div class="revFlexContainer">
        <div class="revFlexContainer revPageViewPageNavHeader">
            ${revPageViewPageNavHeader}
        </div>
        <div class="revFlexWrapper">${revUserOptionsMenuArea}</div>
        ${revComposeMintFormArea}
    </div>
    `;
};

module.exports.revPageViewWidget = revPageViewWidget;
