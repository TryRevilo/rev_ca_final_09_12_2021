var revPageViewWidget = async (revVarArgs) => {
    let revPageRightSectionContainerId = "revPageRightSectionContainerId";

    let revCloseChatMessagesListingView_Id = "revCloseChatMessagesListingView_Id_" + window.revGenUniqueId();

    window.revSetInterval(revCloseChatMessagesListingView_Id, () => {
        document.getElementById(revCloseChatMessagesListingView_Id).addEventListener("click", (event) => {
            window.revAddRemoveToggleView("beforeend", revPageRightSectionContainerId, "revBubble", null);
        });
    });

    let revMsgsHeaderWrapper = `
        <div class="revPosAbsolute revFlexWrapper revFooterChatMessagesViewHeaderWrapper">
            <div id="${revCloseChatMessagesListingView_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeLarge"><i class="far fa-window-close"></i></div>
            <div class="revFontSiteBlueTxtColor revFontSizeLarge"></div>
            <div class="revFontSiteBlueTxtColor revFontSizeNormal revNewFooterChatMessagesCount">12 new messages</div>
        </div>
    `;

    let revVarArgsCallback = async (revNewCommentEntity) => {
        console.log("REV CALLBACK METHOD CALLED!");
    };

    let revMsgsViewArr = [];

    for (let i = 0; i < 14; i++) {
        if (i < 3) {
            revMsgsViewArr.push(await window.revGetLoadedPageView("revPageViewReceivedChatView", -1));
            continue;
        }

        if (i % 2 == 0) {
            revMsgsViewArr.push(await window.revGetLoadedPageView("revPageViewReceivedChatView", 1));
        } else revMsgsViewArr.push(await window.revGetLoadedPageView("revPageViewSentChatView", 1));
    }

    let revMsgsViewsContainer = "";

    if (revMsgsViewArr.length > 0) {
        revMsgsViewsContainer = `<div class="revPosRelative revFlexContainer revFlexContainerScroll revFooterChatMessagesListingContainer">${revMsgsViewArr.join("")}</div>`;
    }

    let revCommentForm = await window.revGetForm("rev_chat_message", { "revEntity": window.REV_LOGGED_IN_ENTITY, "revVarArgsCallback": revVarArgsCallback });

    let revAdjasentHTML = `
    <div id="revBubble" class="revPosAbsolute revFlexContainer revUserChatAreaContainer">
        <div class="revPosRelative revFlexContainer revFlexContainerScroll revMsgsViewsContainer">
            ${revMsgsHeaderWrapper}
            ${revMsgsViewsContainer}
        </div>
        <div class="revFlexContainer revChatFormContainer">${revCommentForm}</div>
        <div class="revFlexContainer revChatAreaPointerContainer">
            <div class="revChatAreaPointer"><i class="fas fa-chevron-down"></i></div>
        </div>
    </div>
    `;

    return revAdjasentHTML;
};

module.exports.revPageViewWidget = revPageViewWidget;
