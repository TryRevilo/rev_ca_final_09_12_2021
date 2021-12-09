var revWidget = async (revVarArgs) => {
    let revMenuItems = window.revGetMenuItems('revMenuAreaCommsServices', window.REV_LOADED_MENU_AREAS);
    let revMenuAreaCommsServicesWrapper = await window.revDrawMenuItems(revMenuItems, revVarArgs);

    let revCommsServicesMenuItems = revMenuAreaCommsServicesWrapper.join('');

    return `<div class="revIMHeaderMenuArea">${revCommsServicesMenuItems}</div>`;
}

module.exports.revWidget = revWidget;