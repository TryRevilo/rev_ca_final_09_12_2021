var revPageViewWidget = async (revVarArgs) => {
    let revChatMsg = `A condition of balance among various forces; motionlessness: "Language is a primary element of culture, and stasis in...`;
    let revEntityOptionsMenuArea = await window.revGetMenuAreaView("revListingItemOptionsMenuArea", window.REV_LOGGED_IN_ENTITY);

    let revChatMsgItemReceivedUnread = `
        <div class="revFlexContainer revMsgItemContainer">
            <div class="revFlexWrapper revMessageItemPrimaryWrapper">
                <div class="revChatMsgItemUserIcon">
                    <img class="revListingIconCurvedTiny" src="" onerror="this.onerror=null;this.src='${window.REV_DEFAULT_USER_ICON_PATH}';">
                </div>
                <div class="revPosRelative revFlexWrapper revMsgItemBodyContentWrapper">
                    <div class="revFontSizeLarge revPosRelative revFlexWrapper revMsgItemBodyContentIconWrapper_Left"><i class="fas fa-caret-left"></i></div>
                    <div class="revFlexContainer revPosRelative revMsgItemBodyContentContainer_Received">
                        <div class="revFontSiteDarkTxtColor revFontSizeNormal revWordWrap"><span class="revSmalllBoldBlue revNewMsgTxt"><i class="fas fa-bolt"></i><i class="fas fa-bolt"></i></span> ${revChatMsg}</div>
                        <div class="revFlexWrapper revChatMsgItemFooter">
                            <div class="revTimeCreatedStyle revChatItemPubTime">${window.revFormatLongDate(new Date().getTime())}</div>
                            <div class="revChatMsgOptions">${revEntityOptionsMenuArea}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    let revChatMsgItemReceived = `
        <div class="revFlexContainer revMsgItemContainer">
            <div class="revFlexWrapper revMessageItemPrimaryWrapper">
                <div class="revChatMsgItemUserIcon">
                    <img class="revListingIconCurvedTiny" src="" onerror="this.onerror=null;this.src='${window.REV_DEFAULT_USER_ICON_PATH}';">
                </div>
                <div class="revPosRelative revFlexWrapper revMsgItemBodyContentWrapper">
                    <div class="revFontSizeLarge revPosRelative revFlexWrapper revMsgItemBodyContentIconWrapper_Left"><i class="fas fa-caret-left"></i></div>
                    <div class="revFlexContainer revPosRelative revMsgItemBodyContentContainer_Received">
                        <div class="revFontSiteDarkTxtColor revFontSizeNormal revWordWrap">${revChatMsg}</div>
                        <div class="revFlexWrapper revChatMsgItemFooter">
                            <div class="revTimeCreatedStyle revChatItemPubTime">${window.revFormatLongDate(new Date().getTime())}</div>
                            <div class="revChatMsgOptions">${revEntityOptionsMenuArea}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    if (revVarArgs == -1) return revChatMsgItemReceivedUnread;
    else return revChatMsgItemReceived;
};

module.exports.revPageViewWidget = revPageViewWidget;
