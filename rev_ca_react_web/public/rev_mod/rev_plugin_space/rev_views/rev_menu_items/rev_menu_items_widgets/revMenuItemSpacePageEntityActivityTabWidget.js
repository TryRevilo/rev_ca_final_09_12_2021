var revMenuItemWidget = (revVarArgs) => {
    let revEntityFloatingTab_Id = 'revSpaceActivityId_' + window.revGenUniqueId();

    window.revSetInterval(revEntityFloatingTab_Id, () => {
        document.getElementById(revEntityFloatingTab_Id).addEventListener('click', async (event) => {
            let revPageViewSpaceActivity = await window.revDownloadContextView('revPageContextViewSpaceActivity', revVarArgs._revEntitySubType, revVarArgs);
            document.getElementById('revPageContextViewSpaceActivityId').innerHTML = revPageViewSpaceActivity;
        });
    });

    return `
        <div id="${revEntityFloatingTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFlexWrapper revFilterOptionWrapper">
            <div class="revFontSizeMedium revFilterOptionIcon"><i class="fas fa-chart-line"></i></div>
        </div>
        `;
}

module.exports.revMenuItemWidget = revMenuItemWidget;