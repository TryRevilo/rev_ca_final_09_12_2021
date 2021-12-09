var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;

        let revRequest = revRemoteHookMethods.revRequest;

        var PAYPAL_API = "https://api-m.sandbox.paypal.com";

        let revCreateOrder = () => {
            return new Promise((resolve, reject) => {
                let requestBody = {
                    "intent": "CAPTURE",
                    "purchase_units": [
                        {
                            "amount": {
                                "currency_code": "USD",
                                "value": "1.35",
                            },
                            "payee": {
                                "email_address": "rev@business.example.com",
                            },
                            "payment_instruction": {
                                "disbursement_mode": "INSTANT",
                                "platform_fees": [
                                    {
                                        "amount": {
                                            "currency_code": "USD",
                                            "value": "0.50",
                                        },
                                    },
                                ],
                            },
                            redirect_urls: {
                                return_url: "https://mighty-oasis-92039.herokuapp.com/",
                                cancel_url: "https://mighty-oasis-92039.herokuapp.com/",
                            },
                        },
                    ],
                };

                revRequest.post(
                    PAYPAL_API + "/v2/checkout/orders",
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer A21AAI6Bze9jzzIP3PhiTqJYRQphejdkjlJ6Vkp1XTENw1W53WGJoOtzgDCJy7tZAAoOZJrqODgjkdwkhx0eU_mRRBP9POpiw",
                            "PayPal-Partner-Attribution-Id": "FLAVORsb-z1ivv5077605_MP",
                        },
                        body: requestBody,
                        json: true,
                    },
                    function (err, response, body) {
                        if (err) {
                            console.error(err);
                            return res.sendStatus(500);
                        }

                        resolve(body);
                    }
                );
            });
        };

        let revOrderId = await revCreateOrder();

        return revOrderId;
    }

    return revEntityStatsWrapper;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
