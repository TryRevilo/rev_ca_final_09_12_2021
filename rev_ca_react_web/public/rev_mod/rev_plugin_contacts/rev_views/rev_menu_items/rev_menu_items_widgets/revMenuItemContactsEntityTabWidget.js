var revMenuItemWidget = (revVarArgs) => {
    if (!revVarArgs || !revVarArgs.revPageContentAreaRendererCallback) return null;

    let revPageContentAreaRendererCallback = revVarArgs.revPageContentAreaRendererCallback;

    let revEntityFloatingTab_Id = "revEntityFloatingTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revEntityFloatingTab_Id, () => {
        document.getElementById(revEntityFloatingTab_Id).addEventListener("click", async (event) => {
            let revSelecetedEntitiesArr = [];

            let revInvitePeopleTab_Id = "revInvitePeopleTab_Id_" + window.revGenUniqueId();

            window.revSetInterval(revInvitePeopleTab_Id, () => {
                document.getElementById(revInvitePeopleTab_Id).addEventListener("click", async (event) => {
                    let revInviteContacts = await window.revGetForm("revInviteContacts", revVarArgs);
                    revPageContentAreaRendererCallback(revInviteContacts);
                });
            });

            let revSelectableContactsCallback = (revSelectedArr) => {
                revSelecetedEntitiesArr = revSelectedArr;
                console.log("revMenuItemContactsEntityTabWidget.js -> revSelectedArr : " + JSON.stringify(revSelecetedEntitiesArr));
            };

            /** START REV MEMBERS HEADER */
            let revMembersHeader = `
                <div class="revFlexWrapper revContactsHeaderWrapper">
                    <div id="${revInvitePeopleTab_Id}" class="revTabLink revFlexWrapper revInviteMembersWrapper">
                        <div class="revFontSiteBlueTxtColor revFontSizeLarge"><i class="far fa-share-square"></i></div>
                        <div class="revFlexWrapper revInviteMembersTabDividerWrapper">
                            <div class="revSmall-H-Line"></div>
                            <div class="revTiny-V-Line"></div>
                        </div>
                        <div class="revFontSiteBlueTxtColor revFontSizeNormal revInviteMembersTxt">InviTe pEopLe</div>
                        <div class="revFlexWrapper revInviteMembersTabDividerWrapper">
                            <div class="revTiny-V-Line"></div>
                            <div class="revSmall-H-Line"></div>
                        </div>
                    </div>
                </div>
            `;
            /** END REV MEMBERS HEADER */

            let revSelectableContacts = await window.revGetForm("revSelectableContacts", { "revEntity": revVarArgs, "revSelectableContactsCallback": revSelectableContactsCallback });

            if (revSelectableContacts) {
                revPageContentAreaRendererCallback(revMembersHeader + revSelectableContacts);
            }
        });
    });

    return `
        <div id="${revEntityFloatingTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFlexWrapper revFilterOptionWrapper">
            <div class="revFontSizeLarge revFilterOptionIcon"><i class="fas fa-people-arrows"></i></div>
        </div>
        `;
};

module.exports.revMenuItemWidget = revMenuItemWidget;
