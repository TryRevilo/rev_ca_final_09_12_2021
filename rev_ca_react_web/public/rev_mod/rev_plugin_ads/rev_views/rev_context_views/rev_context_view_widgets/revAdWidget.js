var revPageViewWidget = async (revVarArgs) => {
    if (!revVarArgs || !revVarArgs.revAd || !revVarArgs.revId || !revVarArgs.revAd._remoteRevEntityGUID || revVarArgs.revAd._remoteRevEntityGUID < 1) {
        return;
    }

    let revAd = revVarArgs.revAd;
    let revId = revVarArgs.revId;

    let revAdPublisherFullNames = window.revGetMetadataValue(revAd._revEntityMetadataList, "rev_ad_publisher_full_names_value");
    let revAdCampaignDetails = window.revGetMetadataValue(revAd._revEntityMetadataList, "rev_ad_campaign_value");

    let revPublisherNames_Id = revId + "_revPublisherNames_Id_" + window.revGenUniqueId();
    window.revSetInterval(revPublisherNames_Id, () => {
        document.getElementById(revPublisherNames_Id).innerHTML = revAdPublisherFullNames;
    });

    let revAdDescription_Id = revId + "_revAdDescription_Id_" + window.revGenUniqueId();
    window.revSetInterval(revAdDescription_Id, () => {
        document.getElementById(revAdDescription_Id).innerHTML = window.revTruncateString(revAdCampaignDetails, 135);
    });

    let revPublisherIconContainer_Id = revId + "_revPublisherIconContainer_Id_" + window.revGenUniqueId();
    let revAdBanner_Id = revId + "_revAdBanner_Id_" + window.revGenUniqueId();

    if (revAd._revEntityChildrenList[0]) {
        let revAdPicsAlbum = revAd._revEntityChildrenList[0];

        let revAdPublisherIconURL = window.revGetMetadataValue(revAdPicsAlbum._revEntityChildrenList[0]._revEntityMetadataList, "rev_remote_file_name");
        revAdPublisherIconURL = window.REV_UPLOAD_FILES_DIR_PATH + "/" + revAdPublisherIconURL;

        let revBannerIconURL = window.revGetMetadataValue(revAdPicsAlbum._revEntityChildrenList[1]._revEntityMetadataList, "rev_remote_file_name");
        revBannerIconURL = window.REV_UPLOAD_FILES_DIR_PATH + "/" + revBannerIconURL;

        window.revSetInterval(revPublisherIconContainer_Id, () => {
            document.getElementById(revPublisherIconContainer_Id).innerHTML = `<img class="revListingUserIconBlock" src="${revAdPublisherIconURL}" />`;
        });

        window.revSetInterval(revAdBanner_Id, () => {
            document.getElementById(revAdBanner_Id).innerHTML = `<img class="revListingUserIconBlock" src="${revBannerIconURL}" />`;
        });
    }

    let revNewAdTab_Id = revId + "_revNewAdTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revNewAdTab_Id, () => {
        document.getElementById(revNewAdTab_Id).addEventListener("click", async (event) => {
            let revNewAdForm = await window.revGetForm("revAd", window.REV_LOGGED_IN_ENTITY);
            window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revNewAdForm, "revFloatingOptionsMenuName": "123" });
        });
    });

    let revAdAreaAdItem_Id = revId + "_revAdAreaAdItem_Id_" + window.revGenUniqueId();

    window.revSetInterval(revAdAreaAdItem_Id, () => {
        document.getElementById(revAdAreaAdItem_Id).addEventListener("click", (event) => {
            console.log("AD Clicked");
        });
    });

    let revDefaultBanner = window.REV_DEFAULT_APP_FILES_DIR_PATH + "/pexels-henry-&-co-1939485.jpg";

    let revRetPageView = async () => {
        return `
        <div class="revFlexContainer revTimelineAdAreaContainer">
            <div class="revPosRelative revFlexWrapper">
                <div class="vl_H"></div>
                <div class="revAdHeaderIconTab">Ad</div>
                <div id="${revNewAdTab_Id}" class="revTabLink revAdHeaderIconTab revNewAdTab"><span><i class="fa fa-plus"></i></span></div>
            </div>
            <div id="${revAdAreaAdItem_Id}" class="revTabLink revFlexContainer">
                <div id="${revAdBanner_Id}" class="revFlexContainer revTimelineAdBannerContainer">
                    <img class="revListingUserIconBlock" src="${revDefaultBanner}" />
                </div>
                <div class="revFlexWrapper revAdPublisherWrapper">
                    <div id="${revPublisherIconContainer_Id}" class="revTimelinePublisherIconContainer">
                        <img class="revListingUserIconBlock" src="${revDefaultBanner}" />
                    </div>
                    <div class="revFlexContainer revTimelinePublisherRightDetailsContainer">
                        <div id="${revAdDescription_Id}" class="revTimelineAdDescription"></div>
                        <div class="revHorizontalBorder"></div>
                        <div id="${revPublisherNames_Id}" class="revFontSiteDarkTxtColor revFontSizeNormal revPublisherNames"></div>
                    </div>
                </div>
            </div>
        </div>
        `;
    };

    return await revRetPageView();
};

module.exports.revPageViewWidget = revPageViewWidget;
