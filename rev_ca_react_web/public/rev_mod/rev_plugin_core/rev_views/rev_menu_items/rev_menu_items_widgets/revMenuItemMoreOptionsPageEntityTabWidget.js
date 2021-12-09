var revMenuItemWidget = (revVarArgs) => {

    let revEntityFloatingTabId = 'revMoreId_' + window.revGenUniqueId();

    window.revSetInterval(revEntityFloatingTabId, () => {
        document.getElementById(revEntityFloatingTabId).addEventListener('click', (event) => {
            console.log('MORE');
        })
    });

    return `
        <div id="${revEntityFloatingTabId}" class="revTabLink revFontSiteBlueTxtColor revFlexWrapper revFilterOptionWrapper">
            <div class="revFontSizeMedium revFilterOptionIcon"><i class="fas fa-list"></i></div>
        </div>
        `;
}

module.exports.revMenuItemWidget = revMenuItemWidget;