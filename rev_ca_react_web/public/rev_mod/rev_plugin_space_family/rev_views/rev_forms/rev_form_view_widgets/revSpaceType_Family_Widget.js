var revFormViewWidget = async (revVarArgs) => {

    let revFamilySpaceId = 'revFamilySpace_' + window.revGenUniqueId();

    window.revSetInterval(revFamilySpaceId, () => {
        document.getElementById(revFamilySpaceId).addEventListener('click', async (event) => {
            let revSpace_Family_Form = await window.revGetForm('rev_space_family', null);
            document.getElementById('revPageHome').innerHTML = revSpace_Family_Form;
        });
    });

    let revFamilySpace = `
        <div id="${revFamilySpaceId}" class="revTabLink revFlexContainer revFamilySpaceTypeItemContainer">
            <div class="revFontSiteBlueTxtColor revFontSizeLarge revSpaceTypeTxt">Family</div>
            <div class="revFlexContainer revItemExamplesContainer">
                <div class="revFlexWrapper revFamilyExampleItemWrapper">
                    <div class="revFontSiteBlueTxtColor revFontSizeNormal revExapleItemPointerIcon"><i class="fas fa-long-arrow-alt-right"></i></div>
                    <div class="revFontSiteGreyTxtColor revFontSizeNormal revFamilyExampleItemTxt">Imediate Family like parents.bros.siz</div>
                </div>
                <div class="revFlexWrapper revFamilyExampleItemWrapper">
                    <div class="revFontSiteBlueTxtColor revFontSizeNormal revExapleItemPointerIcon"><i class="fas fa-long-arrow-alt-right"></i></div>
                    <div class="revFontSiteGreyTxtColor revFontSizeNormal revFamilyExampleItemTxt">Cousins - Nieces.Nephews - Aunts.Uncles - GrandPas.Grandmas</div>
                </div>
                <div class="revFlexWrapper revFamilyExampleItemWrapper">
                    <div class="revFontSiteBlueTxtColor revFontSizeNormal revExapleItemPointerIcon"><i class="fas fa-long-arrow-alt-right"></i></div>
                    <div class="revFontSiteGreyTxtColor revFontSizeNormal revFamilyExampleItemTxt">Etc . . . .</div>
                </div>
            </div>
        </div>
        `;

    return revFamilySpace;
};

module.exports.revFormViewWidget = revFormViewWidget;