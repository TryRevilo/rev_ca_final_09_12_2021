var revFormViewWidget = async (revVarArgs) => {
    let revActionCallbackAction = revVarArgs.revActionCallbackAction;

    let revConnReqEntitiesListingContainer_Id = "revConnReqEntitiesListingContainer_Id_" + window.revGenUniqueId();

    let revNoticiaItemListingSummuryWrapper = (revConnEntity) => {
        let revNoticiaEntityGUID = revConnEntity._remoteRevEntityGUID;

        let revConnEntityInfo = revConnEntity._revInfoEntity;

        let revEntityNames = window.revGetMetadataValue(revConnEntityInfo._revEntityMetadataList, "rev_entity_full_names_value");
        let revEntityNamesTrim = revEntityNames.replace(/\s+/g, "");

        if (!revEntityNamesTrim) {
            return;
        }

        /** REV START CHECK BOX */
        let revMarkNoticiaReadCB_Id = "revMarkNoticiaReadCB_Id_" + window.revGenUniqueId();
        let revCheckBoxCallback = (revCBVarArgs) => {
            console.log("revCheckBoxVal : " + revCBVarArgs.revCheckBoxVal);
        };

        let revCBVarArgs = {
            "revCheckBoxCallback": revCheckBoxCallback,
            "revCheckBoxId": revMarkNoticiaReadCB_Id,
            "revCheckBoxVal": revNoticiaEntityGUID,
        };

        let revMarkNoticiaReadCB = window.revGetCheckBox(revCBVarArgs);
        /** REV END CHECK BOX */

        let revConnEntityIcon_Id = "revConnEntityIcon_Id_" + window.revGenUniqueId();
        let revConnEntityNames_Id = "revConnEntityNames_Id_" + window.revGenUniqueId();

        window.revSetInterval(revConnEntityIcon_Id, () => {
            document.getElementById(revConnEntityIcon_Id).addEventListener("click", function () {
                window.revUserIconClick(revNoticiaEntityGUID);
            });

            window.revLoadUserIcon(revConnEntity, revConnEntityIcon_Id);
        });

        window.revSetInterval(revConnEntityNames_Id, () => {
            document.getElementById(revConnEntityNames_Id).addEventListener("click", function () {
                window.revUserIconClick(revNoticiaEntityGUID);
            });
        });

        let revAcceptTab_Id = "revAcceptTab_Id_" + window.revGenUniqueId();

        window.revSetInterval(revAcceptTab_Id, () => {
            document.getElementById(revAcceptTab_Id).addEventListener("click", (event) => {
                revActionCallbackAction(revNoticiaEntityGUID);
            });
        });

        return `
            <div class="revFlexWrapper revNoticiaItemListingContentWrapper">
                <div class="revFlexWrapper revNoticiaItemListingMarkReadWrapper">${revMarkNoticiaReadCB}</div>
                <div class="revFlexWrapper revNoticiaItemListingRightBody">
                    <div id="${revConnEntityIcon_Id}" class="revTabLink revListingIconCurvedTiny revNoticiaItemListingEntityIcon"></div>
                    <div class="revFlexWrapper revNoticiaItemEntityDetails">
                        <div class="revFlexContainer revNoticiaItemEntityFullNamesContainer">
                            <div id="${revConnEntityNames_Id}" class="revTabLink revFontSiteBlueTxtColor">${revEntityNames}</div>
                            <div class="revTimeCreatedStyle">${window.revFormatLongDate(revConnEntity._revTimePublished)}</div>
                        </div>
                        <div class="revFlexWrapper revNoticiaListingItemOptionsTabsWrapper">
                            <div id="${revAcceptTab_Id}" class="revTabLink revSmalllBoldBlue revNoticiaListingItemOptionTab"><i class="fas fa-plus"></i></div>
                            <div class="revTabLink revSmalllBoldBlue revNoticiaListingItemOptionTab">iGnoRE</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    };

    try {
        let revPath = `${window.REV_SITE_BASE_PATH}/rev_api?rev_logged_in_entity_guid=${window.REV_LOGGED_IN_ENTITY_GUID}&revPluginHookContextsRemoteArr=revHookRemoteHandler_GetConnRequestEntities`;

        let revData = await window.revGetServerData_JSON_Async(revPath);

        if (revData && revData.filter) {
            let revConnRequestsUsersArr = revData.filter;

            let revNoticiaItemListingItemListsArr = [];

            for (let i = 0; i < revConnRequestsUsersArr.length; i++) {
                revNoticiaItemListingItemListsArr.push(revNoticiaItemListingSummuryWrapper(revConnRequestsUsersArr[i]));
            }

            window.revSetInterval(revConnReqEntitiesListingContainer_Id, () => {
                document.getElementById(revConnReqEntitiesListingContainer_Id).innerHTML = revNoticiaItemListingItemListsArr.join("");
            });
        }
    } catch (error) {
        console.log("LOG IN ERR -> " + error);
    }

    let revCheckAllCB_Id = "revCheckAllCB_Id_" + window.revGenUniqueId();

    let revCheckBoxCheckAllCallback = () => {};

    let revCBCheckAllVarArgs = {
        "revCheckBoxCallback": revCheckBoxCheckAllCallback,
        "revCheckBoxId": revCheckAllCB_Id,
    };

    let revCheckAllCB = window.revGetCheckBox(revCBCheckAllVarArgs);

    let revNoticiaItemListingsCalArea = `
        <div class="revFlexContainer revNoticiaItemListingsContainer">
            <div class="revFlexWrapper revNoticiaItemListingHeaderWrapper">
                <div class="revNoticiaItemListing_H_Rule"></div>
                <div class="revNoticiaItemListing_V_Rule_Tiny"></div>
                <div class="revFlexWrapper revNoticiaItemListingIconWrapper">${revCheckAllCB}</div>
                <div class="revNoticiaItemListingMidSeparater"></div>
                <div class="revNoticiaItemListing_V_Rule_Tiny"></div>
                <div class="revNoticiaItemListing_H_Rule"></div>
            </div>
            <div id="${revConnReqEntitiesListingContainer_Id}" class="revFlexContainer revNoticiasItemsConfirmContainer"></div>
        </div>
    `;

    return revNoticiaItemListingsCalArea;
};

module.exports.revFormViewWidget = revFormViewWidget;
