var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;

        let revReqBody = revVarArgs.revReqBody;

        let revLoggedInEntityGUID = revReqBody.revLoggedInEntityGUID;
        let revLangDetails = revReqBody.revLangDetails;

        let revPersLangPhraseEntity = await revRemoteHookMethods.revLoadPluginLangs({
            "revLoggedInEntityGUID": revLoggedInEntityGUID,
            "revLangJSON": revLangDetails,
        });
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
