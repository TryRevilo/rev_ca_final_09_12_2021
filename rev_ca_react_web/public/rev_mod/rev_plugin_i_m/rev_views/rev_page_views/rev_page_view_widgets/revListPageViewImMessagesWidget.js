var revPageViewWidget = async (revVarArgs) => {
    if (!window.REV_LOGGED_IN_ENTITY || window.REV_LOGGED_IN_ENTITY._remoteRevEntityGUID < 1) {
        return;
    }

    let revMsgComposeCallback = (revMsg) => {
        let revMsgEntity = window.REV_ENTITY_STRUCT();
        revMsgEntity._revEntityType = "rev_object";
        revMsgEntity._revEntitySubType = "rev_im_msg";
        revMsgEntity._revEntityOwnerGUID = window.REV_LOGGED_IN_ENTITY._remoteRevEntityGUID;

        let revMsgEntityMetadata = window.REV_ENTITY_METADATA_STRUCT();
        revMsgEntityMetadata._revMetadataName = "rev_im_msg_val";
        revMsgEntityMetadata._metadataValue = revMsg;

        revMsgEntity._revEntityMetadataList.push(revMsgEntityMetadata);

        /** REV START LIVE NOTICIAS */
        window.revInitiateDataMessanger(JSON.stringify(revMsgEntity), revVarArgs);
        /** REV END LIVE NOTICIAS */

        window.revGetLoadedPageView("revObjectViewIM", revMsgEntity, (revMainCenterScrollArea) => {
            let revNewMsgContainer = document.createElement("div");
            revNewMsgContainer.innerHTML = revMainCenterScrollArea;
        });
    };

    let revInlineFormComposeMessage = await window.revGetForm("revInlineFormComposeMessage", { "revEntity": revVarArgs, "revMsgComposeCallback": revMsgComposeCallback });

    window.revSetInterval("revMessagesBatchContainer", async () => {
        let url = `${window.REV_SITE_BASE_PATH}/rev_api?rev_logged_in_entity_guid=${window.REV_LOGGED_IN_ENTITY._remoteRevEntityGUID}&revPluginHookContextsRemoteArr=revHookRemoteHandler_GetNewMsgsStats`;

        let revData = await window.revGetServerData_JSON_Async(url);

        let revDataMessages = revData.filter;
        let revDataPublishers = revData.revPublishersArr;

        if (!revDataMessages || !revDataMessages.length || revDataMessages.length < 1) {
            document.getElementById("revNullMessagesTxt_Id").innerHTML = `<div class="revNullMessagesTxt">No new messagEs. You can compose one below.</div>`;
        } else {
            let revView = `
            <div class="revPosRelative revFlexContainer revOngoingCommsContainer">
                ${window.revColouredBlinkers()}
                <div id="revNewMessagesCount" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revUnreadMsgsWrapper">
                    <div><span><i class="far fa-envelope"></i></span></div>
                    <div class="revNewMessagesCount">${revDataMessages.length} new messages</div>
                </div>
            </div>
            `;

            document.getElementById("revUnreadCountSummary").innerHTML = revView;

            let revGetSenderMsgs = (revDataPublisher, revMsgsArr) => {
                if (window.revIsEmptyJSONObject(revDataPublisher)) {
                    return;
                }

                let revSenderMsgsArr = [];

                let i = 0;

                while (i < revMsgsArr.length) {
                    let revMsg = revMsgsArr[i];

                    if (revMsg && Number(revMsg._revEntityOwnerGUID) == Number(revDataPublisher._remoteRevEntityGUID)) {
                        let revSpliced = revMsgsArr.splice(i, 1);
                        revSenderMsgsArr.push(revSpliced[0]);
                        continue;
                    }

                    ++i;
                }

                return revSenderMsgsArr;
            };

            let revSenderMessagesArr = [];

            for (let i = 0; i < revDataPublishers.length; i++) {
                let revDataPublisher = revDataPublishers[i];

                if (!revDataPublisher) {
                    continue;
                }

                let revSenderMsgsArr = revGetSenderMsgs(revDataPublishers[i], revDataMessages);

                if (!revSenderMsgsArr || !revSenderMsgsArr.length || revSenderMsgsArr.length < 1) {
                    continue;
                }

                let revObjectSenderImMessagesListing = await window.revGetLoadedPageView("revObjectSenderImMessagesListing", { revDataPublisher: revDataPublisher, revMsgs: revSenderMsgsArr });
                revSenderMessagesArr.push(revObjectSenderImMessagesListing);

                if (i == 2) {
                    break;
                }
            }

            window.revSetInterval("revUnreadSendersPreview", () => {
                document.getElementById("revUnreadSendersPreview").innerHTML = revSenderMessagesArr.join("");
            });
        }
    });

    let revIMListContainer = `
        <div id="revMessagesBatchContainer" class="revFlexContainer">
            <div id="revNullMessagesTxt_Id" class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper revNullMessagesWrapper"></div>
            ${revInlineFormComposeMessage}
            <div id="revUnreadCountSummary" class="revFlexWrapper"></div>
            <div id="revMsgsArea" class="revFlexContainer">
                <div id="revUnreadSendersPreview" class="revFlexContainer revUnreadSendersPreview"></div>
            </div>
        </div>
    `;

    return revIMListContainer;
};

module.exports.revPageViewWidget = revPageViewWidget;
