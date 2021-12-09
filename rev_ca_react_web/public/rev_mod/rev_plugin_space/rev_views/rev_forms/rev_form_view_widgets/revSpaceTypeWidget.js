var revFormViewWidget = async (revVarArgs) => {
    let revEntity = window.REV_LOGGED_IN_ENTITY;

    let revNewStoreItemPageHeader = window.revPageHeader('Select The Type Of Space');

    window.revSetInterval('revPageViewPageNavHeaderId_NewStoreItem', async () => {
        await window.revGetLoadedPageView('revPageViewPageNavHeader', null, async (revLoadedPageView) => {
            document.getElementById('revPageViewPageNavHeaderId_NewStoreItem').innerHTML = revLoadedPageView;
        });
    });

    let revWorkSpace = `
        <div class="revTabLink revFlexContainer revWorkSpaceTypeItemContainer">
            <div class="revFontSiteBlueTxtColor revFontSizeLarge revSpaceTypeTxt">Work</div>
            <div class="revFlexContainer revItemExamplesContainer">
                <div class="revFlexWrapper revFamilyExampleItemWrapper">
                    <div class="revFontSiteBlueTxtColor revFontSizeNormal revExapleItemPointerIcon"><i class="fas fa-long-arrow-alt-right"></i></div>
                    <div class="revFontSiteGreyTxtColor revFontSizeNormal revFamilyExampleItemTxt">Work Coleagues</div>
                </div>
                <div class="revFlexWrapper revFamilyExampleItemWrapper">
                    <div class="revFontSiteBlueTxtColor revFontSizeNormal revExapleItemPointerIcon"><i class="fas fa-long-arrow-alt-right"></i></div>
                    <div class="revFontSiteGreyTxtColor revFontSizeNormal revFamilyExampleItemTxt">Company Departments . Work Groups</div>
                </div>
                <div class="revFlexWrapper revFamilyExampleItemWrapper">
                    <div class="revFontSiteBlueTxtColor revFontSizeNormal revExapleItemPointerIcon"><i class="fas fa-long-arrow-alt-right"></i></div>
                    <div class="revFontSiteGreyTxtColor revFontSizeNormal revFamilyExampleItemTxt">Work Project Groups</div>
                </div>
                <div class="revFlexWrapper revFamilyExampleItemWrapper">
                    <div class="revFontSiteBlueTxtColor revFontSizeNormal revExapleItemPointerIcon"><i class="fas fa-long-arrow-alt-right"></i></div>
                    <div class="revFontSiteGreyTxtColor revFontSizeNormal revFamilyExampleItemTxt">Work Research Groups</div>
                </div>
                <div class="revFlexWrapper revFamilyExampleItemWrapper">
                    <div class="revFontSiteBlueTxtColor revFontSizeNormal revExapleItemPointerIcon"><i class="fas fa-long-arrow-alt-right"></i></div>
                    <div class="revFontSiteGreyTxtColor revFontSizeNormal revFamilyExampleItemTxt">Etc . . .</div>
                </div>
            </div>
        </div>
        `;

    let revSpaceTypesAreaId = 'revSpaceTypesAreaId_' + window.revGenUniqueId();

    window.revSetInterval(revSpaceTypesAreaId, async () => {
        let revSpaceTypes = [];

        let revFamilySpaceTypeForm = await window.revGetForm('revSpaceType_Family', null);
        let revSpaceType_Social = await window.revGetForm('revSpaceType_Social', null);
        let revAcademicSpaceTypeForm = await window.revGetForm('revSpaceType_Academic', null);

        revSpaceTypes.push(revFamilySpaceTypeForm);
        revSpaceTypes.push(revSpaceType_Social);
        revSpaceTypes.push(revAcademicSpaceTypeForm);
        revSpaceTypes.push(revWorkSpace);

        document.getElementById(revSpaceTypesAreaId).innerHTML = revSpaceTypes.join('');
    });

    return `
    <div class="revFlexContainer revPageRightBorderedContainer">
        ${revNewStoreItemPageHeader}
        
        <div id="revPageViewPageNavHeaderId_NewStoreItem" class="revFlexWrapper revPageViewPageNavHeader revNewStoreItemNavHeaderArea"></div>
        
        <div class="revFontSiteGreyTxtColor revFontSizeNormal revSpaceTypePageTell">Spaces HElp you iNTeRact wiTH groups of peoplE iN youR LiFE</div>
        <div class="revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revCreateTellWrapper">
            <div class="revCreateTellTxt">Create one below</div>
            <div class="revCreateTellPointDown"><i class="fas fa-level-down-alt"></i></div>
        </div>
        <div id="${revSpaceTypesAreaId}" class="revFlexContainer revSpaceTypesContainer"></div>
    </div>
    `;
};

module.exports.revFormViewWidget = revFormViewWidget;