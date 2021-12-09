var revMenuItemWidget = (revVarArgs) => {
    if (!revVarArgs || !revVarArgs._revEntityType) return;

    let revEntityFloatingTabId = "revSpaceFullInfoId_" + window.revGenUniqueId();

    let revEntityType = revVarArgs._revEntityType;

    window.revSetInterval(revEntityFloatingTabId, () => {
        document.getElementById(revEntityFloatingTabId).addEventListener("click", async (event) => {
            if (revEntityType.localeCompare("rev_user_entity") == 0) {
                let revLoadedPageView = await window.revGetLoadedPageViewAreaContainer("revPageViewProfileInfo", revVarArgs);
                window.revLoadContainerInnerHTMLContent("revEntityActivityContentArea", revLoadedPageView);
            } else if (revEntityType.localeCompare("rev_group_entity") == 0) {
                let revPageViewSpaceFullInfo = await window.revDownloadContextView("revSpaceFullInfo", revVarArgs._revEntitySubType, revVarArgs);
                document.getElementById("revPageContextViewSpaceActivityId").innerHTML = revPageViewSpaceFullInfo;
            }
        });
    });

    return `
        <div id="${revEntityFloatingTabId}" class="revTabLink revFontSiteBlueTxtColor revFlexWrapper revFilterOptionWrapper">
            <div class="revFontSizeLarge revFilterOptionIcon"><i class="fas fa-id-card-alt"></i></div>
        </div>
        `;
};

module.exports.revMenuItemWidget = revMenuItemWidget;
