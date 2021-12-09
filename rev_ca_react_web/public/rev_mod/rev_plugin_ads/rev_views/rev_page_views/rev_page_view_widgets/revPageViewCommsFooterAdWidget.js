var revPageViewWidget = async (revVarArgs) => {
    let revAd = revVarArgs;
    let revAdPicsAlbum = revAd._revEntityChildrenList[0];

    if (!revAdPicsAlbum) {
        return;
    }

    let revAdPublisherFullNames = window.revGetMetadataValue(revAd._revEntityMetadataList, "rev_ad_publisher_full_names_value");
    let revAdCampaignDetails = window.revGetMetadataValue(revAd._revEntityMetadataList, "rev_ad_campaign_value");

    window.revSetInterval("revPublisherNames", () => {
        document.getElementById("revPublisherNames").innerHTML = revAdPublisherFullNames;
    });

    window.revSetInterval("revAdDescription", () => {
        document.getElementById("revAdDescription").innerHTML = window.revTruncateString(revAdCampaignDetails, 135);
    });

    let revAdPublisherIconURL = window.revGetMetadataValue(revAdPicsAlbum._revEntityChildrenList[0]._revEntityMetadataList, "rev_remote_file_name");
    revAdPublisherIconURL = window.REV_UPLOAD_FILES_DIR_PATH + "/" + revAdPublisherIconURL;

    let revBannerIconURL = window.revGetMetadataValue(revAdPicsAlbum._revEntityChildrenList[1]._revEntityMetadataList, "rev_remote_file_name");
    revBannerIconURL = window.REV_UPLOAD_FILES_DIR_PATH + "/" + revBannerIconURL;

    window.revSetInterval("revPublisherIconContainer", () => {
        document.getElementById("revPublisherIconContainer").innerHTML = `<img class="revListingUserIconBlock" src="${revAdPublisherIconURL}" />`;
    });

    window.revSetInterval("revAdBanner", () => {
        document.getElementById("revAdBanner").innerHTML = `<img class="revListingUserIconBlock" src="${revBannerIconURL}" />`;
    });

    let revNewAdTab_Id = "revNewAdTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revNewAdTab_Id, () => {
        document.getElementById(revNewAdTab_Id).addEventListener("click", async (event) => {
            let revNewAdForm = await window.revGetForm("revAd", window.REV_LOGGED_IN_ENTITY);
            window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revNewAdForm, "revFloatingOptionsMenuName": "123" });
        });
    });

    window.revSetInterval("revAdAreaAdItem", () => {
        document.getElementById("revAdAreaAdItem").addEventListener("click", (event) => {
            console.log("AD Clicked");
        });
    });

    let revRetPageView = () => {
        return `
        <div class="revPosRelative revFlexContainer revAdAreaContainer">
            <div class="revFlexWrapper">
                <div class="revPosAbsolute rev_vl_H_MainAdAreaFooter"></div>
                <div class="revAdHeaderIconTab">Ad</div>
                <div id="${revNewAdTab_Id}" class="revTabLink revAdHeaderIconTab revNewAdTab"><span><i class="fa fa-plus"></i></span></div>
            </div>
            <div id="revAdAreaAdItem" class="revTabLink revFlexContainer">
                <div id="revAdBanner" class="revAdBanner"></div>
                <div class="revFlexWrapper revAdPublisherWrapper">
                    <div id="revPublisherIconContainer" class="revPublisherIconContainer"></div>
                    <div class="revFlexContainer revPublisherRightDetailsContainer">
                        <div id="revAdDescription" class="revFontSiteGreyTxtColor revFontSizeSmall revAdDescription_CommsFooter"></div>
                        <div class="revHorizontalBorder"></div>
                        <div id="revPublisherNames" class="revFontSiteGreyTxtColor revFontSizeSmall revPublisherNames"></div>
                    </div>
                </div>
            </div>
        </div>
        `;
    };

    return revRetPageView();
};

module.exports.revPageViewWidget = revPageViewWidget;
