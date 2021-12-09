var revPageViewWidget = async (revVarArgs) => {
    if (window.revIsEmptyVar(revVarArgs)) {
        return;
    }

    let revFamilyMemberView = async (revEntity) => {
        let revEntityInfo = revEntity._revInfoEntity;

        let revFullNames = window.revGetMetadataValue(revEntityInfo._revEntityMetadataList, "rev_entity_full_names_value");

        let revEntityIcon_Id = "revEntityIcon_Id_" + window.revGenUniqueId();
        let revEntityFullNames_Id = "revEntityFullNames_Id_" + window.revGenUniqueId();

        window.revSetInterval(revEntityIcon_Id, () => {
            document.getElementById(revEntityIcon_Id).addEventListener("click", function () {
                window.revUserIconClick(revEntity._remoteRevEntityGUID);
            });

            window.revLoadUserIcon(revEntity, revEntityIcon_Id);
        });

        window.revSetInterval(revEntityFullNames_Id, () => {
            document.getElementById(revEntityFullNames_Id).addEventListener("click", function () {
                window.revUserIconClick(revEntity._remoteRevEntityGUID);
            });
        });

        return `
            <div class="revFlexWrapper revFamilyObjectRelativeEntityListingWrapper">
                <div class="revSmall-H-Line revFamilyObjectRelativeEntityListingWrapperDivider"></div>
                <div id="${revEntityIcon_Id}" class="revTabLink revFamilyObjectRelativeEntityListingIcon"></div>
                <div class="revFlexWrapper revFamilyObjectRelativeEntityListingInfoWrapper">
                    <div id="${revEntityFullNames_Id}" class="revTabLink revFontSiteBlueTxtColor">${revFullNames}</div>
                    <div class="revFontSiteGreyTxtColor revFontSizeNormal revFamilyObjectRelativeEntityRelTypeDividerIcon"><i class="fas fa-arrows-alt-h"></i></div>
                    <div class="revFontSiteGreyTxtColor">Father</div>
                </div>
            </div>
        `;
    };

    let revFamilyMembersArr = [];

    for (let i = 0; i < revVarArgs.length; i++) {
        let revCurrFamilyMemberView = await revFamilyMemberView(revVarArgs[i]);
        revFamilyMembersArr.push(revCurrFamilyMemberView);
    }

    let revPageAreaHeaderPageNewFamilyRelTab_Id = "revPageAreaHeaderPageNewFamilyRelTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revPageAreaHeaderPageNewFamilyRelTab_Id, () => {
        document.getElementById(revPageAreaHeaderPageNewFamilyRelTab_Id).addEventListener("click", async (event) => {
            let revPassVarArgs = {
                "revEntity": revVarArgs,
                "revFormValuesVarArgs": {
                    "revFamilyRelType": "rev_parent",
                },
            };

            let revCreateNewFamilyRelationshipForm = await window.revGetForm("revCreateNewFamilyRelationshipForm", revPassVarArgs);

            window.revToggleSwitchArea(`
            <div class="revFlexContainer revCreateUserConnectionsFormContainer">
                <div class="revFontSizeNormalHeader revPublisherSettingsHeader">aDD NEw FAmiLy mEmBER</div>
                ${revCreateNewFamilyRelationshipForm}
            </div>
            `);
        });
    });

    return `
        <div class="revFlexContainer">
            <div class="revFlexWrapper revFamilyConnectionsObjectConnectionsListingItemHeaderWrapper">
                <div class="revFontSizeNormalHeader">Parents</div>
                <div id="${revPageAreaHeaderPageNewFamilyRelTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revFamilyConnectionsObjectPageOwnerAddRelativesTextIconWrapper">
                    <div class="revFlexWrapper revFamilyConnectionsAddRelativesTabsDividerWrapper">
                        <div class="revSmall-H-Line"></div>
                        <div class="revSmall-H-Line"></div>
                        <div class="revSmall-V-Line-1em"></div>
                    </div>
                    <div><i class="fa fa-plus revFontSizeSmall"></i></div>
                    <div class="revFamilyConnectionsObjectPageOwnerAddRelativesText">aDD PArent</div>
                </div>
            </div>
            <div class="revFlexWrapper revFamilyConnectionsObjectConnectionsListingItemStatsWrapper">
                <div class="revFontSizeNormalHeader revFamilyConnectionsObjectConnectionsListingItemStatsPointer"><i class="fas fa-level-up-alt revRotate90"></i></div>
                <div class="revFontSiteGreyTxtColor revFontSizeExtraSmall revFamilyConnectionsObjectConnectionsListingItemStatsCount">${revFamilyMembersArr.length}</div>
            </div>
            <div class="revFlexContainer revFamilyObjectRelativesEntitiesListingContainer">${revFamilyMembersArr.join("")}</div>
            <div class="revFlexWrapper revFamilyObjectRelativesEntitiesListingDividerWrapper"></div>
        </div>
    `;
};

module.exports.revPageViewWidget = revPageViewWidget;
