var revPluginOverrideViewWidget = async (revVarArgs) => {
    let revNoticiasGrpHeaderView = (revHeaderTxt, revIcon) => {
        if (!revIcon) revIcon = "";

        return `
        <div class="revFontSiteGreyTxtColor revFontSizeNormal revCenterTxtVertically revNoticiasGrpHeaderView">
            ${revIcon}
            &nbsp;
            <span> ${revHeaderTxt}</span>
        </div>`;
    };

    if (!revVarArgs) {
        console.log("ERR -> revRecomendationsNoticiasContextViewWidget -> !revVarArgs");
        return;
    }

    let revNoticiasRecommendsViewsArr = [];

    for (let i = 0; i < revVarArgs.length; i++) {
        let revCurrEntity = revVarArgs[i];

        let revProps = { "revEntity": revCurrEntity, "revEntityPublishersArr": null };

        let revOverrideView = await window.revGetLoadedOverrideView(revCurrEntity._revEntitySubType, revProps);
        revNoticiasRecommendsViewsArr.push(revOverrideView);
    }

    return `
        <div class="revFlexContainer revConnReqsContainer">
            ${revNoticiasGrpHeaderView("Recommendations from my connections", '<span><i class="fas fa-share-alt fa-rotate-180"></i></span>')}
            <div class="revFlexContainer revNoticiasItemsContainer">${revNoticiasRecommendsViewsArr.join("")}</div>
        </div>
        `;
};

module.exports.revPluginOverrideViewWidget = revPluginOverrideViewWidget;
