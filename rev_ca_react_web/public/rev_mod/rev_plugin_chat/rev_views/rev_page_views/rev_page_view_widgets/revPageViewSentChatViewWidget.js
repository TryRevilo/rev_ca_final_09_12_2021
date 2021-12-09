var revPageViewWidget = async (revVarArgs) => {
    let revChatMsg = `A condition of balance among various forces; motionlessness: "Language is a primary element of culture, and stasis in...`;
    let revEntityOptionsMenuArea = await window.revGetMenuAreaView("revListingItemOptionsMenuArea", window.REV_LOGGED_IN_ENTITY);

    let revChatMsgItemSent = `
        <div class="revFlexContainer revMsgItemContainer">
            <div class="revFlexWrapper revMessageItemPrimaryWrapper">
                <div class="revPosRelative revFlexWrapper revMsgItemBodyContentWrapper">
                    <div class="revFlexContainer revPosRelative revMsgItemBodyContentContainer_Sent">
                        <div class="revFontSiteDarkTxtColor revFontSizeNormal revWordWrap"><span class="revSmalllBoldBlue revNewMsgTxt"><i class="fas fa-check-double"></i></span> ${revChatMsg}</div>
                        <div class="revFlexWrapper revChatMsgItemFooter">
                            <div class="revTimeCreatedStyle revChatItemPubTime">${window.revFormatLongDate(new Date().getTime())}</div>
                            <div class="revChatMsgOptions">${revEntityOptionsMenuArea}</div>
                        </div>
                    </div>
                    <div class="revFontSizeLarge revPosRelative revFlexWrapper revMsgItemBodyContentIconWrapper_Right"><i class="fas fa-caret-right"></i></div>
                </div>
                <div class="revChatMsgItemUserIcon">
                    <img class="revListingIconCurvedTiny" src="" onerror="this.onerror=null;this.src='${window.REV_DEFAULT_USER_ICON_PATH}';">
                </div>
            </div>
        </div>
    `;

    return revChatMsgItemSent;
};

module.exports.revPageViewWidget = revPageViewWidget;
