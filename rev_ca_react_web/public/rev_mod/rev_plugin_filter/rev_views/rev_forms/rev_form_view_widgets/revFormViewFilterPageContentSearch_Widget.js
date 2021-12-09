var revFormViewWidget = async (revVarArgs) => {
    let revFilterSubTypesArr = [];

    let revContextSearchInput_Id = "revContextSearchInput_Id_" + window.revGenUniqueId();

    let revContextSearchInputText = window.revInputText_Flat({
        "revId": revContextSearchInput_Id,
        "revInputTextHeader": false,
        "revBorderStyle": "revAllBordersInput",
        "revPlaceholderText": "FiLTER @Oliver . . .",
    });

    let revCB_Public_Id = "revSelectedIconId_" + window.revGenUniqueId();

    let revFilterPicsAlbumsCallback = async (revCBVarArgs) => {
        console.log("revCBVarArgs : " + JSON.stringify(revCBVarArgs));

        if (revCBVarArgs.revCheckBoxChecked) {
            revFilterSubTypesArr.push("rev_pics_album");
        } else {
            window.revRemoveArrElement(revFilterSubTypesArr, "rev_pics_album");
        }
    };

    let revCBVarArgsPublic = {
        "revCheckBoxCallback": revFilterPicsAlbumsCallback,
        "revCheckBoxId": revCB_Public_Id,
    };

    let revCheckBoxPublic = window.revGetCheckBox(revCBVarArgsPublic);

    let revContextSearchTab_Id = "revContextSearchTab_Id_" + window.revGenUniqueId();

    let revFormSubmitTab = window.revSubmitTabCurvedPointerRight({
        "revId": revContextSearchTab_Id,
        "revTitle": "FiLTER",
        "revSubmitCallback": async () => {
            let revSearchTxt = window.revGetTextInputVal(revContextSearchInput_Id);

            if (!revSearchTxt) {
                revSearchTxt = "rev_all";
            }

            let revPassVarArgs = window.revCloneJsObject(revVarArgs);
            revPassVarArgs["revSearchTxt"] = revSearchTxt;
            revPassVarArgs["revEntitySubTypesArr"] = revFilterSubTypesArr;
            // revPassVarArgs["revEntityOwnerGUID"] = revVarArgs._remoteRevEntityGUID;
            revPassVarArgs["revContainerGUID"] = revVarArgs._remoteRevEntityGUID;

            let revPageViewListingSerachResults = await window.revGetLoadedPageView("revPageViewListingSerachResults", revPassVarArgs);
            window.revDrawMainContentArea({ "revData": revPassVarArgs, "revLoadedPageView": revPageViewListingSerachResults, "revFloatingOptionsMenuName": "123" });

            window.revToggleSwitchArea(null);
        },
    });

    let revHideSwitchAreaTab = "revHideSwitchAreaTab_" + window.revGenUniqueId();

    window.revSetInterval(revHideSwitchAreaTab, () => {
        document.getElementById(revHideSwitchAreaTab).addEventListener("click", (event) => {
            window.revToggleSwitchArea(null);
        });
    });

    let revFilterOptionsWrapper = `
    <div class="revFlexWrapper revPageEntityFilterChecksFormViewWrapper">
        <div class="revFlexWrapper revPageEntityFilterOptionWrapper">
            ${revCheckBoxPublic}
            <div class="revFontSiteGreyTxtColor revFontSizeNormal revChatSettingsTxt">pictures</div>
        </div>
        <div class="revFlexWrapper revPageEntityFilterOptionWrapper">
            ${revCheckBoxPublic}
            <div class="revFontSiteGreyTxtColor revFontSizeNormal revChatSettingsTxt">videos</div>
        </div>
    </div>
    `;

    return `
    <div class="revFlexContainer">
        <div class="revFontSizeNormalHeader revPageEntityFilterHeader">Filter page</div>
        <div class="revFlexWrapper revPageEntityFilterSearchInputWrapper">${revContextSearchInputText}</div>
        ${revFilterOptionsWrapper}
        <div class="revFlexWrapper revPageEntityFilterOptionsFooterWrapper">
            ${revFormSubmitTab}
            <div id="${revHideSwitchAreaTab}" class="revTabLink revFontSiteBlueTxtColor revHideSwitchAreaTab">cancEL</div>
        </div>
    </div>
    `;
};

module.exports.revFormViewWidget = revFormViewWidget;
