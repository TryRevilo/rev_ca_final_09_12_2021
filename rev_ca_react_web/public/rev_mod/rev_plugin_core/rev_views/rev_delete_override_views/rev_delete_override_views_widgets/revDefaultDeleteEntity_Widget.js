var revDeleteOverrideViewWidget = async (revVarArgs) => {
    if (!revVarArgs) {
        return "OH O";
    }

    let revDeleteButton_Id = "revDeleteButton_Id_" + window.revGenUniqueId();

    window.revSetInterval(revDeleteButton_Id, () => {
        document.getElementById(revDeleteButton_Id).addEventListener("click", function () {
            window.revPostServerData(window.REV_DELETE_REV_ENTITY_WITH_CHILDS_URL, { filter: [revVarArgs._remoteRevEntityGUID] }, (revData) => {
                console.log(revData);
            });
        });
    });

    let revCancelDeleteButton_Id = "revCancelDeleteButton_Id_" + window.revGenUniqueId();

    window.revSetInterval(revCancelDeleteButton_Id, () => {
        document.getElementById(revCancelDeleteButton_Id).addEventListener("click", (event) => {
            window.revToggleSwitchArea("");
        });
    });

    let revView = `
    <div class="revFlexContainer revDeleteEntityContainer">
        <div class="revDeleteHeader">DELETE posT</div>
        <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper revDeleteEntityContentWrapper">
            <i class="fas fa-quote-left revDeleteQuoteIconStyle"></i>
            ${window.revTruncateString(revVarArgs._revEntityMetadataList[0]._metadataValue, 70)}
        </div>

        <div class="revFlexWrapper revDeleteFooterAreaWrapper">
            <div id=${revDeleteButton_Id} class="revDeleteButton">dELETE</div>
            <div id="${revCancelDeleteButton_Id}" class="revTabLink revSmalllBoldBlue revCancel">cANcEL</div>
        </div>
    </div>
    `;

    return revView;
};

module.exports.revDeleteOverrideViewWidget = revDeleteOverrideViewWidget;
