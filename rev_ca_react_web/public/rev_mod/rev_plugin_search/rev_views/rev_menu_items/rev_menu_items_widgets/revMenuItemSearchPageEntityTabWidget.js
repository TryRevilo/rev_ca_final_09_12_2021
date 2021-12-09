var revMenuItemWidget = (revVarArgs) => {
    let revEntityFloatingTabId = "revFilterId_" + window.revGenUniqueId();

    window.revSetInterval(revEntityFloatingTabId, () => {
        document.getElementById(revEntityFloatingTabId).addEventListener("click", async (event) => {
            let revFormViewContextSearch = await window.revGetForm("revFormViewContextSearch", revVarArgs);

            window.revToggleSwitchArea(revFormViewContextSearch);
        });
    });

    return `
        <div id="${revEntityFloatingTabId}" class="revTabLink revFontSiteBlueTxtColor revFlexWrapper revFilterOptionWrapper">
            <div class="revFontSizeMedium revSearchOptionIcon"><i class="fas fa-search"></i></div>
        </div>
        `;
};

module.exports.revMenuItemWidget = revMenuItemWidget;
