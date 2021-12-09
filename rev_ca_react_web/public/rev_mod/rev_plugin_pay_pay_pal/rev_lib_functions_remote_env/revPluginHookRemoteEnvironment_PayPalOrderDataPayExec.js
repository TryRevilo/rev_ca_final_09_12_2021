var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;

        let revRequest = revRemoteHookMethods.revRequest;

        let revOrderId = revVarArgs.revOrderId;

        var PAYPAL_API = "https://api-m.sandbox.paypal.com";

        /** REV START ORDER PAYMENT */
        let revOrderPay = (revOrderId) => {
            return new Promise((resolve, reject) => {
                revRequest.post(
                    PAYPAL_API + "/v2/checkout/orders/" + revOrderId + "/capture",
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer A21AAI6Bze9jzzIP3PhiTqJYRQphejdkjlJ6Vkp1XTENw1W53WGJoOtzgDCJy7tZAAoOZJrqODgjkdwkhx0eU_mRRBP9POpiw",
                            "PayPal-Partner-Attribution-Id": "FLAVORsb-z1ivv5077605_MP",
                        },
                    },
                    function (err, response, body) {
                        console.log("response : " + JSON.stringify(response));

                        if (err) {
                            console.error(err);
                            return res.sendStatus(500);
                        }

                        resolve(body);
                    }
                );
            });
        };
        /** REV END ORDER PAYMENT */

        let revOrderData = await revOrderPay(revOrderId);

        // console.log("revOrderData : " + JSON.stringify(revOrderData));

        return JSON.parse(revOrderData);
    }

    return revEntityStatsWrapper;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
