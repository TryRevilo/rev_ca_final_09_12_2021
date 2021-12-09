var revFormViewWidget = async (revVarArgs) => {
    let revContactEntity = (revContact) => {
        /** START REV ENTITY NAME */
        let revContactNames = revContact.names;
        let revContactName = "";

        for (let i = 0; i < revContactNames.length; i++) {
            revContactName = revContactNames[i].displayName;

            if (revContactName) {
                break;
            }
        }
        /** END REV ENTITY NAME */

        /** START REV CONTACT PHONE NUMBERS */
        let revPhoneNumbers = revContact.phoneNumbers;
        let revPhoneNumbersMetadataArr = [];

        for (let i = 0; i < revPhoneNumbers.length; i++) {
            let revPhoneNumber = revPhoneNumbers[i].value;
            let revPhoneNumberType = revPhoneNumbers[i].type;
            let revPhoneNumberJSON = {};

            if (revPhoneNumber) {
                revPhoneNumberJSON["revPhoneNumberMetadata"] = window.revMetadataFiller("rev_phone_number", revPhoneNumber);
            }

            if (revPhoneNumberType) {
                revPhoneNumberJSON["revPhoneNumberType"] = window.revMetadataFiller("rev_phone_number_type", revPhoneNumberType);
            }

            revPhoneNumbersMetadataArr.push(revPhoneNumberJSON);
        }
        /** END REV CONTACT PHONE NUMBERS */

        /** START REV CONTACT PHOTOS */
        let revContactPhotosArr = revContact.photos;
        let revContactPhotosURLsArr = [];

        for (let i = 0; i < revContactPhotosArr.length; i++) {
            revContactPhotosURLsArr.push(revContactPhotosArr[i].url);
        }

        /** END REV CONTACT PHOTOS */

        return { "revPhoneNumbersMetadataArr": revPhoneNumbersMetadataArr, "revContactName": revContactName, "revContactPhotosURLsArr": revContactPhotosURLsArr };
    };

    let revImportedContactsCallback = revVarArgs.revImportedContactsCallback;

    let revGoogleContactsBookContainer_Id = "revGoogleContactsBookContainerI_d_" + window.revGenUniqueId();

    window.revSetInterval(revGoogleContactsBookContainer_Id, () => {
        /**
        window.revLoadModules('revPluginModuleImportGooglePhoneBook', (revScriptModule) => {
            window.revPluginModuleImportGooglePhoneBook.revGetContactsBook(async (revRetData) => {
        });
        **/

        let revJSONFileUrl = "http://localhost/rev_wip/rev_ca_web/rev_ca_react_web/public/rev_mod/rev_plugin_contacts/rev_plugin_data/revContacts.json";

        window.revGetServerData_JSON(revJSONFileUrl, async (revCctsData) => {
            let revImportedContactViewsArr = [];
            let revConnectionsArr = revCctsData.result.connections;

            let revContactEntitiesArr = [];

            for (let i = 0; i < revConnectionsArr.length; i++) {
                revContactEntitiesArr.push(revContactEntity(revConnectionsArr[i]));
            }

            /** REV START CREATE SHADOW USERS */
            window.revPostServerData(window.REV_CREATE_NEW_CONTACT_BOOK_ENTITY_URL, { "revLoggedInEntityGUID": window.REV_LOGGED_IN_ENTITY_GUID, "filter": revContactEntitiesArr }, async (revRetPersData) => {
                // console.log(JSON.stringify(revRetPersData));
            });
            /** REV END CREATE SHADOW USERS */

            let revSelectedContactsArr = [];

            for (let i = 0; i < revConnectionsArr.length; i++) {
                let revConnContact = revConnectionsArr[i];

                let revCheckBoxCallback = (revCBVarArgs) => {
                    let revCheckBoxVal = revCBVarArgs.revCheckBoxVal;

                    let revCheckBoxChecked = revCBVarArgs.revCheckBoxChecked;

                    if (revCheckBoxChecked) {
                        revSelectedContactsArr.push(revCheckBoxVal);
                    } else {
                        window.revRemoveArrElement(revSelectedContactsArr, revCheckBoxVal);
                    }

                    /** REV CALL-BACK SELECTED ENTITY GUIDS */
                    revImportedContactsCallback(revSelectedContactsArr);
                };

                let revSelectedIconCBId = i + "_revSelectedIconId_" + window.revGenUniqueId();

                let revCBVarArgs = {
                    "revCheckBoxCallback": revCheckBoxCallback,
                    "revCheckBoxId": revSelectedIconCBId,
                    "revCheckBoxVal": revConnContact.phoneNumbers[0].value,
                };

                let revSelectMainIconCheckBox = window.revGetCheckBox(revCBVarArgs);

                await window.revGetLoadedPageView("revObjectGoogleImportedContactItem", revConnectionsArr[i], (revLoadedPageView) => {
                    revImportedContactViewsArr.push(`
                        <div class="revFlexWrapper">
                            <div class="revGoogleContactCheckBox">${revSelectMainIconCheckBox}</div>
                            <div class="revSelectableGoogleContactWrapper">${revLoadedPageView}</div>
                        </div>
                    `);
                });
            }

            window.revGetElementById(revGoogleContactsBookContainer_Id).innerHTML = revImportedContactViewsArr.join("");
        });
    });

    let revHeight = window.revGetPageHeight() * 0.7;

    return `<div id="${revGoogleContactsBookContainer_Id}" class="revFlexContainer revFlexContainerScroll" style="max-height: ${revHeight}px !important;"></div>`;
};

module.exports.revFormViewWidget = revFormViewWidget;
