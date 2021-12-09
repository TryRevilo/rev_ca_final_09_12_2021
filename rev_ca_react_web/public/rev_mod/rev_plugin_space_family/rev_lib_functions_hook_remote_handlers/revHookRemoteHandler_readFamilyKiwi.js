var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;

        let revLoggedInEntityGUID = revVarArgs.revReqParams.rev_logged_in_entity_guid;

        let revFamilyKiwiPassVarArgs = {
            "revCollectionLimit": 10,
            "revEntityContainerGUID": revLoggedInEntityGUID,
            "revEntitySubtype": "rev_family_kiwi",
            "revLastCheckDate": null,
        };

        let revFamilyKiwiArr = await revRemoteHookMethods.revPersReadFilledRevEntities_OF_ContainerGUID_SubType(revFamilyKiwiPassVarArgs);
        revVarArgs["revFamilyKiwiArr"] = revFamilyKiwiArr;

        let revPublishersGUIDsArr = [];

        for (let i = 0; i < revFamilyKiwiArr.length; i++) {
            let revCurrFamilyKiwi = revFamilyKiwiArr[i];

            if (!revCurrFamilyKiwi || !revCurrFamilyKiwi._revEntityOwnerGUID || revCurrFamilyKiwi._revEntityOwnerGUID < 1) {
                continue;
            }

            revPublishersGUIDsArr.push(revCurrFamilyKiwi._revEntityOwnerGUID);
        }

        /** REV START PUBLISHERS */
        let revGetPublishersArr = await revRemoteHookMethods.revGetFilledEntities(revPublishersGUIDsArr);

        if (!revVarArgs.hasOwnProperty("revEntityPublishersArr")) {
            revVarArgs["revEntityPublishersArr"] = revGetPublishersArr;
        } else {
            revVarArgs.revEntityPublishersArr = revVarArgs.revEntityPublishersArr.concat(revGetPublishersArr);
        }
        /** REV END PUBLISHERS */
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
