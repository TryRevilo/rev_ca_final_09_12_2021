var revPluginOverrideViewWidget = async (revVarArgs) => {
    if (!revVarArgs || !revVarArgs.revEntity || !revVarArgs.revEntity._remoteRevEntityGUID) {
        console.log("ERR -> revFamilyKiwiOverrideView_Widget -> !revVarArgs || !revVarArgs.revEntity || !revVarArgs.revEntity._remoteRevEntityGUID");
        return;
    }

    let revFamilyKiwiEntity = revVarArgs.revEntity;

    /** REV START PUBLISHER */
    if (!revVarArgs.revEntityPublishersArr) {
        let url = window.REV_SITE_BASE_PATH + "/rev_api/get_entity_single?remote_rev_entity_guid=" + revFamilyKiwiEntity._revEntityOwnerGUID;

        let revData = await window.revGetServerData_JSON_Async(url);
        revData = revData.filter;
        revVarArgs["revEntityPublishersArr"] = revData;
    }

    let revEntityPublisher = window.revGetPublisherEntity(revVarArgs.revEntityPublishersArr, revFamilyKiwiEntity._revEntityOwnerGUID);

    let revPublisherInfo = revEntityPublisher._revInfoEntity;

    let revOwnerName = window.revGetMetadataValue(revPublisherInfo._revEntityMetadataList, "rev_entity_full_names_value");
    let revOwnerNameTrim = revOwnerName.replace(/\s+/g, "");

    if (!revOwnerNameTrim) {
        return;
    }
    /** REV END PUBLISHER */

    let revPretty_Id = "revPretty_Id_" + window.revGenUniqueId();

    window.revSetInterval(revPretty_Id, () => {
        prettyPrint();
    });

    let revFamilyKiwiVal = window.revGetMetadataValue(revFamilyKiwiEntity._revInfoEntity._revEntityMetadataList, "rev_entity_desc_html");
    revFamilyKiwiVal = revFamilyKiwiVal.replaceAll(`<pre class="ql-syntax" spellcheck="false">`, `<pre id="${revPretty_Id}" class="ql-syntax prettyprint" spellcheck="false">`);

    if (!revFamilyKiwiVal) {
        return;
    }

    let revKiwiValTrim = revFamilyKiwiVal.replace(/\s+/g, "");

    if (revKiwiValTrim.length <= 3) {
        return;
    }

    /** REV START PUBLISHER ICON */
    let revPublisherIcon_Id = "revPublisherIcon_Id_" + window.revGenUniqueId();

    window.revSetInterval(revPublisherIcon_Id, () => {
        document.getElementById(revPublisherIcon_Id).addEventListener("click", function () {
            window.revUserIconClick(revEntityPublisher._remoteRevEntityGUID);
        });

        window.revLoadUserIcon(revEntityPublisher, revPublisherIcon_Id);
    });
    /** REV END PUBLISHER ICON */

    /** REV START ENTITY MEDIA */

    let revGetMediaKiwiView = async (revParentEntity) => {
        let revTimelineEntityChilds = revParentEntity._revEntityChildrenList;

        let relAlbum = window.revGetEntityChildren_By_Subtype(revTimelineEntityChilds, "rev_pics_album", 1);
        let revVidsAlbum = window.revGetEntityChildren_By_Subtype(revTimelineEntityChilds, "rev_vids_album", 1);

        let revKiwiPicsAlbumOverrideView = "";
        let revKiwiVidsAlbumOverrideView = "";

        let revMediaKiwiView = "";

        let revImagesRemainder = "";

        if (relAlbum) {
            let revPassVarArgs = window.revCloneJsObject(relAlbum);
            revPassVarArgs["revAlbumPicsSize"] = "revListingUserIconBlock revImageItemStyle_Small";

            revKiwiPicsAlbumOverrideView = await window.revGetLoadedOverrideView("rev_photo", revPassVarArgs);

            let revImagesCount = relAlbum._revEntityChildrenList.length;

            if (revImagesCount > 13) {
                revImagesRemainder = `<div class="revImagesCount">+${revImagesCount - 13} moRE pics</div>`;
            }
        }

        if (revVidsAlbum) {
            revKiwiVidsAlbumOverrideView = await window.revGetLoadedOverrideView("revVideosListingOverrideView", revVidsAlbum);
        }

        if (revKiwiPicsAlbumOverrideView || revKiwiVidsAlbumOverrideView) {
            revMediaKiwiView = `
            <div class="revFlexContainer revMediaKiwi">
                ${revKiwiPicsAlbumOverrideView}
                ${revKiwiVidsAlbumOverrideView}
                ${revImagesRemainder}
            </div>
            `;
        }

        return revMediaKiwiView;
    };
    /** REV END ENTITY MEDIA */

    let revRetView = `
        <div class="revFlexContainer revTranslateSuggestionItemContainer">
            <div class="revFlexWrapper revTranslateSuggestionPublisherWrapper">
                <div id="${revPublisherIcon_Id}" class="revTabLink revTranslateSuggestionPublisherIcon"></div>
                <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revTranslateSuggestionPublisherNames">${revOwnerName}</div>
                <div class="revTimeCreatedStyle revTranslateSuggestionPublisherTime">${window.revFormatLongDate(revFamilyKiwiEntity._revTimePublished)}</div>
            </div>
            <div class="revFlexWrapper revTranslateItemSuggestionWrapper">
                <div class="revFlexWrapper revTranslateSuggestionsPointerWrapper">
                    <div class="revLarge-V-Line-2em"></div>
                    <div class="revFontSiteGreyTxtColor revFontSizeLarge revTranslateSuggestionsPointerIcon"><i class="fas fa-long-arrow-alt-right"></i></div>
                </div>
                <div class="revFlexContainer revTranslateItemSuggestionContainer">
                    <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexContainer">${revFamilyKiwiVal}</div>
                    ${await revGetMediaKiwiView(revFamilyKiwiEntity)}
                    <div class="revFlexWrapper revTranslateSuggestionItemOptionsWrapper">
                        <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revTranslateSuggestionItemOptionTab"><i class="fas fa-lock"></i> 7</div>
                        <div class="revSmall-H-Line-1em-Blue"></div>
                        <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revTranslateSuggestionItemOptionTab">EDiT FAmiLy</div>
                        <div class="revSmall-H-Line-1em-Blue"></div>
                        <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revTranslateSuggestionItemOptionTab"><i class="far fa-trash-alt"></i> 2</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    return revRetView;
};

module.exports.revPluginOverrideViewWidget = revPluginOverrideViewWidget;
