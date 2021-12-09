var revPageViewWidget = async (revVarArgs) => {
    let revPageHeader = window.revPageHeader("pEopLE");
    let revLoadedPageView = await window.revGetLoadedPageView("revPageViewPageNavHeader", { revEntity: { "_revEntitySubType": "revSpaceType" } });

    let url = window.REV_SITE_BASE_PATH + "/api/rev_entity/get_all_filled_rev_entity_type_with_info?rev_entity_type=rev_user_entity";
    let revData = await window.revGetServerData_JSON_Async(url);

    let revMembersItems = [];

    for (let i = 0; i < revData.filter.length; i++) {
        revData.filter[i]["revShowRecentPosts"] = true;

        let revLoadedPageView = await window.revGetLoadedPageViewAreaContainer("revMembersListingObject", revData.filter[i]);
        revMembersItems.push(`<div class="revFlexContainer revMemberItem">${revLoadedPageView}</div>`);
    }

    return `
    <div class="revFlexContainer">
        <div class="revFlexContainer revPageHeaderAreaContainer revPageHeaderAreaContainer_AllMembersListing">
            ${revPageHeader}
            <div class="revFlexWrapper revPageViewTitledPageNavHeader">${revLoadedPageView}</div>
        </div>
        <div class="revFlexContainer revPageViewMembersListingAllContainer">${revMembersItems.join("")}</div>
    </div>
    `;
};

module.exports.revPageViewWidget = revPageViewWidget;
