var revPluginOverrideViewWidget = async (revVarArgs) => {
    let revStoreItem = revVarArgs.revEntity;

    /** REV START PUBLISHER */
    if (!revVarArgs.revEntityPublishersArr) {
        let url = window.REV_SITE_BASE_PATH + "/rev_api/get_entity_single?remote_rev_entity_guid=" + revVarArgs.revEntity._revEntityOwnerGUID;

        let revData = await window.revGetServerData_JSON_Async(url);
        revData = revData.filter;
        revVarArgs["revEntityPublishersArr"] = revData;
    }

    let revEntityPublishersArr = revVarArgs.revEntityPublishersArr;

    let revPublisher = window.revGetPublisherEntity(revEntityPublishersArr, revStoreItem._revEntityOwnerGUID);

    if (!revPublisher || !revPublisher._remoteRevEntityGUID || !revPublisher._revInfoEntity || revPublisher._remoteRevEntityGUID < 1) {
        if (!revPublisher) {
            let revURLPublisher = window.REV_SITE_BASE_PATH + "/rev_api/get_entity_single?remote_rev_entity_guid=" + revStoreItem._revEntityOwnerGUID;

            try {
                let revDataPublisher = await window.revGetServerData_JSON_Async(revURLPublisher);
                revPublisher = revDataPublisher.filter;
                revPublisher = revPublisher[0];
            } catch (error) {
                console.log("ERR -> revStoreOverrideView_Widget.js -> revPublisher -> " + error);
            }
        }

        if (!revPublisher || !revPublisher._remoteRevEntityGUID || !revPublisher._revInfoEntity || revPublisher._remoteRevEntityGUID < 1) {
            console.log("!revPublisher || !revPublisher._remoteRevEntityGUID || !revPublisher._revInfoEntity || revPublisher._remoteRevEntityGUID < 1");
            return;
        }
    }

    let revPublisherInfo = revPublisher._revInfoEntity;

    let revPublisherName = window.revGetMetadataValue(revPublisherInfo._revEntityMetadataList, "rev_entity_full_names_value");
    let revPublisherNameTrim = revPublisherName.replace(/\s+/g, "");

    if (!revPublisherNameTrim) {
        return;
    }
    /** REV END PUBLISHER */

    /** REV START PUBLISHER ICON */
    let revPublisherIcon_Id = "revPublisherIcon_Id_" + window.revGenUniqueId();

    window.revSetInterval(revPublisherIcon_Id, () => {
        document.getElementById(revPublisherIcon_Id).addEventListener("click", function () {
            window.revUserIconClick(revPublisher._remoteRevEntityGUID);
        });

        window.revLoadUserIcon(revPublisher, revPublisherIcon_Id);
    });
    /** REV END PUBLISHER ICON */

    let revStoreEntityChilds = revStoreItem._revEntityChildrenList;

    let revPicsAlbum = window.revGetEntityChildren_By_Subtype(revStoreEntityChilds, "rev_pics_album", 1);

    let revGetEntityMediaView = async () => {
        let revEntityPicsAlbumOverrideView = "";

        let revEntityMediaView = "";

        if (revPicsAlbum) {
            let revPassVarArgsPicsAlbum = window.revCloneJsObject(revPicsAlbum);
            revPassVarArgsPicsAlbum["revAlbumPicsSize"] = "revListingUserIconBlock revImageItemStyle_Tiny";

            revEntityPicsAlbumOverrideView = await window.revGetLoadedOverrideView("rev_photo", revPassVarArgsPicsAlbum);
        }

        if (revEntityPicsAlbumOverrideView) {
            revEntityMediaView = revEntityPicsAlbumOverrideView;
        }

        return revEntityMediaView;
    };

    let revEntityMetadataList = revStoreItem._revEntityMetadataList;

    let revMaxStrLen = 57;

    let revEntityName = window.revGetMetadataValue(revEntityMetadataList, "rev_entity_name");
    revEntityName = window.revGetRawHTML(revEntityName);
    revEntityName = window.revTruncateString(revEntityName, revMaxStrLen);

    if (window.revIsEmptyVar(revEntityName)) {
        return null;
    }

    let revShipping = window.revGetMetadataValue(revEntityMetadataList, "rev_shipping");
    revShipping = window.revGetRawHTML(revShipping);
    revShipping = window.revTruncateString(revShipping, revMaxStrLen);

    let revEntityIconPath = window.revGetDefaultEntityIcon(revStoreItem);

    let revEditStoreItemTab_Id = "revEditStoreItemTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revEditStoreItemTab_Id, () => {
        document.getElementById(revEditStoreItemTab_Id).addEventListener("click", async (event) => {
            let revPassVarArgs = window.revCloneJsObject(revStoreItem);
            revPassVarArgs["revSelectedStore"] = { "_remoteRevEntityGUID": revStoreItem._revEntityContainerGUID };

            let revStoreForm = await window.revGetForm("revStoreItem", revPassVarArgs);
            window.revDrawMainContentArea({ "revData": revStoreItem, "revLoadedPageView": revStoreForm, "revFloatingOptionsMenuName": "123" });
        });
    });

    let revStoreItemOverrideViewItemDetails_Id = "revStoreItemOverrideViewItemDetails_Id_" + window.revGenUniqueId();

    window.revSetInterval(revStoreItemOverrideViewItemDetails_Id, () => {
        document.getElementById(revStoreItemOverrideViewItemDetails_Id).addEventListener("click", async (event) => {
            let revObjectStoreItem = await window.revGetLoadedPageView("revObjectStoreItem", revStoreItem);
            window.revDrawMainContentArea({ "revData": revStoreItem, "revLoadedPageView": revObjectStoreItem, "revFloatingOptionsMenuName": "123" });
        });
    });

    let revView = `
        <div class="revFlexWrapper revStoreItemOverrideViewWrapper">
            <div class="revStoreItemOverrideViewIcon">${window.revReadFileToImageFromURL(revEntityIconPath, "revListingIconCurvedSmall")}</div>
            <div class="revFlexContainer revStoreItemOverrideViewDetailsSummuryContainer">
                <div class="revFlexWrapper revStoreItemOverrideViewBuyOptionsWrapper">
                    <div class="revTabLink revSmalllBoldBlue revFontSizeNormal">$22.25</div>
                    <div class="revFlexWrapper revStoreItemOverrideViewBuyOptionsDividerWrapper">
                        <div class="revSmall-H-Line"></div>
                        <div class="revTiny-V-Line"></div>
                        <div class="revSmall-H-Line"></div>
                    </div>
                    <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal">Add To Cart</div>
                    <div class="revFlexWrapper revStoreItemOverrideViewBuyOptionsDividerWrapper">
                        <div class="revSmall-H-Line"></div>
                        <div class="revTiny-V-Line"></div>
                        <div class="revSmall-H-Line"></div>
                    </div>
                    <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal">Add To WachtList</div>
                    <div class="revFlexWrapper revStoreItemOverrideViewBuyOptionsDividerWrapper">
                        <div class="revSmall-H-Line"></div>
                        <div class="revTiny-V-Line"></div>
                        <div class="revSmall-H-Line"></div>
                    </div>
                    <div id="${revEditStoreItemTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal">EDiT</div>
                </div>
                <div id="${revStoreItemOverrideViewItemDetails_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexContainer revStoreItemOverrideViewItemDetailsContainer">${revEntityName}</div>
                ${await revGetEntityMediaView()}
                <div class="revFlexWrapper revQuestionListingItemPublisherInfoWrapper">
                    <div class="revFlexWrapper revQuestionByWrapper">
                        <div class="revFontSiteGreyTxtColor revFontSizeNormal revQuestionByPointerIcon"><i class="fas fa-level-up-alt revRotate90"></i></div>
                        <div class="revFontSiteGreyTxtColor revFontSizeNormal revQuestionByTxt">By</div>
                    </div>
                    <div class="revSmall-H-Line revQuestionListingItemPublisherInfoDivider"></div>
                    <div id="${revPublisherIcon_Id}" class="revTabLink revQuestionListingItemPublisherIcon"></div>
                    <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revQuestionListingItemPublisherNames">${revPublisherName}</div>
                    <div class="revTimeCreatedStyle revQuestionListingItemPubTime">${window.revFormatLongDate(revStoreItem._revTimePublished)}</div>
                </div>
            </div>
        </div>
    `;

    return revView;
};

module.exports.revPluginOverrideViewWidget = revPluginOverrideViewWidget;
