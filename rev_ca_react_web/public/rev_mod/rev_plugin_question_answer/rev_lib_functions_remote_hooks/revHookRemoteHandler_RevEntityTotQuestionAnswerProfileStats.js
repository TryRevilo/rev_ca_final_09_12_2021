var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;
        let revReqParams = revVarArgs.revReqParams;

        let revPassVarArgs = { "revRemoteHookMethods": revRemoteHookMethods, "_remoteRevEntityGUID": revVarArgs._remoteRevEntityGUID };

        let revTotProfileStatsCount = await revRemoteHookMethods.revPluginHookRemoteEnvironment_TotEntityQuestions_Answers_CountStats(revPassVarArgs);

        if (!revRemoteHookMethods.revIsEmptyJSONObject(revTotProfileStatsCount)) {
            revVarArgs["revEntityProfileStats_TotCount_Questions_Answers"] = revTotProfileStatsCount;
        }
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
