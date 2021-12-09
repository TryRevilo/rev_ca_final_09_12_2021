(function (revPluginModuleImportGooglePhoneBook, $, undefined) {
    function authenticate() {
        return window.gapi.auth2
            .getAuthInstance()
            .signIn({ scope: "https://www.googleapis.com/auth/contacts https://www.googleapis.com/auth/contacts.readonly" })
            .then(
                function () {
                    console.log("Sign-in successful");
                },
                function (err) {
                    console.error("Error signing in", err);
                }
            );
    }
    function loadClient() {
        window.gapi.client.setApiKey("AIzaSyBeLyR9v7RTW0rR8mH3gMAixk8_HEAmadg");
        return window.gapi.client.load("https://people.googleapis.com/$discovery/rest?version=v1").then(
            function () {
                console.log("GAPI client loaded for API");
            },
            function (err) {
                console.error("Error loading GAPI client for API", err);
            }
        );
    }
    // Make sure the client is loaded and sign-in is complete before calling this method.
    function execute(revCallback) {
        return window.gapi.client.people.people.connections
            .list({
                "resourceName": "people/me",
                "personFields": "addresses,ageRanges,biographies,birthdays,calendarUrls,clientData,coverPhotos,emailAddresses,events,externalIds,genders,imClients,interests,locales,locations,memberships,metadata,miscKeywords,names,nicknames,occupations,organizations,phoneNumbers,photos,relations,sipAddresses,skills,urls,userDefined",
            })
            .then(
                function (response) {
                    // Handle the results here (response.result has the parsed body).
                    console.log("Response", JSON.stringify(response));

                    revCallback(response);
                },
                function (err) {
                    console.error("Execute error", err);
                }
            );
    }
    window.gapi.load("client:auth2", function () {
        window.gapi.auth2.init({ client_id: "705072764537-v77vjerg60cl2ijomr3dmnm9gkcsgt8g.apps.googleusercontent.com" });
    });

    revPluginModuleImportGooglePhoneBook.revGetContactsBook = async (revCallback) => {
        console.log(">>>>>\n\n");

        await authenticate();
        await loadClient();
        execute(revCallback);
    };
})((window.revPluginModuleImportGooglePhoneBook = window.revPluginModuleImportGooglePhoneBook || {}), jQuery);
