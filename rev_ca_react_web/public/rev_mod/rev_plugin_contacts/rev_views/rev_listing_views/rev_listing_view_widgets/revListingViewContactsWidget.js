var revView = async (revVarArgs) => {
    await window.revSetInterval("revContactsListingContainer", async () => {
        await window.revLoadModules("revPluginModuleSessions", async (revScriptModule) => {
            await window.revPluginModuleSessions.revGetLoggedInEntity(async (revLoggedInEntity) => {
                let url = window.REV_SITE_BASE_PATH + "/rev_api/get_rev_entities_by_entity_guid_rel_type?relTypeValId=5&remoteRevEntityGUID=" + revLoggedInEntity._remoteRevEntityGUID;
                let revData = await window.revGetServerData_JSON_Async(url);
                revData = revData.filter;

                let revCountText = "";

                if (revData.length > 1) revCountText = "over ";

                let revContactsViewsArr = [];

                for (let i = 0; i < revData.length; i++) {
                    let revEntity = revData[i];

                    await window.revGetLoadedPageView("revObjectViewContactItem", revEntity, (revLoadedPageView) => {
                        revContactsViewsArr.push(revLoadedPageView);
                    });
                }

                window.revGetElementById("revContactsListingContainer").innerHTML = revContactsViewsArr.join("");
            });
        });
    });

    let revView = `
    <div id="revContactsListingContainer" class="revFlexContainer"></div>
    `;

    return revView;
};

module.exports.revView = revView;
