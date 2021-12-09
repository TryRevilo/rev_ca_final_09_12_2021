var revPageViewWidget = async (revVarArgs) => {
    return `
    <div class="revFlexWrapper">
        <div class="revSpaceIcon"></div>
        <div class="revFlexContainer revEntityBriefFlexRightContainer">
            <div class="revFontSiteBlueTxtColor revSpaceEntityName">Attackers might be trying to steal your information</div>
            <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper">
                <div class="revFontSizeLarge revFamilyNamePointerIcon"><i class="fas fa-grip-lines"></i></div>
                <div class="revFontSiteGreyTxtColor revFontSizeNormal revFamilyNameVal">Muchai Family</div>
            </div>
            <div class="revFlexWrapper revBriefSpaceDetailWrapper">
                <div class="revSpaceBriefAdminIcon"></div>
                <div class="revSpaceBriefAdminIcon"></div>
                <div class="revSpaceBriefAdminIcon"></div>
                <div class="revFontSiteBlueTxtColor revFontSizeNormal revBriefSpaceExtraFounders">+ 4 other admins</div>
            </div>
        </div>
    </div>
    `;
}

module.exports.revPageViewWidget = revPageViewWidget;