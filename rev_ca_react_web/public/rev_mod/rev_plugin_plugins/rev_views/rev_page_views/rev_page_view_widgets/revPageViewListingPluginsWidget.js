var revPageViewWidget = async (revVarArgs) => {
    let revPageViewPageNavHeaderId = "revPageViewPageNavHeaderId_" + window.revGenUniqueId();

    window.revSetInterval(revPageViewPageNavHeaderId, async () => {
        let revLoadedPageView = await window.revGetLoadedPageView("revPageViewPageNavHeader", { revEntity: { "_revEntitySubType": "revSpaceType" } });
        document.getElementById(revPageViewPageNavHeaderId).innerHTML = revLoadedPageView;
    });

    let revPluginsListingPageHeader = window.revPageHeader("Plugins");

    let revPluginsListingContainerId = "revPluginsListingContainerId";

    let revGetPluginContainers = (revInstalledPluginsArr, revPluginName) => {
        let revContainersArr = [];

        for (let i = 0; i < revInstalledPluginsArr.length; i++) {
            let revCurrInstalledPlugin = revInstalledPluginsArr[i];

            if (revCurrInstalledPlugin) {
                let revCurrPluginName = window.revGetMetadataValue(revCurrInstalledPlugin._revEntityMetadataList, "rev_plugin_name_value");

                if (revPluginName.localeCompare(revCurrPluginName) == 0) {
                    revContainersArr.push({
                        "revContainerGUID": revCurrInstalledPlugin._revEntityContainerGUID,
                        "revInstalledPlugin": revCurrInstalledPlugin,
                    });
                }
            }
        }

        return revContainersArr;
    };

    try {
        let revPluginObjectsArr = [];

        let revURL = `${window.REV_SITE_BASE_PATH}/rev_api?rev_logged_in_entity_guid=${window.REV_LOGGED_IN_ENTITY_GUID}&rev_container_guid=${revVarArgs._remoteRevEntityGUID}&revPluginHookContextsRemoteArr=revHookRemoteHandler_GetAllListedPlugins`;

        let revData = await window.revGetServerData_JSON_Async(revURL);
        let revListedPluginsArr = revData.filter;
        let revInstalledPluginsArr = [];
        revInstalledPluginsArr = revInstalledPluginsArr.concat(revData.revInstalledPluginsArr);

        for (let i = 0; i < revListedPluginsArr.length; i++) {
            let revCurrListedPlugin = revListedPluginsArr[i];

            let revPluginContainersArr = revGetPluginContainers(revInstalledPluginsArr, revCurrListedPlugin.revPluginName);

            revListedPluginsArr[i]["revPluginContainersArr"] = revPluginContainersArr;

            let revObjectPluginItemListing = await window.revGetLoadedPageViewAreaContainer("revObjectPluginItemListing", revListedPluginsArr[i]);
            revPluginObjectsArr.push(revObjectPluginItemListing);
        }

        window.revSetInterval(revPluginsListingContainerId, () => {
            document.getElementById(revPluginsListingContainerId).innerHTML = revPluginObjectsArr.join("");
        });
    } catch (error) {
        console.log("ERR -> revPageViewListingPluginsWidget.js -> " + error);
    }

    let revItem = `
    <div class="revFlexContainer revPluginsPageListingContainer">
        <div class="revFlexContainer revPageHeaderAreaContainer">
            ${revPluginsListingPageHeader}
            <div id="${revPageViewPageNavHeaderId}" class="revFlexWrapper revPageViewTitledPageNavHeader"></div>
            <div class="revFontSiteGreyTxtColor revFontSizeNormal revPluginsTellTxt">Plugins help Extend your experiences on CampAnn</div>
        </div>
        <div id="${revPluginsListingContainerId}" class="revFlexContainer revPluginsListingContainer"></div>
    </div>
    `;

    return revItem;
};

module.exports.revPageViewWidget = revPageViewWidget;
