var revView = async (revVarArgs) => {
    let revHiddenViewId = "revHiddenView_" + revVarArgs;
    let revMessagesTabId = "revMessagesTab_" + revVarArgs;
    let revCallTabId = "revCallTabId_" + revVarArgs;

    let revRichInputAreaId = "revRichInputArea_" + revVarArgs;

    window.revSetInterval(revMessagesTabId, async () => {
        document.getElementById(revMessagesTabId).addEventListener("click", async function (event) {
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

            document.getElementById(revHiddenViewId).innerHTML = revInlineFormComposeMessage;
        });
    });

    window.revSetInterval(revCallTabId, () => {
        document.getElementById(revCallTabId).addEventListener("click", function () {
            document.getElementById("revServicesContainer").innerHTML = '<div class="revFlexContainer"></div>';
        });
    });

    let revView = `
    <div class="revOngoingCommsContainer">
        <div class="revOngoingAudioCallWidgetContainer">
            <div class="revVidCallHeaderContainer">
                <div class="revVidCallEntityNames">Oliver Muchai</div>
                <div class="revVidCallEntityLength">122 . mins </div>
            </div>
            <div class="revFlexWrapper revVisualizerLoadingBlinkerOngoingCallWrapper">${window.revVisualizerLoadingBlinker()}</div>
        </div>
        <div class="revAudioCallEntityFooter">
            <div class="revVidCallEndTab">End</div>
            <div class="revVidCallOptionsTab">
                <div class="revMsgTab"><i class="far fa-envelope"></i></div>
            </div>
        </div>
    </div>
    `;

    return revView;
};

module.exports.revView = revView;
