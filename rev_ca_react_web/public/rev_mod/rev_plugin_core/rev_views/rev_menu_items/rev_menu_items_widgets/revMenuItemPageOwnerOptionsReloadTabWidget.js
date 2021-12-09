var revMenuItemWidget = async (revVarArgs) => {
    let revEntityReloadTab_Id = "revEntityReloadTab_Id_" + window.revGenUniqueId();

    return `
        <div id="${revEntityReloadTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFlexWrapper revFilterOptionWrapper">
            <div class="revFontSizeMedium revFilterOptionIcon"><i class="fas fa-sync"></i></div>
        </div>
        `;
};

module.exports.revMenuItemWidget = revMenuItemWidget;
