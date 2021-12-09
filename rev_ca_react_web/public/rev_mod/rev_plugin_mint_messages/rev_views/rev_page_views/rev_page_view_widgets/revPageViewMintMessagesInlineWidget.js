var revPageViewWidget = async (revVarArgs) => {
    if (!revVarArgs || !revVarArgs.revMintConversations || !revVarArgs.revMintConversations.revMintConversationsArr) {
        console.log("ERR -> !revVarArgs || !revVarArgs.revMintConversations || !revVarArgs.revMintConversations.revMintConversationsArr");

        return;
    }

    let revMintConversationsArr = revVarArgs.revMintConversations.revMintConversationsArr;

    /** REV START MINT COMMENTS INPUT AREA */
    let revMintAlertViewsArr = [];

    let revTotNewMintConverstationsAlerts = 0;

    for (let i = 0; i < revMintConversationsArr.length; i++) {
        let revMintConversationAlert = revMintConversationsArr[i];

        if (!revMintConversationAlert) continue;

        revTotNewMintConverstationsAlerts = revTotNewMintConverstationsAlerts + revMintConversationAlert.revMintConversationMessagesArr.length;
    }

    for (let i = 0; i < revMintConversationsArr.length; i++) {
        let revMintConversationAlert = window.revCloneJsObject(revMintConversationsArr[i]);

        if (!revMintConversationAlert) continue;

        revMintConversationAlert["revPublishersArr"] = revVarArgs.revMintConversations.revPublishersArr;
        revMintConversationAlert["revTotNewMintConverstationsAlerts"] = revTotNewMintConverstationsAlerts;
        revMintConversationAlert["revMintConversations"] = revVarArgs.revMintConversations;

        let revMintConversationAlertOverrideView = await window.revGetLoadedOverrideView("revMintConversationAlertOverrideView", revMintConversationAlert);
        revMintAlertViewsArr.push(revMintConversationAlertOverrideView);
    }

    let revMintSugestedEntitiesArea = "<p></p>";

    if (revMintAlertViewsArr.length > 0) {
        revMintSugestedEntitiesArea = `
        <div class="revFlexContainer revSuggestedMintsContainer">
            <div class="revSmalllBold">miNT coNvERsATioNs</div>
            <div class="revFlexContainer">${revMintAlertViewsArr.join("")}</div>
            <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revViewAllMintsTab">moRE miNT coNvERsATioNs</div>
        </div>
        `;
    }

    /** REV START MINT HEADER COMPOSER */

    let revAllMintMessagesTab_Id = "revAllMintMessagesTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revAllMintMessagesTab_Id, () => {
        document.getElementById(revAllMintMessagesTab_Id).addEventListener("click", async (event) => {
            let revPageViewMintMessagesMessages = await window.revGetLoadedPageView("revPageViewMintMessagesMessages", revVarArgs.revMintConversations);
            window.revDrawMainContentArea({ "revData": revVarArgs.revMintConversations, "revLoadedPageView": revPageViewMintMessagesMessages, "revFloatingOptionsMenuName": "123" });
        });
    });

    let revFormViewComposeMintMsg = await revGetForm("revFormViewComposeMintMsg", revVarArgs);

    /** REV START ABOUT MINTS HELP TAB */
    let revAboutMintsTaggedHelpTab_Id = "revAboutMintsTaggedHelpTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revAboutMintsTaggedHelpTab_Id, () => {
        document.getElementById(revAboutMintsTaggedHelpTab_Id).addEventListener("click", async (event) => {
            let revListingViewHelpTagTopics = await window.revGetLoadedPageView("revListingViewHelpTagTopics", { "revTagsArr": ["mint_conversations"], "revEntitySubTypesArr": ["rev_question"], "revServiceDescription": "miNT coNvERsATioNs" });
            window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revListingViewHelpTagTopics, "revFloatingOptionsMenuName": "123" });
        });
    });
    /** REV END ABOUT MINTS HELP TAB */

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
    <div class="revFlexContainer revMintViewContainer">
        <div class="revFlexContainer revMintPublisherFormInlineContainer">
            <div class="revFlexWrapper revMintPublishersWrapper">
                <div id="${revAllMintMessagesTab_Id}" class="revTabLink revFlexWrapper revMintPublisherFormHeaderTabWrapper">
                    <div class="revSmallFooterBorder"></div>
                    <div class="revFontSiteBlueTxtColor revFontSizeNormal revMintPublisherFormHeaderTab">AlL miNT coNvERsaTioNs</div>
                    <div class="revSmallFooterBorder"></div>
                </div>
                ${revNewMintsAlertLen}
                <div id="${revAboutMintsTaggedHelpTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revAbtMintsFormTab">aBouT miNTs <i class="fas fa-question"></i></div>
            </div>
            ${revFormViewComposeMintMsg}
        </div>
        ${revMintSugestedEntitiesArea}
    </div>
    `;
    /** REV END MINT HEADER COMPOSER */

    return revComposeMintFormArea;
};

module.exports.revPageViewWidget = revPageViewWidget;
