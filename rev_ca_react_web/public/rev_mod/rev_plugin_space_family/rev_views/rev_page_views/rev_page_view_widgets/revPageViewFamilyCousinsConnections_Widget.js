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
                    <div class="revFontSizeNormalHeader">cousiNs</div>
                    <div id="${revPageAreaHeaderPageNewFamilyRelTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revFamilyConnectionsObjectPageOwnerAddRelativesTextIconWrapper">
                        <div class="revFlexWrapper revFamilyConnectionsAddRelativesTabsDividerWrapper">
                            <div class="revSmall-H-Line"></div>
                            <div class="revSmall-H-Line"></div>
                            <div class="revSmall-V-Line-1em"></div>
                        </div>
                        <div><i class="fa fa-plus revFontSizeSmall"></i></div>
                        <div class="revFamilyConnectionsObjectPageOwnerAddRelativesText">aDD cousiN</div>
                    </div>
                </div>
                <div class="revFlexWrapper revFamilyConnectionsObjectConnectionsListingItemStatsWrapper">
                    <div class="revFontSizeNormalHeader revFamilyConnectionsObjectConnectionsListingItemStatsPointer"><i class="fas fa-level-up-alt revRotate90"></i></div>
                    <div class="revFontSiteGreyTxtColor revFontSizeExtraSmall revFamilyConnectionsObjectConnectionsListingItemStatsCount">2</div>
                </div>
                <div class="revFlexContainer revFamilyObjectRelativesEntitiesListingContainer">
                    <div class="revFlexWrapper revFamilyObjectRelativeEntityListingWrapper">
                        <div class="revSmall-H-Line revFamilyObjectRelativeEntityListingWrapperDivider"></div>
                        <div class="revFamilyObjectRelativeEntityListingIcon"></div>
                        <div class="revFlexWrapper revFamilyObjectRelativeEntityListingInfoWrapper">
                            <div class="revTabLink revFontSiteBlueTxtColor">Oli Rev Much</div>
                            <div class="revFontSiteGreyTxtColor revFontSizeNormal revFamilyObjectRelativeEntityRelTypeDividerIcon"><i class="fas fa-arrows-alt-h"></i></div>
                            <div class="revFontSiteGreyTxtColor">m</div>
                        </div>
                    </div>
                    <div class="revFlexWrapper revFamilyObjectRelativeEntityListingWrapper">
                        <div class="revSmall-H-Line revFamilyObjectRelativeEntityListingWrapperDivider"></div>
                        <div class="revFamilyObjectRelativeEntityListingIcon"></div>
                        <div class="revFlexWrapper revFamilyObjectRelativeEntityListingInfoWrapper">
                            <div class="revTabLink revFontSiteBlueTxtColor">Rev Oli</div>
                            <div class="revFontSiteGreyTxtColor revFontSizeNormal revFamilyObjectRelativeEntityRelTypeDividerIcon"><i class="fas fa-arrows-alt-h"></i></div>
                            <div class="revFontSiteGreyTxtColor">F</div>
                        </div>
                    </div>
                </div>
                ${revOtherFamilyMembersView}
            </div>
    `;
};

module.exports.revPageViewWidget = revPageViewWidget;
