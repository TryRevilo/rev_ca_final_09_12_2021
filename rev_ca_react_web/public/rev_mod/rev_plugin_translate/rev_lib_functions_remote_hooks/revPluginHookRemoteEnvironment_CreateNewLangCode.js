var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;
        let revReqBody = revVarArgs.revReqBody;

        let revLoggedInEntityGUID = revReqBody.revLoggedInEntityGUID;

        let revLangCodeRemoteEntityGUID = revRemoteHookMethods.revCreateNewLangCode({
            "revLoggedInEntityGUID": revLoggedInEntityGUID,
            "revLangDetails": revReqBody.revLangDetails,
        });

        if (!revVarArgs.hasOwnProperty("filter")) {
            revVarArgs["filter"] = [];
        }

        revVarArgs.filter.push({ "revLangCodeRemoteEntityGUID": revLangCodeRemoteEntityGUID });
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
