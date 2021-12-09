var revPageViewWidget = async (revVarArgs) => {
    try {
        let revURL = `${window.REV_SITE_BASE_PATH}/rev_api?rev_logged_in_entity_guid=${window.REV_LOGGED_IN_ENTITY_GUID}&revPluginHookContextsRemoteArr=revHookRemoteHandler_GetTrendingVids`;

        let revRetData = await window.revGetServerData_JSON_Async(revURL);

        let revVidsAlbumEntitiesArray = revRetData.revVidsAlbumEntitiesArray;
        let revPublishersArr = revRetData.revPublishersArr;

        let revVidsViewsArr = [];

        if (revVidsAlbumEntitiesArray.length) {
            for (let i = 0; i < revVidsAlbumEntitiesArray.length; i++) {
                let revCurr = revVidsAlbumEntitiesArray[i];

                if (window.revIsEmptyVar(revCurr)) {
                    continue;
                }

                if (revCurr._revEntitySubType.localeCompare("rev_vids_album") == 0) {
                    let revPublisher = window.revGetRevEntity_FROM_ARR_BY_GUID(revPublishersArr, revCurr._revEntityOwnerGUID);

                    if (!revPublisher) {
                        let revURLPublisher = window.REV_SITE_BASE_PATH + "/rev_api/get_entity_single?remote_rev_entity_guid=" + revCurr._revEntityOwnerGUID;

                        try {
                            let revDataPublisher = await window.revGetServerData_JSON_Async(revURLPublisher);
                            revPublisher = revDataPublisher.filter;
                            revPublisher = revPublisher[0];
                        } catch (error) {
                            console.log("ERR -> revPageViewCoreWidget.js -> revPublisher -> " + error);
                        }
                    }

                    let revVideo = window.revGetRevEntity_FROM_ARR_BY_GUID(revCurr._revContainerEntity._revEntityChildrenList, revCurr._remoteRevEntityGUID);

                    let revVidContextView = await revDownloadContextView("revSidebarTrending", "revVid", {
                        "revEntity": revVideo,
                        "_revContainerEntity": revCurr._revContainerEntity,
                        "revPublisher": revPublisher,
                    });

                    if (revVidContextView) {
                        revVidsViewsArr.push(revVidContextView);
                    }
                }
            }

            let revAd;

            for (let i = 0; i < window.revAdsArr.length; i++) {
                if (window.revAdsArr[i] && window.revAdsArr[i]._revEntityChildrenList[0]) {
                    revAd = window.revAdsArr[i];
                    break;
                }
            }

            let revPageViewCommsFooterAd = "";

            let revHeight = window.revGetPageHeight() * 0.62;

            if (revAd) {
                let revPageViewCommsFooterAdPageView = await window.revGetLoadedPageViewAreaContainer("revPageViewCommsFooterAd", revAd);

                if (revPageViewCommsFooterAdPageView) {
                    revPageViewCommsFooterAd = `<div class="revFlexContainer revPageViewCommsFooterAdPageViewContainer">${revPageViewCommsFooterAdPageView}</div>`;
                }
            }

            return `
                <div class="revFlexContainer revFlexContainerScroll" style="width: 100%; height: ${revHeight}px;  margin-bottom:1em;">
                    ${revVidsViewsArr.join("")}
                </div>
            `;
        }
    } catch (error) {
        console.log("ERR -> revPageViewCommsViewAreaTrendsWidget.js -> !revRetData" + error);
    }

    let revNullDataArea = `
    <div class="revFlexContainer revNoDataPageViewCommsFooterAdPageViewContainer">
        <div class="revFontSizeNormal revFontSiteGreyTxtColor">No Video Posts To Display</div>
    </div>`;

    return revNullDataArea;
};

module.exports.revPageViewWidget = revPageViewWidget;
