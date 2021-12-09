var revMenuItemWidget = async (revVarArgs) => {
    if (!revVarArgs || !revVarArgs._revEntityType) {
        return;
    }

    let revEntityFloatingTab_Id = "revEntityFloatingTab_Id_" + window.revGenUniqueId();

    let revEntityType = revVarArgs._revEntityType;

    window.revSetInterval(revEntityFloatingTab_Id, () => {
        document.getElementById(revEntityFloatingTab_Id).addEventListener("click", async (event) => {
            if (revEntityType.localeCompare("rev_user_entity") == 0) {
                let revFormUserSettings = await window.revGetForm("revFormUserSettings", revVarArgs);

                window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revFormUserSettings, "revFloatingOptionsMenuName": "revInfo" });
            } else if (revEntityType.localeCompare("rev_group_entity") == 0) {
                let revLoadedPageView = await window.revGetLoadedPageView("revPageViewSpaceSettingsPage", revVarArgs);

                if (revLoadedPageView) {
                    document.getElementById("revPageContextViewSpaceActivityId").innerHTML = revLoadedPageView;
                }
            }
        });
    });

    return `
        <div id="${revEntityFloatingTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFlexWrapper revFilterOptionWrapper">
            <div class="revFontSizeMedium revFilterOptionIcon"><i class="fas fa-cog"></i></div>
        </div>
        `;
};

module.exports.revMenuItemWidget = revMenuItemWidget;
