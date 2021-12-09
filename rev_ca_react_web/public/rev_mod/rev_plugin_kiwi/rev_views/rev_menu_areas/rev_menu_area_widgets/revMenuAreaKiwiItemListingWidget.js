var revWidget = async (revVarArgs) => {
    let revMenuItems = window.revGetMenuItems('revMenuAreaKiwiItemListing', window.REV_LOADED_MENU_AREAS);

    let revKiwiListingOptionsMenu = await window.revDrawMenuItems(revMenuItems, revVarArgs);

    return revKiwiListingOptionsMenu.join('');
}

module.exports.revWidget = revWidget;