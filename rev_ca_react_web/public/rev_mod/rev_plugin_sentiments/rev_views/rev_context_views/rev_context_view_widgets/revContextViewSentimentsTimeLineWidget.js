var revPageViewWidget = async (revVarArgs) => {
    let stringConstructor = "test".constructor;
    let arrayConstructor = [].constructor;
    let objectConstructor = {}.constructor;

    let revJsObjectType = (revJsObject) => {
        if (revJsObject === null) {
            return "null";
        }
        if (revJsObject === undefined) {
            return "undefined";
        }
        if (revJsObject.constructor === stringConstructor) {
            return "String";
        }
        if (revJsObject.constructor === arrayConstructor) {
            return "Array";
        }
        if (revJsObject.constructor === objectConstructor) {
            return "Object";
        }

        return "don't know";
    };

    let revGetSentimentObject = (revEntitySentiment) => {
        let revSentimentRetObject;

        let revSentimentObjectsArr = [
            {
                "revNameId": "revGood",
                "revDisplayName": "Good",
                "revScaleColor": "#689F38",
                "revSentimenCount": 1.5,
                "revCompounding": 10,
            },
            {
                "revNameId": "revBad",
                "revDisplayName": "Bad",
                "revScaleColor": "#F57C00",
                "revSentimenCount": 2,
                "revCompounding": 3,
            },
            {
                "revNameId": "revNuter",
                "revDisplayName": "Neutral",
                "revScaleColor": "#D1C4E9",
                "revSentimenCount": 1,
                "revCompounding": 12,
            },
        ];

        let revSentimentVal = "Neutral";

        let revObjectType = revJsObjectType(revEntitySentiment);

        if (revObjectType.localeCompare("String") !== 0) {
            revSentimentVal = window.revGetMetadataValue(revEntitySentiment._revEntityMetadataList, "rev_sentiment_val");
        }

        if (window.revStringEmpty(revSentimentVal)) {
            return revSentimentRetObject;
        }

        for (let i = 0; i < revSentimentObjectsArr.length; i++) {
            let revSentimentObject = revSentimentObjectsArr[i];

            if (!revSentimentObject) {
                continue;
            }

            if (revSentimentObject.revDisplayName.localeCompare(revSentimentVal) == 0) {
                revSentimentRetObject = revSentimentObject;
                break;
            }
        }

        return revSentimentRetObject;
    };

    let revDrawSentimentsScaleBar = (revSentimentsEntities) => {
        let revSentimentsJSONArr = [];

        let revTotalSentiments = 1;

        let revAddedSentimentOwnersGUIDsArr = [];

        if (!revSentimentsEntities || !revSentimentsEntities.length) {
            let revSentimentObject = revGetSentimentObject("Neutral");

            if (revSentimentObject) {
                revSentimentsJSONArr.push(revSentimentObject);
            }
        } else {
            for (let i = 0; i < revSentimentsEntities.length; i++) {
                let revOwnerEntityGUID = revSentimentsEntities[i]._revEntityOwnerGUID;

                if (!revOwnerEntityGUID || revAddedSentimentOwnersGUIDsArr.includes(revOwnerEntityGUID)) {
                    continue;
                }

                let revSentimentObject = revGetSentimentObject(revSentimentsEntities[i]);

                if (!revSentimentObject) {
                    continue;
                }

                revAddedSentimentOwnersGUIDsArr.push(revOwnerEntityGUID);
                revSentimentsJSONArr.push(revSentimentObject);
            }

            for (let i = 0; i < revSentimentsJSONArr.length; i++) {
                revTotalSentiments = revTotalSentiments + revSentimentsJSONArr[i].revSentimenCount * revSentimentsJSONArr[i].revCompounding;
            }
        }

        let revSentimentsItemsViewsArr = [];

        if (revSentimentsJSONArr.length < 3) {
            revSentimentsJSONArr.push(revGetSentimentObject("Neutral"));
            revSentimentsJSONArr.push(revGetSentimentObject("Good"));
            revSentimentsJSONArr.push(revGetSentimentObject("Good"));
        }

        for (let i = 0; i < revSentimentsJSONArr.length; i++) {
            let revSentiment = revSentimentsJSONArr[i];
            let revSentimentAverage = ((revSentiment.revSentimenCount * revSentiment.revCompounding) / revTotalSentiments) * 100;

            revSentimentsItemsViewsArr.push(`<div style="width: ${revSentimentAverage}em; height: 0.1em; background-color: ${revSentiment.revScaleColor};"></div>`);
        }

        if (revSentimentsItemsViewsArr.length < 1) {
            return "";
        }

        return `<div class="revFlexWrapper">${revSentimentsItemsViewsArr.join("")}</div>`;
    };

    let revSentimentUsers = (revSentimentEntity) => {
        if (!revSentimentEntity) {
            return null;
        }

        let revPublisherEntity;

        if (revSentimentEntity.revPublisherEntity) {
            revPublisherEntity = revSentimentEntity.revPublisherEntity;
        } else {
            return null;
        }

        if (!revPublisherEntity) {
            return null;
        }

        let revSentimentObject = revGetSentimentObject(revSentimentEntity);

        if (!revSentimentObject) {
            return null;
        }

        let revPublisherEntityName = window.revGetMetadataValue(revPublisherEntity._revInfoEntity._revEntityMetadataList, "rev_entity_full_names_value");
        revPublisherEntityName = revPublisherEntityName.split(" ");
        revPublisherEntityName = revPublisherEntityName[0];

        if (window.revStringEmpty(revPublisherEntityName)) {
            return null;
        }

        let revUserIconPath = window.revGetEntityIcon(revPublisherEntity);
        revUserIconPath = window.REV_UPLOAD_FILES_DIR_PATH + "/" + revUserIconPath;

        let revPublisherIcon_Id = "revPublisherIcon_Id_" + window.revGenUniqueId();

        let revDateToday = "";
        let revDayMs = 24 * 60 * 60 * 1000;
        let revPubDatelong = Number(revSentimentEntity._revTimePublished);
        let revDateSinceEpoch = new Date().getTime();
        let revPubDateDiff = revDateSinceEpoch - revPubDatelong;

        if (revPubDateDiff < revDayMs) {
            revDateToday = "todAy";
        } else {
            revDateToday = "+24hrs";
        }

        window.revSetInterval(revPublisherIcon_Id, () => {
            document.getElementById(revPublisherIcon_Id).addEventListener("click", (event) => {
                window.revUserIconClick(revPublisherEntity._remoteRevEntityGUID);
            });

            window.revLoadModules("revPluginModuleUserProfileFunctions", (revScriptModule) => {
                let revProfileIconPath = window.revPluginModuleUserProfileFunctions.revGetUserIconPath(revPublisherEntity._revInfoEntity);
                revProfileIconPath = window.REV_UPLOAD_FILES_DIR_PATH + "/" + revProfileIconPath;

                let revProfileIconView = `<img class="revListingUserIconBlock" src="${revProfileIconPath}" onerror="this.onerror=null;this.src='${window.REV_DEFAULT_USER_ICON_PATH}';">`;

                document.getElementById(revPublisherIcon_Id).innerHTML = revProfileIconView;
            });
        });

        return `
            <div class="revFlexContainer revSentimentUserContainer">
                <div id="${revPublisherIcon_Id}" class=" revTabLink revSentimentUserIcon"></div>
                <div class="revFlexContainer revSentimentUserDetailsContainer">
                    <div class="revSmalllBoldBlue">${revPublisherEntityName}</div>
                    <div class="revFontSiteGreyTxtColor revSentimentVal" style="background-color:${revSentimentObject.revScaleColor};"></div>
                    <div class="revFontSiteLightGreyTxtColor revFontSizeNormal revPubSentimentDate">${revDateToday}</div>
                </div>
            </div>
        `;
    };

    let revSentimentsPublishersIconsTabsWrapper = () => {
        let revSentimentUsersArr = [];

        if (revVarArgs && revVarArgs.length) {
            for (let i = 0; i < revVarArgs.length; i++) {
                let revSentUser = revSentimentUsers(revVarArgs[i]);

                if (revSentUser) {
                    revSentimentUsersArr.push(revSentUser);
                }
            }
        }

        if (!revSentimentUsersArr || revSentimentUsersArr.length < 1) {
            return "";
        }

        return `<div class="revFlexWrapper revFlexWrapperScroll revSentimentsPublishersIconsTabsWrapper">${revSentimentUsersArr.join("")}</div>`;
    };

    // 0725 099 810

    let revSentimentsCommentsView = () => {
        let revSentimentsCommentsViewsArr = [];

        if (!revVarArgs || !revVarArgs.length) {
            return `<div class="revNoSentimentComments"></div>`;
        }

        for (let i = 0; i < revVarArgs.length; i++) {
            if (!revVarArgs[i] || !revVarArgs[i].revPublisherEntity) {
                continue;
            }

            let revSentimentEntity = revVarArgs[i];
            let revPublisherEntity = revSentimentEntity.revPublisherEntity;

            let revPublisherEntityName = window.revGetMetadataValue(revPublisherEntity._revInfoEntity._revEntityMetadataList, "rev_entity_full_names_value");

            if (window.revStringEmpty(revPublisherEntityName)) {
                continue;
            }

            let revSentimentComment = window.revGetMetadataValue(revSentimentEntity._revEntityMetadataList, "rev_entity_desc");

            if (window.revStringEmpty(revSentimentComment)) {
                continue;
            }

            let revSentimentCommentUserIcon_Id = "revSentimentCommentUserIcon_Id_" + window.revGenUniqueId();

            window.revSetInterval(revSentimentCommentUserIcon_Id, () => {
                document.getElementById(revSentimentCommentUserIcon_Id).addEventListener("click", (event) => {
                    window.revUserIconClick(revPublisherEntity._remoteRevEntityGUID);
                });

                window.revLoadModules("revPluginModuleUserProfileFunctions", (revScriptModule) => {
                    let revProfileIconPath = window.revPluginModuleUserProfileFunctions.revGetUserIconPath(revPublisherEntity._revInfoEntity);
                    revProfileIconPath = window.REV_UPLOAD_FILES_DIR_PATH + "/" + revProfileIconPath;

                    let revProfileIconView = `<img class="revListingIconCurvedTiny" src="${revProfileIconPath}" onerror="this.onerror=null;this.src='${window.REV_DEFAULT_USER_ICON_PATH}';">`;

                    document.getElementById(revSentimentCommentUserIcon_Id).innerHTML = revProfileIconView;
                });
            });

            let revSentimentCommentUserName_Id = "revSentimentCommentUserName_Id_" + window.revGenUniqueId();

            window.revSetInterval(revSentimentCommentUserName_Id, () => {
                document.getElementById(revSentimentCommentUserName_Id).addEventListener("click", (event) => {
                    window.revUserIconClick(revPublisherEntity._remoteRevEntityGUID);
                });
            });

            revSentimentsCommentsViewsArr.push(`
                    <div class="revFlexWrapper revSentimentsPublishersIconsTabsWrapperHoverable">
                        <div id="${revSentimentCommentUserIcon_Id}" class="revTabLink revSentimentCommentUserIcon"></div>
                        <div class="revFlexContainer revSentimentItemBodyContainer">
                            <div class="revFlexWrapper">
                                <div id="${revSentimentCommentUserName_Id}" class="revTabLink revSmalllBoldBlue">${revPublisherEntityName}</div>
                                <div class="revTimeCreatedStyle revSentimentTimeCreated">${window.revFormatLongDate(revSentimentEntity._revTimePublished)}</div>
                            </div>
                            <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper revSentimentCommentValWrapper">${revSentimentComment}</div>
                        </div>
                    </div>
            `);
        }

        if (revSentimentsCommentsViewsArr.length > 0) {
            let revRecItemListingsCalArea = `
            <div class="revFlexContainer revTimelineSentimentCommentsContainer">
                <!--
                <div class="revSmalllBold revFlexWrapper revSentimentsCommentsTtlHeaderWrapper">
                    <div>sENtimEnt comments</div>
                    <div class="revSentimentsCommentsTtlHeaderPointer"><i class="fas fa-level-down-alt"></i></div>
                </div>
                -->
                <div class="revFlexContainer">${revSentimentsCommentsViewsArr.join("")}</div>
                <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revMoreSentimentsCommentsTab">moRE sEntimEnT commENts</div>
            </div>
            `;

            return revRecItemListingsCalArea;
        } else {
            return `<div class="revNoSentimentComments"></div>`;
        }
    };

    /** REV START HEADER AREA */
    let revAddNewSentimentId = "revAddNewSentimentId_" + window.revGenUniqueId();

    window.revSetInterval(revAddNewSentimentId, () => {
        document.getElementById(revAddNewSentimentId).addEventListener("click", async (event) => {
            let revSentimentForm = await window.revGetForm("revSentiment", window.REV_LOGGED_IN_ENTITY);
            window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revSentimentForm, "revFloatingOptionsMenuName": "123" });
        });
    });
    /** REV STOP HEADER AREA */

    let revComposeMintFormArea = `
    <div class="revFlexContainer revTimelineSentimentsContainer">
        <div class="revFlexContainer revMintPublisherFormContainer">
            <div class="revFlexWrapper revMintPublishersWrapper">
                <div id="${revAddNewSentimentId}" class="revTabLink revFlexWrapper revMintPublisherFormHeaderTabWrapper">
                    <div class="revSmallFooterBorder"></div>
                    <div class="revFontSiteBlueTxtColor revFontSizeNormal revSentimentsPublisherFormHeaderTab"><i class="fa fa-plus"></i></div>
                    <div class="revSmallFooterBorder"></div>
                </div>
                <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revAbtSentimentsFormTab">aBouT sentiments</div>
            </div>
            <div class="revFlexWrapper revSentimentsScaleBarWrapper">${revDrawSentimentsScaleBar(revVarArgs)}</div>
            ${revSentimentsPublishersIconsTabsWrapper()}
        </div>
        ${revSentimentsCommentsView()}
    </div>
    `;

    return revComposeMintFormArea;
};

module.exports.revPageViewWidget = revPageViewWidget;
