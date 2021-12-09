var revFormViewWidget = async (revVarArgs) => {
    let revActionCallbackAction = revVarArgs.revActionCallbackAction;

    let revMarkNoticiaReadCB_Id = "revMarkNoticiaReadCB_Id_" + window.revGenUniqueId();
    let revCheckBoxCallback = (revCBVarArgs) => {};

    let revCBVarArgs = {
        "revCheckBoxCallback": revCheckBoxCallback,
        "revCheckBoxId": revMarkNoticiaReadCB_Id,
    };

    let revMarkNoticiaReadCB = window.revGetCheckBox(revCBVarArgs);

    let revNoticiaItemListingSummuryWrapper = (revNoticiaEntityGUID) => {
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
                        <div class="revTabLink revListingIconCurvedTiny revNoticiaItemListingEntityIcon"></div>
                        <div class="revFlexWrapper revNoticiaItemEntityDetails">
                            <div class="revFlexContainer revNoticiaItemEntityFullNamesContainer">
                                <div class="revTabLink revFontSiteBlueTxtColor">A Space I Like</div>
                                <div class="revTimeCreatedStyle">Thursday 6:00pm 31 Dec 2020</div>
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

    let revNoticiaItemListingItemListsArr = [];

    for (let i = 0; i < 4; i++) {
        revNoticiaItemListingItemListsArr.push(revNoticiaItemListingSummuryWrapper(i));
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
                    <div class="revFontSiteBlueTxtColor revFontSizeLarge revNoticiaItemListingIconWrapper">${revCheckAllCB}</div>
                    <div class="revNoticiaItemListingMidSeparater"></div>
                    <div class="revNoticiaItemListing_V_Rule_Tiny"></div>
                    <div class="revNoticiaItemListing_H_Rule"></div>
                </div>
                <div class="revFlexContainer revNoticiasItemsConfirmContainer">${revNoticiaItemListingItemListsArr.join("")}</div>
            </div>
            `;

    return revNoticiaItemListingsCalArea;
};

module.exports.revFormViewWidget = revFormViewWidget;
