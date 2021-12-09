var revPageViewWidget = (revVarArgs) => {
    let revView = `
        <div class="revFlexContainer">
            <div class="revFlexWrapper revIncomingCallAlertHeaderWrapper">
                <div class="revSmalllBoldRed revIncomingCallAlertTxt">iNcommiNG viDEo cAll</div>
                <div class="revFlexWrapper revIncomingVideoCallAlertBlinkersWrapper">${window.revVisualizerLoadingBlinker()}</div>
            </div>
            <div class="revTabLink revFlexWrapper revIncomingVideoCallAlertCallerDetailsWrapper">
                <div class="revIncomingVideoCallAlertUserIcon"></div>
                <div class="revSmalllBoldBlue revIncomingVideoCallAlertUserFullNames">Oliver Muchai Githire</div>
                <div class="revFlexWrapper revReceiverIncommingCallOptionWrapper">
                    <div class="revTabLink revSmalllBoldBlue revReceiverIncommingCallOption">PICK</div>
                    <div class="revTabLink revFontSiteRedTxtColor revFontSizeNormal revReceiverIncommingCallOption">cANcEL</div>
                </div>
            </div>
        </div>
    `;

    return revView;
};

module.exports.revPageViewWidget = revPageViewWidget;
