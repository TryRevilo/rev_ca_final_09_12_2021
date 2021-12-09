var revWidget = async (revVarArgs) => {
    let revMenuItems = window.revGetMenuItems("revMenuAreaImportContacts", window.REV_LOADED_MENU_AREAS);

    let revImportContactsMenuItems = await window.revDrawMenuItems(revMenuItems, revVarArgs);

    let revImportContactsMenuItemsArr = [];

    for (let i = 0; i < revImportContactsMenuItems.length; i++) {
        let revImportContactsMenuItem = revImportContactsMenuItems[i];
        revImportContactsMenuItemsArr.push(`
            <div class="revFlexWrapper revImportContactsMenuItemWrapper">
                <div class="revLeftShort_H_Line"></div>
                ${revImportContactsMenuItem}
            </div>
        `);
    }

    return `
    <div class="revFlexWrapper revImportContactsMenuAreaWrapper">
        <div class="revFontSiteGreyTxtColor revFontSizeNormal">impoRt coNtacTs&nbsp;</div>
        <div class="revFontSiteGreyTxtColor revFontSizeNormal"><i class="fas fa-long-arrow-alt-right"></i></div>
        <div class="revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revImportContactsMenuItemsWrapper">
            ${revImportContactsMenuItemsArr.join("")}
        </div>
    </div>
    `;
};

module.exports.revWidget = revWidget;
