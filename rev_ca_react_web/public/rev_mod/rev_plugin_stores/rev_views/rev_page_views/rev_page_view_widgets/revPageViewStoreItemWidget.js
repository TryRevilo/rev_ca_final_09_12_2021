var revPageViewWidget = async (revVarArgs) => {
    let revStoreEntityChilds = revVarArgs._revEntityChildrenList;

    let revPicsAlbum = window.revGetEntityChildren_By_Subtype(revStoreEntityChilds, "rev_pics_album", 1);
    let revVidsAlbum = window.revGetEntityChildren_By_Subtype(revStoreEntityChilds, "rev_vids_album", 1);

    let revGetEntityMediaView = async () => {
        let revEntityPicsAlbumOverrideView = "";
        let revEntityVidsAlbumOverrideView = "";

        let revMediaKiwiView = "";

        let revImagesRemainder = "";

        if (revPicsAlbum) {
            let revPassVarArgsPicsAlbum = window.revCloneJsObject(revPicsAlbum);
            revPassVarArgsPicsAlbum["revAlbumPicsSize"] = "revListingUserIconBlock revImageItemStyle_Small";

            revEntityPicsAlbumOverrideView = await window.revGetLoadedOverrideView("rev_photo", revPassVarArgsPicsAlbum);

            let revImagesCount = revPicsAlbum._revEntityChildrenList.length;

            if (revImagesCount > 13) {
                revImagesRemainder = `<div class="revImagesCount">+${revImagesCount - 13} moRE pics</div>`;
            }
        }

        if (revVidsAlbum) {
            revEntityVidsAlbumOverrideView = await window.revGetLoadedOverrideView("revVideosListingOverrideView", revVidsAlbum);
        }

        if (revEntityPicsAlbumOverrideView || revEntityVidsAlbumOverrideView) {
            revMediaKiwiView = `
            <div class="revFlexContainer revMediaKiwi">
                ${revEntityPicsAlbumOverrideView}
                ${revEntityVidsAlbumOverrideView}
                ${revImagesRemainder}
            </div>
            `;
        }

        return revMediaKiwiView;
    };

    let revEntityMetadataList = revVarArgs._revEntityMetadataList;

    let revMaxStrLen = 57;

    let revEntityName = window.revGetMetadataValue(revEntityMetadataList, "rev_entity_name");
    revEntityName = window.revGetRawHTML(revEntityName);
    revEntityName = window.revTruncateString(revEntityName, revMaxStrLen);

    let revShipping = window.revGetMetadataValue(revEntityMetadataList, "rev_shipping");
    revShipping = window.revGetRawHTML(revShipping);
    revShipping = window.revTruncateString(revShipping, revMaxStrLen);

    let revReturns = window.revGetMetadataValue(revEntityMetadataList, "rev_return_policy");
    revReturns = window.revGetRawHTML(revReturns);
    revReturns = window.revTruncateString(revReturns, revMaxStrLen);

    let revItemCondition = window.revGetMetadataValue(revEntityMetadataList, "rev_item_condition");
    revItemCondition = window.revGetRawHTML(revItemCondition);
    revItemCondition = window.revTruncateString(revItemCondition, revMaxStrLen);

    let revEntityIconPath = window.revGetDefaultEntityIcon(revVarArgs);

    let revPageViewStoreBriefInfoArea_Id = "revPageViewStoreBriefInfoArea_Id_" + window.revGenUniqueId();

    window.revSetInterval(revPageViewStoreBriefInfoArea_Id, async () => {
        try {
            let revEntityContainerGUID = revVarArgs._revEntityContainerGUID;

            let revPath = `${window.REV_SITE_BASE_PATH}/rev_api/?remote_rev_entity_guid=${revEntityContainerGUID}&rev_logged_in_entity_guid=${window.REV_LOGGED_IN_ENTITY_GUID}&revPluginHookContextsRemoteArr=revHookRemoteHandler_GetStoreEntity`;

            let revData = await window.revGetServerData_JSON_Async(revPath);

            revData["revStoreItem"] = revVarArgs;

            let revPageViewStoreBriefInfo = await window.revGetLoadedPageView("revPageViewStoreBriefInfo", revData);
            document.getElementById(revPageViewStoreBriefInfoArea_Id).innerHTML = `
               <div class="revFlexWrapper revPageViewStoreBriefInfoWrapper">${revPageViewStoreBriefInfo}</div>
           `;
        } catch (error) {
            console.log("ERR -> revPageViewStoreItemWidget.js -> !revData -> " + error);
        }
    });

    let revOtherStoreItemsListed_Id = "revOtherStoreItemsListed_Id_" + window.revGenUniqueId();

    window.revSetInterval(revOtherStoreItemsListed_Id, async () => {
        window.revGetLoadedPageView("revPageViewTimeLineStores", revVarArgs, async (revLoadedPageView) => {
            document.getElementById(revOtherStoreItemsListed_Id).innerHTML = revLoadedPageView;
        });
    });

    let revEditStoreItemTab_Id = "revEditStoreItemTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revEditStoreItemTab_Id, () => {
        document.getElementById(revEditStoreItemTab_Id).addEventListener("click", async (event) => {
            let revPassVarArgs = window.revCloneJsObject(revVarArgs);
            revPassVarArgs["revSelectedStore"] = { "_remoteRevEntityGUID": revVarArgs._revEntityContainerGUID };

            let revStoreForm = await window.revGetForm("revStoreItem", revPassVarArgs);

            window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revStoreForm, "revFloatingOptionsMenuName": "123" });
        });
    });

    let revBuyItemTab_Id = "revBuyItemTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revBuyItemTab_Id, () => {
        document.getElementById(revBuyItemTab_Id).addEventListener("click", async (event) => {
            let revPassVarArgs = window.revCloneJsObject(revVarArgs);
            revPassVarArgs["revSelectedStore"] = { "_remoteRevEntityGUID": revVarArgs._revEntityContainerGUID };

            let revOnPaymentCallbackMethod = async (revCalbackVarArgs) => {
                window.revGetLoadedPageViewAreaContainer("revObjectStoreItem", revCalbackVarArgs, (_revView) => {
                    document.getElementById("revPageHome").innerHTML = _revView;
                });
            };

            revPassVarArgs["revOnPaymentCallbackMethod"] = revOnPaymentCallbackMethod;

            let revSelectPaymentOption = await window.revGetForm("revSelectPaymentOption", revPassVarArgs);

            window.revToggleSwitchArea(revSelectPaymentOption);
        });
    });

    /** REV START HEADER AREA */
    let revPageViewPageNavHeader = await window.revGetLoadedPageView("revPageViewPageNavHeader", { revEntity: { "_revEntitySubType": "revSelectStore" } });
    let revUserOptionsMenuArea = await window.revGetMenuArea("revActivityItemsListingView", window.REV_LOGGED_IN_ENTITY);
    let revPageHeader = window.revPageHeader(revEntityName);
    /** REV END HEADER AREA */

    return `
    <div class="revFlexContainer revPageRightBorderedContainer">
        <div class="revFlexContainer revPageHeaderAreaContainer">
            <div class="revFlexWrapper revPageViewTitledPageNavHeaderWrapper_AdForm">${revPageViewPageNavHeader}</div>
            <div class="revFlexWrapper revUserOptionsMenuAreaWrapper_AdForm">${revUserOptionsMenuArea}</div>
            ${revPageHeader}
        </div>
        <div id="${revPageViewStoreBriefInfoArea_Id}" class="revFlexContainer"></div>
        <div class="revFlexContainer revStoreItemObjectViewContainer">
            <div class="revFlexWrapper revStoreObjectTopAreaWrapper">
                <div class="revStoreItemObjectViewIcon">${window.revReadFileToImageFromURL(revEntityIconPath, "revListingIconCurvedSmall")}</div>
                <div class="revFlexContainer revStoreItemObjectViewDetailsSummuryContainer">
                    <div class="revFlexWrapper revFlexContainerBuyOptionsWrapper">
                        <div id="${revBuyItemTab_Id}" class="revTabLink revFontSiteWhitextColor revFontSizeLarge revBuyItNowTab">$22.25</div>
                        <div class="revFlexWrapper revStoreItemObjectViewBuyOptionsWrapper">
                            <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal">Add To Cart</div>
                            <div class="revFlexWrapper revStoreItemObjectViewBuyOptionsDividerWrapper">
                                <div class="revSmall-H-Line"></div>
                                <div class="revTiny-V-Line"></div>
                                <div class="revSmall-H-Line"></div>
                            </div>
                            <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal">Add To WachtList</div>
                            <div class="revFlexWrapper revStoreItemObjectViewBuyOptionsDividerWrapper">
                                <div class="revSmall-H-Line"></div>
                                <div class="revTiny-V-Line"></div>
                                <div class="revSmall-H-Line"></div>
                            </div>
                            <div id="${revEditStoreItemTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal">EDiT</div>
                        </div>
                    </div>
                    <div class="revFlexContainer revStoreItemObjectItemDetailsContainer">
                        <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper revCenterTxtVertically revStoreItemDetailsWrapper">
                            <div class="revSmalllBold revStoreItemDetailsWrapperTtl">nAmE : </div>
                            <div class="revStoreItemDetailsWrapperVal">${revEntityName}</div>
                        </div>
                        <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper revCenterTxtVertically revStoreItemDetailsWrapper">
                            <div class="revSmalllBold revStoreItemDetailsWrapperTtl">Shipping : </div>
                            <div class="revStoreItemDetailsWrapperVal">${revShipping}</div>
                        </div>
                        <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper revCenterTxtVertically revStoreItemDetailsWrapper">
                            <div class="revSmalllBold revStoreItemDetailsWrapperTtl">Delivery : </div>
                            <div class="revStoreItemDetailsWrapperVal">Estimated between Thu. Sep. 17 and Mon. Oct. 5</div>
                        </div>
                        <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper revCenterTxtVertically revStoreItemDetailsWrapper">
                            <div class="revSmalllBold revStoreItemDetailsWrapperTtl">Returns : </div>
                            <div class="revStoreItemDetailsWrapperVal">
                                <div class="revFlexContainer">
                                    <div>${revReturns}</div>
                                    <div class="revTabLink revFontSiteBlueTxtColor revStoreItemDetailsReturnPolicyDetails">See Details</div>
                                </div>
                            </div>
                        </div>
                        <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper revCenterTxtVertically revStoreItemDetailsWrapper">
                            <div class="revSmalllBold revStoreItemDetailsWrapperTtl">Condition : </div>
                            <div class="revStoreItemDetailsWrapperVal">${revItemCondition}</div>
                        </div>
                        ${await revGetEntityMediaView()}
                    </div>
                </div>
            </div>
        </div>
        <div id="${revOtherStoreItemsListed_Id}" class="revFlexWrapper revOtherStoreItemsWrapper"></div>
    </div>
    `;
};

module.exports.revPageViewWidget = revPageViewWidget;
