var revPageViewWidget = async (revVarArgs) => {
    let revEntity;

    if (revVarArgs && revVarArgs.data && revVarArgs.data.revEntity) {
        revEntity = revVarArgs.data.revEntity;
    }

    if (revEntity && revEntity._revEntitySubType && revEntity._remoteRevEntityGUID && revEntity._remoteRevEntityGUID > 0 && revEntity._remoteRevEntityGUID !== window.REV_LOGGED_IN_ENTITY_GUID) {
        window.revInitiateDataMessanger({ "revMsg": "Alive!" }, revEntity);

        let revOnlineUserIconTab_Id = "revOnlineUserIconTab_Id_" + window.revGenUniqueId();

        window.revSetInterval(revOnlineUserIconTab_Id, () => {
            document.getElementById(revOnlineUserIconTab_Id).addEventListener("click", async (event) => {
                let revVarArgsCallback = async (revNewCommentEntity) => {
                    console.log("REV CALLBACK METHOD CALLED!");
                };

                let revChatMessageForm = await window.revGetForm("rev_chat_message", { "revEntity": revEntity, "revVarArgsCallback": revVarArgsCallback });

                let revAdjasentHTML = `
                <div id="revBubble" class="revPosAbsolute revFlexContainer revUserChatAreaContainer">
                    <div class="revFlexContainer"></div>
                    <div class="revFlexContainer revChatFormContainer">${revChatMessageForm}</div>
                    <div class="revFlexContainer revChatAreaPointerContainer">
                        <div class="revChatAreaPointer"><i class="fas fa-chevron-down"></i></div>
                    </div>
                </div>
                `;

                window.revAddRemoveToggleView("beforeend", "revPageRightSectionContainerId", "revBubble", revAdjasentHTML);
            });
        });

        let revUserIconPath = window.revGetEntityIcon(revEntity);
        revUserIconPath = window.REV_UPLOAD_FILES_DIR_PATH + "/" + revUserIconPath;

        let revView = `
            <div id="${revOnlineUserIconTab_Id}" class="revTabLink revFlexContainer revChatFooterUserIconContainer">
                <img class="revListingIconCurvedTiny" src="${revUserIconPath}" onerror="this.onerror=null;this.src='${window.REV_DEFAULT_USER_ICON_PATH}';">
            </div>
        `;

        window.revSetInterval("revMainCenterChatFooterAreaWrapper_Id", () => {
            document.getElementById("revMainCenterChatFooterAreaWrapper_Id").insertAdjacentHTML("beforeend", revView);
        });

        return "HI THERE YOU!";
    }

    return "***HELLO WORLD!";
};

module.exports.revPageViewWidget = revPageViewWidget;
