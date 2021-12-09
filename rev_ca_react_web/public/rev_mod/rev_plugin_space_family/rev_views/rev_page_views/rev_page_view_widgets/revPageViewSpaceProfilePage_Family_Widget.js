var revPageViewWidget = async (revVarArgs) => {
    let revPageViewPageNavHeaderId = 'revPageViewPageNavHeaderId_' + window.revGenUniqueId();

    window.revSetInterval(revPageViewPageNavHeaderId, async () => {
        await window.revGetLoadedPageView('revPageViewPageNavHeader', { revEntity: { '_revEntitySubType': 'rev_space' } }, async (revLoadedPageView) => {
            document.getElementById(revPageViewPageNavHeaderId).innerHTML = revLoadedPageView;
        });
    });

    let revPageViewStoreBriefInfoId = window.revGenUniqueId();

    window.revSetInterval(revPageViewStoreBriefInfoId, async () => {
        await window.revGetLoadedPageView('revPageViewSpaceHeaderArea_Family', revVarArgs, async (revLoadedPageView) => {
            document.getElementById(revPageViewStoreBriefInfoId).innerHTML = revLoadedPageView;
        });
    });

    let revFamilyKiwiAreaId = 'revFamilyKiwiAreaId';

    window.revSetInterval(revFamilyKiwiAreaId, async () => {
        let revKiwiForm = await window.revGetForm('rev_kiwi', revVarArgs);
        document.getElementById(revFamilyKiwiAreaId).innerHTML = revKiwiForm;
    });

    return `
    <div class="revFlexContainer revPageRightBorderedContainer">
        <div id="${revPageViewPageNavHeaderId}" class="revFlexWrapper revPageViewPageNavHeader"></div>
        <div id="${revPageViewStoreBriefInfoId}" class="revFlexWrapper"></div>
        <div class="revFlexContainer revSpaceNoticiasContainer"></div>
        <div id="${revFamilyKiwiAreaId}" class="revFamilyKiwiAreaWrapper"></div>
    </div>
    `;
}

module.exports.revPageViewWidget = revPageViewWidget;