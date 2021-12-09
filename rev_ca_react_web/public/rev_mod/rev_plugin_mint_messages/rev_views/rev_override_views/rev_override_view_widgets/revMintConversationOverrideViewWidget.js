var revPluginOverrideViewWidget = async (revVarArgs) => {
    let revPublishersArr = revVarArgs.revPublishersArr;

    let revMintConversationMessagesArr = revVarArgs.revMintConversationMessagesArr;
    let revMintConversationTargetMembersGUIDsArr = revVarArgs.revMintConversationTargetMembersGUIDsArr;

    let revGetArrEntity_By_EntityGUID = (revEntitiesArr, revEntityGUID) => {
        if (!Array.isArray(revEntitiesArr)) return null;

        let revEntity;

        for (let i = 0; i < revEntitiesArr.length; i++) {
            let revArrEntity = revEntitiesArr[i];

            if (!revArrEntity) continue;

            if ((revArrEntity._remoteRevEntityGUID = revEntityGUID)) {
                revEntity = revArrEntity;
                break;
            }
        }

        return revEntity;
    };

    let revGetUserIcon = (revEntity, revIconArea_Id) => {
        window.revSetInterval(revIconArea_Id, () => {
            document.getElementById(revIconArea_Id).addEventListener("click", function () {
                window.revUserIconClick(revEntity._remoteRevEntityGUID);
            });

            let revEntityInfo = revEntity._revInfoEntity;

            window.revLoadModules("revPluginModuleUserProfileFunctions", (revScriptModule) => {
                let revProfileIconPath = window.revPluginModuleUserProfileFunctions.revGetUserIconPath(revEntityInfo);
                revProfileIconPath = window.REV_UPLOAD_FILES_DIR_PATH + "/" + revProfileIconPath;

                let revProfileIconView = `<img class="revTabLink revListingIconCurvedTiny" src="${revProfileIconPath}" onerror="this.onerror=null;this.src='${window.REV_DEFAULT_USER_ICON_PATH}';">`;

                document.getElementById(revIconArea_Id).innerHTML = revProfileIconView;
            });
        });
    };

    /** REV START MINT COMMENTS INPUT AREA */
    let revFormViewComposeMintCommentMsg = await revGetForm("revFormViewComposeMintCommentMsg", revVarArgs);
    /** REV END MINT COMMENTS INPUT AREA */

    let revMintConversationMessagesViewsArr = [];

    let revGetMintConversationMessagesView = (revMintConversationMessageEntity) => {
        let revMintConversationCommentPublisherIcon_Id = "revMintConversationPublisherIcon_Id_" + window.revGenUniqueId();

        revGetUserIcon(revGetArrEntity_By_EntityGUID(revPublishersArr, revMintConversationMessageEntity._revEntityOwnerGUID), revMintConversationCommentPublisherIcon_Id);

        let revMintConversationMessage = window.revGetMetadataValue(revMintConversationMessageEntity._revEntityMetadataList, "rev_mint_message_val");
        revMintConversationMessage = window.revTruncateString(revMintConversationMessage, 200);

        return `
        <div class="revFlexWrapper revMintConversationCommentWrapper">
            <div id="${revMintConversationCommentPublisherIcon_Id}" class="revListingIconCurvedTiny revSuggestedMintEntityIcon"></div>
            <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexContainer revMintConversationCommentPostContainer">${revMintConversationMessage}</div>
        </div>
        `;
    };

    for (let i = 0; i < revMintConversationMessagesArr.length; i++) {
        revMintConversationMessagesViewsArr.push(revGetMintConversationMessagesView(revMintConversationMessagesArr[i]));
    }

    let revMintConversationPublisherIcon_Id = "revMintConversationPublisherIcon_Id_" + window.revGenUniqueId();
    revGetUserIcon(revGetArrEntity_By_EntityGUID(revPublishersArr, revVarArgs._revEntityOwnerGUID), revMintConversationPublisherIcon_Id);

    /** REV START MINT CONVERSATION MEMBERS ICONS */
    let revMintConversationMembersGUIDsArr = revVarArgs.revMintConversationMembersGUIDsArr;

    let revMintConversationAlertMemberIconsArr = [];

    for (let i = 0; i < revMintConversationMembersGUIDsArr.length; i++) {
        let revMintConvMemberGUID = revMintConversationMembersGUIDsArr[i];

        if (revMintConvMemberGUID == revVarArgs._revEntityOwnerGUID) continue;

        let revMintConvMember = window.revGetRevEntity_FROM_ARR_BY_GUID(revPublishersArr, revMintConvMemberGUID);

        let revMintConversationAlertMemberIcon_Id = "revMintConversationAlertMemberIcon_Id_" + window.revGenUniqueId();

        revGetUserIcon(revMintConvMember, revMintConversationAlertMemberIcon_Id);

        revMintConversationAlertMemberIconsArr.push(`<div id="${revMintConversationAlertMemberIcon_Id}" class="revTabLink  revMintConversationAlertMemberEntityIcon"></div>`);
    }
    /** REV END MINT CONVERSATION MEMBERS ICONS */

    /** REV START MINT TARGET */
    let revMintConversationEntityTarget = "";

    if (revVarArgs.revMintConversationTargetMembersGUIDsArr) {
        let revMintConversationAlertTargetsMemberIconsArr = [];

        let revMintConversationTargetMembersGUIDsArr = revVarArgs.revMintConversationTargetMembersGUIDsArr;

        for (let i = 0; i < revMintConversationTargetMembersGUIDsArr.length; i++) {
            if (i > 5) break;

            let revMintConvMemberGUID = revMintConversationTargetMembersGUIDsArr[i];

            if (revMintConvMemberGUID == revVarArgs._revEntityOwnerGUID) continue;

            let revMintConvMember = window.revGetRevEntity_FROM_ARR_BY_GUID(revPublishersArr, revMintConvMemberGUID);

            let revMintConversationAlertMemberIcon_Id = "revMintConversationAlertTargetMemberIcon_Id_" + window.revGenUniqueId();

            revGetUserIcon(revMintConvMember, revMintConversationAlertMemberIcon_Id);

            revMintConversationAlertTargetsMemberIconsArr.push(`<div id="${revMintConversationAlertMemberIcon_Id}" class="revTabLink revMintConversationAlertMemberEntityIcon revMintConversationEntityTarget"></div>`);
        }

        revMintConversationEntityTarget = `
        <div class="revFlexWrapper revMintConversationEntityTargetsWrapper">
            ${revMintConversationAlertTargetsMemberIconsArr.join("")}
            <div class="revSmall-H-Line"></div>
            <div class="revTiny-V-Line"></div>
        </div>
        <div class="revFontSiteGreyTxtColor revFontSizeNormal revMintUnreadConversationsCount"> ${revVarArgs.revMintConversationMessagesArr.length}</div>
        `;
    }
    /** REV START MINT TARGET */

    let revMintCountDivider = `
        <div class="revFlexWrapper revSuggestedMintPublishOptionsTabsWrapper">
            <div class="revFontSiteBlueTxtColor revFontSizeNormal"><i class="fas fa-arrows-alt-h"></i></div>
        </div>
    `;

    if (!revMintConversationEntityTarget) {
        revMintCountDivider = `
        <div class="revFlexWrapper revMintCountDividerWrapper">
            <div class="revSmall-H-Line"></div>
            <div class="revSmall-H-Line"></div>
            <div class="revSmall-H-Line"></div>
            <div class="revSmall-H-Line"></div>
            <div class="revTiny-H-Line"></div>
            <div class="revTiny-V-Line"></div>
            <div class="revFontSiteGreyTxtColor revFontSizeNormal revMintUnreadConversationsCount"> ${revVarArgs.revMintConversationMessagesArr.length}</div>
        </div>
        `;
    }

    let revMintConversationOverrideView = `
        <div class="revFlexContainer">
            <div class="revFlexWrapper revSuggestedMintEntitiesGrpWrapper">
                <div id="${revMintConversationPublisherIcon_Id}" class="revTabLink revListingIconCurvedTiny revSuggestedMintEntityIcon"></div>
                <div class="revFontSiteBlueTxtColor revFontSizeNormal"><i class="fas fa-arrow-right"></i></div>
                <div class="revFlexWrapper revMintConversationAlertMembersEntityIconsWrapper">${revMintConversationAlertMemberIconsArr.join("")}</div>
                ${revMintCountDivider}
                ${revMintConversationEntityTarget}
            </div>
            ${revFormViewComposeMintCommentMsg}
            <div class="revFlexContainer">${revMintConversationMessagesViewsArr.join("")}</div>
        </div>
        `;

    return `
        <div class="revFlexContainer">
            ${revMintConversationOverrideView}
            <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revMoreMintTags">more miNT monversations</div>
        </div>
    `;
};

module.exports.revPluginOverrideViewWidget = revPluginOverrideViewWidget;
