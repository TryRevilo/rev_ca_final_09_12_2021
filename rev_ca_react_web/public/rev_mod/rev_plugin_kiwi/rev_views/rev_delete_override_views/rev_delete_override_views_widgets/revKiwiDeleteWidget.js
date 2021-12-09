var revDeleteOverrideViewWidget = async (revVarArgs) => {
    if (!revVarArgs) {
        return "OH O";
    }

    return window.revGetLoadedOverrideView("revDefaultDeleteEntity", revVarArgs);
};

module.exports.revDeleteOverrideViewWidget = revDeleteOverrideViewWidget;
