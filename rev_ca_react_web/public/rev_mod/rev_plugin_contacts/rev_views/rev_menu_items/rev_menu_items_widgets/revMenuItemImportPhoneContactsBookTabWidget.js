var revMenuItemWidget = async (revVarArgs) => {
    if (!revVarArgs || !revVarArgs.revImportPhoneBookContactsCallback) return null;

    let revSelectedContactsArr = [];

    let revPageContentAreaRendererCallback = revVarArgs.revPageContentAreaRendererCallback;
    let revImportPhoneBookContactsCallback = revVarArgs.revImportPhoneBookContactsCallback;

    let revImportAddressBookTabId = "revImportAddressBookTabId_" + window.revGenUniqueId();

    window.revSetInterval(revImportAddressBookTabId, () => {
        document.getElementById(revImportAddressBookTabId).addEventListener("click", async (click) => {
            /** REV START INVITE MEMBERS HEADER */
            let revImportGoogleContactsNextTabId = "revImportGoogleContactsNextTabId_" + window.revGenUniqueId();

            window.revSetInterval(revImportGoogleContactsNextTabId, () => {
                document.getElementById(revImportGoogleContactsNextTabId).addEventListener("click", (event) => {
                    /** REV CALL-BACK TO CALLER *SELECTED* USER GUIDS */
                    revImportPhoneBookContactsCallback(revSelectedContactsArr);
                });
            });

            let revImportPhoneContactsCancelTab_Id = "revImportPhoneContactsCancelTab_Id_" + window.revGenUniqueId();

            window.revSetInterval(revImportPhoneContactsCancelTab_Id, () => {
                document.getElementById(revImportPhoneContactsCancelTab_Id).addEventListener("click", (event) => {
                    revImportPhoneBookContactsCallback(revSelectedContactsArr);
                });
            });

            let revImportPhoneContactsHeader = `
            <div class="revFlexWrapper revImportPhoneContactsHeaderWrapper">
               <div id="${revImportGoogleContactsNextTabId}" class="revTabLink revFlexWrapper revImportPhoneContactsTabWrapper">
                    <div class="revSmalllBoldWhite revShareTabTxt">ImpoRt coNtacts</div>
                    <div class="revFontSiteBlueTxtColor revFontSizeNormal"><i class="fa fa-arrow-right"></i></div>
                </div>
                <div id="${revImportPhoneContactsCancelTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revImportPhoneContactsCancelTab">cANcEL</div>
            </div>
           `;
            /** REV END INVITE MEMBERS HEADER */

            let revImportedContactsCallback = (revSelectedContactsArr_) => {
                /** REV SET SELECTED ENTITY GUIDS ARR */
                revSelectedContactsArr = revSelectedContactsArr_;
            };

            let revImportGooglePhoneBookForm = await window.revGetForm("revImportGooglePhoneBookForm", { "revImportedContactsCallback": revImportedContactsCallback });

            revPageContentAreaRendererCallback(`
                ${revImportPhoneContactsHeader}
                <div class="revFlexContainer revImportContactsFormContainer">${revImportGooglePhoneBookForm}</div>
            `);
        });
    });

    return `<div id="${revImportAddressBookTabId}" class="revTabLink">phonE</div> `;
};

module.exports.revMenuItemWidget = revMenuItemWidget;
