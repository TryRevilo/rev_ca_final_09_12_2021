var revMenuItemWidget = async (revVarArgs) => {
    if (!revVarArgs || !revVarArgs._remoteRevEntityGUID || revVarArgs._remoteRevEntityGUID < 1) {
        console.log("!revVarArgs || !revVarArgs._remoteRevEntityGUID || revVarArgs._remoteRevEntityGUID < 1");

        return;
    }

    let revFlagEntityMenu_Id = "revFlagEntityMenu_Id_" + window.revGenUniqueId();

    window.revSetInterval(revFlagEntityMenu_Id, () => {
        document.getElementById(revFlagEntityMenu_Id).addEventListener("click", async (event) => {
            let revFormViewFlagEntity = await window.revGetForm("revFormViewFlagEntity", revVarArgs);
            window.revToggleSwitchArea(revFormViewFlagEntity);
        });
    });

    return `
    <div id="${revFlagEntityMenu_Id}" class="revTabLink dropdown-item revFlexWrapper revMenuItemEditEntityTabWrapper">
        <div class="revFontSiteBlueTxtColor revFontSizeNormal revMenuItemEditEntityTabIcon"><i class="far fa-flag"></i></div>
        <div class="revFontSiteBlueTxtColor revFontSizeNormal revMenuItemEditEntityTabTxt">FLAG</div>
    </div>`;
};

module.exports.revMenuItemWidget = revMenuItemWidget;
