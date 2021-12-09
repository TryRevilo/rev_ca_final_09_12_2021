var revPageViewWidget = async (revVarArgs) => {
    let revImportContacts = async () => {
        let revPassVarArgs_ImporPhoneBooktCcts = window.revCloneJsObject(revVarArgs);

        let revImportPhoneBookContactsCallback = (revImportedPhoneccts) => {
            console.log("revPageViewImportContactsWidget.js -> revImportedPhoneccts :\n" + JSON.stringify(revImportedPhoneccts));
        };

        let revPageContentAreaRendererCallback = (revCallbackHTML) => {
            document.getElementById("revCommsContentArea").innerHTML = revCallbackHTML;
        };

        revPassVarArgs_ImporPhoneBooktCcts["revImportPhoneBookContactsCallback"] = revImportPhoneBookContactsCallback;
        revPassVarArgs_ImporPhoneBooktCcts["revPageContentAreaRendererCallback"] = revPageContentAreaRendererCallback;

        let revMenuAreaImportContacts = await window.revGetMenuAreaView("revMenuAreaImportContacts", revPassVarArgs_ImporPhoneBooktCcts);

        return `
        <div class="revFlexContainer">
            <div class="revFlexWrapper revContactsCounterWrapper">
                <div class="revFontSiteGreyTxtColor revFontSizeLarge">155</div>
                <div class="revFontSiteGreyTxtColor revFontSizeNormal revContactsTotalCountText">Added contacts</div>
            </div>
            <div class="revFlexContainer">
                <div class="revFlexWrapper revMsgsImportCctsWrapper">${revMenuAreaImportContacts}</div>
                <div class="revFontSiteGreyTxtColor revFontSizeSmall revFlexWrapper revPosRelative revContactsDividerWrapper">
                    <div class="revPosAbsolute vl_H_Thin"></div>
                    <div class="revPosRelative revFlexWrapper revMinTabWrapper"><div><i class="fas fa-dot-circle"></i></div></div>
                </div>
            </div>
        </div>
        `;
    };

    return await revImportContacts();
};

module.exports.revPageViewWidget = revPageViewWidget;
