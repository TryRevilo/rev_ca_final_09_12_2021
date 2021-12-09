var revMenuItemWidget = async (revVarArgs) => {
    if (!revVarArgs || !revVarArgs._remoteRevEntityGUID || revVarArgs._remoteRevEntityGUID < 1) {
        return;
    }

    let revElementDeleteId = "revElementDeleteId_" + window.revGenUniqueId();

    window.revSetInterval(revElementDeleteId, () => {
        document.getElementById(revElementDeleteId).addEventListener("click", async (event) => {
            let revDeleteOverrideView = await window.revGetDeleteOverrideView(revVarArgs._revEntitySubType, revVarArgs);

            if (revDeleteOverrideView) {
                window.revToggleSwitchArea(revDeleteOverrideView);
            } else {
                let revCancelDeleteButtonId = "revCancelDeleteButtonId_" + window.revGenUniqueId();

                window.revSetInterval(revCancelDeleteButtonId, () => {
                    document.getElementById(revCancelDeleteButtonId).addEventListener("click", (event) => {
                        window.revToggleSwitchArea(null);
                    });
                });

                let revView = `
                    <div class="revFlexContainer revDeleteUnavailableContainer">
                        <div class="revDeleteHeader"> DELETE </div>
                        <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper revDeleteEntityContentWrapper">
                            <i class="fas fa-quote-left revDeleteQuoteIconStyle"></i> The Delete Option is NoT AvaiLaBLe for tHis posT
                        </div>

                        <div class="revFlexWrapper revDeleteFooterAreaWrapper">
                            <div id="${revCancelDeleteButtonId}" class="revTabLink revSmalllBoldBlue revCancel">cANcEL</div>
                        </div>
                    </div>
                    `;

                window.revToggleSwitchArea(revView);
            }
        });
    });

    return `
    <div id="${revElementDeleteId}" class="revTabLink dropdown-item revFlexWrapper revMenuItemEditEntityTabWrapper">
        <div class="revFontSiteBlueTxtColor revFontSizeNormal revMenuItemEditEntityTabIcon"><i class="far fa-trash-alt"></i></div>
        <div class="revFontSiteBlueTxtColor revFontSizeNormal revMenuItemEditEntityTabTxt">dELetE</div>
    </div>
    `;
};

module.exports.revMenuItemWidget = revMenuItemWidget;
