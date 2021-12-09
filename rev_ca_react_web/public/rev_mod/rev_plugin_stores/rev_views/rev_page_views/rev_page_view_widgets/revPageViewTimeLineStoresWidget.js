var revPageViewWidget = async (revVarArgs) => {
    let revContainerGUID = -1;

    if (revVarArgs._remoteRevEntityGUID == window.REV_LOGGED_IN_ENTITY_GUID) {
        revContainerGUID = window.REV_LOGGED_IN_ENTITY_GUID;
    } else {
        revContainerGUID = revVarArgs._revEntityOwnerGUID;
    }

    let revEntity = revVarArgs;
    let revPageOwnerNames = window.revGetMetadataValue(revEntity._revInfoEntity._revEntityMetadataList, "rev_entity_full_names_value");
    let revFirstName = revPageOwnerNames.split(" ");
    revFirstName = revFirstName[0];

    let revTimelineStoreHeaderArea = window.revInlineHeaderArrowDown(revFirstName + "'s Store");

    let revTimelineStoreContainer_Id = "revTimelineStoreContainer_Id_" + window.revGenUniqueId();
    let revTimelineStoreItemsWrapper_Id = "revTimelineStoreItemsWrapper_Id_" + window.revGenUniqueId();

    window.revSetInterval(revTimelineStoreItemsWrapper_Id, async () => {
        let revTimelineStoreItemsViewsArr = [];

        let revGetTimelineStoreItemView = async (revStoreItemVarArgs) => {
            let revStoreItemName = window.revGetMetadataValue(revStoreItemVarArgs._revEntityMetadataList, "rev_entity_name");
            revStoreItemName = window.revTruncateString(revStoreItemName, 8);

            if (window.revIsEmptyVar(revStoreItemName)) {
                return;
            }

            let revEntityIconPath = window.revGetDefaultEntityIcon(revStoreItemVarArgs);

            let revTimelineStoreItemContainerId = "revTimelineStoreItemContainerId_" + window.revGenUniqueId();

            let revInlineStoreItemBuyTab_id = "revInlineStoreItemBuyTab_id" + window.revGenUniqueId();

            window.revSetInterval(revInlineStoreItemBuyTab_id, () => {
                document.getElementById(revInlineStoreItemBuyTab_id).addEventListener("click", async (event) => {
                    event.stopPropagation();

                    let revPassVarArgs = window.revCloneJsObject(revStoreItemVarArgs);
                    revPassVarArgs["revSelectedStore"] = { "_remoteRevEntityGUID": revStoreItemVarArgs._revEntityContainerGUID };

                    let revOnPaymentCallbackMethod = async (revCalbackVarArgs) => {
                        await window.revGetLoadedPageViewAreaContainer("revObjectStoreItem", revCalbackVarArgs, (_revView) => {
                            document.getElementById("revPageHome").innerHTML = _revView;
                        });
                    };

                    revPassVarArgs["revOnPaymentCallbackMethod"] = revOnPaymentCallbackMethod;

                    let revSelectPaymentOption = await window.revGetForm("revSelectPaymentOption", revPassVarArgs);

                    window.revToggleSwitchArea(revSelectPaymentOption);
                });
            });

            let revTimelineStoreItemView = `
                <div id="${revTimelineStoreItemContainerId}" class="revTabLink revFlexContainerFit revTimelineStoreItemContainer">
                    <div class="revTimelineStoreItemIcon">${window.revReadFileToImageFromURL(revEntityIconPath, "revListingIconCurvedSmall")}</div>
                    <div class="revFontSiteBlueTxtColor revFontSizeNormal revTimelineStoreItemTtl">${revStoreItemName}</div>
                    <div class="revFontSiteGreyTxtColor revFontSizeNormal revTimelineStoreItemPrice">$255.95</div>
                    <div class="revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revTimelineStoreItemFooterWrapper">
                        <div id="${revInlineStoreItemBuyTab_id}" class="revTabLink revTimelineStoreItemBuyTab">Buy</div>
                        <div class="revTimelineStoreItemBuyTab"><span><i class="fa fa-list"></i></span></div>
                    </div>
                </div>
            `;

            window.revSetInterval(revTimelineStoreItemContainerId, async () => {
                document.getElementById(revTimelineStoreItemContainerId).addEventListener("click", async (event) => {
                    window.revGetLoadedPageViewAreaContainer("revObjectStoreItem", revStoreItemVarArgs, (_revView) => {
                        document.getElementById("revPageHome").innerHTML = _revView;
                    });
                });
            });

            return revTimelineStoreItemView;
        };

        let url = window.REV_SITE_BASE_PATH + "/rev_api/get_all_revEntities_by_owner_guids_sub_types?rev_entity_sub_types_array=rev_store_item&rev_entity_guids=" + revContainerGUID;
        let revdata = await window.revGetServerData_JSON_Async(url);
        revdata = revdata.filter;

        let revDisplayTestCount = 0;

        for (let i = 0; i < revdata.length; i++) {
            let revCurrTimelineStoreItemView = await revGetTimelineStoreItemView(revdata[i]);

            if (!revCurrTimelineStoreItemView) {
                continue;
            }

            revTimelineStoreItemsViewsArr.push(revCurrTimelineStoreItemView);

            ++revDisplayTestCount;

            if (i >= revdata.length - 1) {
                i = 0;
            }

            if (revDisplayTestCount == 12) {
                break;
            }
        }

        if (revTimelineStoreItemsViewsArr.length > 0) {
            document.getElementById(revTimelineStoreItemsWrapper_Id).innerHTML = revTimelineStoreItemsViewsArr.join("");
        } else {
            document.getElementById(revTimelineStoreContainer_Id).remove();
        }
    });

    let revNewStoreItemListingTab_Id = "revNewStoreItemListingTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revNewStoreItemListingTab_Id, () => {
        document.getElementById(revNewStoreItemListingTab_Id).addEventListener("click", async (event) => {
            let revStore = await window.revGetForm("revSelectStore", revVarArgs);
            window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revStore, "revFloatingOptionsMenuName": "revStoreItem" });
        });
    });

    let revRetPageView = async () => {
        return `
        <div id="${revTimelineStoreContainer_Id}" class="revFlexContainer revTimelineStoreContainer">
            <div class="revFlexWrapper revTimelineStoreHeaderWrapper">
                <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revTimelineNewStoreTab"><i id="${revNewStoreItemListingTab_Id}" class="revTabLink fa fa-plus"></i></div>
                ${window.revSmallDividerWrapper()}
                <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revVisitStore">Visit ${revFirstName}'s Store</div>
            </div>
            <div id="${revTimelineStoreItemsWrapper_Id}" class="revFlexWrapper revFlexWrapperScroll revTimelineStoreItemsWrapper"></div>
        </div>`;
    };

    return await revRetPageView();
};

module.exports.revPageViewWidget = revPageViewWidget;
