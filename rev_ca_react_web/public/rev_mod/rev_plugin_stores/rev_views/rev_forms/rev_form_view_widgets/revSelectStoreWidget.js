var revFormViewWidget = async (revVarArgs) => {
    let revStoreEntitiesArr = [];

    if (revVarArgs && revVarArgs.revStoreEntitiesArr) revStoreEntitiesArr = revVarArgs.revStoreEntitiesArr;

    /** START REV SELECT STORE */
    let revSelectedStore = [];

    let revStoreSelect = (revVarArgs) => {
        let revStoreName = window.revGetMetadataValue(revVarArgs._revEntityMetadataList, "rev_entity_name");

        let revCheckBoxCallback = (revCBVarArgs) => {
            let revCheckBoxChecked = revCBVarArgs.revCheckBoxChecked;

            if (revCheckBoxChecked) {
                revSelectedStore.push(revVarArgs);
            } else {
                for (let i = 0; i < revSelectedStore.length; i++) {
                    let revSelectedEntityGUID = revSelectedStore[i]._remoteRevEntityGUID;
                    if (revVarArgs._remoteRevEntityGUID == revSelectedEntityGUID) {
                        revSelectedStore.splice(i, 1);
                    }
                }
            }
        };

        let revCBVarArgs = {
            "revCheckBoxCallback": revCheckBoxCallback,
            "revCheckBoxId": "revSelectStoreCheckBoxId_" + window.revGenUniqueId(),
        };

        let revSelectStoreCheckBox = window.revGetCheckBox(revCBVarArgs);

        return `
        <div class="revFlexWrapper revCheckStoreWrapper">
            ${revSelectStoreCheckBox}
            <div class="revFontSiteGreyTxtColor revFontSizeNormal revSelectableStoreName">${revStoreName}</div>
        </div>
        `;
    };

    let revSelectableStoresId = "revSelectableStoresId";

    window.revSetInterval(revSelectableStoresId, async () => {
        let url = window.REV_SITE_BASE_PATH + "/rev_api/get_all_revEntities_by_owner_guids_sub_types?rev_entity_sub_types_array=rev_store&rev_entity_guids=" + window.REV_LOGGED_IN_ENTITY_GUID;
        let revdata = await window.revGetServerData_JSON_Async(url);

        revStoreEntitiesArr = revStoreEntitiesArr.concat(revdata.filter);

        let revCBs = [];

        for (let i = 0; i < revStoreEntitiesArr.length; i++) {
            revCBs.push(revStoreSelect(revStoreEntitiesArr[i]));
        }

        document.getElementById(revSelectableStoresId).innerHTML = revCBs.join("");
    });
    /** START REV ITEM SUBMIT FORM FOOTER */

    let revSubmitNewStoreItemTabId = "revSubmitNewStoreItemTabId_" + window.revGenUniqueId();

    let revSaveStoreItemEntity = async () => {
        let revStoreForm = await window.revGetForm("revStoreItem", { "revSelectedStore": revSelectedStore[0] });
        document.getElementById("revPageHome").innerHTML = revStoreForm;
    };

    let revFormSubmitTab = window.revFormSubmitTab({
        "revId": revSubmitNewStoreItemTabId,
        "revIcon": '<i class="fa fa-arrow-right"></i>',
        "revTitle": "NEXT",
        "revSubmitCallback": revSaveStoreItemEntity,
    });
    /** END REV ITEM SUBMIT FORM FOOTER */

    let revCreateNewStoreOptionTabId = "revCreateNewStoreOptionTabId_" + window.revGenUniqueId();

    window.revSetInterval(revCreateNewStoreOptionTabId, async () => {
        document.getElementById(revCreateNewStoreOptionTabId).addEventListener("click", async (event) => {
            let revStoreForm = await window.revGetForm("revStore", revVarArgs);
            document.getElementById("revPageHome").innerHTML = revStoreForm;
        });
    });

    /** REV START HEADER AREA */
    let revPageViewPageNavHeader = await window.revGetLoadedPageView("revPageViewPageNavHeader", { "revDafaultPagePagination": true });
    let revUserOptionsMenuArea = await window.revGetMenuArea("revActivityItemsListingView", window.REV_LOGGED_IN_ENTITY);
    let revPageHeader = window.revPageHeader("sELEcT sTore");
    /** REV END HEADER AREA */

    return `
    <div class="revFlexContainer revPageRightBorderedContainer">
        <div class="revFlexContainer revPageHeaderAreaContainer">
            <div class="revFlexWrapper revPageViewTitledPageNavHeaderWrapper_AdForm">${revPageViewPageNavHeader}</div>
            <div class="revFlexWrapper revUserOptionsMenuAreaWrapper_AdForm">${revUserOptionsMenuArea}</div>
            ${revPageHeader}
        </div>
    
        <div id="${revSelectableStoresId}" class="revFlexContainer revSectStoresContainer"></div>

        <div class="revFlexContainer revSelectStoreContainer">
            <div class="rev_HRule_3em"></div>
            <div id="${revCreateNewStoreOptionTabId}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revSelectStoreNewStoreTab"><i class="fa fa-plus"></i> Create New Store</div>
            <div class="rev_HRule_3em"></div>
        </div>
        
        <div class="revSelectStoreFormFooter">
            ${revFormSubmitTab}
        </div>
    </div>
    `;
};

module.exports.revFormViewWidget = revFormViewWidget;
