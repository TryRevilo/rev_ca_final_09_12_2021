var revPageViewWidget = async (revVarArgs) => {
    let revMenuAreaCommsServices = await window.revGetMenuArea("revMenuAreaCommsServices", revVarArgs);

    let revPageViewImportContacts = await window.revGetLoadedPageViewAreaContainer("revPageViewImportContacts", window.REV_LOGGED_IN_ENTITY);

    window.revSetInterval("revCommsContentArea", async () => {
        let revLoadedPageView = await window.revGetLoadedPageView("revListPageViewImMessages", window.REV_LOGGED_IN_ENTITY);
        document.getElementById("revCommsContentArea").innerHTML = revLoadedPageView;
    });

    return `
    <div class="revFlexContainer revCommsContainer">
        <div class="revMenuAreaCommsServices">${revMenuAreaCommsServices}</div>
        <div class="revFlexWrapper revPageViewCommsHeaderAreaWrapper">${revPageViewImportContacts}</div>
        <div id="revCommsContentArea" class="revFlexContainer revCommsContentContainer"></div>
    </div>
    `;
};

module.exports.revPageViewWidget = revPageViewWidget;
