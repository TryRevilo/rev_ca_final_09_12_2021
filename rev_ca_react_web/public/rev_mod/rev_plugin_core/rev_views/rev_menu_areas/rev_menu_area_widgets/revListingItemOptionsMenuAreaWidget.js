var revWidget = async (revVarArgs) => {
    let revMenuItems = window.revGetMenuMenuAreaMenuItemsArr("revListingItemOptionsMenuArea", window.REV_LOADED_MENU_ITEMS);
    let revMenuAreaCommsServicesWrapper = await window.revDrawMenuItems(revMenuItems, revVarArgs);

    let revMenuAreaContainer = `
    <div class="dropdown">
        <a class="dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-level-down-alt"></i></a>

        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            ${revMenuAreaCommsServicesWrapper.join("")}
        </div>
    </div>
    `;

    return revMenuAreaContainer;
};

module.exports.revWidget = revWidget;
