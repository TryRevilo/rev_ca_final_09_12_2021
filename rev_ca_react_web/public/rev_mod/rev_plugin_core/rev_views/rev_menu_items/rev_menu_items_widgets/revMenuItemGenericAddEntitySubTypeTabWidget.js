var revMenuItemWidget = (revVarArgs) => {
    let revTabId = revVarArgs.revId;

    window.revSetInterval(revTabId, () => {
        document.getElementById(revTabId).addEventListener('click', async (event) => {
            let revEntityFormSubType = revVarArgs._revEntitySubType;

            if (revVarArgs.revEntityFormSubType) revEntityFormSubType = revVarArgs.revEntityFormSubType;

            let revForm = await window.revGetForm(revEntityFormSubType, revVarArgs);

            let revFloatingOptionsMenuName = null;
            if (revVarArgs.revFloatingOptionsMenuName) revFloatingOptionsMenuName = revVarArgs.revFloatingOptionsMenuName;

            window.revDrawMainContentArea({ 'revData': revVarArgs, 'revLoadedPageView': revForm, 'revFloatingOptionsMenuName': revFloatingOptionsMenuName });
        });
    });

    return `<span id="${revTabId}"><i class="revFontSiteBlueTxtColor revFontSizeMedium revTabLink fa fa-plus"></i></span>`;
}

module.exports.revMenuItemWidget = revMenuItemWidget;