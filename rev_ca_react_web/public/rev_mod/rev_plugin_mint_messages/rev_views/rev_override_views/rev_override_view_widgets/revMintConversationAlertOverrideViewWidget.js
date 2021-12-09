var revPluginOverrideViewWidget = async (revVarArgs) => {
    let revPublishersArr = revVarArgs.revPublishersArr;

    let revMintConversationAlertView_Id = "revMintConversationAlert_Id_" + window.revGenUniqueId();

    window.revSetInterval(revMintConversationAlertView_Id, () => {
        document.getElementById(revMintConversationAlertView_Id).addEventListener("click", async (event) => {
            let revMintConversationObjectView = await window.revGetLoadedPageView("revMintConversationObjectView", revVarArgs);

            window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revMintConversationObjectView, "revFloatingOptionsMenuName": "123" });
        });
    });

    let revEntityOptionsMenuArea = await window.revGetMenuAreaView("revListingItemOptionsMenuArea", window.REV_LOGGED_IN_ENTITY);

    let revGetUserIcon = (revEntity, revIconArea_Id) => {
        window.revSetInterval(revIconArea_Id, () => {
            let revEntityInfo = revEntity._revInfoEntity;

            window.revLoadModules("revPluginModuleUserProfileFunctions", (revScriptModule) => {
                let revProfileIconPath = window.revPluginModuleUserProfileFunctions.revGetUserIconPath(revEntityInfo);
                revProfileIconPath = window.REV_UPLOAD_FILES_DIR_PATH + "/" + revProfileIconPath;

                let revProfileIconView = `<img class="revListingIconCurvedTiny" src="${revProfileIconPath}" onerror="this.onerror=null;this.src='${window.REV_DEFAULT_USER_ICON_PATH}';">`;

                document.getElementById(revIconArea_Id).innerHTML = revProfileIconView;
            });
        });
    };

    /** REV START MINT CONVERSATION MEMBERS ICONS */
    let revMintConversationMembersGUIDsArr = revVarArgs.revMintConversationMembersGUIDsArr;

    let revMintConversationAlertMemberIconsArr = [];

    for (let i = 0; i < revMintConversationMembersGUIDsArr.length; i++) {
        if (i > 5) break;

        let revMintConvMemberGUID = revMintConversationMembersGUIDsArr[i];

        if (revMintConvMemberGUID == revVarArgs._revEntityOwnerGUID) continue;

        let revMintConvMember = window.revGetRevEntity_FROM_ARR_BY_GUID(revPublishersArr, revMintConvMemberGUID);

        let revMintConversationAlertMemberIcon_Id = "revMintConversationAlertMemberIcon_Id_" + window.revGenUniqueId();

        revGetUserIcon(revMintConvMember, revMintConversationAlertMemberIcon_Id);

        revMintConversationAlertMemberIconsArr.push(`<div id="${revMintConversationAlertMemberIcon_Id}" class="revTabLink  revMintConversationAlertMemberEntityIcon"></div>`);
    }
    /** REV END MINT CONVERSATION MEMBERS ICONS */

    /** REV START MINT CONVERSATION OWNER ICON */
    let revMintConversationAlertOwnerIcon_Id = "revMintConversationAlertOwnerIcon_Id_" + window.revGenUniqueId();
    let revMintConvOwner = window.revGetRevEntity_FROM_ARR_BY_GUID(revPublishersArr, revVarArgs._revEntityOwnerGUID);
    revGetUserIcon(revMintConvOwner, revMintConversationAlertOwnerIcon_Id);
    /** REV START MINT CONVERSATION OWNER ICON */

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
        <div class="revFlexWrapper revMintAlertsNoTargetsIconPointerWrapper">
            <div class="revFontSiteBlueTxtColor revFontSizeNormal"><i class="fas fa-arrows-alt-h"></i></div>
        </div>
        `;
    }

    return `
    <div class="revFlexWrapper revMintConversationAlertWrapper">
        <div id="${revMintConversationAlertView_Id}" class="revTabLink revFlexWrapper revSuggestedMintEntitiesGrpWrapper">
            <div id="${revMintConversationAlertOwnerIcon_Id}" class="revListingIconCurvedTiny revMintConversationAlertMemberEntityIcon"></div>
            <div class="revFontSiteBlueTxtColor revFontSizeNormal"><i class="fas fa-arrow-right"></i></div>
            <div class="revFlexWrapper revMintConversationAlertMembersEntityIconsWrapper">${revMintConversationAlertMemberIconsArr.join("")}</div>
            ${revMintCountDivider}
            ${revMintConversationEntityTarget}
            <div class="revFontSiteRedTxtColor revFontSizeNormal revMintUnreadConversationsCount"> ${revVarArgs.revMintConversationMessagesArr.length}</div>
        </div>
        <div class="revMintConversationAlertListItemTab">${revEntityOptionsMenuArea}</div>
    </div>
    `;
};

module.exports.revPluginOverrideViewWidget = revPluginOverrideViewWidget;
