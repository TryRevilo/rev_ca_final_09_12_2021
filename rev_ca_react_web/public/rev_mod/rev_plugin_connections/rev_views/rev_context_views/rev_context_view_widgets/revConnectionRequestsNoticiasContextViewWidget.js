var revPluginOverrideViewWidget = async (revVarArgs) => {
    if (!revVarArgs) {
        console.log("!revVarArgs");
        return;
    }

    let revRetPageView = async () => {
        let revPassVarArgs = window.revCloneJsObject(revVarArgs);

        let revNoticiaCount = revPassVarArgs.revNoticiaCount;

        let revNoticiaCountTxt = revNoticiaCount + " new rEQuEst";

        if (revNoticiaCount > 1) {
            revNoticiaCountTxt = revNoticiaCount + " new rEQuEsts";
        }

        let revNoticiasItemParams = {
            "revNoticiaTtl": "connection requests",
            "revNoticiaCountTxt": revNoticiaCountTxt,
            "revNoticiaCategoryIcon": '<i class="fas fa-people-arrows"></i>',
            "revNoticiasCategoryListingsCallback": async (revVarArgsParams) => {
                let revPageViewListing_ConnectionRequests = await window.revGetLoadedPageView("revPageViewListing_ConnectionRequests", revVarArgsParams);
                window.revDrawMainContentArea({ "revData": revVarArgsParams, "revLoadedPageView": revPageViewListing_ConnectionRequests, "revFloatingOptionsMenuName": "123" });
            },
        };

        revPassVarArgs["revNoticiasItemParams"] = revNoticiasItemParams;

        let revPageContextViewNoticiasListings = await window.revGetLoadedOverrideView("rev_noticia", revPassVarArgs);

        return revPageContextViewNoticiasListings;
    };

    return await revRetPageView();
};

module.exports.revPluginOverrideViewWidget = revPluginOverrideViewWidget;
