var revFormViewWidget = async (revVarArgs) => {
    if (!revVarArgs || !revVarArgs._remoteRevEntityGUID || revVarArgs._remoteRevEntityGUID < 1) {
        console.log("ERR -> revInviteContactsWidget -> !revVarArgs || !revVarArgs._remoteRevEntityGUID || revVarArgs._remoteRevEntityGUID < 1");
        return;
    }

    let revEntityGUID = revVarArgs._remoteRevEntityGUID;

    let revImportedEntityContactsArr = [];

    if (revVarArgs.revImportedEntityContactsArr) {
        revImportedEntityContactsArr = revVarArgs.revImportedEntityContactsArr;
    }

    let revSelecetedEntitiesArr = [];

    let revSelectableContactsCallback = (revSelectedArr) => {
        revSelecetedEntitiesArr = revSelectedArr;
    };

    let revPassVarArgs_ImporPhoneBooktCcts = window.revCloneJsObject(revVarArgs);

    let revImportPhoneBookContactsCallback = async (revImportedEntityContactsArr_) => {
        revImportedEntityContactsArr = revImportedEntityContactsArr.concat(revImportedEntityContactsArr_);

        console.log("revImportedEntityContactsArr : " + JSON.stringify(revImportedEntityContactsArr));

        let revPassVarArgs = window.revCloneJsObject(revVarArgs);
        revPassVarArgs["revImportedEntityContactsArr"] = revImportedEntityContactsArr;

        revPassVarArgs["revPageContentAreaRendererCallback"] = revVarArgs.revPageContentAreaRendererCallback;

        let revInviteContacts = await window.revGetForm("revInviteContacts", revPassVarArgs);
        revVarArgs.revPageContentAreaRendererCallback(revInviteContacts);
    };

    revPassVarArgs_ImporPhoneBooktCcts["revImportPhoneBookContactsCallback"] = revImportPhoneBookContactsCallback;
    revPassVarArgs_ImporPhoneBooktCcts["revPageContentAreaRendererCallback"] = revVarArgs.revPageContentAreaRendererCallback;

    let revMenuAreaImportContacts = await window.revGetMenuAreaView("revMenuAreaImportContacts", revPassVarArgs_ImporPhoneBooktCcts);

    let revSelectableContacts = await window.revGetForm("revSelectableContacts", { "revImportedEntityContactsArr": revImportedEntityContactsArr, "revSelectableContactsCallback": revSelectableContactsCallback });

    let revIviteTab_Id = "revIviteTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revIviteTab_Id, () => {
        document.getElementById(revIviteTab_Id).addEventListener("click", (event) => {
            console.log("revSelecetedEntitiesArr : " + JSON.stringify(revSelecetedEntitiesArr));

            /** REV START INVITE RELS HERE */
            let filterRevRetArr = { filter: [] };

            for (let i = 0; i < revSelecetedEntitiesArr.length; i++) {
                let revSubjectEntityGUID = revSelecetedEntitiesArr[i];

                let revAddSpaceMemberRel = window.REV_ENTITY_RELATIONSHIP_STRUCT();
                revAddSpaceMemberRel._revEntityRelationshipType = "rev_entity_space_member";
                revAddSpaceMemberRel._revResolveStatus = -1;
                revAddSpaceMemberRel._remoteRevEntityTargetGUID = revEntityGUID;
                revAddSpaceMemberRel._remoteRevEntitySubjectGUID = revSubjectEntityGUID;

                filterRevRetArr.filter.push(revAddSpaceMemberRel);
            }

            if (filterRevRetArr.filter.length > 0) {
                window.revPostServerData(window.REV_CREATE_NEW_REL_URL, filterRevRetArr, async (revRetRelData) => {
                    let revRetRelArr = revRetRelData.filter;

                    for (let i = 0; i < revRetRelArr.length; i++) {
                        let revAddedRel = revRetRelArr[i];

                        if (revAddedRel && revAddedRel._revEntityRelationshipRemoteId && revAddedRel._revEntityRelationshipRemoteId > 0) {
                        }
                    }

                    let revLengthTxt = " Invitations";

                    if (revRetRelArr.length <= 1) revLengthTxt = "Invitation";

                    let revNoticiasPopUpContainer = window.revGetNoticiasPopUpContainer(`<div class="revFontSiteGreyTxtColor revFontSizeNormal revTempShowElementTxtWrapper">${revRetRelArr.length} ${revLengthTxt} sent . . .</div>`);
                    window.revTempShowElement(revNoticiasPopUpContainer, "revPageRightSectionContainerId", 7000);
                });
            } else {
                let revNoticiasPopUpContainer = window.revGetNoticiasPopUpContainer('<div class="revFontSiteGreyTxtColor revFontSizeNormal revTempShowElementTxtWrapper">No contacts selected . . .</div>');
                window.revTempShowElement(revNoticiasPopUpContainer, "revPageRightSectionContainerId", 7000);
            }
        });
    });

    let revFormSubmitTab = `
    <div class="revFlexWrapper revContactsHeaderWrapper">
        <div id="${revIviteTab_Id}" class="revTabLink revFlexWrapper revShareTabWrapper">
            <div class="revSmalllBoldWhite revShareTabTxt">INviTE</div>
            <div class="revFontSiteBlueTxtColor revFontSizeNormal"><i class="fa fa-arrow-right"></i></div>
        </div>
    </div>
    `;

    return `
        <div class="revFlexContainer">
            <div class="revFlexWrapper revInviteContactsHeaderWrapper">
                ${revFormSubmitTab}
                <div class="revImportCctsHeaderArea">${revMenuAreaImportContacts}</div>
            </div>
            <div class="revFlexContainer revFlexContainerScroll">${revSelectableContacts}</div>
        </div>
        `;
};

module.exports.revFormViewWidget = revFormViewWidget;
