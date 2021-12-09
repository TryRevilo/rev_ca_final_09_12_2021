var revPageViewWidget = async (revVarArgs) => {
    if (!revVarArgs || window.revIsEmptyJSONObject(revVarArgs._revInfoEntity)) {
        return;
    }

    let revInfoEntity = revVarArgs._revInfoEntity;

    let revEntityMetadataList = revInfoEntity._revEntityMetadataList;

    let revEntityName = window.revGetMetadataValue(revEntityMetadataList, "rev_entity_name");
    revEntityName = window.revTruncateString(revEntityName, 85);

    let revSchoolName = window.revGetMetadataValue(revEntityMetadataList, "rev_school_name");
    revSchoolName = window.revTruncateString(revSchoolName, 105);

    let revSpaceObjectBriefInfoSmall_Id = "revSpaceObjectBriefInfoSmall_Id_" + window.revGenUniqueId();

    window.revSetInterval(revSpaceObjectBriefInfoSmall_Id, () => {
        document.getElementById(revSpaceObjectBriefInfoSmall_Id).addEventListener("click", async (event) => {
            window.revLoadModules("revPluginModuleLocalHistoryLib", async (revScriptModule) => {
                let revHistCallbackFunc = async (revHistVarArgsData) => {
                    let revVarArgsData = revHistVarArgsData.revVarArgsData;

                    let revLoadedPageView = await window.revGetLoadedPageView("revPageViewSpaceProfilePage", revVarArgsData);
                    window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revLoadedPageView, "revFloatingOptionsMenuName": "123" });
                };

                window.revPluginModuleLocalHistoryLib.revAddNewHistoryItem({ "revDataEntityGUID": revVarArgs._remoteRevEntityGUID, "revVarArgsData": revVarArgs, "revHistCallbackFunc": revHistCallbackFunc });

                let revLoadedPageView = await window.revGetLoadedPageView("revPageViewSpaceProfilePage", window.revCloneJsObject(revVarArgs));
                window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revLoadedPageView, "revFloatingOptionsMenuName": "123" });
            });
        });
    });

    let revDrawAdmins = (revVarArgs) => {
        let revAdminViewsArr = [];

        if (!revVarArgs.revAdminsArr) return;

        let revAdminsArr = revVarArgs.revAdminsArr;

        for (let i = 0; i < revAdminsArr.length; i++) {
            if (!revAdminsArr[i]) continue;

            let revAdminIconTab_Id = "revAdminIconTab_Id_" + window.revGenUniqueId();

            revAdminViewsArr.push(`<div id="${revAdminIconTab_Id}" class="revTabLink revSpaceBriefAdminIcon_Brief"></div>`);

            window.revSetInterval(revAdminIconTab_Id, () => {
                document.getElementById(revAdminIconTab_Id).addEventListener("click", (event) => {
                    window.revUserIconClick(revAdminsArr[i]._remoteRevEntityGUID);
                });

                window.revLoadModules("revPluginModuleUserProfileFunctions", (revScriptModule) => {
                    let revProfileIconPath = window.revPluginModuleUserProfileFunctions.revGetUserIconPath(revAdminsArr[i]._revInfoEntity);
                    revProfileIconPath = window.REV_UPLOAD_FILES_DIR_PATH + "/" + revProfileIconPath;

                    let revProfileIconView = `<img class="revListingIconCurvedSmall" src=${revProfileIconPath} onerror="this.onerror=null;this.src='${window.REV_DEFAULT_USER_ICON_PATH}';" />`;

                    document.getElementById(revAdminIconTab_Id).innerHTML = revProfileIconView;
                });
            });

            if (i == 3) break;
        }

        let revAdminsArrLen = revAdminsArr.length;

        let revAdminTxt = " Admin";
        let revAdminArrow = '<i class="fas fa-arrows-alt-h"></i>';

        if (revVarArgs._revEntityOwnerGUID == window.REV_LOGGED_IN_ENTITY_GUID) {
            revAdminArrow = '<i class="fa fa-plus"></i>';
        }

        if (revAdminsArrLen > 0 && revAdminsArrLen < 4) {
            revAdminTxt = " Admins";
        } else if (revAdminsArrLen > 4) revAdminTxt = "+" + (revAdminsArrLen - 4) + " other Admins";

        return `
            <div class="revFlexWrapper revBriefSpaceDetailAcademic_HeaderAreaWrapper">
                ${revAdminViewsArr.join("")}
                <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revAddAdminTabWrapper">
                    <div class="revAddAdminIconTab">${revAdminArrow}</div>
                    <div class="revBriefSpaceExtraFounders_HeaderArea">${revAdminTxt}</div>
                </div>
            </div>
        `;
    };

    let revSpaceIconURL = window.revGetDefaultEntityIcon(revInfoEntity);

    return `
    <div id="${revSpaceObjectBriefInfoSmall_Id}" class="revTabLink revFlexWrapper">
        <div class="revSpaceIcon_Brief">
            <img class="revListingIconCurvedTiny" src="${revSpaceIconURL}" onerror="this.onerror=null;this.src='${window.REV_DEFAULT_USER_ICON_PATH}';">
        </div>
        <div class="revFlexContainer revEntityBriefFlexRightContainer_Brief">
            <div class="revEntityDescContainer_Brief">
                <div class="revFontSiteBlueTxtColor revSpaceEntityName_Brief">${revEntityName}</div>
                <div class="revFontSiteGreyTxtColor revFontSizeNormal revScoolName_BriefInfo">${revSchoolName}</div>
            </div>
            ${revDrawAdmins(revVarArgs)}
        </div>
    </div>
    `;
};

module.exports.revPageViewWidget = revPageViewWidget;
