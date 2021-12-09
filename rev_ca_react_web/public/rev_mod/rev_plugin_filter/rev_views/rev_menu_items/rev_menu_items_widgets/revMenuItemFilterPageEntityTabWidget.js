var revMenuItemWidget = (revVarArgs) => {
    let revEntityFloatingTabId = "revFilterId_" + window.revGenUniqueId();

    window.revSetInterval(revEntityFloatingTabId, () => {
        document.getElementById(revEntityFloatingTabId).addEventListener("click", async (event) => {
            let revFormViewFilterPageContentSearch = await window.revGetForm("revFormViewFilterPageContentSearch", revVarArgs);

            window.revToggleSwitchArea(`
                <div class="revFlexContainer revFilteroptionsForm_SwitchArea_Container">
                    ${revFormViewFilterPageContentSearch}
                </div>
            `);
        });
    });

    return `
        <div id="${revEntityFloatingTabId}" class="revTabLink revFontSiteBlueTxtColor revFlexWrapper revFilterOptionWrapper">
            <div class="revFontSizeMedium revFilterOptionIcon"><i class="fas fa-sort-alpha-down"></i></div>
        </div>
        `;
};

module.exports.revMenuItemWidget = revMenuItemWidget;
