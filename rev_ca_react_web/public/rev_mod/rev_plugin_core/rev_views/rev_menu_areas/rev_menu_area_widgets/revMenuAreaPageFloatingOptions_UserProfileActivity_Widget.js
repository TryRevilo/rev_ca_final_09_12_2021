var revWidget = async (revVarArgs) => {
    let revMenuItems = window.revGetMenuMenuAreaMenuItemsArr("rev_floating_menu_area_user_profile_activity_page", window.REV_LOADED_MENU_ITEMS);
    let revMenuAreaDrawArray = await window.revDrawMenuItems(revMenuItems, revVarArgs);

    return revMenuAreaDrawArray.join("");
};

module.exports.revWidget = revWidget;
