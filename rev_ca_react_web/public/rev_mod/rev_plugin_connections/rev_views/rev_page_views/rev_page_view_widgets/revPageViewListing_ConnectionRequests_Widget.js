var revPageViewWidget = async (revVarArgs) => {
    let revNoticiasPageHeader = window.revPageHeader("connEcTion rEQuEsTs");

    let revPageViewPageNavHeader = await window.revGetLoadedPageView("revPageViewPageNavHeader", null);

    let revFormView_ConnectionRequestsListing = "";

    try {
        let revPassVarArgs = window.revCloneJsObject(revVarArgs);
        revPassVarArgs["revActionCallbackAction"] = (revParamsVarArgs) => {
            console.log("revParamsVarArgs >>> " + revParamsVarArgs);
        };

        revFormView_ConnectionRequestsListing = await window.revGetForm("revFormView_ConnectionRequestsListing", revPassVarArgs);
    } catch (error) {
        console.log("error -> revPageViewListingSpaceInvitationsWidget.js -> revFormView_ConnectionRequestsListing -> " + error);
    }

    return `
        <div class="revFlexContainer">
            <div class="revFlexContainer revPageHeaderAreaContainer">
                ${revNoticiasPageHeader}
                <div class="revFlexWrapper revPageViewTitledPageNavHeader">${revPageViewPageNavHeader}</div>
            </div>
            <div class="revFlexContainer revEntitiesNoticiasDetailListingsContainer">${revFormView_ConnectionRequestsListing}</div>
        </div>
    `;
};

module.exports.revPageViewWidget = revPageViewWidget;
