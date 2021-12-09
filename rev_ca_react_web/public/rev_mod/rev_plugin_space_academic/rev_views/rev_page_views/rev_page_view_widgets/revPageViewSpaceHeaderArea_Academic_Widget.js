var revPageViewWidget = async (revVarArgs) => {
    let revInfoEntity = revVarArgs._revInfoEntity;

    let revEntityInfoMetadataList = revInfoEntity._revEntityMetadataList;

    let revEntityName = window.revGetMetadataValue(revEntityInfoMetadataList, "rev_entity_name");
    revEntityName = window.revTruncateString(revEntityName, 85);

    let revSchoolName = window.revGetMetadataValue(revEntityInfoMetadataList, "rev_school_name");
    revSchoolName = window.revTruncateString(revSchoolName, 44);

    let revDrawAdmins = (revVarArgs) => {
        let revAdminViewsArr = [];

        if (!revVarArgs.revAdminsArr) return;

        let revAdminsArr = revVarArgs.revAdminsArr;

        for (let i = 0; i < revAdminsArr.length; i++) {
            let revIconPath = window.revGetEntityIcon(revAdminsArr[i]);
            revIconPath = window.REV_UPLOAD_FILES_DIR_PATH + "/" + revIconPath;

            let revAdminIconTab_Id = "revAdminIconTab_Id_" + window.revGenUniqueId();

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

            revAdminViewsArr.push(`<div id="${revAdminIconTab_Id}" class="revTabLink revSpaceBriefAdminIcon_HeaderArea"></div>`);

            if (i == 3) break;
        }

        let revAdminsArrLen = revAdminsArr.length;

        let revAdminTxt = "Admin";
        let revAdminArrow = '<i class="fas fa-arrows-alt-h"></i>';

        if (revVarArgs._revEntityOwnerGUID == window.REV_LOGGED_IN_ENTITY_GUID) {
            revAdminArrow = '<i class="fa fa-plus"></i>';
        }

        if (revAdminsArrLen > 0 && revAdminsArrLen < 4) {
            revAdminTxt = "Admins";
        } else if (revAdminsArrLen > 4) revAdminTxt = "+" + (revAdminsArrLen - 4) + " other Admins";

        return `
            <div class="revFlexWrapper revBriefSpaceDetailWrapper_HeaderAreaWrapper">
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
    <div class="revFlexWrapper">
        <div class="revSpaceIcon_HeaderArea">
            <img class="revListingUserIconBlock" src="${revSpaceIconURL}" onerror="this.onerror=null;this.src='${window.REV_DEFAULT_USER_ICON_PATH}';">
        </div>
        <div class="revFlexContainer revEntityBriefFlexRightContainer_HeaderArea">
            <div class="revFlexContainer revEntityDescContainer_HeaderArea">
                <div class="revFontSiteGreyTxtColor revSpaceEntityName_HeaderArea">${revEntityName}</div>
                <div class="revSpaceEntityName_HeaderAreaDivider"></div>
                <div class="revFontSiteGreyTxtColor revFontSizeNormal revSpaceEntitySchoolName_HeaderArea">${revSchoolName}</div>
            </div>
            ${revDrawAdmins(revVarArgs)}
        </div>
    </div>
    `;
};

module.exports.revPageViewWidget = revPageViewWidget;
