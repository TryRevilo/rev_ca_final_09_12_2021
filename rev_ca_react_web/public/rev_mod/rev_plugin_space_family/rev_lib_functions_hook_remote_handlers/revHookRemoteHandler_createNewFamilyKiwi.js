var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;
        let revReqBody = revVarArgs.revReqBody;

        let revLoggedInEntityGUID = revReqBody.revLoggedInEntityGUID;

        let revEntityFamilyKiwi = revReqBody.revEntityFamilyKiwi;

        let retRevEntityFilterArr = await revRemoteHookMethods.createNewRevEntitiesArray([revEntityFamilyKiwi]);
        retRevEntityFilterArr = retRevEntityFilterArr.filter;
        let revRetRevEntity = retRevEntityFilterArr[0];

        return { "revRetRevEntity": revRetRevEntity };
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
