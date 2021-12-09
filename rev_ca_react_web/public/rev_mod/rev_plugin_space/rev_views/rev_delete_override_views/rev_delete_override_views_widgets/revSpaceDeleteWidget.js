var revDeleteOverrideViewWidget = async (revVarArgs) => {
    if (!revVarArgs) return "NULL ENTITY";

    let revEntityInfoMetadataList = revVarArgs._revInfoEntity._revEntityMetadataList;

    let revEntityName = window.revGetMetadataValue(revEntityInfoMetadataList, "rev_entity_name");

    let revSchoolName = window.revGetMetadataValue(revEntityInfoMetadataList, "rev_school_name");
    revSchoolName = window.revTruncateString(revSchoolName, 44);

    let revDeleteEntityDesc = window.revTruncateString(revEntityName + " / " + revSchoolName, 44);

    let revDeleteButtonId = "revDeleteButton_" + window.revGenUniqueId();
    let revCancelDeleteButtonId = "revCancelDeleteButtonId_" + window.revGenUniqueId();

    window.revSetInterval(revDeleteButtonId, () => {
        document.getElementById(revDeleteButtonId).addEventListener("click", function () {
            window.revToggleSwitchArea("");

            window.revPostServerData(window.REV_DELETE_REV_ENTITY_WITH_CHILDS_URL, { filter: [revVarArgs._remoteRevEntityGUID] }, async (revData) => {
                let revNoticiasPopUpContainer = window.revGetNoticiasPopUpContainer(`
                    <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper revDeleteSuccessWrapper"><i class="fas fa-check"></i> ${revEntityName} DELETED Successfully . . .</div>
                `);
                window.revTempShowElement(revNoticiasPopUpContainer, "revPageRightSectionContainerId", 7000);

                let revPageViewListingSpace = await window.revGetLoadedPageView("revPageViewListingSpace", null);
                document.getElementById("revPageHome").innerHTML = revPageViewListingSpace;
            });
        });
    });

    window.revSetInterval(revCancelDeleteButtonId, () => {
        document.getElementById(revCancelDeleteButtonId).addEventListener("click", (event) => {
            window.revToggleSwitchArea("");
        });
    });

    let revView = `
    <div class="revFlexContainer revDeleteEntityContainer">
        <div class="revDeleteHeader">DELETE posT</div>
        <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper revDeleteEntityContentWrapper">
            <i class="far fa-trash-alt revDeleteQuoteIconStyle"></i>
            ${revDeleteEntityDesc}
        </div>

        <div class="revFlexWrapper revDeleteFooterAreaWrapper">
            <div id=${revDeleteButtonId} class="revDeleteButton">dELETE</div>
            <div id="${revCancelDeleteButtonId}" class="revTabLink revSmalllBoldBlue revCancel">cANcEL</div>
        </div>
    </div>
    `;

    return revView;
};

module.exports.revDeleteOverrideViewWidget = revDeleteOverrideViewWidget;
