var revPageViewWidget = async (revVarArgs) => {
    if (!revVarArgs) {
        console.log("!revVarArgs");
        return;
    }

    let revRetPageView = async () => {
        let revPassVarArgs = window.revCloneJsObject(revVarArgs);

        let revNoticiaCount = revPassVarArgs.revNoticiaCount;

        let revNoticiaCountTxt = revNoticiaCount + " new recomendations";

        if (revNoticiaCount > 1) revNoticiaCountTxt = revNoticiaCount + " new recomendations";

        let revNoticiasItemParams = {
            "revNoticiaTtl": "Recomendations",
            "revNoticiaCountTxt": revNoticiaCountTxt,
            "revNoticiaCategoryIcon": '<i class="fas fa-users"></i>',
            "revNoticiasCategoryListingsCallback": async (revVarArgsParams) => {
                let revContextNoticiasRecomendation = await revDownloadContextView("revContextNoticiasRecomendation", "revKiwi", revVarArgs);
                window.revDrawMainContentArea({ "revData": revVarArgsParams, "revLoadedPageView": revContextNoticiasRecomendation, "revFloatingOptionsMenuName": "123" });
            },
        };

        revPassVarArgs["revNoticiasItemParams"] = revNoticiasItemParams;

        let revPageContextViewNoticiasListings = await window.revGetLoadedOverrideView("rev_noticia", revPassVarArgs);
        return revPageContextViewNoticiasListings;
    };

    return await revRetPageView();
};

module.exports.revPageViewWidget = revPageViewWidget;
