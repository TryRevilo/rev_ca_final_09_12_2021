var revWidget = async (revVarArgs) => {
    let revMenuItems = window.revGetMenuMenuAreaMenuItemsArr('revRightSideBarTopBarMenuArea', window.REV_LOADED_MENU_ITEMS);
    let revRightSideBarTopBarMenuAreaItems = await window.revDrawMenuItems(revMenuItems, revVarArgs);

    let revMenuAreaContainer =
        `
        <div class="revTopBarWrapperStyle">
            ${revRightSideBarTopBarMenuAreaItems.join('')}
            <div class="vl_H"></div>
        </div>
    `;

    return revMenuAreaContainer;
}

module.exports.revWidget = revWidget;