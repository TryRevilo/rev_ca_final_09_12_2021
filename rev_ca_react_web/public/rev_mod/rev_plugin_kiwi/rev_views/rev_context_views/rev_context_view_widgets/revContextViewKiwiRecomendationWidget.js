var revPageViewWidget = async (revVarArgs) => {
    let revNoticiasPageHeader = window.revPageHeader("RecomENDaTions");

    let revPageViewPageNavHeader = await window.revGetLoadedPageView("revPageViewPageNavHeader", null);

    let revRecItemListingSummuryWrapper = `
    <div class="revFlexWrapper revRecItemListingContentWrapper">
        <div class="revFlexContainer">
            <div class="revTabLink revFlexWrapper revRecomenderWrapper">
                <div class="revTabLink revListingIconCurvedTiny revRecItemListingEntityIcon"></div>
                <div class="revSmalllBoldBlue revRecomenderNames">Oliver</div>
                <div class="revTimeCreatedStyle revTimeCreatedStyle_RecTime">Thursday 6:00pm 31 Dec 2020</div>
            </div>
            <div class="revFlexContainer revRecItemEntityDetailsContainer">
                <div class="revTabLink revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper revRecItemEntityDetailsWrapper">
                    This is a very awesome post I was recomended! <span class="revTabLink revSmalllBoldBlue">&nbsp;<i class="fas fa-long-arrow-alt-right"></i>&nbsp;rEAd moRE</span>
                </div>
                <div class="revTabLink revFlexWrapper revRecPublisherDetailsWrapper">
                    <div class="revFontSiteGreyTxtColor revFontSizeNormal"><i class="fas fa-level-up-alt revSmalllBold revRotate90"></i> By</div>
                    <div class="revSmalllBoldBlue revRecPublisherFullNames">Oliver Muchai Githire</div>
                    <div class="revTimeCreatedStyle revTimeCreatedStyle_RecTime">Thursday 6:00pm 31 Dec 2020</div>
                </div>
            </div>
        </div>
    </div>
    `;

    let revRecItemListingItemListsArr = [];

    for (let i = 0; i < 4; i++) {
        revRecItemListingItemListsArr.push(revRecItemListingSummuryWrapper);
    }

    let revRecItemListingsCalArea = `
    <div class="revFlexContainer revRecItemListingsContainer">
        <div class="revFlexContainer">${revRecItemListingItemListsArr.join("")}</div>
    </div>
    `;

    return `
    <div class="revFlexContainer">
        <div class="revFlexContainer revPageHeaderAreaContainer">
            ${revNoticiasPageHeader}
            <div class="revFlexWrapper revPageViewTitledPageNavHeader">${revPageViewPageNavHeader}</div>
        </div>
        ${revRecItemListingsCalArea}
    </div>
    `;
};

module.exports.revPageViewWidget = revPageViewWidget;
