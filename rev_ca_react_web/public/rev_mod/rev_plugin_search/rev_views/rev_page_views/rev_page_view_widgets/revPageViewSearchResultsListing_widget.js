var revPageViewWidget = async (revVarArgs) => {
    let revNoticiasDataFilter = revVarArgs.filter;

    let revNoticiasPageHeader = window.revPageHeader("NotifiATioNs");

    let revPageViewPageNavHeader = await window.revGetLoadedPageView("revPageViewPageNavHeader", null);

    let revRetPageView = async () => {
        let revNoticiasGrpContainerBodyView = (revInnerContent) => {
            return `
            <div class="revFlexContainer">
                ${revInnerContent}
            </div>`;
        };

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

            document.getElementById(revConnReqsList_Id).innerHTML = revNoticiasGrpContainerBodyView(revNoticiasViewAreasArr.join(""));
        });

        return `
            <div class="revFlexContainer">
                <div class="revFlexContainer revPageHeaderAreaContainer">
                    ${revNoticiasPageHeader}
                    <div class="revFlexWrapper revPageViewTitledPageNavHeader">${revPageViewPageNavHeader}</div>
                </div>
                <div id="${revConnReqsList_Id}" class="revFlexContainer"></div>
            </div>
        `;
    };

    return await revRetPageView();
};

module.exports.revPageViewWidget = revPageViewWidget;
