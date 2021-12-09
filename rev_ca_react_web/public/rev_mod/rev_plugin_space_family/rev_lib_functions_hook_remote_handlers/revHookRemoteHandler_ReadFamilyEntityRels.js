var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;
        let revReqParams = revVarArgs.revReqParams;

        if (!revReqParams.rev_logged_in_entity_guid || revReqParams.rev_logged_in_entity_guid < 1) {
            return revVarArgs;
        }

        let revLoggedInEntityGUID = revReqParams.rev_logged_in_entity_guid;

        if (!revVarArgs.hasOwnProperty("revErrorsArr")) {
            revVarArgs["revErrorsArr"] = [];
        }

        let revFamilyRelsStruct = {
            "rev_siblings": {
                "female": "rev_sister",
                "male": "rev_brother",
            },
            "rev_parent": {
                "female": "rev_mother",
                "male": "rev_father",
            },
            "rev_grand_parent": {
                "female": "rev_grand_mother",
                "male": "rev_grand_father",
            },
            "rev_niece_nephew": {
                "female": "rev_niece",
                "male": "rev_nephew",
            },
            "rev_cousin": {
                "female": "rev_female_cousin",
                "male": "rev_male_cousin",
            },
            "rev_uncle_aunt": {
                "female": "rev_aunt",
                "male": "rev_uncle",
            },
        };

        let revRetVarArgs = {};

        /** REV START GET LOGGED IN SIBLINGS CONTAINER ENTITY */
        let revSiblingsContainerGUID = await revRemoteHookMethods.revPersReadRevEntityRelTargetGUID_By_SubjectGUID_RevRelId(revLoggedInEntityGUID, 16);

        let revSiblingsPassVarArgs = {
            "rev_entity_target_guid": revSiblingsContainerGUID,
            "rev_rel_type_val_id_arr": [16],
            "rev_res_status": -101,
        };

        let revSiblingsEntitiesArr = await revRemoteHookMethods.revReadEntities_By_TargetGUID_RelId(revSiblingsPassVarArgs);

        if (!revRemoteHookMethods.revIsEmptyJSONObject(revSiblingsEntitiesArr)) {
            revRetVarArgs["revSiblingsEntitiesArr"] = revSiblingsEntitiesArr;
        }
        /** REV END GET LOGGED IN SIBLINGS CONTAINER ENTITY */

        /** REV START GET LOGGED IN PARENTS CONTAINER ENTITY */
        let revParentsContainerGUIDsFilter = await revRemoteHookMethods.revPersReadRevRelsTargetGUIDs_By_RemoteRevEntityGUID_RelID(revSiblingsContainerGUID, 27);
        let revParentsContainerGUID = revParentsContainerGUIDsFilter.filter[0];

        let revRelGUIDsArr = await revRemoteHookMethods.revPersReadRelGUIDS_By_RemoteRevEntityGUID_RelValId(revParentsContainerGUID, 16);
        let revParentsEntitiesArr = await revRemoteHookMethods.revGetFilledEntities(revRelGUIDsArr);

        if (!revRemoteHookMethods.revIsEmptyJSONObject(revParentsEntitiesArr)) {
            revRetVarArgs["revParentsEntitiesArr"] = revParentsEntitiesArr;
        }
        /** REV END GET LOGGED IN PARENTS CONTAINER ENTITY */

        return revRetVarArgs;
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
