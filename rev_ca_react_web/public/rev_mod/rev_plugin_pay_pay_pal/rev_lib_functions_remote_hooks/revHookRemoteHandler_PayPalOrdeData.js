var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;
        let revReqParams = revVarArgs.revReqParams;

        let revPassVarArgs = { "revRemoteHookMethods": revRemoteHookMethods };

        let revPayPalOrderData = await revRemoteHookMethods.revPluginHookRemoteEnvironment_PayPalOrderData(revPassVarArgs);

        console.log("revPayPalOrderData : " + JSON.stringify(revPayPalOrderData));

        if (!revRemoteHookMethods.revIsEmptyJSONObject(revPayPalOrderData)) {
            let orderID = revPayPalOrderData.id;

            revVarArgs["revPayPalOrderData"] = orderID;
        }
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
