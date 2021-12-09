var revFormViewWidget = async (revVarArgs) => {
    if (!revVarArgs || !revVarArgs.revOnPaymentCallbackMethod) {
        console.log(">>> EMPTY >>>");
        return;
    }

    /** START REV ITEM SUBMIT FORM FOOTER */
    let revSubmitItemTabId = "revSubmitItemTabId_" + window.revGenUniqueId();

    let revPaymentOptionCallback = async () => {
        if (revVarArgs.revOnPaymentCallbackMethod) {
            let revOnPaymentCallbackMethod = revVarArgs.revOnPaymentCallbackMethod;
            // await revOnPaymentCallbackMethod("HELLO World!");
        }

        let revPageViewPayPalPayReceipt = await window.revGetLoadedPageView("revPageViewPayPalPayReceipt", revVarArgs);
        window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revPageViewPayPalPayReceipt, "revFloatingOptionsMenuName": "123" });
    };

    let revFormSubmitTab = window.revFormSubmitTab({
        "revId": revSubmitItemTabId,
        "revIcon": '<i class="fa fa-arrow-right"></i>',
        "revTitle": "coNTiNuE to cHEckouT",
        "revSubmitCallback": revPaymentOptionCallback,
    });
    /** END REV ITEM SUBMIT FORM FOOTER */

    /** REV START HEADER AREA */
    let revEntityMetadataList = revVarArgs._revEntityMetadataList;

    let revMaxStrLen = 57;

    let revEntityName = window.revGetMetadataValue(revEntityMetadataList, "rev_entity_name");
    revEntityName = window.revGetRawHTML(revEntityName);
    revEntityName = window.revTruncateString(revEntityName, revMaxStrLen);

    let revEntityNameHeaderLink_Id = "revEntityNameHeaderLink_Id_" + window.revGenUniqueId();

    window.revSetInterval(revEntityNameHeaderLink_Id, () => {
        document.getElementById(revEntityNameHeaderLink_Id).addEventListener("click", async (event) => {
            let revObjectStoreItem = await window.revGetLoadedPageView("revObjectStoreItem", revVarArgs);
            window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revObjectStoreItem, "revFloatingOptionsMenuName": "123" });
        });
    });

    revEntityName = `<div id=${revEntityNameHeaderLink_Id} class="revTabLink revFontSiteBlueTxtColor revFlexWrapper">${revEntityName}</div>`;

    /** REV END HEADER AREA */
    let revPaypalButtonTab_Id = "revPaypalButtonTab_Id_" + window.revGenUniqueId();

    // window.revSetInterval(revPaypalButtonTab_Id, () => {
    //     // Displays PayPal buttons
    //     paypal_sdk
    //         .Buttons({
    //             style: {
    //                 layout: "horizontal",
    //             },

    //             // Call your server to set up the transaction
    //             createOrder: async function (data, actions) {
    //                 let revURL = window.REV_SITE_BASE_PATH + "/rev_api?" + "rev_logged_in_entity_guid=" + window.REV_LOGGED_IN_ENTITY_GUID + "&revPluginHookContextsRemoteArr=revHookRemoteHandler_PayPalOrdeData";

    //                 let orderID;

    //                 try {
    //                     let revData = await window.revGetServerData_JSON_Async(revURL);
    //                     orderID = revData.revPayPalOrderData;
    //                 } catch (error) {
    //                     console.log("ERR -> revSelectPaymentOptionWidget.js -> !revData" + error);
    //                 }

    //                 return orderID;
    //             },

    //             // Call your server to finalize the transaction
    //             onApprove: async function (data, actions) {
    //                 console.log("data : " + JSON.stringify(data));

    //                 let revOrderID = data.orderID;

    //                 let revURL = window.REV_SITE_BASE_PATH + `/rev_api?rev_logged_in_entity_guid=${window.REV_LOGGED_IN_ENTITY_GUID}&rev_order_id=${revOrderID}&revPluginHookContextsRemoteArr=revHookRemoteHandler_PayPalOrderPayExec`;

    //                 try {
    //                     let revData = await window.revGetServerData_JSON_Async(revURL);

    //                     console.log("revData : " + JSON.stringify(revData));

    //                     orderID = revData.revPayPalOrderData;
    //                 } catch (error) {
    //                     console.log("ERR -> revSelectPaymentOptionWidget.js -> !revData" + error);
    //                 }
    //             },
    //         })
    //         .render(`#${revPaypalButtonTab_Id}`);
    // });

    let revCancelDeleteButton_Id = "revCancelDeleteButton_Id_" + window.revGenUniqueId();

    window.revSetInterval(revCancelDeleteButton_Id, () => {
        document.getElementById(revCancelDeleteButton_Id).addEventListener("click", (event) => {
            window.revToggleSwitchArea("");
        });
    });

    let revView = `
    <div class="revFlexContainer revToggleCheckoutContainer">
        <div class="revFontSizeNormalHeader revToggleCheckoutHeader">continue to cHEckouT</div>
        <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper revToggleCheckoutContentWrapper">
            <i class="fas fa-quote-left revFontSiteGreyTxtColor revFontSizeNormal"></i>
            <div class="revToggleCheckoutrevEntityName">${revEntityName}</div>
        </div>

        <div class="revFlexWrapper revToggleCheckoutFooterAreaWrapper">
            ${revFormSubmitTab}
            <div id="${revPaypalButtonTab_Id}" class="revPaypalButtonTab"></div>
            <div id="${revCancelDeleteButton_Id}" class="revTabLink revSmalllBoldBlue revCancel">cANcEL</div>
        </div>
    </div>
    `;

    return revView;
};

module.exports.revFormViewWidget = revFormViewWidget;
