var revFormViewWidget = async (revVarArgs) => {
    window.revSetInterval("card-form", () => {
        // If this returns false or the card fields aren't visible, see Step #1.
        if (paypal.HostedFields.isEligible()) {
            // Renders card fields
            paypal.HostedFields.render({
                // Call your server to set up the transaction
                createOrder: function () {
                    return fetch("/your-server/paypal/order", {
                        method: "post",
                    })
                        .then(function (res) {
                            return res.json();
                        })
                        .then(function (orderData) {
                            orderId = orderData.id;
                            return orderId;
                        });
                },

                styles: {
                    ".valid": {
                        "color": "green",
                    },
                    ".invalid": {
                        "color": "red",
                    },
                },

                fields: {
                    number: {
                        selector: "#card-number",
                        placeholder: "4111 1111 1111 1111",
                    },
                    cvv: {
                        selector: "#cvv",
                        placeholder: "123",
                    },
                    expirationDate: {
                        selector: "#expiration-date",
                        placeholder: "MM/YY",
                    },
                },
            }).then(function (cardFields) {
                document.querySelector("#card-form").addEventListener("submit", (event) => {
                    event.preventDefault();

                    cardFields
                        .submit({
                            // Cardholder's first and last name
                            cardholderName: document.getElementById("card-holder-name").value,
                            // Billing Address
                            billingAddress: {
                                // Street address, line 1
                                streetAddress: document.getElementById("card-billing-address-street").value,
                                // Street address, line 2 (Ex: Unit, Apartment, etc.)
                                extendedAddress: document.getElementById("card-billing-address-unit").value,
                                // State
                                region: document.getElementById("card-billing-address-state").value,
                                // City
                                locality: document.getElementById("card-billing-address-city").value,
                                // Postal Code
                                postalCode: document.getElementById("card-billing-address-zip").value,
                                // Country Code
                                countryCodeAlpha2: document.getElementById("card-billing-address-country").value,
                            },
                        })
                        .then(function () {
                            // Payment was successful! Show a notification or redirect to another page.
                            window.location.replace("http://www.somesite.com/review");
                        })
                        .catch(function (err) {
                            alert("Payment could not be captured! " + JSON.stringify(err));
                        });
                });
            });
        } else {
            /** Hides card fields if the merchant isn't eligible **/
            // document.querySelector("#card-form").style = 'display: none';
        }
    });
    return `
    <div class="card_container">
        <form id="card-form">
            <label for="card-number">Card Number</label><div id="card-number" class="card_field"></div>
            <div>
            <label for="expiration-date">Expiration Date</label>
            <div id="expiration-date" class="card_field"></div>
            </div>
            <div>
            <label for="cvv">CVV</label><div id="cvv" class="card_field"></div>
            </div>
            <label for="card-holder-name">Name on Card</label>
            <input type="text" id="card-holder-name" name="card-holder-name" autocomplete="off" placeholder="card holder name"/>
            <div>
            <label for="card-billing-address-street">Billing Address</label>
            <input type="text" id="card-billing-address-street" name="card-billing-address-street" autocomplete="off" placeholder="street address"/>
            </div>
            <div>
            <label for="card-billing-address-unit">&nbsp;</label>
            <input type="text" id="card-billing-address-unit" name="card-billing-address-unit" autocomplete="off" placeholder="unit"/>
            </div>
            <div>
            <input type="text" id="card-billing-address-city" name="card-billing-address-city" autocomplete="off" placeholder="city"/>
            </div>
            <div>
            <input type="text" id="card-billing-address-state" name="card-billing-address-state" autocomplete="off" placeholder="state"/>
            </div>
            <div>
            <input type="text" id="card-billing-address-zip" name="card-billing-address-zip" autocomplete="off" placeholder="zip / postal code"/>
            </div>
            <div>
            <input type="text" id="card-billing-address-country" name="card-billing-address-country" autocomplete="off" placeholder="country code" />
            </div>
            <br><br>
            <button value="submit" id="submit" class="btn">Pay</button>
        </form>
    </div>
    `;
};

module.exports.revFormViewWidget = revFormViewWidget;
