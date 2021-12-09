var revPageViewWidget = async (revVarArgs) => {
    if (!window.REV_LOGGED_IN_ENTITY || window.REV_LOGGED_IN_ENTITY._remoteRevEntityGUID < 1) {
        return;
    }

    let revUnreadMsgSender = (revVarArgs) => {
        let revMsgs = revVarArgs.revMsgs;
        let revDataPublisher = revVarArgs.revDataPublisher;

        if (!revDataPublisher || revDataPublisher._remoteRevEntityGUID < 1 || !revDataPublisher._revEntityMetadataList) {
            return;
        }

        let revMemberFullNames = window.revGetMetadataValue(revDataPublisher._revEntityMetadataList, "rev_entity_full_names_value");

        let revUserIconPath = window.revGetEntityIcon(revDataPublisher);
        revUserIconPath = window.REV_UPLOAD_FILES_DIR_PATH + "/" + revUserIconPath;

        let revUnreadSenderMsgsWrapperId = "revUnreadSenderMsgsWrapper_" + window.revGenUniqueId();

        window.revSetInterval(revUnreadSenderMsgsWrapperId, () => {
            document.getElementById(revUnreadSenderMsgsWrapperId).addEventListener("click", async function (event) {
                window.revSetInterval("revBackToAllBessages", () => {
                    document.getElementById("revBackToAllBessages").addEventListener("click", async (event) => {
                        let revListPageViewImMessages = await window.revGetLoadedPageView("revListPageViewImMessages", window.REV_LOGGED_IN_ENTITY);
                        document.getElementById("revCommsContentArea").innerHTML = revListPageViewImMessages;
                    });
                });

                document.getElementById("revNewMessagesCount").innerHTML = `
                <div id="revNewMessagesCount" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revUnreadMsgsWrapper">
                    <div id="revBackToAllBessages" class="revTabLink revFlexWrapper revBackToAllMessagesWrapper">
                        <div class="revMessagesBackTab"><i class="fa fa-arrow-left"></i></div>
                        <div><span><i class="far fa-envelope"></i></span></div>
                        <div class="revNewMessagesCount">${revMsgs.length} messages</div>
                    </div>
                </div>
                `;

                await window.revGetLoadedPageView("revObjectViewContactItem", revDataPublisher, async (revLoadedPageView) => {
                    let revMsgsViewsArr = [];

                    for (let i = 0; i < revMsgs.length; i++) {
                        let revObjectViewIM = await window.revGetLoadedPageView("revObjectViewIM", revMsgs[i]);
                        revMsgsViewsArr.push(revObjectViewIM);
                    }

                    let revContactNode = `
                        <div class="revFlexContainer revMsgSenderContainer">${revLoadedPageView}</div>
                        <div class="revFlexContainer revMessagesListContainer">${revMsgsViewsArr.join("")}</div>
                    `;

                    document.getElementById("revMsgsArea").innerHTML = revContactNode;
                });
            });
        });

        return `
            <div id="${revUnreadSenderMsgsWrapperId}" class="revFlexWrapper revUnreadSenderMsgsWrapper revTabLink">
                <div class="revFlexContainer revUnreadUserIconContainer">
                    <img class="revListingUserIconCircle" 
                    src="${revUserIconPath}" onerror="this.onerror=null;this.src='${window.REV_DEFAULT_USER_ICON_PATH}';">
                </div>
                <div class="revFlexContainer revSenderUnreadMsgsContainer">
                    <div class="revSenderFullNames">${revMemberFullNames}</div>
                    <div id="revNewMessagesCount" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revUnreadMsgsWrapper">
                        <div><span><i class="far fa-envelope"></i></span></div>
                        <div class="revNewMessagesCount">${revMsgs.length} new messages</div>
                    </div>
                </div>
            </div>
        `;
    };

    return revUnreadMsgSender(revVarArgs);
};

module.exports.revPageViewWidget = revPageViewWidget;
