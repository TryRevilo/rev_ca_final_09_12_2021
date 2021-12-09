var revPageViewWidget = async (revVarArgs) => {
    let revPassVarArgs = window.revCloneJsObject(revVarArgs.revEntity);

    if (!revVarArgs.revQuestionPublisher || !revVarArgs.revQuestionPublisher._remoteRevEntityGUID) {
        let url = window.REV_SITE_BASE_PATH + "/rev_api/get_entity_single?remote_rev_entity_guid=" + revPassVarArgs._revEntityOwnerGUID;

        try {
            let revData = await window.revGetServerData_JSON_Async(url);
            revData = revData.filter;

            revPassVarArgs["revQuestionPublisher"] = revData[0];
        } catch (error) {
            console.log("error -> revObjectViewQuestionItemListingWidget.js -> revData -> " + error);
        }
    }

    let revObjectViewQuestionItemListing = await window.revGetLoadedPageView("revObjectViewQuestionItemListing", revPassVarArgs);

    return `
    <div class="revFlexContainer revContextViewQuestionItemListing">
        ${revObjectViewQuestionItemListing}
    </div>
    `;
};

module.exports.revPageViewWidget = revPageViewWidget;
