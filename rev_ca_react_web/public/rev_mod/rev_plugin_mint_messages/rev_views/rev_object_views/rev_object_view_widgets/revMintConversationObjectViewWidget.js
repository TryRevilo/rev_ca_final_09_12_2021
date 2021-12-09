var revPageViewWidget = async (revVarArgs) => {
    let revMintConversationOverrideView = await window.revGetLoadedOverrideView("revMintConversationOverrideView", revVarArgs);

    let revAllMintMessagesTab_Id = "revAllMintMessagesTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revAllMintMessagesTab_Id, () => {
        document.getElementById(revAllMintMessagesTab_Id).addEventListener("click", async (event) => {
            let revPageViewMintMessagesMessages = await window.revGetLoadedPageView("revPageViewMintMessagesMessages", revVarArgs.revMintConversations);
            window.revDrawMainContentArea({ "revData": revVarArgs.revMintConversations, "revLoadedPageView": revPageViewMintMessagesMessages, "revFloatingOptionsMenuName": "123" });
        });
    });

    let revTotNewMintConverstationsAlerts = revVarArgs.revTotNewMintConverstationsAlerts - revVarArgs.revMintConversationMessagesArr.length;

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
        <div class="revFlexContainer revObjectMainMintViewContainer">
            <div class="revFlexContainer revMintPublisherFormContainer">
                <div class="revFlexWrapper revMintPublishersWrapper">
                    <div id="${revAllMintMessagesTab_Id}"  class="revTabLink revFlexWrapper revMintPublisherFormHeaderTabWrapper">
                        <div class="revSmallFooterBorder"></div>
                        <div class="revFontSiteBlueTxtColor revFontSizeNormal revMintPublisherFormHeaderTab">AlL miNT coNvERsaTioNs</div>
                        <div class="revSmallFooterBorder"></div>
                    </div>
                    ${revNewMintsAlertLen}
                    <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revAbtMintsFormTab">aBouT miNTs <i class="fas fa-question"></i></div>
                </div>
            </div>
            <div class="revFlexWrapper revObjectMintConversationsHeaderWrapper">
                <div class="revSmalllBold">miNT conversations </div>
                <div class="revFontSiteGreyTxtColor revFontSizeNormal revNewMintConversationsHeaderPointer"><i class="fas fa-level-down-alt"></i></div>
            </div>
            ${revMintConversationOverrideView}
        </div>
    `;

    /** PAGE OWNER MENU AREA OPTIONS */
    let revUserOptionsMenuArea = await window.revGetMenuArea("revActivityItemsListingView", window.REV_LOGGED_IN_ENTITY);

    let revPageViewPageNavHeader = await window.revGetLoadedPageView("revPageViewPageNavHeader", { revEntity: { "_revEntitySubType": "revSpaceType" } });

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
