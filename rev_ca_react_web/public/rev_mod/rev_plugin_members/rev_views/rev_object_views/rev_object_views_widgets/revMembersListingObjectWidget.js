var revPageViewWidget = async (revVarArgs) => {
    if (!revVarArgs || !revVarArgs._remoteRevEntityGUID) return "ERR revMembersListingObjectWidget";

    let revShowRecentPosts;

    if (revVarArgs.revShowRecentPosts) revShowRecentPosts = revVarArgs.revShowRecentPosts;

    let remoteRevEntityGUID = revVarArgs._remoteRevEntityGUID;
    let revConnectionListId = "revConnectionList_" + window.revGenUniqueId();
    let revConnsCountId = "revConnsCount_" + window.revGenUniqueId();

    let revMemberFullNames = window.revGetMetadataValue(revVarArgs._revInfoEntity._revEntityMetadataList, "rev_entity_full_names_value");

    let revUserIconPath = window.revGetEntityIcon(revVarArgs);
    revUserIconPath = window.REV_UPLOAD_FILES_DIR_PATH + "/" + revUserIconPath;

    window.revSetInterval(revConnectionListId, async () => {
        let url = window.REV_SITE_BASE_PATH + "/rev_api/get_rev_entities_by_entity_guid_rel_type?relTypeValId=5&remoteRevEntityGUID=" + remoteRevEntityGUID;
        let revData = await window.revGetServerData_JSON_Async(url);
        revData = revData.filter;

        let revCountText = "";

        if (revData.length > 1) revCountText = "over ";

        document.getElementById(revConnsCountId).innerHTML = revCountText + " " + revData.length;

        let revItemsListDraw = () => {
            let revConnectionListArr = [];

            for (let i = 0; i < revData.length; i++) {
                if (!revData[i]) continue;

                let revConnEntity = revData[i];
                let revIconId = "connectionIcon_" + window.revGenUniqueId();

                let revConnUserIconPath = window.revGetEntityIcon(revConnEntity);
                revConnUserIconPath = window.REV_UPLOAD_FILES_DIR_PATH + "/" + revConnUserIconPath;

                let revIcon = `
                <div id="${revIconId}" class="connectionIcon"></div>
                `;

                revConnectionListArr.push(revIcon);

                window.revSetInterval(revIconId, () => {
                    document.getElementById(revIconId).addEventListener("click", function () {
                        window.revUserIconClick(revConnEntity._remoteRevEntityGUID);
                    });

                    window.revLoadModules("revPluginModuleUserProfileFunctions", (revScriptModule) => {
                        let revProfileIconPath = window.revPluginModuleUserProfileFunctions.revGetUserIconPath(revConnEntity._revInfoEntity);
                        revProfileIconPath = window.REV_UPLOAD_FILES_DIR_PATH + "/" + revProfileIconPath;

                        let revProfileIconView = `<img class="revListingUserIconBlock revTabLink" src="${revProfileIconPath}" onerror="this.onerror=null;this.src='${window.REV_DEFAULT_USER_ICON_PATH}';">`;

                        document.getElementById(revIconId).innerHTML = revProfileIconView;
                    });
                });
            }

            document.getElementById(revConnectionListId).innerHTML = revConnectionListArr.join("");
        };

        revItemsListDraw();
    });

    let revRecentPostsId = "revRecentPosts_" + window.revGenUniqueId();
    let revRecentPostsCountId = "revRecentPostsCountId_" + window.revGenUniqueId();

    window.revSetInterval(revRecentPostsId, async () => {
        let url = window.REV_SITE_BASE_PATH + "/rev_api/get_rev_entities_posts_by_entity_guid_rel_type?relTypeValId=5&remoteRevEntityGUID=" + remoteRevEntityGUID;
        let revData = await window.revGetServerData_JSON_Async(url);

        let revDataArr = revData.filter;
        let revEntityPublishersArr = revData.revEntityPublishersArr;

        document.getElementById(revRecentPostsCountId).innerHTML = revDataArr.length;

        if (revShowRecentPosts) {
            let revRecentPostsArr = [];

            for (let i = 0; i < revDataArr.length; i++) {
                let revTimelineEntity = revDataArr[i];

                if (!revTimelineEntity) continue;

                let revProps = { revEntity: revTimelineEntity, revEntityPublishersArr: revEntityPublishersArr, revViewArea: "rev_min" };

                let revOverrideView = await window.revGetLoadedOverrideView(revTimelineEntity._revEntitySubType, revProps);

                if (!revOverrideView) continue;

                let revMenuAreaCommsServices = await window.revGetMenuAreaView("revListingItemOptionsMenuArea", revTimelineEntity);

                let revActivityViewListItemWrapper = `
                <div class="revPosRelative revFlexContainer">
                    ${revOverrideView}
                    <div class="revPosAbsolute revTabLink revFontSiteBlueTxtColor revFontSizeMedium revActivityViewListItemWrapperStyle_Control">${revMenuAreaCommsServices}</div>
                </div>
                `;

                revRecentPostsArr.push(revActivityViewListItemWrapper);

                if (i >= 2) break;
            }

            document.getElementById(revRecentPostsId).innerHTML = revRecentPostsArr.join("");
        }
    });

    let revItemLastSeenTime = "revItemLastSeenTime_" + window.revGenUniqueId();

    /** START MEMBER CLICK */
    let revMemberUserIconId = "revMemberUserIcon_" + window.revGenUniqueId();

    window.revSetInterval(revMemberUserIconId, () => {
        document.getElementById(revMemberUserIconId).addEventListener("click", (event) => {
            window.revUserIconClick(revVarArgs._remoteRevEntityGUID);
        });

        window.revLoadModules("revPluginModuleUserProfileFunctions", (revScriptModule) => {
            let revProfileIconPath = window.revPluginModuleUserProfileFunctions.revGetUserIconPath(revVarArgs._revInfoEntity);
            revProfileIconPath = window.REV_UPLOAD_FILES_DIR_PATH + "/" + revProfileIconPath;

            let revProfileIconView = `<img class="revListingUserIconBlock" src="${revProfileIconPath}" onerror="this.onerror=null;this.src='${window.REV_DEFAULT_USER_ICON_PATH}';">`;

            document.getElementById(revMemberUserIconId).innerHTML = revProfileIconView;
        });
    });

    let revMemberFullNames_Id = "revMemberFullNames_Id_" + window.revGenUniqueId();

    window.revSetInterval(revMemberFullNames_Id, () => {
        document.getElementById(revMemberFullNames_Id).addEventListener("click", (event) => {
            window.revUserIconClick(revVarArgs._remoteRevEntityGUID);
        });
    });
    /** END MEMBER CLICK */

    window.revSetInterval(revItemLastSeenTime, () => {
        var d = new Date();
        var x = document.getElementById(revItemLastSeenTime);
        x.innerHTML = window.revFormatDate(d, "dddd h:mmtt d MMM yyyy");
    });

    return `
    <div class="revFlexWrapper">
            <div id="${revMemberUserIconId}" class="revMemberUserIcon revTabLink"></div>
            <div class="revFlexContainer revContentDetailsContainer">
                <div class="revFlexWrapper revItemDetailsWrapper">
                    <div id="${revMemberFullNames_Id}" class="revTabLink revSmalllBoldBlue">${revMemberFullNames}</div>
                    <div id="revItemLastSeen" class="revItemLastSeen">
                        <span class="revItemLastSeenText">lAsT seeN : </span>
                        <span id="${revItemLastSeenTime}" class="revItemLastSeenTime"></span>
                    </div>
                </div>
                <div class="revFlexWrapper revConnectionsWrapper">
                    <div class="revFlexContainer">
                        <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper revConnectionsTitleWrapper">
                            <span class="revConnectionsTitleText">connections :</span>
                            <span id="${revConnsCountId}" class="revConnectionsCount"></span>
                        </div>
                        <div id="${revConnectionListId}" class="revFlexWrapper revFlexWrapperScroll revConnectionList"></div>
                    </div>
                    <div class="revFlexWrapper revSiteMemberListingOptionsTabsWrapper">
                        <span class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revOptiontTab"><i class="fa fa-user-plus"></i></span>
                        <span class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revOptiontTab"><i class="fa fa-envelope"></i></span>
                        <span class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revOptiontTab"><i class="fas fa-list"></i></span>
                    </div>
                </div>
                <div class="revRecentActivityContainer">
                    <div class="revRecentActivityTitle">
                        <i class="fab fa-buromobelexperte"></i><i class="fa fa-arrow-right"></i>
                    </div>
                    <div class="revRecentActivity">rEceNt posTs : <span id="${revRecentPostsCountId}" class="revRecentPostsCount"></span></div>
                </div>
                <div id="${revRecentPostsId}" class="revFlexContainer revRecentPostsContainer"></div>
            </div>
        </div>
    `;
};

module.exports.revPageViewWidget = revPageViewWidget;
