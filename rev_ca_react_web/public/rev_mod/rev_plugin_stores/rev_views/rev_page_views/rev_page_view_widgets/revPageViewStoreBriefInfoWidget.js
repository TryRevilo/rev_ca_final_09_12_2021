var revPageViewWidget = async (revVarArgs) => {
    let revStoreEntity = revVarArgs.revStoreEntity;

    let revStoreAdminsArr = [];

    if (revVarArgs.revStoreAdminEntitiesArr) {
        revStoreAdminsArr = revVarArgs.revStoreAdminEntitiesArr;
    }

    let revEntityIconPath = window.revGetDefaultEntityIcon(revStoreEntity);

    let revEntityMetadataList = revStoreEntity._revEntityMetadataList;
    let revMaxStrLen = 57;

    let revEntityName = window.revGetMetadataValue(revEntityMetadataList, "rev_entity_name");
    revEntityName = window.revGetRawHTML(revEntityName);
    revEntityName = window.revTruncateString(revEntityName, revMaxStrLen);

    let revStoreDetailsValue = window.revGetMetadataValue(revEntityMetadataList, "rev_entity_desc_val");
    revStoreDetailsValue = window.revGetRawHTML(revStoreDetailsValue);
    revStoreDetailsValue = window.revTruncateString(revStoreDetailsValue, revMaxStrLen);

    /** REV START FOUNDERS */
    let revFoundersIconsArr = [];

    for (let i = 0; i < revStoreAdminsArr.length; i++) {
        let revStoreAdmin = revStoreAdminsArr[i];

        let revStoreAdminIcon_Id = "revStoreAdminIcon_Id_" + window.revGenUniqueId();

        window.revLoadUserIcon(revStoreAdmin, revStoreAdminIcon_Id);

        revFoundersIconsArr.push(`<div id="${revStoreAdminIcon_Id}" class="revTabLink revStoreBriefFounderIcon"></div>`);

        if (i >= 3) {
            break;
        }
    }

    let revExtraAdminsCount = ``;

    if (revStoreAdminsArr.length > 4) {
        revExtraAdminsCount = `+ ${revStoreAdminsArr.length - 4} oTHERs`;
    }

    let revFoundersView = "";

    if (revStoreAdminsArr.length > 0) {
        revFoundersView = `
        <div class="revFlexWrapper revBriefStoreDetail revBriefStoreDetailFoundersIconsWrapper">
            <div class="revSmalllBold revBriefStoreDetailTtl">Founders : </div>
            <div class="revFlexWrapper revBriefStoreDetailVal">
                ${revFoundersIconsArr.join("")}
                <div class="revFontSiteBlueTxtColor revFontSizeNormal revBriefStoreExtraFounders">${revExtraAdminsCount}</div>
            </div>
        </div>
        `;
    }
    /** REV END FOUNDERS */

    /** REV START EDIT STORE */
    let revEditStoreTab_Id = "revEditStoreTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revEditStoreTab_Id, () => {
        document.getElementById(revEditStoreTab_Id).addEventListener("click", async (event) => {
            let revStoreForm = await window.revGetForm("revStore", revVarArgs);
            window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revStoreForm, "revFloatingOptionsMenuName": "123" });
        });
    });
    /** REV END EDIT STORE */

    /** REV START CONTACT SELLER */
    let revContactSellerTab_Id = "revContactSellerTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revContactSellerTab_Id, () => {
        document.getElementById(revContactSellerTab_Id).addEventListener("click", async (event) => {
            let revContactSellerForm = await window.revGetForm("revContactSellerForm", revVarArgs);
            window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revContactSellerForm, "revFloatingOptionsMenuName": "123" });
        });
    });
    /** REV END CONTACT SELLER */

    /** REV START STORE RESOLUTIONS */
    let revStoreResolutionsTab_Id = "revStoreResolutionsTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revStoreResolutionsTab_Id, () => {
        document.getElementById(revStoreResolutionsTab_Id).addEventListener("click", async (event) => {
            let revResolutionCallBack = async () => {
                let revObjectStoreItem = await window.revGetLoadedPageView("revObjectStoreItem", revStoreEntity);
                window.revDrawMainContentArea({ "revData": revStoreEntity, "revLoadedPageView": revObjectStoreItem, "revFloatingOptionsMenuName": "123" });
            };

            let revPassVarArgs = {
                "revResolutionContainerEntity": window.revCloneJsObject(revStoreEntity),
                "revResolutionCallBack": revResolutionCallBack,
            };

            let revPageViewListingResolutions = await window.revGetLoadedPageView("revPageViewListingResolutions", revPassVarArgs);
            window.revDrawMainContentArea({ "revData": revPassVarArgs, "revLoadedPageView": revPageViewListingResolutions, "revFloatingOptionsMenuName": "123" });
        });
    });
    /** REV END STORE RESOLUTIONS */

    let revStoreNameTab_Id = "revStoreNameTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revStoreNameTab_Id, () => {
        document.getElementById(revStoreNameTab_Id).addEventListener("click", async (event) => {
            let revObjectViewStore = await window.revGetLoadedPageView("revObjectViewStore", revStoreEntity);
            window.revDrawMainContentArea({ "revData": revStoreEntity, "revLoadedPageView": revObjectViewStore, "revFloatingOptionsMenuName": "123" });
        });
    });

    return `
    <div class="revFlexWrapper">
        <div class="revBriefStoreLogoIcon">${window.revReadFileToImageFromURL(revEntityIconPath, "revListingUserIconBlock")}</div>
        <div class="revFlexContainer revBriefStoreFlexRightWrapper">
            <div id="${revStoreNameTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFlexWrapper revBriefStoreNameWrapper">
                <div class="revFontSizeLarge"><i class="fas fa-store-alt"></i></div>
                <div class="revBriefStoreName">${revEntityName}</div>
            </div>
            <div class="revFlexWrapper">
                <div class="revFlexContainer revBriefStoreDetailContainer">
                    <div class="revFlexWrapper revBriefStoreDetail">
                        <div class="revSmalllBold revBriefStoreDetailTtl">Feedback : </div>
                        <div class="revFontSiteGreyTxtColor revFontSizeNormal revBriefStoreDetailVal">99.99% Positive Feedback</div>
                    </div>
                    <div class="revFlexWrapper revBriefStoreDetail">
                        <div class="revSmalllBold revBriefStoreDetailTtl">Total sales : </div>
                        <div class="revFontSiteGreyTxtColor revFontSizeNormal revBriefStoreDetailVal">1, 243</div>
                    </div>
                    <div class="revFlexWrapper revBriefStoreDetail">
                        <div class="revSmalllBold revBriefStoreDetailTtl">Founded : </div>
                        <div class="revFontSiteGreyTxtColor revFontSizeNormal revBriefStoreDetailVal">${window.revFormatLongDate(revStoreEntity._revTimePublished)}</div>
                    </div>
                    ${revFoundersView}
                </div>
                <div class="revFlexContainer revBriefStoreFarRightDetailContainer">
                    <div class="revFlexWrapper revStoreOptionsTabsWrapper">
                        <div id="${revEditStoreTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revStoreItemObjectViewEditStoreTab">EDiT stoRE</div>
                        <div class="revSmall-V-Line-1em"></div>
                        <div class="revSmall-H-Line"></div>
                        <div id="${revContactSellerTab_Id}" class="revTabLink revFontSizeNormal revContactSellerTab"><i class="fas fa-envelope fa-lg"></i></div>
                    </div>
                    <div class="revFlexWrapper revStoreDesputesTabsWrapper">
                        <div id="${revStoreResolutionsTab_Id}" class="revTabLink revFlexWrapper revStoreDesputesTabsResolvedWrapper">
                            <div class="revFontSiteBlueTxtColor revFontSizeNormal">rEsoLvED : 17</div>
                        </div>
                        <div class="revFlexWrapper revStoreDesputesTabsDividerWrapper">
                            <div class="revSmall-V-Line-1em"></div>
                        </div>
                        <div class="revTabLink revFlexWrapper revStoreDesputesTabsResolvedWrapper">
                            <div class="revFontSiteBlueTxtColor revFontSizeNormal">pENDiNG : 4</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
};

module.exports.revPageViewWidget = revPageViewWidget;
