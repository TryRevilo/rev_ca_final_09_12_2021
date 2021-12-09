var revMenuItemWidget = async (revVarArgs) => {
    if (!revVarArgs || !revVarArgs._remoteRevEntityGUID || revVarArgs._remoteRevEntityGUID < 1) return "ERR ---> revMenuItemEditEntityWidget revVarArgs EDIT MENU ITEM";

    let revElementEditMenuId = "revEntityEdit_" + window.revGenUniqueId();

    window.revSetInterval(revElementEditMenuId, () => {
        document.getElementById(revElementEditMenuId).addEventListener("click", async (event) => {
            let revEntityForm = await window.revGetForm(revVarArgs._revEntitySubType, revVarArgs);
            window.revToggleSwitchArea(revEntityForm);
        });
    });

    return `
    <div id="${revElementEditMenuId}" class="revTabLink dropdown-item revFlexWrapper revMenuItemEditEntityTabWrapper">
        <div class="revFontSiteBlueTxtColor revFontSizeNormal revMenuItemEditEntityTabIcon"><i class="far fa-edit"></i></div>
        <div class="revFontSiteBlueTxtColor revFontSizeNormal revMenuItemEditEntityTabTxt">eDiT</div>
    </div>`;
};

module.exports.revMenuItemWidget = revMenuItemWidget;
