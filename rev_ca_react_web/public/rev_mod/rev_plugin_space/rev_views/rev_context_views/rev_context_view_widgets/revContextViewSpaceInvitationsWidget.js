var revPageViewWidget = async (revVarArgs) => {
    if (!revVarArgs) {
        console.log("!revVarArgs");
        return;
    }

    let revRetPageView = async () => {
        let revPassVarArgs = window.revCloneJsObject(revVarArgs);

        let revNoticiaCount = revPassVarArgs.revNoticiaCount;

        let revNoticiaCountTxt = revNoticiaCount + " new inviTatioN";

        if (revNoticiaCount > 1) revNoticiaCountTxt = revNoticiaCount + " new inviTatioNs";

        let revNoticiasItemParams = {
            "revNoticiaTtl": "Space",
            "revNoticiaCountTxt": revNoticiaCountTxt,
            "revNoticiaCategoryIcon": '<i class="fas fa-users"></i>',
            "revNoticiasCategoryListingsCallback": async (revVarArgsParams) => {
                let revPageViewListingSpace = await window.revGetLoadedPageView("revPageViewListingSpaceInvitations", revVarArgsParams);
                window.revDrawMainContentArea({ "revData": revVarArgsParams, "revLoadedPageView": revPageViewListingSpace, "revFloatingOptionsMenuName": "123" });
            },
        };

        revPassVarArgs["revNoticiasItemParams"] = revNoticiasItemParams;

        let revPageContextViewNoticiasListings = await window.revGetLoadedOverrideView("rev_noticia", revPassVarArgs);
        return revPageContextViewNoticiasListings;
    };

    return await revRetPageView();
};

module.exports.revPageViewWidget = revPageViewWidget;
