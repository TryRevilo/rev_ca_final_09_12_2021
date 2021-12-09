var revPageViewWidget = async (revVarArgs) => {
    let revPageRightSectionContainerId = "revPageRightSectionContainerId";

    let revPageViewNewChatAlertsListingArr = [];

    for (let i = 0; i < 22; i++) {
        let revNewChatAlertWrapper_Id = "revNewChatAlertWrapper_" + window.revGenUniqueId();

        window.revSetInterval(revNewChatAlertWrapper_Id, () => {
            document.getElementById(revNewChatAlertWrapper_Id).addEventListener("click", async (event) => {
                window.revAddRemoveToggleView("beforeend", revPageRightSectionContainerId, "revBubble", revVarArgs);

                let revObjectChatMessagesListing = await window.revGetLoadedPageView("revObjectChatMessagesListing", revVarArgs);

                window.revAddRemoveToggleView("beforeend", revPageRightSectionContainerId, "revBubble", revObjectChatMessagesListing);
            });
        });

        let revPageViewNewChatAlert = `
        <div id="${revNewChatAlertWrapper_Id}" class="revTabLink revFlexWrapper revNewChatAlertWrapper">
            <div class="revNewChatAlertIcon"></div>
            <div class="revFontSiteBlueTxtColor revFontSizeSmall revFlexWrapper revChatAlertEntityWrapper">
                <div class="revNewChatAlertEntityName">Oliver Muchai</div>
                <div class="revNewChatAlertPointerIcon"><i class="fas fa-long-arrow-alt-right"></i></div>
                <div class="revFontSizeTiny revNewChatAlertCount">127</div>
            </div>
        </div>
        `;

        revPageViewNewChatAlertsListingArr.push(revPageViewNewChatAlert);
    }

    return `<div class="revFlexContainer revFlexContainerScroll revNewChatAlertsListingAreaContainer">${revPageViewNewChatAlertsListingArr.join("")}</div>`;
};

module.exports.revPageViewWidget = revPageViewWidget;
