var revPageViewWidget = async (revVarArgs) => {
    let revPageViewPageNavHeader = await window.revGetLoadedPageView("revPageViewPageNavHeader", null);

    let revListingAllHistoryPageHeader = window.revPageHeader("HisToRy");

    let revListingAllHistoryContainerId = "revListingAllHistoryContainerId";

    window.revSetInterval(revListingAllHistoryContainerId, async () => {
        let url = window.REV_SITE_BASE_PATH + "/rev_api/get_rev_entities_by_ann_id_owner_guid?rev_logged_in_entity_guid=" + window.REV_LOGGED_IN_ENTITY_GUID + "&rev_ann_name_id=" + 2 + "&rev_query_limit=40";
        let revData = await window.revGetServerData_JSON_Async(url);
        let revFilter = revData.filter;

        let revEntityViewsArr = [];

        for (let i = 0; i < revFilter.length; i++) {
            let revEntity = revFilter[i];
            if (!revEntity || !revEntity._revEntityType) continue;

            let revEntityType = revEntity._revEntityType;

            if (revEntityType.localeCompare("rev_group_entity") == 0) {
                let revSpaceBriefContextView = await window.revGetLoadedOverrideView("rev_space", revEntity);
                revEntityViewsArr.push(`<div class="revFlexWrapper revSpaceListingItemWrapper">${revSpaceBriefContextView}</div>`);
            }
        }

        document.getElementById(revListingAllHistoryContainerId).innerHTML = revEntityViewsArr.join("");
    });

    return `
        <div class="revFlexContainer revPluginsPageListingContainer">
            <div class="revFlexContainer revPageHeaderAreaContainer">
                ${revListingAllHistoryPageHeader}
                <div class="revFlexWrapper revPageViewTitledPageNavHeader">${revPageViewPageNavHeader}</div>
            </div>
            <div id="${revListingAllHistoryContainerId}" class="revFlexContainer revPluginsListingContainer"></div>
        </div>
    `;
};

module.exports.revPageViewWidget = revPageViewWidget;
