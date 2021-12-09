var revFormViewWidget = async (revVarArgs) => {

    let revAcademicSpaceId = 'revAcademicSpaceId_' + window.revGenUniqueId();

    window.revSetInterval(revAcademicSpaceId, () => {
        document.getElementById(revAcademicSpaceId).addEventListener('click', async (event) => {
            let revSpace_Family_Form = await window.revGetForm('rev_academic_space', revVarArgs);
            document.getElementById('revPageHome').innerHTML = revSpace_Family_Form;
        });
    });

    let revAcademicSpace = `
        <div id="${revAcademicSpaceId}" class="revTabLink revFlexContainer revAcademicSpaceTypeItemContainer">
            <div class="revFontSiteWhitextColor revFontSizeLarge revSpaceTypeTxt">Academic</div>
            <div class="revFlexContainer revItemExamplesContainer">
                <div class="revFlexWrapper revFamilyExampleItemWrapper">
                    <div class="revSmalllBoldWhite revFontSizeNormal revExapleItemPointerIcon"><i class="fas fa-long-arrow-alt-right"></i></div>
                    <div class="revSmalllBoldWhite revFontSizeNormal revFamilyExampleItemTxt">School Classes</div>
                </div>
                <div class="revFlexWrapper revFamilyExampleItemWrapper">
                    <div class="revSmalllBoldWhite revFontSizeNormal revExapleItemPointerIcon"><i class="fas fa-long-arrow-alt-right"></i></div>
                    <div class="revSmalllBoldWhite revFontSizeNormal revFamilyExampleItemTxt">Study Groups</div>
                </div>
                <div class="revFlexWrapper revFamilyExampleItemWrapper">
                    <div class="revSmalllBoldWhite revFontSizeNormal revExapleItemPointerIcon"><i class="fas fa-long-arrow-alt-right"></i></div>
                    <div class="revSmalllBoldWhite revFontSizeNormal revFamilyExampleItemTxt">Academic Project Groups</div>
                </div>
                <div class="revFlexWrapper revFamilyExampleItemWrapper">
                    <div class="revSmalllBoldWhite revFontSizeNormal revExapleItemPointerIcon"><i class="fas fa-long-arrow-alt-right"></i></div>
                    <div class="revSmalllBoldWhite revFontSizeNormal revFamilyExampleItemTxt">Research Project Groups</div>
                </div>
                <div class="revFlexWrapper revFamilyExampleItemWrapper">
                    <div class="revSmalllBoldWhite revFontSizeNormal revExapleItemPointerIcon"><i class="fas fa-long-arrow-alt-right"></i></div>
                    <div class="revSmalllBoldWhite revFontSizeNormal revFamilyExampleItemTxt">School Clubs & Societies</div>
                </div>
                <div class="revFlexWrapper revFamilyExampleItemWrapper">
                    <div class="revSmalllBoldWhite revFontSizeNormal revExapleItemPointerIcon"><i class="fas fa-long-arrow-alt-right"></i></div>
                    <div class="revSmalllBoldWhite revFontSizeNormal revFamilyExampleItemTxt">Etc . . .</div>
                </div>
            </div>
        </div>
        `;

    return revAcademicSpace;
};

module.exports.revFormViewWidget = revFormViewWidget;