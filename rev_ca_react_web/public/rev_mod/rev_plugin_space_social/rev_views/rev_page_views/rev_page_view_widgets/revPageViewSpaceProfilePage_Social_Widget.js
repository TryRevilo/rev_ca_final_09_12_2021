var revPageViewWidget = async (revVarArgs) => {

    let revPageViewPageNavHeaderId = 'revPageViewPageNavHeaderId_' + window.revGenUniqueId();

    window.revSetInterval(revPageViewPageNavHeaderId, async () => {
        await window.revGetLoadedPageView('revPageViewPageNavHeader', { revEntity: { '_revEntitySubType': 'rev_space' } }, async (revLoadedPageView) => {
            document.getElementById(revPageViewPageNavHeaderId).innerHTML = revLoadedPageView;
        });
    });

    let revPageViewStoreBriefInfoId = window.revGenUniqueId();

    window.revSetInterval(revPageViewStoreBriefInfoId, async () => {
        await window.revGetLoadedPageView('revPageViewSpaceBriefInfo', window.REV_LOGGED_IN_ENTITY, async (revLoadedPageView) => {
            document.getElementById(revPageViewStoreBriefInfoId).innerHTML = revLoadedPageView;
        });
    });

    return `
    <div class="revFlexContainer revPageRightBorderedContainer">
        <div id="${revPageViewPageNavHeaderId}" class="revFlexWrapper revPageViewPageNavHeader"></div>
        <div id="${revPageViewStoreBriefInfoId}" class="revFlexWrapper revPageViewSpaceBriefInfoWrapper"></div>
        <div class="revFlexContainer revSpaceNoticiasContainer">
        </div>
    </div>
    `;
}

module.exports.revPageViewWidget = revPageViewWidget;