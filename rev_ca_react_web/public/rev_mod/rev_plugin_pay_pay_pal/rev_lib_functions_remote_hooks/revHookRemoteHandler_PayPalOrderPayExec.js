var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs.hasOwnProperty("revPayPalOrderPaymentData")) {
        return revVarArgs;
    }

    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;
        let revReqParams = revVarArgs.revReqParams;

        let revPassVarArgs = { "revRemoteHookMethods": revRemoteHookMethods, "revOrderId": revReqParams.rev_order_id };

        let revPayPalOrderPaymentData = await revRemoteHookMethods.revPluginHookRemoteEnvironment_PayPalOrderDataPayExec(revPassVarArgs);

        console.log("revPayPalOrderPaymentData : " + JSON.stringify(revPayPalOrderPaymentData));

        for (let key in revPayPalOrderPaymentData) {
            if (revPayPalOrderPaymentData.hasOwnProperty(key)) {
                // console.log(key + " -> " + JSON.stringify(revPayPalOrderPaymentData[key]));
            }
        }

        if (!revRemoteHookMethods.revIsEmptyJSONObject(revPayPalOrderPaymentData)) {
            revVarArgs["revPayPalOrderPaymentData"] = revPayPalOrderPaymentData;
        }
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
