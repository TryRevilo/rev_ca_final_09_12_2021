var revPageViewWidget = async (revVarArgs) => {
    if (!revVarArgs || !revVarArgs.revEntity || !revVarArgs._revContainerEntity || !revVarArgs.revPublisher) {
        console.log("!revVarArgs || !revVarArgs.revEntity || !revVarArgs._revContainerEntity || !revVarArgs.revPublisher");
        return;
    }

    let revVidsAlbum = revVarArgs.revEntity;
    let revContainerEntity = revVarArgs._revContainerEntity;
    let revPublisher = revVarArgs.revPublisher;

    let revTrendingVideoContainerId = "revTrendingVideoContainerId_" + window.revGenUniqueId();

    window.revSetInterval(revTrendingVideoContainerId, () => {
        document.getElementById(revTrendingVideoContainerId).addEventListener("click", async (event) => {
            try {
                let revURL = `${window.REV_SITE_BASE_PATH}/rev_api?rev_logged_in_entity_guid=${window.REV_LOGGED_IN_ENTITY_GUID}&rev_container_entity_guid=${revContainerEntity._remoteRevEntityGUID}&rev_vid_entity_guid=${revVidsAlbum._remoteRevEntityGUID}&revPluginHookContextsRemoteArr=revHookRemoteHandler_VideoClick`;

                let revRetData = await window.revGetServerData_JSON_Async(revURL);

                let revPageViewObjVid = await window.revGetLoadedPageViewAreaContainer("revObjectVideoView", revVarArgs);
                window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revPageViewObjVid, "revFloatingOptionsMenuName": null });
            } catch (error) {
                console.log("ERR -> revLockTransPhraseTab -> !revRetData" + error);
            }
        });
    });

    /** REV START PUBLISHER ICON */
    let revPublisherIcon_Id = "revPublisherIcon_Id_" + window.revGenUniqueId();

    window.revSetInterval(revPublisherIcon_Id, () => {
        document.getElementById(revPublisherIcon_Id).addEventListener("click", function () {
            window.revUserIconClick(revPublisher._remoteRevEntityGUID);
        });

        window.revLoadUserIcon(revPublisher, revPublisherIcon_Id);
    });
    /** REV END PUBLISHER ICON */

    let revOwnerName = window.revGetMetadataValue(revPublisher._revInfoEntity._revEntityMetadataList, "rev_entity_full_names_value");

    let revKiwiVal = window.revGetMetadataValue(revContainerEntity._revEntityMetadataList, "rev_kiwi_value");

    if (!revKiwiVal) {
        // return `<div>!revKiwiVal</div>`;
    }

    revKiwiVal = window.revGetQuillPlainText(revKiwiVal);

    let str = revKiwiVal;
    if (!str.replace(/\s/g, "").length) {
        revKiwiVal = "no description";
        // return `<div>${revKiwiVal}</div>`;
    }

    let revVideoDetailsText = window.revTruncateString(revKiwiVal, 47);

    let revUserIconPath = window.revGetEntityIcon(revPublisher);
    revUserIconPath = window.REV_UPLOAD_FILES_DIR_PATH + "/" + revUserIconPath;

    let revVidCaptionId = "revVidCaption_" + window.revGenUniqueId();

    window.revLoadModules("revPluginModuleVideoCaptionGenerator", (revScriptModule) => {
        window.revSetInterval(revVidCaptionId, async () => {
            let revVidCaptionView = await window.revPluginModuleVideoCaptionGenerator.revCreateVideoCaption(revVidsAlbum);

            if (!revVidCaptionView) {
                window.revSetInterval(revTrendingVideoContainerId, () => {
                    document.getElementById(revTrendingVideoContainerId).remove();
                });

                return;
            }

            document.getElementById(revVidCaptionId).innerHTML = revVidCaptionView;
        });
    });

    let revPicsAlbumsArr = window.revGetEntityChildren_By_Subtype(revContainerEntity._revEntityChildrenList, "rev_pics_album");

    let revPicsMediaWrapperId = "revContextSidebarTrendsPicsMediaWrapperId_" + revContainerEntity._remoteRevEntityGUID + "_" + window.revGenUniqueId();

    if (Array.isArray(revPicsAlbumsArr)) {
        window.revSetInterval(revPicsMediaWrapperId, async () => {
            let revPassVarArgsPicsAlbum = window.revCloneJsObject(revPicsAlbumsArr[0]);
            revPassVarArgsPicsAlbum["revAlbumPicsSize"] = "revListingUserIconBlock revImageItemStyle_Small";

            let revPicsOverrideView = await window.revGetLoadedOverrideView("rev_photo", revPassVarArgsPicsAlbum);

            if (revPicsOverrideView) {
                document.getElementById(revPicsMediaWrapperId).innerHTML = `<div class="revFlexWrapper revPicsOverrideViewWrapper">${revPicsOverrideView}</div>`;
            }
        });
    }

    let revRetPageView = () => {
        return `
        <div id="${revTrendingVideoContainerId}" class="revFlexContainer revTrendingItemItemContainer">
            <div class="revFlexWrapper revTranslateSuggestionPublisherWrapper">
                <div id="${revPublisherIcon_Id}" class="revTranslateSuggestionPublisherIcon"></div>
                <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revTranslateSuggestionPublisherNames">${revOwnerName}</div>
                <div class="revTimeCreatedStyle revTranslateSuggestionPublisherTime">${window.revFormatLongDate(revContainerEntity._revTimePublished)}</div>
            </div>
            <div class="revFlexWrapper revTranslateItemSuggestionWrapper">
                <div class="revFlexWrapper revTranslateSuggestionsPointerWrapper">
                    <div class="revLarge-V-Line-2em"></div>
                    <div class="revFontSiteGreyTxtColor revFontSizeLarge revTranslateSuggestionsPointerIcon"><i class="fas fa-long-arrow-alt-right"></i></div>
                </div>
                <div class="revFlexContainer revTranslateItemSuggestionContainer">
                    <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper">${revVideoDetailsText}</div>
                    <div id=${revVidCaptionId} class="revTabLink revFlexContainer revVidCaptionArea"></div>
                    <div id="${revPicsMediaWrapperId}" class="revFlexContainer"></div>
                    <div class="revFlexWrapper revTrendingSuggestionItemOptionsWrapper">
                        <div class="revFlexWrapper revTrendingSuggestionItemOptionTabWrapper revTranslateSuggestionItemOptionTab">
                            <div class="revFontSiteGreyTxtColor revFontSizeNormal"><i class="fas fa-hashtag"></i></div>
                            <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revTrendingItemItemTagsWrapper">hello_world</div>
                        </div>
                        <div class="revSmall-H-Line-1em-Blue"></div>
                        <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revTranslateSuggestionItemOptionTab">1, 200 viEws</div>
                        <div class="revSmall-H-Line-1em-Blue"></div>
                        <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revTranslateSuggestionItemOptionTab"><i class="far fa-trash-alt"></i></div>
                    </div>
                </div>
            </div>
        </div>
        `;
    };

    return revRetPageView();
};

module.exports.revPageViewWidget = revPageViewWidget;
