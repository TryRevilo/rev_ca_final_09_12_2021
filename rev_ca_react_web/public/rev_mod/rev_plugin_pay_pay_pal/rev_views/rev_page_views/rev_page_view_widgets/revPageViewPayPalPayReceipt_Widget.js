var revPageViewWidget = async (revVarArgs) => {
    let revStoreEntityChilds = revVarArgs._revEntityChildrenList;

    let revPicsAlbum = window.revGetEntityChildren_By_Subtype(revStoreEntityChilds, "rev_pics_album", 1);

    let revGetEntityMediaView = async () => {
        let revEntityPicsAlbumOverrideView = "";

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

        if (revEntityPicsAlbumOverrideView) {
            revMediaKiwiView = `
            <div class="revFlexContainer revPayPalReceiptMediaContainer">
                ${revEntityPicsAlbumOverrideView}
                ${revImagesRemainder}
            </div>
            `;
        }

        return revMediaKiwiView;
    };

    /** REV START REV STORE ITEM DETAILS */
    let revMaxStrLen = 57;

    let revStoreItemEntityMetadataList = revVarArgs._revEntityMetadataList;

    revStoreItemEntityName = window.revGetMetadataValue(revStoreItemEntityMetadataList, "rev_entity_name");
    revStoreItemEntityName = window.revGetRawHTML(revStoreItemEntityName);
    revStoreItemEntityName = window.revTruncateString(revStoreItemEntityName, revMaxStrLen);
    /** REV END REV STORE ITEM DETAILS */

    let revStoreItemTab_Id = "revStoreItemTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revStoreItemTab_Id, () => {
        document.getElementById(revStoreItemTab_Id).addEventListener("click", async (event) => {
            let revObjectStoreItem = await window.revGetLoadedPageView("revObjectStoreItem", revVarArgs);
            window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revObjectStoreItem, "revFloatingOptionsMenuName": "123" });
        });
    });

    let revPaymentBrief = `
        <div class="revFlexWrapper revPaymentBriefContainer revPPalPaymentArea">
            <div class="revFlexContainer revPPalPaymentBriefLeftContainer">
                <div class="revFlexContainer">
                    <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper">
                        <span class="revPPalPaymentBoldTxt">Payment sent to</span>&nbsp;John Doe's Test Store
                    </div>
                </div>
                <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper revPPalPaymentBriefDate_TransActionId_Wrapper revPPalPaymentRowWrapper">
                    <div class="revPPalPaymentBriefDate">31 March 2021 at 3:22:16 AM GMT-7</div>
                    <div class="revSmall-H-Line"></div>
                    <div class="revPPalPaymentBriefTransActionId">ID : 7GH28969JJ087252Y</div>
                </div>
                <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper revPPalPaymentRowWrapper">
                    <div>Payment Status :</div>
                    <div class="revFontSizeSmall revPPalPaymentBriefPaymentStatus">compLEted</div>
                </div>
                <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper revPPalPaymentRowWrapper">
                    <div>Payment Type :</div>
                    <div class="revRightDetailsTxt">Checkout</div>
                </div>
            </div>
            <div class="revFlexContainer revPPalGrossAmtContainer">
                <div class="revFontSiteGreyTxtColor revFontSizeNormal">Gross</div>
                <div class="revFontSiteGreyTxtColor revFontSizeLarge revPPalBriefGrossAmt">-$1.35 USD</div>
            </div>
        </div>
    `;

    let revShippingAddress = `
        <div class="revFlexContainer revPPalPaymentAreaUnBordered">
            <div class="revFontSizeNormalHeader">Shipping address</div>
            <div class="revFlexContainer">
                <div class="revFontSiteGreyTxtColor revFontSizeNormal revPPalPaymentRowWrapper">Rev Store Buyer</div>
                <div class="revFontSiteGreyTxtColor revFontSizeNormal revPPalPaymentRowInnerWrapper">6448 - 00100</div>
                <div class="revFontSiteGreyTxtColor revFontSizeNormal revPPalPaymentRowInnerWrapper">Nairobi, Nairobi 00100</div>
                <div class="revFontSiteGreyTxtColor revFontSizeNormal revPPalPaymentRowInnerWrapper">Kenya</div>
                <div class="revFontSiteGreyTxtColor revFontSizeNormal revPPalPaymentRowInnerWrapper">254-346-6336</div>
            </div>
        </div>
    `;

    let revOrderDetails = `
        <div class="revFlexContainer revPPalOrderDetailsContainer">
            <table class="revOrderDetails">
                <thead class="revPPalPaymentTableHeaderHighlighted">
                    <tr>
                        <th class="revFontSiteGreyTxtColor revFontSizeNormal revTableHeaderTell">Order details</th>
                        <th class="revFontSiteGreyTxtColor revFontSizeNormal revTableHeaderTxt">Quantity</th>
                        <th class="revFontSiteGreyTxtColor revFontSizeNormal revTableHeaderTxt">Price</th>
                        <th class="revFontSiteGreyTxtColor revFontSizeNormal revTableHeaderTxt">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="revPPalPaymentTRBorderedBottom">
                        <td class="revTableHeaderTxt"></td>
                        <td class="revFontSiteGreyTxtColor revFontSizeNormal revOrderDetailsTd">1</td>
                        <td class="revFontSiteGreyTxtColor revFontSizeNormal revOrderDetailsTd">$1.35 USD</td>
                        <td class="revFontSiteGreyTxtColor revFontSizeNormal revOrderDetailsTd">$1.35 USD</td>
                    </tr>
                    <tr>
                        <td class="revTableHeaderTxt"></td>
                        <td class="revFontSiteGreyTxtColor revFontSizeNormal revOrderDetailsTd"></td>
                        <td class="revFontSiteGreyTxtColor revFontSizeNormal revOrderDetailsTd">Purchase Total</td>
                        <td class="revFontSiteGreyTxtColor revFontSizeNormal revOrderDetailsTd">$1.35 USD</td>
                    </tr>
                    <tr class="revPPalPaymentTRBorderedTop">
                        <td class="revTableHeaderTxt"></td>
                        <td class="revFontSiteGreyTxtColor revFontSizeNormal revOrderDetailsTd"></td>
                        <td class="revFontSiteGreyTxtColor revFontSizeNormal revOrderDetailsTd">Funding Source</td>
                        <td class="revFontSiteGreyTxtColor revFontSizeNormal revOrderDetailsTd">PayPal Account</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;

    let revPaymentDetails = `
        <div class="revFlexContainer revPPalOrderDetailsContainer">
            <table class="revOrderDetails">
                <thead class="revPPalPaymentTableHeaderHighlighted">
                    <tr>
                        <th class="revFontSiteGreyTxtColor revFontSizeNormal revTableHeaderTell">Your Payment</th>
                        <th class="revFontSiteGreyTxtColor revFontSizeNormal revTableHeaderTxt"></th>
                        <th class="revFontSiteGreyTxtColor revFontSizeNormal revTableHeaderTxt"></th>
                        <th class="revFontSiteGreyTxtColor revFontSizeNormal revTableHeaderTxt"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="revPPalPaymentTRBorderedBottom">
                        <td class="revTableHeaderTxt"></td>
                        <td class="revFontSiteGreyTxtColor revFontSizeNormal revOrderDetailsTd"></td>
                        <td class="revFontSiteGreyTxtColor revFontSizeNormal revOrderDetailsTd">Purchase Total</td>
                        <td class="revFontSiteGreyTxtColor revFontSizeNormal revOrderDetailsTd">$1.35 USD</td>
                    </tr>
                    <tr>
                        <td class="revTableHeaderTxt"></td>
                        <td class="revFontSiteGreyTxtColor revFontSizeNormal revOrderDetailsTd"></td>
                        <td class="revFontSiteGreyTxtColor revFontSizeNormal revOrderDetailsTd">Sales Tax</td>
                        <td class="revFontSiteGreyTxtColor revFontSizeNormal revOrderDetailsTd">$0.00 USD</td>
                    </tr>
                    <tr>
                        <td class="revTableHeaderTxt"></td>
                        <td class="revFontSiteGreyTxtColor revFontSizeNormal revOrderDetailsTd"></td>
                        <td class="revFontSiteGreyTxtColor revFontSizeNormal revOrderDetailsTd">Shipping</td>
                        <td class="revFontSiteGreyTxtColor revFontSizeNormal revOrderDetailsTd">$0.00 USD</td>
                    </tr>
                    <tr>
                        <td class="revTableHeaderTxt"></td>
                        <td class="revFontSiteGreyTxtColor revFontSizeNormal revOrderDetailsTd"></td>
                        <td class="revFontSiteGreyTxtColor revFontSizeNormal revOrderDetailsTd">Handling</td>
                        <td class="revFontSiteGreyTxtColor revFontSizeNormal revOrderDetailsTd">$0.00 USD</td>
                    </tr>
                    <tr class="revPPalPaymentTRBorderedTop">
                        <td class="revTableHeaderTxt"></td>
                        <td class="revFontSiteGreyTxtColor revFontSizeNormal revOrderDetailsTd"></td>
                        <td class="revFontSiteGreyTxtColor revFontSizeNormal revOrderDetailsTd">Gross</td>
                        <td class="revFontSiteGreyTxtColor revFontSizeNormal revOrderDetailsTd">$0.00 USD</td>
                    </tr>
                    <tr class="revPPalPaymentTRBorderedTop">
                        <td class="revTableHeaderTxt"></td>
                        <td class="revFontSiteGreyTxtColor revFontSizeNormal revOrderDetailsTd"></td>
                        <td class="revFontSiteGreyTxtColor revFontSizeNormal revOrderDetailsTd">PayPal Fee</td>
                        <td class="revFontSiteGreyTxtColor revFontSizeNormal revOrderDetailsTd">$0.00 USD</td>
                    </tr>
                    <tr class="revPPalPaymentTRBorderedTop">
                        <td class="revTableHeaderTxt"></td>
                        <td class="revFontSiteGreyTxtColor revFontSizeNormal revOrderDetailsTd"></td>
                        <td class="revFontSiteGreyTxtColor revFontSizeNormal revOrderDetailsTd">Net</td>
                        <td class="revFontSiteGreyTxtColor revFontSizeNormal revOrderDetailsTd">$0.00 USD</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;

    let revStoreContactDetails = `
        <div class="revFlexContainer revPPalOrderDetailsContainer">
            <table class="revOrderDetails">
                <thead>
                    <tr class="revPPalPaymentTRBorderedTop">
                        <th class="revFontSiteGreyTxtColor revFontSizeNormal revTableHeaderLongTxt"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFontSizeNormal revOrderDetailsTd">https://www.example.com</td>
                    </tr>
                    <tr class="revPPalPaymentTRBorderedBottom">
                        <td class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFontSizeNormal revOrderDetailsTd">cs-sb-t4q5y5530508@business.example.com</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;

    /** REV START RESOLUTION */
    let revRequestResolutionTab_Id = "revRequestResolutionTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revRequestResolutionTab_Id, () => {
        document.getElementById(revRequestResolutionTab_Id).addEventListener("click", async (event) => {
            let revResolutionRequestForm = await window.revGetForm("revResolutionRequestForm", revVarArgs);
            window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revResolutionRequestForm, "revFloatingOptionsMenuName": "123" });
        });
    });

    let revPageView = `
        <div class="revFlexContainer">
            <div class="revFontSiteGreyTxtColor revFontSizeMedium revFlexWrapper revPPalReceiptHeader">Transaction details</div>
            ${revPaymentBrief}
            ${revShippingAddress}
            ${revOrderDetails}
            ${revPaymentDetails}
            ${revStoreContactDetails}
            <div id="${revRequestResolutionTab_Id}" class="revTabLink revFontSiteRedTxtColor revFontSizeNormal revRequestResolutionTab">rEQuest foR rEsoLutioN</div>
        </div>
    `;

    /** REV START HEADER AREA */
    let revHeaderTx = `
        <div class="revFlexContainer">
            ${await revGetEntityMediaView()}
            <div id="${revStoreItemTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revStoreItemEntityNameTxtPayPalReceiptWrapper">
                ${revStoreItemEntityName}
            </div>
        </div>
    `;

    let revPageViewPageNavHeader = await window.revGetLoadedPageView("revPageViewPageNavHeader", { revEntity: { "_revEntitySubType": "revSelectStore" } });
    let revUserOptionsMenuArea = await window.revGetMenuArea("revActivityItemsListingView", window.REV_LOGGED_IN_ENTITY);
    let revPageHeader = window.revPageHeader(revHeaderTx);
    /** REV END HEADER AREA */

    let revRetView = `
        <div class="revFlexContainer revPayPalReceiptWidgetPageViewContainer">
            <div class="revFlexContainer revPageHeaderAreaContainer">
                <div class="revFlexWrapper revPageViewTitledPageNavHeaderWrapper_AdForm">${revPageViewPageNavHeader}</div>
                <div class="revFlexWrapper revUserOptionsMenuAreaWrapper_AdForm">${revUserOptionsMenuArea}</div>
                ${revPageHeader}
            </div>
            <div class="revFlexContainer revPayPalReceiptWidgetContainer">
               ${revPageView}
            </div>
        </div>
    `;

    return revRetView;
};

module.exports.revPageViewWidget = revPageViewWidget;
