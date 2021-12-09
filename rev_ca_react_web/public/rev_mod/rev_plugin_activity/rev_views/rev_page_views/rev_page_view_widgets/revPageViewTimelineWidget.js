var revPageViewWidget = async (revVarArgs) => {
    let revLoggedInEntityGUID = window.REV_LOGGED_IN_ENTITY_GUID;

    if (revVarArgs && revVarArgs.revPageOwnerGUID) {
        revLoggedInEntityGUID = revVarArgs.revPageOwnerGUID;
    }

    let revGetLoadingView = (revItemsCount) => {
        if (!revItemsCount) {
            revItemsCount = " itEms";
        } else {
            revItemsCount = ` ~ ${revItemsCount} itEms`;
        }

        return `
        <div class="revFlexWrapper revTimelineLoadingWrapper">
            <div class="revFlexWrapper revTimelineLoadingBlinkersWrapper">${window.revColouredBlinkers()}</div>
            <div class="revFontSiteGreyTxtColor revFontSizeNormal revTimelineLoadingTxt">LOADING ${revItemsCount}</div>
        </div>
        `;
    };

    let revTimelineContainer_Id = "revTimelineContainer_Id_" + window.revGenUniqueId();

    window.revSetInterval(revTimelineContainer_Id, () => {
        document.getElementById(revTimelineContainer_Id).innerHTML = revGetLoadingView();
    });

    let revLoadTimelineArea = async () => {
        let revTimelineContainerEntityGUID = -1;

        if (revVarArgs && revVarArgs._remoteRevEntityGUID) {
            revTimelineContainerEntityGUID = revVarArgs._remoteRevEntityGUID;
        }

        let revTimelineEntities;
        let revSentimentsArr;
        let revEntityPublishersArr = [];

        let revSentimentsPosts_Id = "revSentimentsPosts_Id_" + window.revGenUniqueId();

        let revTimelinePreTimelineHookView = "";

        try {
            let revURL = window.REV_SITE_BASE_PATH + "/rev_api?" + "rev_logged_in_entity_guid=" + revLoggedInEntityGUID + "&rev_entity_guid=" + revTimelineContainerEntityGUID + "&revPluginHookContextsRemoteArr=revHookRemoteReadTimelineEntities";

            let revData = await window.revGetServerData_JSON_Async(revURL);

            window.revAdsArr = revData.revAdsArr;

            if (revData.revTimelineEntities) {
                revTimelineEntities = revData.revTimelineEntities;
            }

            revSentimentsArr = revData.revSentimentsArr;

            document.getElementById(revTimelineContainer_Id).innerHTML = revGetLoadingView(revTimelineEntities.length);

            for (let i = 0; i < revData.revEntityPublishersArr.length; i++) {
                let revPubObject = revData.revEntityPublishersArr[i];

                if (revPubObject) {
                    revEntityPublishersArr.push(revPubObject);
                }
            }

            /** START REV CALL PLUGINS */
            if (revData.revEntityPlugins && revData.revEntityPlugins.length > 0) {
                revTimelinePreTimelineHookView = await window.revInitPluginHookHandlers("revTimelinePreTimelineHook", revData.revEntityPlugins, revVarArgs);

                if (revTimelinePreTimelineHookView) {
                    revTimelinePreTimelineHookView = `<div class="revFlexContainer revTimelinePluginViewsContainer">${revTimelinePreTimelineHookView}</div>`;
                }
            }
            /** END REV CALL PLUGINS */
        } catch (error) {
            console.log("ERR -> revPageViewTimelineWidget.js -> !revData" + error);
        }

        let revTimelineChildrenViewsArr = [];

        if (revTimelineContainerEntityGUID > 0 && Array.isArray(revSentimentsArr)) {
            for (let i = 0; i < revSentimentsArr.length; i++) {
                let revPublisher = window.revGetPublisherEntity(revEntityPublishersArr, revSentimentsArr[i]._revEntityOwnerGUID);

                if (!revPublisher) {
                    let revrevURLPublisher = window.REV_SITE_BASE_PATH + "/rev_api/get_entity_single?remote_rev_entity_guid=" + revSentimentsArr[i]._revEntityOwnerGUID;

                    try {
                        let revDataPublisher = await window.revGetServerData_JSON_Async(revrevURLPublisher);
                        revPublisher = revDataPublisher.filter;
                        revPublisher = revPublisher[0];
                    } catch (error) {
                        console.log("ERR -> revPageViewTimelineWidget.js -> revPublisher -> " + error);
                    }
                }

                revSentimentsArr[i]["revPublisherEntity"] = revPublisher;
            }

            try {
                let revContextTimelineItem = await revDownloadContextView("revContextTimeline", "revSentiments", revSentimentsArr);

                if (revContextTimelineItem) {
                    revTimelineChildrenViewsArr.push(`<div id="${revSentimentsPosts_Id}" class="revFlexContainer revContextTimelineItemContainer">${revContextTimelineItem}</div>`);
                }
            } catch (error) {
                console.log("ERR -> revPageViewTimelineWidget.js -> revContextTimelineItem -> " + error);
            }
        }

        let revAdsArr = [];

        if (Array.isArray(window.revAdsArr)) {
            revAdsArr = window.revAdsArr;
        }

        let revCurrAdIndex = 0;
        let revTrueItInt = 0;
        let revTrueItCurrInt = 0;

        let revGetRevEntity = (revEntitiesArr, revEntityGUID) => {
            let revArrEntity;

            for (let i = 0; i < revEntitiesArr.length; i++) {
                if (revEntitiesArr[i] && revEntitiesArr[i]._remoteRevEntityGUID == revEntityGUID) {
                    revArrEntity = revEntitiesArr[i];
                    break;
                }
            }

            return revArrEntity;
        };

        let revCurrAdGUID = -1;

        for (let i = 0; i < revTimelineEntities.length; i++) {
            let revTimelineEntity = revTimelineEntities[i];

            if (!revTimelineEntity._revEntitySubType) {
                continue;
            }

            if (revTimelineEntity._revEntitySubType.localeCompare("rev_ad") == 0) {
                continue;
            }

            let revProps = { "revEntity": revTimelineEntity, "revEntityPublishersArr": revEntityPublishersArr };

            let revOverrideView = await window.revGetLoadedOverrideView(revTimelineEntity._revEntitySubType, revProps);

            if (!revOverrideView) {
                continue;
            }

            let revEntityOptionsMenuArea = await window.revGetMenuAreaView("revListingItemOptionsMenuArea", revTimelineEntity);

            let revActivityViewListItemWrapper = `
                <div class="revFlexContainer revActivityViewListItemWrapperStyle">
                    <div class="revFlexContainer">${revOverrideView}</div>
                    <div class="revTabLink revFontSiteBlueTxtColor revFontSizeMedium revFlexContainer revPosAbsolute revFlexContainer revActivityViewListItemWrapperStyle_Control">${revEntityOptionsMenuArea}</div>
                </div>
            `;

            revTimelineChildrenViewsArr.push(revActivityViewListItemWrapper);

            if (revAdsArr.length > 0 && i % 5 == 0) {
                if (revCurrAdIndex > revAdsArr.length - 1) {
                    revCurrAdIndex = 0;
                }

                let revAd = revAdsArr[revCurrAdIndex];

                if (revAd && revCurrAdGUID == revAd._remoteRevEntityGUID) {
                    for (let a = 0; a < revAdsArr.length; a++) {
                        if (revCurrAdGUID != revAdsArr[a]._remoteRevEntityGUID) {
                            revAd = revAdsArr[a];
                        }
                    }
                }

                let revAdContextView = await revDownloadContextView("revTimelineView", "revAd", { "revAd": revAd, "revId": i });

                if (revAdContextView) {
                    let revAdView_id = "revAdViewId_" + window.revGenUniqueId() + i;
                    revTimelineChildrenViewsArr.push(`<div id="${revAdView_id}" class="revFlexContainer">${revAdContextView}</div>`);

                    revCurrAdGUID = revAd._remoteRevEntityGUID;

                    ++revCurrAdIndex;
                }
            }

            let revCurr = revTimelineEntities[revTrueItCurrInt];

            let revPublisher = revGetRevEntity(revEntityPublishersArr, revCurr._revEntityOwnerGUID);

            if (!revPublisher) {
                let revrevURLPublisher = window.REV_SITE_BASE_PATH + "/rev_api/get_entity_single?remote_rev_entity_guid=" + revCurr._revEntityOwnerGUID;

                let revDataPublisher = await window.revGetServerData_JSON_Async(revrevURLPublisher);
                revPublisher = revDataPublisher.filter;
            }

            if (revTrueItInt % 2 == 0 || revTrueItInt == revTimelineEntities.length - 1) {
                try {
                    let revContextTimelineItem = await revDownloadContextView("revContextTimeline", "revKiwi", {
                        "revEntity": revCurr,
                        "revPublisher": revPublisher,
                        "revPublisherEntitiesArr": revEntityPublishersArr,
                    });

                    if (revContextTimelineItem) {
                        revTimelineChildrenViewsArr.push(`<div class="revFlexContainer">${revContextTimelineItem}</div>`);
                    }
                } catch (error) {
                    console.log("ERROR -> revContextTimelineItem -> " + error);
                }
            }

            revTrueItInt++;
            revTrueItCurrInt = i;
        }

        if (revTrueItInt > 0 && revTimelineContainerEntityGUID && revTimelineContainerEntityGUID > 0) {
            let revContextTimelineSentimentSave = await revDownloadContextForm("revContextTimeline", "revSentiment", revVarArgs);

            let revSentimentSaveView_Id = "revSaveSentimentViewId_" + window.revGenUniqueId();
            revTimelineChildrenViewsArr.push(`<div id="${revSentimentSaveView_Id}" class="revFlexContainer revTimelineSentimentSaveContainer">${revContextTimelineSentimentSave}</div>`);
        }

        window.revSetInterval(revSentimentsPosts_Id, () => {
            if (revTrueItInt < 1) {
                document.getElementById(revSentimentsPosts_Id).remove();
            }
        });

        if (!Array.isArray(revTimelineEntities) || revTimelineEntities.length < 1) {
            let revNoPostsTxt = "No Posts on tHis pRoFiLE BOARD YET";

            if (window.REV_LOGGED_IN_ENTITY_GUID == revTimelineContainerEntityGUID) {
                revNoPostsTxt = "No Posts From your connEcTioNs YET";
            }

            if (document.getElementById(revTimelineContainer_Id)) {
                document.getElementById(revTimelineContainer_Id).innerHTML = `
                ${revTimelinePreTimelineHookView}
                <div class="revFontSiteGreyTxtColor revFontSizeNormal revNoPostsView">${revNoPostsTxt}</div>
                `;
            }
        } else {
            if (document.getElementById(revTimelineContainer_Id)) {
                document.getElementById(revTimelineContainer_Id).innerHTML = revTimelinePreTimelineHookView + revTimelineChildrenViewsArr.join("");
            }
        }
    };

    window.revSetInterval(revTimelineContainer_Id, () => {
        revLoadTimelineArea();
    });

    return `<div id="${revTimelineContainer_Id}" class="revFlexContainer"></div>`;
};

module.exports.revPageViewWidget = revPageViewWidget;
