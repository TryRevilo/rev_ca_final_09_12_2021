var revPageViewWidget = async (revVarArgs) => {
    let revPageAreaHeaderPageNewFamilyRelTab_Id = "revPageAreaHeaderPageNewFamilyRelTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revPageAreaHeaderPageNewFamilyRelTab_Id, () => {
        document.getElementById(revPageAreaHeaderPageNewFamilyRelTab_Id).addEventListener("click", async (event) => {
            let revCreateNewFamilyRelationshipForm = await window.revGetForm("revCreateNewFamilyRelationshipForm", revVarArgs);

            window.revToggleSwitchArea(`
            <div class="revFlexContainer revCreateUserConnectionsFormContainer">
                <div class="revFontSizeNormalHeader revPublisherSettingsHeader">aDD NEw FAmiLy mEmBER</div>
                ${revCreateNewFamilyRelationshipForm}
            </div>
            `);
        });
    });

    let revPageViewFamilyOtherConnections = await window.revGetLoadedPageView("revPageViewFamilyOtherConnections", revVarArgs);

    let revOtherFamilyMembersView = `<div class="revFlexWrapper revFamilyObjectRelativesEntitiesListingDividerWrapper"></div>`;

    if (revPageViewFamilyOtherConnections) {
        revOtherFamilyMembersView = revPageViewFamilyOtherConnections;
    }

    return `
            <div class="revFlexContainer">
                <div class="revFlexWrapper revFamilyConnectionsObjectConnectionsListingItemHeaderWrapper">
                    <div class="revFontSizeNormalHeader">FAmiLy fRiENDs</div>
                    <div id="${revPageAreaHeaderPageNewFamilyRelTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revFamilyConnectionsObjectPageOwnerAddRelativesTextIconWrapper">
                        <div class="revFlexWrapper revFamilyConnectionsAddRelativesTabsDividerWrapper">
                            <div class="revSmall-H-Line"></div>
                            <div class="revSmall-H-Line"></div>
                            <div class="revSmall-V-Line-1em"></div>
                        </div>
                        <div><i class="fa fa-plus revFontSizeSmall"></i></div>
                        <div class="revFamilyConnectionsObjectPageOwnerAddRelativesText">aDD famiLy FriEND</div>
                    </div>
                </div>
                <div class="revFlexWrapper revFamilyConnectionsObjectConnectionsListingItemStatsWrapper">
                    <div class="revFontSizeNormalHeader revFamilyConnectionsObjectConnectionsListingItemStatsPointer"><i class="fas fa-level-up-alt revRotate90"></i></div>
                    <div class="revFontSiteGreyTxtColor revFontSizeExtraSmall revFamilyConnectionsObjectConnectionsListingItemStatsCount">2</div>
                </div>
                ${revOtherFamilyMembersView}
            </div>
    `;
};

module.exports.revPageViewWidget = revPageViewWidget;
