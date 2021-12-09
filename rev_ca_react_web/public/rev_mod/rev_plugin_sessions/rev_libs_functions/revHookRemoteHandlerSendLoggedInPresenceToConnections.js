var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods && revVarArgs.revEntity) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;

        await revRemoteHookMethods.revTestMeth();

        let revEntityGUID = revVarArgs.revEntity._remoteRevEntityGUID;

        let revRelsArr = await revRemoteHookMethods.revPersReadRels_Subjects_Targets_GUIDs_By_RemoteRevEntityGUID_RevRelValId(revEntityGUID, 5);
        revRelsArr = revRelsArr.filter;

        let revRelGUIDsArr = [];

        for (let i = 0; i < revRelsArr.length; i++) {
            let revSubjectGUID = revRelsArr[i].revSubjectGUID;
            let revTargetGUID = revRelsArr[i].revTargetGUID;

            if (revEntityGUID == revSubjectGUID) {
                revRelGUIDsArr.push(revTargetGUID);
            } else {
                revRelGUIDsArr.push(revSubjectGUID);
            }
        }

        let revGetFilledEntities = await revRemoteHookMethods.revGetFilledEntities(revRelGUIDsArr);

        let revPassVarArgsArr = [];

        for (let i = 0; i < revGetFilledEntities.length; i++) {
            revPassVarArgsArr.push({ "remoteRevEntityGUID": revGetFilledEntities[i]._remoteRevEntityGUID, "revVarArgs": revVarArgs });
        }

        revRemoteHookMethods.revSendToLiveEntities(revPassVarArgsArr);
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
