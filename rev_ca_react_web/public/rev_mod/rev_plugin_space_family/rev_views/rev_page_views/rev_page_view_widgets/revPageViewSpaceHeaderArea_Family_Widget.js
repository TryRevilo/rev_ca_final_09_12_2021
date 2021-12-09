var revPageViewWidget = async (revVarArgs) => {
    if (!revVarArgs || window.revIsEmptyJSONObject(revVarArgs._revInfoEntity)) {
        return;
    }

    let revInfoEntity = revVarArgs._revInfoEntity;

    let revEntityMetadataList = revInfoEntity._revEntityMetadataList;

    let revEntityName = window.revGetMetadataValue(revEntityMetadataList, "rev_entity_name");
    let revFamilyName = window.revGetMetadataValue(revEntityMetadataList, "rev_family_name");

    let revAdminsWrapperId = "revAdminsWrapperId";

    window.revSetInterval(revAdminsWrapperId, () => {
        let revAdminViewsArr = [];

        if (revVarArgs.revAdminsArr) {
            let revAdminsArr = revVarArgs.revAdminsArr;

            for (let i = 0; i < revAdminsArr.length; i++) {
                let revIconPath = window.revGetEntityIcon(revAdminsArr[i]);
                revIconPath = window.REV_UPLOAD_FILES_DIR_PATH + "/" + revIconPath;

                let revIconImage = window.revReadFileToImageFromURL(revIconPath, "revListingUserIconBlock");

                let revAdminView = `
                <div class="revSpaceBriefAdminIcon_HeaderArea">${revIconImage}</div>
            `;

                revAdminViewsArr.push(revAdminView);

                if (i == 3) break;
            }

            let revAdminsArrLen = revAdminsArr.length;

            let revAdminTxt = "Admin";
            let revAdminArrow = '<i class="fa fa-plus"></i>';

            if (revVarArgs._revEntityOwnerGUID == window.REV_LOGGED_IN_ENTITY_GUID) {
                revAdminArrow = '<i class="fas fa-arrows-alt-h"></i>';
            }

            if (revAdminsArrLen > 0 && revAdminsArrLen < 4) {
                revAdminTxt = "Admins";
            } else if (revAdminsArrLen > 4) {
                revAdminTxt = "+" + (revAdminsArrLen - 4) + " other Admins";
            }

            document.getElementById(revAdminsWrapperId).innerHTML = revAdminViewsArr.join("") + `<div class="revFontSiteBlueTxtColor revFontSizeNormal revBriefSpaceExtraFounders_HeaderArea">${revAdminArrow + revAdminTxt}</div>`;
        }
    });

    let revSpaceIconURL = window.revGetDefaultEntityIcon(revInfoEntity);

    return `
    <div class="revFlexWrapper">
        <div class="revSpaceIcon_HeaderArea">
            <img class="revListingIconCurvedTiny" src="${revSpaceIconURL}" onerror="this.onerror=null;this.src='${window.REV_DEFAULT_USER_ICON_PATH}';">
        </div>
        <div class="revFlexContainer revEntityBriefFlexRightContainer_HeaderArea">
            <div class="revFlexContainer revEntityDescContainer_HeaderArea">
                <div class="revFontSiteBlueTxtColor revSpaceEntityName_HeaderArea">${revEntityName}</div>
                <div class="revFontSiteGreyTxtColor revFontSizeNormal revFamilyName_BriefInfo">${revFamilyName} Family</div>
            </div>
            <div id="${revAdminsWrapperId}" class="revFlexWrapper revBriefSpaceDetailFamily_HeaderAreaWrapper"></div>
        </div>
    </div>
    `;
};

module.exports.revPageViewWidget = revPageViewWidget;
