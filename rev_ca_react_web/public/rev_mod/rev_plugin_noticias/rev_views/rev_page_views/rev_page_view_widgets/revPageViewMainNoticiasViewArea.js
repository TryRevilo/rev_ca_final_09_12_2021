var revPageViewWidget = async (revVarArgs) => {
    let revNoticiasDataFilter = revVarArgs.filter;

    let revRetPageView = async () => {
        /** REV START DRAW CONNECTIONS LISTS */
        let revConnReqsList_Id = "revConnReqsList_Id";

        window.revSetInterval(revConnReqsList_Id, async () => {
            let revNoticiasViewAreasArr = [];

            for (let i = 0; i < revNoticiasDataFilter.length; i++) {
                let revNoticiDataItem = revNoticiasDataFilter[i];

                let revNameId = revNoticiDataItem.revNameId;
                let revNoticiaCount = revNoticiDataItem.revNoticiaCount;

                let revPageContextViewNoticiasListings = await window.revDownloadContextView("revPageContextViewNoticiasListings", revNameId, revNoticiDataItem);

                if (revPageContextViewNoticiasListings) {
                    revNoticiasViewAreasArr.push(revPageContextViewNoticiasListings);
                } else {
                    revPageContextViewNoticiasListings = await window.revGetLoadedOverrideView("rev_noticia", revNoticiDataItem);
                    revNoticiasViewAreasArr.push(revPageContextViewNoticiasListings);
                }
            }

            document.getElementById(revConnReqsList_Id).innerHTML = revNoticiasViewAreasArr.join("");
        });

        /** REV START HEADER AREA */
        let revPageViewPageNavHeader = await window.revGetLoadedPageView("revPageViewPageNavHeader", { "revDafaultPagePagination": true });
        let revUserOptionsMenuArea = await window.revGetMenuArea("revActivityItemsListingView", window.REV_LOGGED_IN_ENTITY);
        let revPageHeader = window.revPageHeader("NotifiATioNs");
        /** REV END HEADER AREA */

        return `
            <div class="revFlexContainer">
                <div class="revFlexContainer revPageHeaderAreaContainer">
                    <div class="revFlexWrapper revPageViewTitledPageNavHeaderWrapper_AdForm">${revPageViewPageNavHeader}</div>
                    <div class="revFlexWrapper revUserOptionsMenuAreaWrapper_AdForm">${revUserOptionsMenuArea}</div>
                    ${revPageHeader}
                </div>
                <div id="${revConnReqsList_Id}" class="revFlexContainer"></div>
            </div>
        `;
    };

    return await revRetPageView();
};

module.exports.revPageViewWidget = revPageViewWidget;
