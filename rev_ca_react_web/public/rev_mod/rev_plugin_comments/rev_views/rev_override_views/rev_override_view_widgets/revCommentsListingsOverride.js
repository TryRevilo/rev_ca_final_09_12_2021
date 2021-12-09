var revPluginOverrideView = async (revVarArgs) => {
    if (!revVarArgs || !revVarArgs.revCommentsArr || !revVarArgs.revPublisherEntitiesArr) {
        console.log("ERR revCommentsListingsOverride -> !revVarArgs || !revVarArgs.revCommentsArr || !revVarArgs.revPublisherEntitiesArr");
        return;
    }

    let revCommentsArr = revVarArgs.revCommentsArr;

    if (!revCommentsArr || !revCommentsArr.length) {
        return;
    }

    let revPublisherEntitiesArr = revVarArgs.revPublisherEntitiesArr;

    let revCommentsViewsList = [];

    for (let i = 0; i < revCommentsArr.length; i++) {
        if (i == 4) {
            revCommentsViewsList.push(`<div class="revViewAllStyle">viEw moRE commENTs</div>`);
            break;
        }

        let revCommentItem = revCommentsArr[i];

        if (!revCommentItem) {
            continue;
        }

        let revEntityPublisher = window.revGetPublisherEntity(revPublisherEntitiesArr, revCommentItem._revEntityOwnerGUID);

        if (!revEntityPublisher || !revEntityPublisher._remoteRevEntityGUID) {
            let revURLPublisher = window.REV_SITE_BASE_PATH + "/rev_api/get_entity_single?remote_rev_entity_guid=" + revCommentItem._revEntityOwnerGUID;

            try {
                let revDataPublisher = await window.revGetServerData_JSON_Async(revURLPublisher);
                revEntityPublisher = revDataPublisher.filter;
                revEntityPublisher = revEntityPublisher[0];
            } catch (error) {
                console.log("ERR -> revCommentsListingsOverride.js -> revEntityPublisher -> " + error);
            }
        }

        if (!revEntityPublisher) {
            continue;
        }

        revCommentItem["revEntityPublisher"] = revEntityPublisher;

        let revClassStyles = "revContainer " + (revEntityPublisher._remoteRevEntityGUID == 1 ? "revCommentOwnerBlock" : "");
        let revExtra = (i == 0 && revCommentsArr.length == 1) || (i == 1 && revCommentsArr.length == 2) || (i == 2 && revCommentsArr.length == 3) || (i == 3 && revCommentsArr.length == 4) ? "revCommentListStyle_No_Border" : "revCommentListStyle";

        /** REV START RESOLVE PAGE VIEW */
        let revLoadedPageView = await window.revGetLoadedPageView("revCommentListingObjectView", revCommentItem);

        let revCommentChildId = "revCommentChildId_" + revCommentItem._remoteRevEntityGUID + "_" + i;

        if (!revLoadedPageView || (revLoadedPageView == undefined && revCommentsArr[i - 1] && revCommentsArr[i - 1]._remoteRevEntityGUID)) {
            let revPrevCommentChildId = "revCommentChildId_" + revCommentsArr[i - 1]._remoteRevEntityGUID + "_" + (i - 1);

            window.revSetInterval(revPrevCommentChildId, () => {
                document.getElementById(revPrevCommentChildId).classList.remove("revCommentListStyle");
                document.getElementById(revPrevCommentChildId).classList.add("revCommentListStyle_No_Border");
            });

            continue;
        }

        revCommentsViewsList.push(`<div id="${revCommentChildId}" class="revFlexWrapper ${revClassStyles} ${revExtra}">${revLoadedPageView}</div>`);
    }

    let revClass = revCommentsArr.length === 0 ? "revEntityCommentsContainer_No_Border" : "revEntityCommentsContainer";

    return `<div class="revFlexContainer ${revClass}">${revCommentsViewsList.join("")}</div>`;
};

module.exports.revPluginOverrideView = revPluginOverrideView;
