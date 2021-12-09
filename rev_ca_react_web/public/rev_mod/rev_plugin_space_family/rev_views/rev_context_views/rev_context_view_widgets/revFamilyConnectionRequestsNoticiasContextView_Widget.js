var revPluginOverrideViewWidget = async (revVarArgs) => {
    if (!revVarArgs) {
        console.log("!revVarArgs");
        return;
    }

    let revRetPageView = async () => {
        let revPassVarArgs = window.revCloneJsObject(revVarArgs);

        let revNoticiaCount = revPassVarArgs.revNoticiaCount;

        let revNoticiaCountTxt = revNoticiaCount + " FAmiLy rEQuEst";

        if (revNoticiaCount > 1) {
            revNoticiaCountTxt = revNoticiaCount + " FAmiLy rEQuEsts";
        }

        let revNoticiasItemParams = {
            "revNoticiaTtl": "connection requests",
            "revNoticiaCountTxt": revNoticiaCountTxt,
            "revNoticiaCategoryIcon": '<i class="fas fa-braille"></i>',
            "revNoticiasCategoryListingsCallback": async (revVarArgsParams) => {
                let revPageViewListing_FamilyConnectionRequests = await window.revGetLoadedPageView("revPageViewListing_FamilyConnectionRequests", revVarArgsParams);
                window.revDrawMainContentArea({ "revData": revVarArgsParams, "revLoadedPageView": revPageViewListing_FamilyConnectionRequests, "revFloatingOptionsMenuName": { revEntity: { "_revEntitySubType": "rev_space_family" } } });
            },
        };

        revPassVarArgs["revNoticiasItemParams"] = revNoticiasItemParams;

        let revPageContextViewNoticiasListings = await window.revGetLoadedOverrideView("rev_noticia", revPassVarArgs);

        return revPageContextViewNoticiasListings;
    };

    return await revRetPageView();
};

module.exports.revPluginOverrideViewWidget = revPluginOverrideViewWidget;
