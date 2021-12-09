var revFormViewWidget = async (revVarArgs) => {
    if (!revVarArgs) {
        return;
    }

    let revCheckedSentimentVal;

    let revSentimentTextingQuill;

    let revFormSubmitTab = window.revFormSubmitTab({
        "revId": "revSubmitAdDetailsTab",
        "revIcon": '<i class="fa fa-arrow-right"></i>',
        "revTitle": "Save Sentiment",
        "revSubmitCallback": () => {
            /** START REV SENTIMENT */
            let revPersSentimentEntity = window.REV_ENTITY_STRUCT();
            revPersSentimentEntity._remoteRevEntityGUID = -1;
            revPersSentimentEntity._revEntityResolveStatus = 0;
            revPersSentimentEntity._revEntityChildableStatus = 3;
            revPersSentimentEntity._revEntityType = "revObject";
            revPersSentimentEntity._revEntitySubType = "rev_sentiment";
            revPersSentimentEntity._revEntityOwnerGUID = window.REV_LOGGED_IN_ENTITY_GUID;
            revPersSentimentEntity._revEntityContainerGUID = revVarArgs._remoteRevEntityGUID;
            revPersSentimentEntity._revEntityChildableStatus = 3;
            revPersSentimentEntity._revTimeCreated = new Date().getTime();
            /** END REV SENTIMENT */

            /** REV START SENTIMENT FEELING VAL */
            if (revCheckedSentimentVal) {
                revPersSentimentEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_sentiment_val", revCheckedSentimentVal));
            }
            /** REV END SENTIMENT FEELING VAL */

            /** REV START SENTIMENT DESC */
            let revPersEntityDesc = revSentimentTextingQuill.getText();

            if (revPersEntityDesc) {
                revPersSentimentEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_entity_desc", revPersEntityDesc));
            }
            /** REV END SENTIMENT DESC */

            /** REV START SENTIMENT HTML DESC */
            let revPersEntityDescHTML = revSentimentTextingQuill.root.innerHTML;

            if (revPersEntityDescHTML) {
                revPersSentimentEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_entity_desc_html", revPersEntityDescHTML));
            }
            /** REV END SENTIMENT HTML DESC */

            if (window.revStringEmpty(revCheckedSentimentVal) && window.revStringEmpty(revPersEntityDesc)) {
                console.log("EMPTY");
            } else {
                window.revPostServerData(window.REV_CREATE_NEW_REV_ENTITY_URL, { filter: [revPersSentimentEntity] }, (revRetData) => {
                    console.log("revRetData : " + JSON.stringify(revRetData));
                });
            }
        },
    });

    let revSentimentPubAreaId = "revSentimentPubAreaId";

    window.revSetInterval(revSentimentPubAreaId, () => {
        revSentimentTextingQuill = window.revNewQuill(revSentimentPubAreaId, " . . .", { "revQuillTollBarVisible": false });
    });

    let revSentimentsItemsWrapper_Id = "revSentimentsItemsWrapper_Id" + window.revGenUniqueId();

    window.revSetInterval(revSentimentsItemsWrapper_Id, () => {
        let revCheckBoxesArr = [];

        let revSentimentOptions = ["Good", "Bad", "Neutral"];
        let revSentimentOptionsWrapper = [];

        /** REV START CONSTRUCT SENTIMENT HTML */
        let revNewSentimentViewHTMLConst = (revOption) => {
            let revCheckBoxCallback = (revCBVarArgs) => {
                let revCheckBoxChecked = revCBVarArgs.revCheckBoxChecked;
                let revCurrCheckBoxId = revCBVarArgs.revCheckBoxId;

                let revCheckedCBIndex = window.revCheckBoxesToggler({ "revCheckBoxesArr": revCheckBoxesArr, "revCheckedCheckBoxId": revCurrCheckBoxId });

                if (revCheckedCBIndex >= 0) {
                    revCheckedSentimentVal = revSentimentOptions[revCheckedCBIndex];
                } else {
                    revCheckedSentimentVal = null;
                }
            };

            let revSentimentCB_Id = "revSentimentCB_Id_" + window.revGenUniqueId();
            revCheckBoxesArr.push(revSentimentCB_Id);

            let revCBVarArgs = {
                "revCheckBoxCallback": revCheckBoxCallback,
                "revCheckBoxId": revSentimentCB_Id,
            };

            let revSentimentCheckBox = window.revGetCheckBox(revCBVarArgs);

            return `
            <div class="revFlexWrapperFit revSentimentOptionWrapper">
                ${revSentimentCheckBox}
                <div class="revFontSiteBlueTxtColor revFontSizeNormal revSentimentOptionText">${revOption}</div>
            </div>
            `;
        };
        /** REV END CONSTRUCT SENTIMENT HTML */

        for (let i = 0; i < revSentimentOptions.length; i++) {
            revSentimentOptionsWrapper.push(revNewSentimentViewHTMLConst(revSentimentOptions[i]));
        }

        let revOwnerName = window.revGetMetadataValue(revVarArgs._revInfoEntity._revEntityMetadataList, "rev_entity_full_names_value");

        let revInlineRightPoiterTxtTopTxtSentiments = window.revInlineRightPoiterTxtTopTxt(`Let ${revOwnerName} know your thoughts on posts on their profile`);

        let revItem = `
        <div class="revFlexContainer revSentimentsSaveContainer">
            ${revInlineRightPoiterTxtTopTxtSentiments}
            <div class="revFlexContainer revSentimentsInputArea">
                <div class="revFlexWrapper">${revSentimentOptionsWrapper.join("")}</div>
                <div class="revFlexContainer revSentimentsCommentsContainer">
                    <div class="revFontSiteGreyTxtColor revFontSizeNormal revSentimentsCommentsText"><span class="revSmalllBoldBlue revFontSizeMedium">( Optional )</span> more of your sentiments in text below</div>

                    <div class="revSentimentPubArea">
                        <div id="${revSentimentPubAreaId}"></div>
                    </div>
                
                    <div class="revSaveSentimentFooter">${revFormSubmitTab}</div>
                </div>
            </div>
        </div>
        `;

        document.getElementById(revSentimentsItemsWrapper_Id).innerHTML = revItem;
    });

    return `
    <div class="revFlexContainer">
        <div class="revSmalllBold revSentimentsContextFormTtlTxt">Your Sentiments</div>
        <div id="${revSentimentsItemsWrapper_Id}" class="revFlexWrapper revSentimentsItemsWrapper"></div>
    </div>
    `;
};

module.exports.revFormViewWidget = revFormViewWidget;
