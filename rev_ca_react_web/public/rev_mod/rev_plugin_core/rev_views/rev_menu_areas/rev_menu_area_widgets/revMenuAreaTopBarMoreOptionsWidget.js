var revWidget = async (revVarArgs) => {
    let revMenuItems = window.revGetMenuMenuAreaMenuItemsArr("revMenuAreaTopBarMoreOptions", window.REV_LOADED_MENU_ITEMS);

    let revMenuAreaTopBarMoreOptionsWrapper = [];

    if (revMenuItems) {
        revMenuAreaTopBarMoreOptionsWrapper = await window.revDrawMenuItems(revMenuItems, revVarArgs);
    }

    let revMenuAreaContainer = `
        <div class="dropdown">
            <a class="role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-list"></i></a>

            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                ${revMenuAreaTopBarMoreOptionsWrapper.join("")}
            </div>
        </div>
    `;

    return revMenuAreaContainer;
};

module.exports.revWidget = revWidget;
