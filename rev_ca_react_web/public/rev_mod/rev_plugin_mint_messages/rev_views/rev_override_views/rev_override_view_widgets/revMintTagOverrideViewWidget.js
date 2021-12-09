var revPluginOverrideViewWidget = async (revVarArgs) => {
    return `
    <div class="revTabLink revFlexWrapper revSuggestedMintEntitiesGrpWrapper">
        <div class="revListingIconCurvedTiny revSuggestedMintEntityIcon"></div>
        <div class="revFontSiteBlueTxtColor revFontSizeNormal"><i class="fas fa-arrow-right"></i></div>
        <div class="revFlexWrapper revSuggestedMintEntityIconsWrapper">
            <div class="revListingIconCurvedTiny revSuggestedMintEntityIcon"></div>
            <div class="revListingIconCurvedTiny revSuggestedMintEntityIcon"></div>
            <div class="revListingIconCurvedTiny revSuggestedMintEntityIcon"></div>
        </div>
        <div class="revFlexWrapper revSuggestedMintPublishOptionsTabsWrapper revSuggestedMintEntityInitiator">
            <div class="revFontSiteBlueTxtColor revFontSizeNormal"><i class="fas fa-arrows-alt-h"></i></div>
        </div>
        <div class="revListingIconCurvedTiny revSuggestedMintEntityIcon revSuggestedMintEntityTarget"></div>
        <div class="revFlexWrapper revNewMintTagsOptionsWrapper">
            <div class="revTabLink revSmalllBoldBlue revNewMintTagsOptionTab"><i class="fas fa-plus"></i></div>
            <div class="revTabLink revSmalllBoldBlue revNewMintTagsOptionTab">iGnoRE</div>
        </div>
    </div>
    `;
};

module.exports.revPluginOverrideViewWidget = revPluginOverrideViewWidget;
