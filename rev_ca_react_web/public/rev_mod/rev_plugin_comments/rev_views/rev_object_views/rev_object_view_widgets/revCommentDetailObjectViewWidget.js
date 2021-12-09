var revPageViewWidget = async (revVarArgs) => {
    if (!revVarArgs || !revVarArgs._remoteRevEntityGUID) {
        console.log("ERR -> !revVarArgs || !revVarArgs._remoteRevEntityGUID");
        return;
    }

    let revEntityPublisher = revVarArgs.revEntityPublisher;

    if (!revEntityPublisher || !revEntityPublisher._remoteRevEntityGUID) {
        console.log("ERR -> !revEntityPublisher - revCommentDetailObjectViewWidget.js");
        return;
    }

    let revCommentVal = revGetMetadataValue(revVarArgs._revEntityMetadataList, "rev_comment_value");

    let revPretty_Id = "revPretty_Id_" + window.revGenUniqueId();

    window.revSetInterval(revPretty_Id, () => {
        prettyPrint();
    });

    revCommentVal = revCommentVal.replaceAll(`<pre class="ql-syntax" spellcheck="false">`, `<pre id="${revPretty_Id}" class="ql-syntax prettyprint" spellcheck="false">`);

    if (!revCommentVal) {
        console.log("ERR -> !revCommentVal - revCommentDetailObjectViewWidget.js");
        return;
    }

    let revCommentsDetailPageHeader = window.revPageHeader("commENT posT");

    let revPageViewPageNavHeaderId = "revPageViewPageNavHeaderId_" + window.revGenUniqueId();

    window.revSetInterval(revPageViewPageNavHeaderId, async () => {
        let revLoadedPageView = await window.revGetLoadedPageView("revPageViewPageNavHeader", { revVarArgs: { "_revEntitySubType": "revSpaceType" } });
        document.getElementById(revPageViewPageNavHeaderId).innerHTML = revLoadedPageView;
    });

    let revCommentItemDraw = async (revVarArgs) => {
        let revOwnerName = window.revGetMetadataValue(revEntityPublisher._revInfoEntity._revEntityMetadataList, "rev_entity_full_names_value");

        let revCommentPublisherIconId = "revCommentPublisherIconStyle_" + window.revGenUniqueId();

        window.revSetInterval(revCommentPublisherIconId, () => {
            document.getElementById(revCommentPublisherIconId).addEventListener("click", function () {
                window.revUserIconClick(revEntityPublisher._remoteRevEntityGUID);
            });

            window.revLoadModules("revPluginModuleUserProfileFunctions", (revScriptModule) => {
                let revProfileIconPath = window.revPluginModuleUserProfileFunctions.revGetUserIconPath(revEntityPublisher._revInfoEntity);
                revProfileIconPath = window.REV_UPLOAD_FILES_DIR_PATH + "/" + revProfileIconPath;

                let revProfileIconView = `<img class="revListingUserIconBlock" src=${revProfileIconPath} onerror="this.onerror=null;this.src='${window.REV_DEFAULT_USER_ICON_PATH}';" />`;

                document.getElementById(revCommentPublisherIconId).innerHTML = revProfileIconView;
            });
        });

        let revPublisherFullNamesTab_Id = "revPublisherFullNamesTab_Id_" + window.revGenUniqueId();

        window.revSetInterval(revPublisherFullNamesTab_Id, () => {
            document.getElementById(revPublisherFullNamesTab_Id).addEventListener("click", (event) => {
                window.revUserIconClick(revEntityPublisher._remoteRevEntityGUID);
            });
        });

        let revMenuItems = await window.revGetMenuItems("revMenuAreaKiwiItemListing", window.REV_LOADED_MENU_AREAS);
        let revCommentsListingOptionsMenus = await window.revDrawMenuItems(revMenuItems, revVarArgs);

        let revMenuItemLikeMenuItem = await window.revGetMenuItem("revMenuItemLike", revVarArgs);

        let revListingItemOptionsMenuArea_Id = "revListingItemOptionsMenuArea_Id_" + window.revGenUniqueId();

        return `
        <div class="revFlexWrapper revCommentViewWrapper">
            <div id="${revCommentPublisherIconId}" class="revTabLink revCommentDetailPublisherIconStyle"></div>
            <div class="revFlexContainer revCommentDetailCenterContainer">
                <div class="revFlexWrapper revCommentPublicationDetailsWrapper">
                    <span id="${revPublisherFullNamesTab_Id}" class="revTabLink revSmalllBoldBlue">${revOwnerName}</span>
                    <span class="revTimeCreatedStyle">&nbsp; ${window.revFormatLongDate(revVarArgs._revTimePublished)}</span>
                </div>
                <div class="revFontSiteGreyTxtColor revFontSizeNormal revWordWrap revFlexContainer revCommentEntityDescriptionContainer">${revCommentVal}</div>
                <div id="${revListingItemOptionsMenuArea_Id}" class="revFlexWrapper revItemOptionsMenuArea_CommentsDetailView_Wrapper">
                    ${revCommentsListingOptionsMenus}
                    ${revMenuItemLikeMenuItem}
                    <span class="revItemOptionsIcon"><i class="fas fa-share-alt"></i></span>
                    <span class="revItemOptionsIcon"><i class="far fa-bookmark"></i></span>
                </div>
            </div>
        </div>
        `;
    };

    let revRetView = await revCommentItemDraw(revVarArgs);

    /** REV START COMMENT FORM */
    let revVarArgsCallback = async (revNewCommentEntity) => {
        window.revSetInterval(revNewCommentsViewId, async () => {
            let revCommentItemVarArgs = {
                "revCommentItem": revNewCommentEntity,
                "revEntityPublisher": window.REV_LOGGED_IN_ENTITY,
            };

            let revLoadedPageView = await window.revGetLoadedPageView("revCommentListingObjectView", revCommentItemVarArgs);

            if (!revLoadedPageView) {
                return;
            }

            let revCommentChild = `<div class="revContainer revCommentOwnerBlock revCommentListStyle_No_Border">${revLoadedPageView}</div>`;

            document.getElementById(revNewCommentsViewId).classList.add("revEntityCommentsContainer");
            window.revAppendChildNodeAtBeginning(revNewCommentsViewId, window.revStringToHTMLNode(revCommentChild));

            if (document.getElementById(revCommentDetailFormInputAreaId)) {
                document.getElementById(revCommentDetailFormInputAreaId).innerHTML = "";
            }

            let revCommentsCountId = "revCommentsCountId_" + window.revGenUniqueId();
            let revCommentsCount = document.getElementById(revCommentsCountId).innerHTML;
            revCommentsCount = window.revRemoveAllWhiteSpaces(revCommentsCount);
            document.getElementById(revCommentsCountId).innerHTML = Number(revCommentsCount) + 1;
        });
    };

    let revCommentForm = await window.revGetForm("rev_comment", { "revEntity": revVarArgs, "revVarArgsCallback": revVarArgsCallback });

    let revCommentDetailFormInputAreaId = "revCommentDetailFormInputAreaId_" + window.revGenUniqueId();

    window.revSetInterval(revCommentDetailFormInputAreaId, () => {
        document.getElementById(revCommentDetailFormInputAreaId).innerHTML = revCommentForm;
    });

    /** REV START LIST COMMENTS */
    let revCommentsListingsId = "revCommentsListingsId_" + window.revGenUniqueId();

    window.revSetInterval(revCommentsListingsId, async () => {
        let url = window.REV_SITE_BASE_PATH + "/rev_api/rev_get_container_children_by_guids?" + "&rev_container_guids=" + revVarArgs._remoteRevEntityGUID + "&rev_entity_subtypes=rev_comment" + "&revPluginHookContextsRemoteArr=revHookRemoteReadContainerCommentsArr";

        let revDataComment;

        try {
            revDataComment = await window.revGetServerData_JSON_Async(url);

            let revCommentsVarArgs = {
                "revCommentsArr": revDataComment.filter,
                "revPublisherEntitiesArr": revDataComment.revPublisherEntitiesArr,
            };

            let revCommentsOverrideView = await window.revGetLoadedOverrideView("rev_comment", revCommentsVarArgs);

            if (!revCommentsOverrideView) {
                revCommentsOverrideView = "";
            } else {
                document.getElementById(revCommentsListingsId).innerHTML = revCommentsOverrideView;
            }
        } catch (error) {
            console.log("ERR revComments Detail -> !revData" + error);
        }
    });

    /** REV END LIST COMMENTS */

    return `
        <div class="revFlexContainer">
            <div class="revFlexContainer revPageHeaderAreaContainer">
                ${revCommentsDetailPageHeader}
                <div id="${revPageViewPageNavHeaderId}" class="revFlexWrapper revPageViewTitledPageNavHeader"></div>
            </div>
            <div class="revFlexContainer">${revRetView}</div>
            <div id="${revCommentDetailFormInputAreaId}" class="revFlexContainer revCommentDetailFormInputArea"></div>
            <div id="${revCommentsListingsId}" class="revFlexContainer revCommentDetailFormInputArea"></div>
        </div>
    `;
};

module.exports.revPageViewWidget = revPageViewWidget;
