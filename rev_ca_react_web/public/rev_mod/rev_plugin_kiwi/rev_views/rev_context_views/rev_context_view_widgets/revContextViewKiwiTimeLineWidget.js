var revPageViewWidget = async (revVarArgs) => {
    if (!revVarArgs || !revVarArgs || !revVarArgs.revPublisher || !revVarArgs.revPublisherEntitiesArr) {
        console.log("!revVarArgs || !revVarArgs.revPublisher || !revVarArgs.revPublisherEntitiesArr");
        return;
    }

    let revEntity = revVarArgs;
    let revPublisher = revVarArgs.revPublisher;
    let revPublisherEntitiesArr = revVarArgs.revPublisherEntitiesArr;

    let revKiwiVal = window.revGetMetadataValue(revEntity._revEntityMetadataList, "rev_kiwi_value");

    revKiwiVal = window.revGetQuillPlainText(revKiwiVal);

    if (!revKiwiVal) return;

    let revUserIcon_Id = "revUserIcon_Id_" + window.revGenUniqueId();

    window.revSetInterval(revUserIcon_Id, () => {
        document.getElementById(revUserIcon_Id).addEventListener("click", function () {
            window.revUserIconClick(revPublisher._remoteRevEntityGUID);
        });
    });

    let revUserNames_Id = "revUserNames_Id_" + window.revGenUniqueId();

    window.revSetInterval(revUserNames_Id, () => {
        document.getElementById(revUserNames_Id).addEventListener("click", function () {
            window.revUserIconClick(revPublisher._remoteRevEntityGUID);
        });
    });

    let revOwnerName = window.revGetMetadataValue(revPublisher._revInfoEntity._revEntityMetadataList, "rev_entity_full_names_value");

    let revUserIconPath = window.revGetEntityIcon(revPublisher);
    revUserIconPath = window.REV_UPLOAD_FILES_DIR_PATH + "/" + revUserIconPath;

    let str = revKiwiVal;
    if (!str || !str.replace(/\s/g, "").length) {
        revKiwiVal = "no description";
    }

    let revVideoDetailsText = window.revTruncateString(revKiwiVal, 155);

    let revPicsAlbumsArr = window.revGetEntityChildren_By_Subtype(revEntity._revEntityChildrenList, "rev_pics_album");
    let revPicsMediaWrapperId = "revContextPicsMediaWrapperId_" + revEntity._remoteRevEntityGUID + "_" + window.revGenUniqueId();

    window.revSetInterval(revPicsMediaWrapperId, async () => {
        if (Array.isArray(revPicsAlbumsArr)) {
            let revPicsOverrideView = await window.revGetLoadedOverrideView("rev_photo", revPicsAlbumsArr[0]);

            if (revPicsOverrideView) document.getElementById(revPicsMediaWrapperId).innerHTML = revPicsOverrideView;
        }
    });

    let revVidsAlbumsArr = window.revGetEntityChildren_By_Subtype(revEntity._revEntityChildrenList, "rev_vids_album");
    let revVideoMediaWrapperId = "revVideoMediaWrapperId_" + window.revGenUniqueId();

    if (revVidsAlbumsArr && revVidsAlbumsArr.length > 0) {
        window.revLoadModules("revPluginModuleVideoCaptionGenerator", async (revScriptModule) => {
            let revVidCaptionView = await window.revPluginModuleVideoCaptionGenerator.revCreateVideoCaption(revVidsAlbumsArr[0]);

            if (!revVidCaptionView) return;

            window.revSetInterval(revVideoMediaWrapperId, () => {
                document.getElementById(revVideoMediaWrapperId).innerHTML = `
                <div class="revFlexContainer">
                    <div class="revTabLink revPosRelative revFlexContainer revFeaturedTimelineVidCaptionAreaContainer">
                        <div class="revPosAbsolute revFlexContainer">${revVidCaptionView}</div>
                        <div class="revPosAbsolute revFeaturedPlayVid"><i class="fas fa-play"></i></div>
                    </div>
                </div>
                `;
            });
        });
    }

    let revCommentsContainerId = "revCommentsContainerId_" + revEntity._remoteRevEntityGUID + "_" + window.revGenUniqueId();
    let revEntityCommentsChildrenSubtypesArr = window.revGetEntityChildren_By_Subtype(revEntity._revEntityChildrenList, "rev_comment");

    if (revEntityCommentsChildrenSubtypesArr && revEntityCommentsChildrenSubtypesArr.length > 0) {
        let revCommentsVarArgs = {
            "revPublisherEntitiesArr": revPublisherEntitiesArr,
            "revCommentsArr": revEntityCommentsChildrenSubtypesArr,
        };

        let revCommentsOverrideView;

        try {
            revCommentsOverrideView = await window.revGetLoadedOverrideView("rev_comment", revCommentsVarArgs);
        } catch (error) {
            console.log("ERROR : revCommentsOverrideView -> " + error);
        }

        if (!revCommentsOverrideView) return;

        let revMenuItemLikeMenuItem = await window.revGetMenuItem("revMenuItemLike", revEntity);

        let revVarArgsCallback = async (revNewCommentEntity) => {
            window.revSetInterval(revCommentInputId, async () => {
                let revCommentItemVarArgs = {
                    "revCommentItem": revNewCommentEntity,
                    "revPublisher": window.REV_LOGGED_IN_ENTITY,
                };

                await window.revGetLoadedPageView("revCommentListingObjectView", revCommentItemVarArgs, (revLoadedPageView) => {
                    if (!revLoadedPageView) return;

                    let revCommentChild = `<div class="revContainer revCommentOwnerBlock revCommentListStyle_No_Border">
                            ${revLoadedPageView}
                        </div>
                        `;

                    document.getElementById(revNewCommentsViewId).classList.add("revEntityCommentsContainer");
                    window.revAppendChildNodeAtBeginning(revNewCommentsViewId, window.revStringToHTMLNode(revCommentChild));

                    if (document.getElementById(revCommentInputArea)) document.getElementById(revCommentInputArea).innerHTML = "";

                    let revCommentsCountId = "revCommentsCountId_" + revVarArgs._remoteRevEntityGUID;
                    let revCommentsCount = document.getElementById(revCommentsCountId).innerHTML;
                    revCommentsCount = window.revRemoveAllWhiteSpaces(revCommentsCount);
                    document.getElementById(revCommentsCountId).innerHTML = Number(revCommentsCount) + 1;
                });
            });
        };

        let revCommentForm = await window.revGetForm("rev_comment", { "revEntity": revEntity, "revVarArgsCallback": revVarArgsCallback });

        window.revSetInterval(revCommentsContainerId, () => {
            document.getElementById(revCommentsContainerId).innerHTML = `
        <div class="revFlexContainer revFeaturedCommentsArea">
            <div class="revFlexWrapper revFeaturedTitleStatsWrapper">
                <div class="revSmalllBoldBlue">comments :&nbsp;${revEntityCommentsChildrenSubtypesArr.length}</div>
                <div class="revLikesHeaderArea">${revMenuItemLikeMenuItem}</div>
            </div>
            ${revCommentForm}
            ${revCommentsOverrideView}
        </div>
        `;
        });
    }

    let revRetPageView = async () => {
        return `
        <div class="revSmalllBoldBlue revFeaturedPostTtlTxt">Featured PosT</div>
        
        <div class="revFlexContainer revFeaturedTimelineItemContainer">
            <div class="revFlexWrapper">
                <div class="revFeaturedIconDescContainer">
                    <div class="revFeaturedIconDescBorder"></div>
                    <div class="revFeaturedIconDesc"><span><i class="fas fa-long-arrow-alt-right"></i></span></div>
                </div>
                <div class="revFeaturedDetails revWordWrap">${revVideoDetailsText}</div>
            </div>
        
            <div class="revFlexWrapper">
                <div class="revFlexContainer revFeaturedIconDescContainer">
                    <div class="revFeaturedIconDescBorder"></div>
                    <div class="revFeaturedIconDesc"><span><i class="fas fa-long-arrow-alt-right"></i></span></div>
                </div>
                <div class="revFlexWrapper revFeaturedItemDetailsWrapper">
                    <div class="revTabLink revFeaturedItemDescIcon">
                        <img id="${revUserIcon_Id}" class="revListingIconCurvedSmall" 
                        src="${revUserIconPath}" onerror="this.onerror=null;this.src='${window.REV_DEFAULT_USER_ICON_PATH}';" >
                    </div>
                    <div class="revFlexContainer revFeaturedItemDetailsContainer">
                        <div id="${revUserNames_Id}" class="revTabLink revSmalllBoldBlue revFeaturedItemDesc">${revOwnerName}</div>
                        <div class="revFeaturedType">Popular Video</div>
                        <div class="revFeaturedCount">1, 200 views</div>
                    </div>
                </div>
            </div>
        
            <div id="${revVideoMediaWrapperId}" class="revFlexContainer"></div>
            <div id="${revPicsMediaWrapperId}" class="revFlexContainer"></div>
            <div id="${revCommentsContainerId}" class="revFlexContainer"></div>
        </div>
        `;
    };

    return await revRetPageView();
};

module.exports.revPageViewWidget = revPageViewWidget;
