var revPageViewWidget = async (revVarArgs) => {
    if (!revVarArgs) {
        console.log("ERR revCommentItemDraw -> !revVarArgs || !revVarArgs.revEntityPublisher || !revVarArgs.revEntityPublisher._remoteRevEntityGUID");
        return;
    }

    let revCommentItemDraw = async (revVarArgs) => {
        let revEntityPublisher = revVarArgs.revEntityPublisher;

        if (!revEntityPublisher || !revEntityPublisher._remoteRevEntityGUID) {
            let url = window.REV_SITE_BASE_PATH + "/rev_api/get_entity_single?remote_rev_entity_guid=" + revVarArgs._revEntityOwnerGUID;

            try {
                let revData = await window.revGetServerData_JSON_Async(url);
                revData = revData.filter;
                revEntityPublisher = revData[0];
            } catch (error) {
                console.log("error -> revCommentListingObjectViewWidget.js -> revData -> " + error);
            }
        }

        let revPretty_Id = window.revGenUniqueId();

        window.revSetInterval(revPretty_Id, () => {
            prettyPrint();
        });

        let revCommentVal = revGetMetadataValue(revVarArgs._revEntityMetadataList, "rev_comment_value");
        revCommentVal = revCommentVal.replaceAll(`<pre class="ql-syntax" spellcheck="false">`, `<pre id="${revPretty_Id}" class="ql-syntax prettyprint" spellcheck="false">`);

        if (!revCommentVal) {
            console.log("ERR -> !revCommentVal - revCommentListingObjectViewWidget.js");
            return;
        }

        if (!revEntityPublisher || !revEntityPublisher._remoteRevEntityGUID || !revEntityPublisher._revInfoEntity || revEntityPublisher._remoteRevEntityGUID < 1) {
            console.log("!revEntityPublisher || !revEntityPublisher._remoteRevEntityGUID || !revEntityPublisher._revInfoEntity || revEntityPublisher._remoteRevEntityGUID < 1");
            return;
        }

        let revPublisherInfo = revEntityPublisher._revInfoEntity;

        let revOwnerName = window.revGetMetadataValue(revEntityPublisher._revInfoEntity._revEntityMetadataList, "rev_entity_full_names_value");

        let revCommentPublisherIconId = "revCommentPublisherIconStyle_" + window.revGenUniqueId();

        window.revSetInterval(revCommentPublisherIconId, () => {
            document.getElementById(revCommentPublisherIconId).addEventListener("click", (event) => {
                window.revUserIconClick(revEntityPublisher._remoteRevEntityGUID);
            });

            window.revLoadModules("revPluginModuleUserProfileFunctions", (revScriptModule) => {
                let revProfileIconPath = window.revPluginModuleUserProfileFunctions.revGetUserIconPath(revPublisherInfo);
                revProfileIconPath = window.REV_UPLOAD_FILES_DIR_PATH + "/" + revProfileIconPath;

                let revProfileIconView = `<img class="revListingUserIconCircle" src=${revProfileIconPath} onerror="this.onerror=null;this.src='${window.REV_DEFAULT_USER_ICON_PATH}';" />`;

                document.getElementById(revCommentPublisherIconId).innerHTML = revProfileIconView;
            });
        });

        let revCommentPublisherFullNamesTab_Id = "revCommentPublisherFullNamesTab_Id_" + window.revGenUniqueId();

        window.revSetInterval(revCommentPublisherFullNamesTab_Id, () => {
            document.getElementById(revCommentPublisherFullNamesTab_Id).addEventListener("click", (event) => {
                window.revUserIconClick(revEntityPublisher._remoteRevEntityGUID);
            });
        });

        let revMenuItems = await window.revGetMenuItems("revMenuAreaKiwiItemListing", window.REV_LOADED_MENU_AREAS);
        let revCommentsListingOptionsMenus = await window.revDrawMenuItems(revMenuItems, revVarArgs);

        let revMenuItemLikeMenuItem = await window.revGetMenuItem("revMenuItemLike", revVarArgs);

        let revCommentListingItemId = "revCommentListingItemId_" + window.revGenUniqueId();

        window.revSetInterval(revCommentListingItemId, () => {
            document.getElementById(revCommentListingItemId).addEventListener("click", async () => {
                let revLoadedPageView = await window.revGetLoadedPageView("revCommentDetailObjectView", revVarArgs);
                window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revLoadedPageView, "revFloatingOptionsMenuName": null });
            });
        });

        let RevListingItemOptionsMenuAreaId = "RevListingItemOptionsMenuAreaId_" + window.revGenUniqueId();

        /** REV START ENTITY MEDIA */
        let relOverrideView = "";

        let revImagesRemainder = "";
        let revImagesCount;

        let revEntityPicsAlbum;

        if (revVarArgs._revEntityChildrenList) {
            let revEntityPicsAlbumArr = window.revGetEntityChildren_By_Subtype(revVarArgs._revEntityChildrenList, "rev_pics_album");

            if (revEntityPicsAlbumArr && Array.isArray(revEntityPicsAlbumArr)) {
                revEntityPicsAlbum = revEntityPicsAlbumArr[0];
            }
        }

        if (revEntityPicsAlbum) {
            let revPassVarArgsPicsAlbum = window.revCloneJsObject(revEntityPicsAlbum);
            revPassVarArgsPicsAlbum["revAlbumPicsSize"] = "revListingUserIconBlock revImageItemStyle_Small";
            relOverrideView = await window.revGetLoadedOverrideView("rev_photo", revPassVarArgsPicsAlbum);

            revImagesCount = revEntityPicsAlbum._revEntityChildrenList.length;

            if (revImagesCount > 13) {
                let revMoreTxt = "pictures";

                if (revImagesCount < 14) revMoreTxt = "picture";

                revImagesRemainder = `<div class="revImagesCount">+${revImagesCount - 13} moRE ${revMoreTxt}</div>`;
            }
        }

        let revEntityMediaView = "";

        if (revEntityPicsAlbum) {
            revEntityMediaView = `
            <div class="revFlexContainer revPicsCommentsWrapper">
                ${relOverrideView}
            </div>
            `;
        }

        /** REV END ENTITY MEDIA */

        return `
        <div class="revFlexContainer">
            <div class="revFlexWrapper revCommentListingObjectViewWrapper">
                <div id="${revCommentPublisherIconId}" class="revTabLink revCommentPublisherIconStyle"></div>
                <div id="${revCommentListingItemId}" class="revTabLink revFlexContainer revCommentListCenterContainer">
                    <div class="revFlexWrapper revCommentPublicationDetailsWrapper">
                        <span id="${revCommentPublisherFullNamesTab_Id}" class="revTabLink revSmalllBoldBlue">${revOwnerName}</span>
                        <span class="revTimeCreatedStyle">&nbsp;${window.revFormatLongDate(revVarArgs._revTimePublished)}</span>
                    </div>
                    <div class="revFontSiteGreyTxtColor revFontSizeNormal revWordWrap revFlexContainer revCommentEntityDescriptionContainer">${revCommentVal}</div>
                    
                    <div id="${RevListingItemOptionsMenuAreaId}" class="revFlexWrapper revItemOptionsMenuArea_Comments_Wrapper">
                        ${revCommentsListingOptionsMenus}
                        ${revMenuItemLikeMenuItem}
                    </div>
                </div>
            </div>
                    
            ${revEntityMediaView}
        </div>
        `;
    };

    let revRetView = await revCommentItemDraw(revVarArgs);

    return revRetView;
};

module.exports.revPageViewWidget = revPageViewWidget;
