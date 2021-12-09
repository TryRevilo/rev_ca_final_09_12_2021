var revPageViewWidget = async (revVarArgs) => {
    let revNoticiasPageHeader = window.revPageHeader("Space Invitations");

    let revPageViewPageNavHeader = await window.revGetLoadedPageView("revPageViewPageNavHeader", null);

    let revFormViewNoticiaEntityListingConfirm = "";

    try {
        let revPassVarArgs = window.revCloneJsObject(revVarArgs);
        revPassVarArgs["revActionCallbackAction"] = (revParamsVarArgs) => {
            console.log("revParamsVarArgs >>> " + revParamsVarArgs);
        };

        revFormViewNoticiaEntityListingConfirm = await window.revGetForm("revFormViewNoticiaEntityListingConfirm", revPassVarArgs);
    } catch (error) {
        console.log("error -> revPageViewListingSpaceInvitationsWidget.js -> revFormViewNoticiaEntityListingConfirm -> " + error);
    }

    return `
        <div class="revFlexContainer">
            <div class="revFlexContainer revPageHeaderAreaContainer">
                ${revNoticiasPageHeader}
                <div class="revFlexWrapper revPageViewTitledPageNavHeader">${revPageViewPageNavHeader}</div>
            </div>
            <div class="revFlexContainer revEntitiesNoticiasDetailListingsContainer">${revFormViewNoticiaEntityListingConfirm}</div>
        </div>
    `;
};

module.exports.revPageViewWidget = revPageViewWidget;
