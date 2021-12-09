var revPageViewWidget = async (revVarArgs) => {
    if (!revVarArgs || !revVarArgs._revInfoEntity) {
        return "<div>ERR : revPageViewSpaceBriefInfo_Academic_Widget</div>";
    }

    let revPageViewSpaceBriefInfoId = "revPageViewSpaceBriefInfoId_" + window.revGenUniqueId();

    window.revSetInterval(revPageViewSpaceBriefInfoId, () => {
        window.revGetLoadedPageView("revPageViewSpaceHeaderArea_Academic", revVarArgs, (revLoadedPageView) => {
            document.getElementById(revPageViewSpaceBriefInfoId).innerHTML = revLoadedPageView;
        });
    });

    let revFormatLongDate = window.revFormatLongDate(revVarArgs._revTimePublished);

    let revProfilePicsAlbumViewId = "revProfilePicsAlbumViewId_" + window.revGenUniqueId();

    let revEntityInfoAlbumArr = window.revGetEntityChildren_By_Subtype(revVarArgs._revInfoEntity._revEntityChildrenList, "rev_pics_album");
    if (Array.isArray(revEntityInfoAlbumArr)) {
        revEntityInfoAlbumArr = revEntityInfoAlbumArr[0];

        window.revSetInterval(revProfilePicsAlbumViewId, async () => {
            let revPicsOverrideView = await window.revGetLoadedOverrideView("rev_photo", revEntityInfoAlbumArr);

            if (revPicsOverrideView) document.getElementById(revProfilePicsAlbumViewId).innerHTML = revPicsOverrideView;
        });
    }

    return `
    <div class="revFlexContainer">
        <div id="${revPageViewSpaceBriefInfoId}" class="revFlexWrapper"></div>
        <div class="revFlexWrapper revFormatLongDateWrapper">
            <div class="revSmalllBold">Created :</div>
            <div class="revFontSiteGreyTxtColor revFontSizeNormal revPubDateVal">${revFormatLongDate}</div>
        </div>
        <duv id="${revProfilePicsAlbumViewId}" class="revProfilePicsAlbumView"></div>
        <div class="revFlexWrapper revPicsAlbumWrapper"></div>
    </div>
    `;
};

module.exports.revPageViewWidget = revPageViewWidget;
