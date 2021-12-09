var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;

        if (!revVarArgs.revLoggedInEntityGUID || revVarArgs.revLoggedInEntityGUID < 1) {
            return null;
        }

        let revLoggedInEntityGUID = revVarArgs.revLoggedInEntityGUID;
        /** REV END GET INIQUE ID METADATA */

        /** REV START PROFILE CONNS */
        let revRelGUIDsArr = await revRemoteHookMethods.revPersReadRelGUIDS_By_RemoteRevEntityGUID_RelValId(revLoggedInEntityGUID, 5, 28);
        /** REV END PROFILE CONNS */

        let i = 0;
        while (i < revRelGUIDsArr.length) {
            let revLoggedInEntityGUID = Number(revRelGUIDsArr[i]);

            if (!revLoggedInEntityGUID || revLoggedInEntityGUID < 1) {
                revRelGUIDsArr.splice(i, 1);
            } else {
                ++i;
            }
        }

        return await revRemoteHookMethods.revGetFilledEntities(revRelGUIDsArr);
    }

    return null;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
