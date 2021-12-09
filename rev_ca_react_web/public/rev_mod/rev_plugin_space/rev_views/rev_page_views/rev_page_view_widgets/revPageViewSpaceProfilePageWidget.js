var revPageViewWidget = async (revVarArgs) => {
    let revSpacePageViewPageNavHeader_Id = "revSpacePageViewPageNavHeader_Id_" + window.revGenUniqueId();

    window.revSetInterval(revSpacePageViewPageNavHeader_Id, async () => {
        let revLoadedPageView = await window.revGetLoadedPageView("revPageViewPageNavHeader", { "revEntity": revVarArgs, "_revEntitySubType": revVarArgs._revEntitySubType });
        document.getElementById(revSpacePageViewPageNavHeader_Id).innerHTML = revLoadedPageView;
    });

    let revPageContextViewSpaceActivity_Id = "revPageContextViewSpaceActivity_Id";

    window.revSetInterval(revPageContextViewSpaceActivity_Id, async () => {
        let revPageContentAreaRendererCallback = (revCallbackHTML) => {
            document.getElementById(revPageContextViewSpaceActivity_Id).innerHTML = `<div class="revFlexContainer revImportSpaceContactsContainer">${revCallbackHTML}</div>`;
        };

        let revPassVarArgs = window.revCloneJsObject(revVarArgs);
        revPassVarArgs["revPageContentAreaRendererCallback"] = revPageContentAreaRendererCallback;

        let revPageViewSpaceActivity = await window.revDownloadContextView("revPageContextViewSpaceActivity", revVarArgs._revEntitySubType, revPassVarArgs);
        document.getElementById(revPageContextViewSpaceActivity_Id).innerHTML = revPageViewSpaceActivity;

        /** REV RE-DRAW OPTIONS MENU AREA */
        window.revAppendFloatingOptionsMenuArea(revPassVarArgs);
    });

    return `
    <div class="revFlexContainer">
        <div id="${revSpacePageViewPageNavHeader_Id}" class="revFlexWrapper revPageViewPageNavHeader"></div>
        <div id="${revPageContextViewSpaceActivity_Id}" class="revFlexContainer revPageContextViewSpaceActivityContainer"></div>
    </div>
    `;
};

module.exports.revPageViewWidget = revPageViewWidget;
