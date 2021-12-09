var revPageViewWidget = async (revVarArgs) => {
    let revOtherFamilyMembersArr = [];

    for (let i = 0; i < 25; i++) {
        let revLeftBorder = '<div class="revSmall-H-Line"></div>';
        let revRightBorder = "";

        if (i == 24) {
            revRightBorder = '<div class="revSmall-H-Line"></div>';
        }

        let revOtherFamilyMemberView = `
        <div class="revTabLink revFlexWrapper revOtherFamilyMemberWrapper">
            ${revLeftBorder}
            <div class="revFlexContainer revOtherFamilyMemberContainer">
                <div class="revOtherFamilyMemberIcon"></div>
                <div class="revFontSiteBlueTxtColor revFontSizeSmall revOtherFamilyMemberNames">OLI</div>
            </div>
            ${revRightBorder}
        </div>
        `;

        revOtherFamilyMembersArr.push(revOtherFamilyMemberView);
    }

    return `<div class="revFlexWrapper revFlexWrapperScroll revOtherFamilyMembersWarpper">${revOtherFamilyMembersArr.join("")}</div>`;
};

module.exports.revPageViewWidget = revPageViewWidget;
