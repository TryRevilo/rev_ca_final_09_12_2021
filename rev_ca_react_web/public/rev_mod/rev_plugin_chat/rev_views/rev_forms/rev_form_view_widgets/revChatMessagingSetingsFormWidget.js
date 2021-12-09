var revFormViewWidget = async (revVarArgs) => {
    let revCB_Public_Id = "revSelectedIconId_" + window.revGenUniqueId();
    let revCheckBoxPubliCallback = (revCBVarArgs) => {};

    let revCBVarArgsPublic = {
        "revCheckBoxCallback": revCheckBoxPubliCallback,
        "revCheckBoxId": revCB_Public_Id,
    };

    let revCheckBoxPublic = window.revGetCheckBox(revCBVarArgsPublic);

    let revSubmitPersEntityTabId = "revSubmitPersEntityTabId_" + window.revGenUniqueId();

    let revFormSubmitTab = window.revFormSubmitTab({
        "revId": revSubmitPersEntityTabId,
        "revIcon": '<i class="fa fa-arrow-right"></i>',
        "revTitle": "sAvE cHAT sEtTings",
        "revSubmitCallback": () => {},
    });

    let revChatStatusInputText = window.revInputText_Flat({
        "revId": "revChatStatusInputText_Id",
        "revInputTextHeader": false,
        "revBorderStyle": "revAllBordersInput",
        "revPlaceholderText": "cHAT sTATus . . . 100 characTeRs mAx",
    });

    let revChatSettingsForm = `
    <div class="revFlexContainer">
        <div class="revFontSizeNormalHeader revChatSettingsHeader">Chat settings</div>
        <div class="revFlexWrapper revChatSettingsFormViewWrapper">
            <div class="revFlexWrapper revChatSettingsOptionWrapper">
                ${revCheckBoxPublic}
                <div class="revFontSiteGreyTxtColor revFontSizeNormal revChatSettingsTxt">onLiNE</div>
            </div>
            <div class="revFlexWrapper revChatSettingsOptionWrapper">
                ${revCheckBoxPublic}
                <div class="revFontSiteGreyTxtColor revFontSizeNormal revChatSettingsTxt">publicly visibLE</div>
            </div>
            <div class="revFlexWrapper revChatSettingsOptionWrapper">${revFormSubmitTab}</div>
        </div>
        <div class="revFlexWrapper revChatStatusInputTextWrapper">${revChatStatusInputText}</div>
    </div>
    `;

    return revChatSettingsForm;
};

module.exports.revFormViewWidget = revFormViewWidget;
