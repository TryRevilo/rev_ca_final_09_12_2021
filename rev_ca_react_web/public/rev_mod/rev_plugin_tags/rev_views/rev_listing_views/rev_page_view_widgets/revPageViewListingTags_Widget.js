var revPageViewWidget = async (revVarArgs) => {
    let revRetPageView = "";

    if (revVarArgs.length > 0) {
        let revTagsViewArr = [];

        for (let i = 0; i < revVarArgs.length; i++) {
            let revTagMetadataVal = revVarArgs[i];

            let revTagLink_Id = i + "_revTagLink_Id_" + window.revGenUniqueId();

            window.revSetInterval(revTagLink_Id, () => {
                document.getElementById(revTagLink_Id).addEventListener("click", async (event) => {
                    let revPassVarArgs = window.revCloneJsObject(revVarArgs);
                    revPassVarArgs["revSearchTxt"] = revTagMetadataVal;
                    revPassVarArgs["revEntitySubTypesArr"] = null;
                    // revPassVarArgs["revEntityOwnerGUID"] = revVarArgs._remoteRevEntityGUID;
                    revPassVarArgs["revContainerGUID"] = revVarArgs._remoteRevEntityGUID;

                    let revPageViewListingSerachResults = await window.revGetLoadedPageView("revPageViewListingSerachResults", revPassVarArgs);
                    window.revDrawMainContentArea({ "revData": revPassVarArgs, "revLoadedPageView": revPageViewListingSerachResults, "revFloatingOptionsMenuName": "123" });
                });
            });

            revTagsViewArr.push(`
                <div id="${revTagLink_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revMetadataTagValWrapper">
                    <div class="revFontSizeSmall revTagsPointerIcon"><i class="fas fa-hashtag"></i></div>
                    <div class="revMetadataTagVal">${revTagMetadataVal}</div>
                </div>
            `);
        }

        revRetPageView = `
            <div class="revFlexWrapper revFlexWrapperScroll">${revTagsViewArr.join("")}</div>
        `;
    }

    return revRetPageView;
};

module.exports.revPageViewWidget = revPageViewWidget;
