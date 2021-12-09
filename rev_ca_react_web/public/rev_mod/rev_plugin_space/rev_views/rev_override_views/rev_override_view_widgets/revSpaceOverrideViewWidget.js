var revPluginOverrideViewWidget = async (revVarArgs) => {
    if (!revVarArgs || !revVarArgs._revEntitySubType) return;

    if (revVarArgs.revAdminGUIDsArr) {
        let revAdminGUIDsArr = revVarArgs.revAdminGUIDsArr;

        revVarArgs['revAdminsArr'] = revGetEntityAdmin(revAdminGUIDsArr, revAdminsArr);
    }

    let revSpaceBriefContextView = await revDownloadContextView('revSpaceBriefInfo', revVarArgs._revEntitySubType, revVarArgs);

    return revSpaceBriefContextView;
};

module.exports.revPluginOverrideViewWidget = revPluginOverrideViewWidget;