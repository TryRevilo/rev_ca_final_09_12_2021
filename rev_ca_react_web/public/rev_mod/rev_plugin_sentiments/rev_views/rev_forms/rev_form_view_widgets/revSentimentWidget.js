var revFormViewWidget = async (revVarArgs) => {
    let revSustomSentimentsPageHeader = window.revPageHeader("Create Custom Sentiments");

    let revEmotionName = window.revInputText({
        "revId": "revEmotionName",
        "revIcon": '<i class="far fa-user"></i>',
        "revTitle": "Sentiment Name",
        "revPlaceholderText": ". . .",
    });

    let revEmotionFormSubmitTab = window.revFormSubmitTab({
        "revId": "revEmotionFormSubmitTab",
        "revIcon": '<i class="fa fa-arrow-right"></i>',
        "revTitle": "Save Sentiment",
        "revSubmitCallback": () => {
            console.log("SAVE FEELING!");
        },
    });

    let revAdView = `
            <div class="revFlexContainer revCustomSentimentsSaveContainer">
                <div class="revFontSiteGreyTxtColor revFontSizeNormal revCustomSentimentsTell">Create your own custom sentiments</div>

                <div class="revFlexContainer revCustomSentimentsKeysContainer">
                    <div class="revSmalllBold revSentimentKeyText">Key</div>
                    
                    <div class="revFlexContainer revCustomSentimentsKey">
                        <div class="revFlexContainer">
                            <div class="revFlexWrapper revKeyTopWrapperArea">
                                <div class="revFontSiteBlueTxtColor revCustomSentimentsKeySign"><i class="fas fa-plus"></i></div>
                                <div class="revFontSiteBlueTxtColor revFontSizeNormal revCustomSentimentsKeyVal">Positive</div>
                            </div>
                            <div class="revFlexContainer revKeyFooterArea">
                                <div class="revFontSiteGreyTxtColor revFontSizeNormal revSentimentKeyTell">
                                    Sentiments with positive emotions. They are compounded at Higher scores than Negative emotions
                                </div>
                                <div class="revFontSiteGreyTxtColor revSentimentKeyExamples">
                                    <span class="revSmalllBold"><span>Examples : </span><span class="revFontSizeNormalItalic">Good, Hot, Enlightened, Better, OK, High</span>
                                </div>
                                <div class="revFontSiteGreyTxtColor revFontSizeNormal revSentimentKeyCompounding">
                                    Positive sentiments are compunded at 22. Each positive vote by a user will be <span class="revSmalllBold">( 1 * 22 )</span>
                                </div>
                            </div>
                        </div>

                        <div class="revDivider revGrey_H_Rule"></div>
                    </div>

                    <div class="revFlexContainer revCustomSentimentsKey">
                        <div class="revFlexContainer">
                            <div class="revFlexWrapper revKeyTopWrapperArea">
                                <div class="revFontSiteBlueTxtColor revCustomSentimentsKeySign"><i class="far fa-minus-square"></i></div>
                                <div class="revFontSiteBlueTxtColor revFontSizeNormal revCustomSentimentsKeyVal">Negative</div>
                            </div>
                            <div class="revFlexContainer revKeyFooterArea">
                                <div class="revFontSiteGreyTxtColor revFontSizeNormal revSentimentKeyTell">
                                    Sentiments with Negative emotions. They are compounded at Lower scores than Positive emotions    
                                </div>
                                <div class="revFontSiteGreyTxtColor revSentimentKeyExamples">
                                    <span class="revSmalllBold">Examples : </span><span class="revFontSizeNormalItalic">Bad, Cold, Worse, Low</span>
                                </div>
                                <div class="revFontSiteGreyTxtColor revFontSizeNormal revSentimentKeyCompounding">
                                    <span>Positive sentiments are compunded at 3. Each positive vote by a user will be </span><span class="revSmalllBold">( 1 * 3 )</span>
                                </div>
                            </div>
                        </div>

                        <div class="revDivider revGrey_H_Rule"></div>
                    </div>

                    <div class="revFlexContainer revCustomSentimentsKey">
                        <div class="revFlexContainer">
                            <div class="revFlexWrapper revKeyTopWrapperArea">
                                <div class="revFontSiteBlueTxtColor revCustomSentimentsKeySign"><i class="far fa-dot-circle"></i></div>
                                <div class="revFontSiteBlueTxtColor revFontSizeNormal revCustomSentimentsKeyVal">Neutral</div>
                            </div>
                            <div class="revFlexContainer revKeyFooterArea">
                                <div class="revFontSiteGreyTxtColor revFontSizeNormal revSentimentKeyCompounding">
                                    <span>Neutral sentiments are compunded at 7. Each Neutral vote by a user will be <span class="revSmalllBold">( 1 * 7 )</span>
                                </div>
                            </div>
                        </div>

                        <div class="revDivider revGrey_H_Rule"></div>
                    </div>
                </div>

                <div class="revFlexContainer revActiveSentiments">
                    <div class="revSmalllBold revActiveSentimentsTtl">Active Sentiments</div>
                    <div class="revFlexContainer revActiveSentimentsContainer">
                        <div class="revFlexWrapper revActiveSentimentItemWrapper">
                            <div class="revFontSiteBlueTxtColor revActiveSentimentItemName">Good</div>
                            <div class="revFontSiteGreyTxtColor revFontSizeNormal revActiveSentimentTypeIcon">( <i class="fas fa-plus"></i> )</div>
                            <div class="revActiveSentimentOptionsWrapper">
                                <div class="revFontSiteBlueTxtColor revActiveSentimentStatus">Delete</div>
                            </div>
                        </div>

                        <div class="revFlexWrapper revActiveSentimentItemWrapper">
                            <div class="revFontSiteBlueTxtColor revActiveSentimentItemName">Bad</div>
                            <div class="revFontSiteGreyTxtColor revFontSizeNormal revActiveSentimentTypeIcon">( <i class="far fa-minus-square"></i> )</div>
                            <div class="revActiveSentimentOptionsWrapper">
                                <div class="revFontSiteBlueTxtColor revActiveSentimentStatus">Delete</div>
                            </div>
                        </div>

                        <div class="revFlexWrapper revActiveSentimentItemWrapper">
                            <div class="revFontSiteBlueTxtColor revActiveSentimentItemName">Neutral</div>
                            <div class="revFontSiteGreyTxtColor revFontSizeNormal revActiveSentimentTypeIcon">( <i class="far fa-dot-circle"></i> )</div>
                            <div class="revActiveSentimentOptionsWrapper">
                                <div class="revFontSiteBlueTxtColor revActiveSentimentStatus">Delete</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="revFlexContainer revEmotionForm">
                    <div class="revFlexWrapper revEmotionFormBody">
                        <div class="revEmotionNameInputArea">${revEmotionName}</div>
                        <div class="revFlexWrapper revEmotionSentimentsWrapper">
                            <div class="revFlexContainer revSentimentCheckContainer">
                                <div class="revCustomSentimentsInputKeySign"><i class="fas fa-plus"></i></div>
                                <div class="revSentimentCheckBox">
                                    <label class="revFlexContainer revCheckboxContainer">
                                        <input type="checkbox">
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                            </div>

                            <div class="revFlexContainer revSentimentCheckContainer">
                                <div class="revCustomSentimentsInputKeySign"><i class="far fa-minus-square"></i></div>
                                <label class="revFlexContainer revCheckboxContainer">
                                    <input type="checkbox">
                                    <span class="checkmark"></span>
                                </label>
                            </div>

                            <div class="revFlexContainer revSentimentCheckContainer">
                                <div class="revCustomSentimentsInputKeySign"><i class="far fa-dot-circle"></i></div>
                                <div class="revSentimentCheckBox">
                                    <label class="revFlexContainer revCheckboxContainer">
                                        <input type="checkbox">
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="revFormFooter">
                    ${revEmotionFormSubmitTab}
                    </div>
                </div>
            </div>
            `;

    /** PAGE OWNER MENU AREA OPTIONS */
    let revUserOptionsMenuArea = await window.revGetMenuArea("revActivityItemsListingView", revVarArgs);
    let revPageViewPageNavHeader = await window.revGetLoadedPageView("revPageViewPageNavHeader", null);

    return `
    <div class="revFlexContainer">
        ${revSustomSentimentsPageHeader}

        <div class="revFlexContainer revPageHeaderAreaContainer_SentimentsForm">
            ${revPageViewPageNavHeader}
        </div>
        <div class="revFlexWrapper">${revUserOptionsMenuArea}</div>
        ${revAdView}
    </div>
    `;
};

module.exports.revFormViewWidget = revFormViewWidget;
