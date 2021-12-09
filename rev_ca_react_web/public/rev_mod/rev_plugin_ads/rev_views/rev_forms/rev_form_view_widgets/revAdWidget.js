var revFormViewWidget = async (revVarArgs) => {
    let revEntity = revVarArgs;

    let revAdPublisherIcon;
    let revAdBannerIcon;

    /** REV START HEADER AREA */
    let revPageViewPageNavHeader = await window.revGetLoadedPageView("revPageViewPageNavHeader", { "revDafaultPagePagination": true });
    let revUserOptionsMenuArea = await window.revGetMenuArea("revActivityItemsListingView", window.REV_LOGGED_IN_ENTITY);
    let revPageHeader = window.revPageHeader("cREATE NEw AD");
    /** REV END HEADER AREA */

    let revInputAdCompanyName_Id = "revInputAdCompanyName_Id_" + window.revGenUniqueId();

    let revCompanyName = window.revInputText({
        "revId": revInputAdCompanyName_Id,
        "revIcon": '<i class="far fa-user"></i>',
        "revTitle": "Publisher Full Names",
        "revPlaceholderText": ". . .",
    });

    let revSubmitAdTab_Id = "revSubmitAdTab_Id_" + window.revGenUniqueId();

    let revFormSubmitTab = window.revFormSubmitTab({
        "revId": revSubmitAdTab_Id,
        "revIcon": '<i class="fa fa-arrow-right"></i>',
        "revTitle": "Next",
        "revSubmitCallback": async () => {
            let revFormAdSettings = await window.revGetForm("revFormAdSettings", revSaveAdEntity());
            window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revFormAdSettings, "revFloatingOptionsMenuName": "revAd" });
        },
    });

    let revReadFileToImage = (revFile, revIconClass, callback) => {
        var reader = new FileReader();
        reader.onload = function (e) {
            let revBannerImage = `
            <img class="${revIconClass}" src="${e.target.result}" />
            `;

            callback(revBannerImage);
        };

        reader.readAsDataURL(revFile); // convert to base64 string
    };

    /* START REV PUBLISHER ICON SELECT */
    let revAdPublisherIconVarArgs = {};
    revAdPublisherIconVarArgs.revFilesSelectedCallback = (revSelectedFiles) => {
        revAdPublisherIcon = revSelectedFiles[0];

        revReadFileToImage(revSelectedFiles[0], "revListingUserIconBlock", (revImageFromFile) => {
            document.getElementById("revPublisherIconSelectDraw").innerHTML = revImageFromFile;
        });
    };

    revAdPublisherIconVarArgs.revSelectFileId = "revBannerIconSelectId";

    let revFileExplorerMenuItem = await window.revGetMenuItem("revMenuItemFileExplorerTab", revAdPublisherIconVarArgs);
    /* END REV PUBLISHER ICON SELECT */

    /* START REV AD BANNER ICON SELECT */
    let revAdBannerIconPassVarArgs = {};
    revAdBannerIconPassVarArgs.revFilesSelectedCallback = (revSelectedFiles) => {
        revAdBannerIcon = revSelectedFiles[0];

        revReadFileToImage(revSelectedFiles[0], "revListingUserIconBlock", (revImageFromFile) => {
            document.getElementById("revBannerIconSelectDraw").innerHTML = revImageFromFile;
        });
    };

    revAdBannerIconPassVarArgs.revSelectFileId = "revPublisherIconSelectId";

    let revAdBannerFileExplorerMenuItem = await window.revGetMenuItem("revMenuItemFileExplorerTab", revAdBannerIconPassVarArgs);

    let revAdDetailsArea_Id = "revAdDetailsArea_Id_" + window.revGenUniqueId();

    let revTextingQuill;

    window.revSetInterval(revAdDetailsArea_Id, () => {
        revTextingQuill = window.revNewQuill(revAdDetailsArea_Id, "Ad Campaign details");
    });

    let revDefaultBanner = window.REV_DEFAULT_APP_FILES_DIR_PATH + "/pexels-henry-&-co-1939485.jpg";

    let revUploadAdcons = async (revUploadVarArgs, revContainerEntityGUID) => {
        if (!revUploadVarArgs || !revContainerEntityGUID || revContainerEntityGUID < 1) return;

        let revFileObjectsArr = [];

        if (revUploadVarArgs.revAdPublisherFileIconFile) {
            let revAdPublisherFileIconFile = revUploadVarArgs.revAdPublisherFileIconFile;
            let revRemotePublisherIconFile = window.revSetNewRemoteFile(revAdPublisherFileIconFile);

            let revFileSubtype = window.revGetFileObjectSubType(revAdPublisherFileIconFile);
            let revAdPublisherFileObject = window.revSetFileObject(revFileSubtype, -1, revRemotePublisherIconFile.name);

            let revFilePublisherMetadataVal = window.REV_ENTITY_METADATA_STRUCT();
            revFilePublisherMetadataVal._revMetadataName = "rev_ad_publisher_icon";
            revFilePublisherMetadataVal._metadataValue = "rev_ad_publisher_icon";

            revAdPublisherFileObject._revEntityMetadataList.push(revFilePublisherMetadataVal);

            revAdPublisherFileObject._revEntityGUID = 0;

            revFileObjectsArr.push({ "revFileObject": revAdPublisherFileObject, "revFileItem": revRemotePublisherIconFile });
        }

        if (revUploadVarArgs.revAdBannerFileIconFile) {
            let revAdBannerFileIconFile = revUploadVarArgs.revAdBannerFileIconFile;
            let revRemoteBannerIconFile = window.revSetNewRemoteFile(revAdBannerFileIconFile);

            let revFileSubtype = window.revGetFileObjectSubType(revAdBannerFileIconFile);
            let revAdBannerFileObject = window.revSetFileObject(revFileSubtype, -1, revRemoteBannerIconFile.name);

            let revFileAdBannerMetadataVal = window.REV_ENTITY_METADATA_STRUCT();
            revFileAdBannerMetadataVal._revMetadataName = "rev_ad_banner_icon";
            revFileAdBannerMetadataVal._metadataValue = "rev_ad_banner_icon";

            revAdBannerFileObject._revEntityMetadataList.push(revFileAdBannerMetadataVal);

            revAdBannerFileObject._revEntityGUID = 1;

            revFileObjectsArr.push({ "revFileObject": revAdBannerFileObject, "revFileItem": revRemoteBannerIconFile });
        }

        if (revFileObjectsArr.length < 1) return;

        window.revLoadModules("revPluginModulePicsAlbumPers", (revScriptModule) => {
            window.revPluginModulePicsAlbumPers.createPicsAlbum_FileObjects({ "revEntityContainerGUID": revContainerEntityGUID, "revFileObjectsArr": revFileObjectsArr }, (revResStatus) => {
                console.log("FIN : revIcons : " + JSON.stringify(revResStatus));
            });
        });
    };

    let revSaveAdEntity = () => {
        let revAdEntity = window.REV_ENTITY_STRUCT();
        revAdEntity._remoteRevEntityGUID = -1;
        revAdEntity._revEntityResolveStatus = 0;
        revAdEntity._revEntityType = "revObject";
        revAdEntity._revEntitySubType = "rev_ad";
        revAdEntity._revEntityOwnerGUID = revEntity._remoteRevEntityGUID;
        revAdEntity._revEntityChildableStatus = 3;
        revAdEntity._revTimeCreated = new Date().getTime();

        let revAdPublisherFullNamesInputVal = document.getElementById(revInputAdCompanyName_Id).value;

        let revAdPublisherFullNamesMetadata = window.REV_ENTITY_METADATA_STRUCT();
        revAdPublisherFullNamesMetadata._revMetadataName = "rev_ad_publisher_full_names_value";
        revAdPublisherFullNamesMetadata._metadataValue = revAdPublisherFullNamesInputVal;
        revAdPublisherFullNamesMetadata.revMetadataOwnerGUID = revAdEntity._remoteRevEntityGUID;

        let revAdCampaignRawVal = revTextingQuill.getText();

        let revAdCampaignRawValMetadata = window.REV_ENTITY_METADATA_STRUCT();
        revAdCampaignRawValMetadata._revMetadataName = "rev_ad_campaign_value";
        revAdCampaignRawValMetadata._metadataValue = revAdCampaignRawVal;
        revAdCampaignRawValMetadata.revMetadataOwnerGUID = revAdEntity._remoteRevEntityGUID;

        let revAdEntityMetadataList = [revAdPublisherFullNamesMetadata, revAdCampaignRawValMetadata];

        revAdEntity._revEntityMetadataList = revAdEntityMetadataList;

        // await window.revPostServerData(window.REV_CREATE_NEW_AD_REV_ENTITY_URL, { filter: [revAdEntity] }, async (revRetData) => {
        //     let revRetRemoteEntityGUID = revRetData.filter[0]._remoteRevEntityGUID;
        //     revAdEntity._remoteRevEntityGUID = revRetRemoteEntityGUID;

        //     await revUploadAdcons({ "revAdPublisherFileIconFile": revAdPublisherIcon, "revAdBannerFileIconFile": revAdBannerIcon }, revRetRemoteEntityGUID);
        // });

        return revAdEntity;
    };

    let revAdView = `
    <div class="revFlexContainer">
        <div class="revFlexContainer revPageHeaderAreaContainer">
            <div class="revFlexWrapper revPageViewTitledPageNavHeaderWrapper_AdForm">${revPageViewPageNavHeader}</div>
            <div class="revFlexWrapper revUserOptionsMenuAreaWrapper_AdForm">${revUserOptionsMenuArea}</div>
            ${revPageHeader}
        </div>
        <div class="revFlexContainer revNewAdWidgetContainer">
            ${revCompanyName}
            <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper revSelectPublisherIconWrapper">
                <div class="revFlexWrapper revSelectPublisherIconWrapper">
                    <div class="revPublisherIconText">Publisher icon</div>
                    <div class="revPublisherIconSelect">${revFileExplorerMenuItem}</div>
                </div>
                <div id="revPublisherIconSelectDraw" class="revPublisherIconSelectDraw"></div>
            </div>
            <div class="revAdDetailsArea">
                <div id="${revAdDetailsArea_Id}" class="revQuillPubArea"></div>
            </div>
            <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexContainer">
                <div class="revFlexWrapper revSelectPublisherIconWrapper">
                    <div class="revPublisherIconText">Ad Banner icon</div>
                    <div class="revPublisherIconSelect">${revAdBannerFileExplorerMenuItem}</div>
                </div>

                <div id="revBannerIconSelectDraw" class="revBannerIconSelectDraw">
                    <img class="revListingUserIconBlock" src="${revDefaultBanner}" />
                </div>
            </div>
            <div class="revAdFormFooter">
                ${revFormSubmitTab}
            </div>
        </div>
    </div>
    `;

    return revAdView;
};

module.exports.revFormViewWidget = revFormViewWidget;
