var revPageViewWidget = async (revVarArgs) => {
    /** PAGE OWNER MENU AREA OPTIONS */
    let revUserOptionsMenuArea = await window.revGetMenuArea("revActivityItemsListingView", revVarArgs.revLoggedInEntityData);

    window.revSetInterval("revEntityActivityContentArea", () => {
        document.getElementById("revEntityActivityContentArea").innerHTML = revVarArgs.revPageContent;
    });

    return `
    <div class="revFlexContainer revContentContainer">
        <div class="revFlexWrapper">${revUserOptionsMenuArea}</div>
        <div id="revEntityActivityContentArea" class="revFlexContainer"></div>
    </div>
    `;
};

module.exports.revPageViewWidget = revPageViewWidget;
