var revWidget = async (revVarArgs) => {
    let revFloatingOptionsMenuName = "";

    if (revVarArgs.revFloatingOptionsMenuName) {
        revFloatingOptionsMenuName = revVarArgs.revFloatingOptionsMenuName;
    }

    let revFloatingOptionsMenuArea = await window.revGetMenuAreaView(revFloatingOptionsMenuName, revVarArgs);

    return revFloatingOptionsMenuArea;
};

module.exports.revWidget = revWidget;
