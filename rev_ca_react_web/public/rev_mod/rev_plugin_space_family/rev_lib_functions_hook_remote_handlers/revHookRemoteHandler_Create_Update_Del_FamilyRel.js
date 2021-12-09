var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;
        let revReqBody = revVarArgs.revReqBody;

        if (!revReqBody || !revReqBody.revLoggedInEntityGUID) {
            return revVarArgs;
        }

        let revRetVarArgs = { "revErrorsArr": [] };

        let revLoggedInEntityGUID = revReqBody.revLoggedInEntityGUID;
        let revContactsBookArr = revReqBody.filter;

        let revNewFamilyMemberSex = "female";

        if (revReqBody.revNewFamilyMemberSex) {
            revNewFamilyMemberSex = revReqBody.revNewFamilyMemberSex;
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

        let revNewFamilyMemberRelType = "";
        let revPersRelationshipType = "";

        let revNewFamilyMemberRelTypeId = -1;

        /** REV START GET RELS EXISTENT */
        let revFamilyRelativeEntityGUID = -1;

        let revRelReqId = -1;

        if (revReqBody.revFamilyRelativeEntityGUID && revReqBody.revFamilyRelativeEntityGUID > 0) {
            revFamilyRelativeEntityGUID = revReqBody.revFamilyRelativeEntityGUID;

            let revRelsArr = await revRemoteHookMethods.revPersReadAllRevEntityRels_By_RelGUIDs_RevRelIds([revLoggedInEntityGUID, revFamilyRelativeEntityGUID], [16, 17, 27]);

            if (revRelsArr.length > 0) {
                let revRelObj = revRelsArr[0];

                if (revRemoteHookMethods.revIsEmptyJSONObject(revRelObj) || !revRelObj._revEntityRelationshipTypeValueId || revRelObj._revEntityRelationshipTypeValueId < 1) {
                    revRetVarArgs.revErrorsArr.push({ "revError": "The prospective target family member has not yet accepted your family connection request" });

                    return revRetVarArgs;
                }

                revRelReqId = revRelObj._remoteRevEntityRelationshipId;
                revNewFamilyMemberRelType = revRelObj._revEntityRelationshipType;
                revNewFamilyMemberRelTypeId = revRelObj._revEntityRelationshipTypeValueId;

                revPersRelationshipType = revFamilyRelsStruct[revNewFamilyMemberRelType][revNewFamilyMemberSex];
            }
        } else if (!revRemoteHookMethods.revIsEmptyVar(revReqBody.revNewFamilyMemberRelType) && !revRemoteHookMethods.revIsEmptyVar(revReqBody.revNewFamilyMemberRelType)) {
            revNewFamilyMemberRelType = revReqBody.revNewFamilyMemberRelType;
            revPersRelationshipType = revFamilyRelsStruct[revNewFamilyMemberRelType][revNewFamilyMemberSex];
        }

        if (!revFamilyRelsStruct.hasOwnProperty(revNewFamilyMemberRelType)) {
            revRetVarArgs.revErrorsArr.push({ "revError": "That kind of family set-up does not exist!" });

            return revRetVarArgs;
        }
        /** REV END GET RELS EXISTENT */

        /** REV START GET RELS IDS */
        let revRelSiblingsId = revRemoteHookMethods.revGetRelationshipTypeValId("rev_siblings");

        if (revNewFamilyMemberRelTypeId < 1) {
            revNewFamilyMemberRelTypeId = revRemoteHookMethods.revGetRelationshipTypeValId(revNewFamilyMemberRelType);
        }

        if (revNewFamilyMemberRelTypeId < 1) {
            revRetVarArgs.revErrorsArr.push({ "revError": "General Relationship type non-existent!" });

            return revRetVarArgs;
        }

        let revPersRelationshipTypeId = revRemoteHookMethods.revGetRelationshipTypeValId(revPersRelationshipType);

        if (revRemoteHookMethods.revIsEmptyVar(revPersRelationshipTypeId) || revPersRelationshipTypeId == -1) {
            revRetVarArgs.revErrorsArr.push({ "revError": "Relationship type non-existent!" });

            return revRetVarArgs;
        }
        /** REV START GET RELS IDS */

        /** REV START SAVE LOGGED IN SIBLINGS CONTAINER ENTITY */
        let revLoggedInFamilySiblingsContainerGUID = await revRemoteHookMethods.revPersReadRevEntityRelTargetGUID_By_SubjectGUID_RevRelId(revLoggedInEntityGUID, revRelSiblingsId);

        if (revLoggedInFamilySiblingsContainerGUID < 1 && revLoggedInEntityGUID > 0) {
            let revPersEntity_LoggedInSiblingsContainer = revRemoteHookMethods.REV_ENTITY_STRUCT();
            revPersEntity_LoggedInSiblingsContainer._revEntityResolveStatus = -1;
            revPersEntity_LoggedInSiblingsContainer._revEntityChildableStatus = 1;
            revPersEntity_LoggedInSiblingsContainer._revEntityType = "rev_group_entity";
            revPersEntity_LoggedInSiblingsContainer._revEntitySubType = "rev_siblings";
            revPersEntity_LoggedInSiblingsContainer._remoteRevEntityGUID = -1;
            revPersEntity_LoggedInSiblingsContainer._revEntityOwnerGUID = revLoggedInEntityGUID;
            revPersEntity_LoggedInSiblingsContainer._revEntityContainerGUID = -1;
            revPersEntity_LoggedInSiblingsContainer._revTimeCreated = new Date().getTime();

            let revLoggedInSiblingContainerMemberRel = revRemoteHookMethods.REV_ENTITY_RELATIONSHIP_STRUCT();
            revLoggedInSiblingContainerMemberRel._revResolveStatus = -101;
            revLoggedInSiblingContainerMemberRel._revEntityRelationshipType = "rev_siblings";
            revLoggedInSiblingContainerMemberRel._remoteRevEntityTargetGUID = -1;
            revLoggedInSiblingContainerMemberRel._remoteRevEntitySubjectGUID = revLoggedInEntityGUID;

            revPersEntity_LoggedInSiblingsContainer._revTargetEntityRelationships.push(revLoggedInSiblingContainerMemberRel);

            let retRevEntityFilterArr_LoggedInSiblingsContainer = await revRemoteHookMethods.createNewRevEntitiesArray([revPersEntity_LoggedInSiblingsContainer]);
            retRevEntityFilterArr_LoggedInSiblingsContainer = retRevEntityFilterArr_LoggedInSiblingsContainer.filter;
            let revRetRevEntity_LoggedInSiblingsContainer = retRevEntityFilterArr_LoggedInSiblingsContainer[0];

            revLoggedInFamilySiblingsContainerGUID = revRetRevEntity_LoggedInSiblingsContainer._remoteRevEntityGUID;
        }
        /** REV END SAVE LOGGED IN SIBLINGS CONTAINER ENTITY */

        /** REV START SAVE NEW RELATIVE SIBLINGS CONTAINER ENTITY */
        if (revFamilyRelativeEntityGUID < 1) {
            let revPersContactBookEntity = await revRemoteHookMethods.revSaveContactsBook(revReqBody);
            let revPhoneNumberContactEntity = revPersContactBookEntity._revEntityChildrenList;
            revPhoneNumberContactEntity = revPhoneNumberContactEntity[0];

            revFamilyRelativeEntityGUID = revPhoneNumberContactEntity._revEntityOwnerGUID;
        }

        let revNewFamilySiblingsContainerGUID = await revRemoteHookMethods.revPersReadRevEntityRelTargetGUID_By_SubjectGUID_RevRelId(revFamilyRelativeEntityGUID, revRelSiblingsId);

        if (revNewFamilySiblingsContainerGUID < 1 && revNewFamilySiblingsContainerGUID !== revLoggedInFamilySiblingsContainerGUID) {
            let revPersEntity = revRemoteHookMethods.REV_ENTITY_STRUCT();
            revPersEntity._revEntityResolveStatus = -1;
            revPersEntity._revEntityChildableStatus = 1;
            revPersEntity._revEntityType = "rev_group_entity";
            revPersEntity._revEntitySubType = "rev_siblings";
            revPersEntity._remoteRevEntityGUID = -1;
            revPersEntity._revEntityOwnerGUID = revLoggedInEntityGUID;
            revPersEntity._revEntityContainerGUID = -1;
            revPersEntity._revTimeCreated = new Date().getTime();

            if (revFamilyRelativeEntityGUID && revFamilyRelativeEntityGUID > 0) {
                let revSiblingContainerMemberRel = revRemoteHookMethods.REV_ENTITY_RELATIONSHIP_STRUCT();
                revSiblingContainerMemberRel._revResolveStatus = -101;
                revSiblingContainerMemberRel._revEntityRelationshipType = "rev_siblings";
                revSiblingContainerMemberRel._remoteRevEntityTargetGUID = -1;
                revSiblingContainerMemberRel._remoteRevEntitySubjectGUID = revFamilyRelativeEntityGUID;

                revPersEntity._revTargetEntityRelationships.push(revSiblingContainerMemberRel);
            }

            let retRevEntityFilterArr = await revRemoteHookMethods.createNewRevEntitiesArray([revPersEntity]);
            retRevEntityFilterArr = retRevEntityFilterArr.filter;
            let revRetRevEntity = retRevEntityFilterArr[0];

            revNewFamilySiblingsContainerGUID = revRetRevEntity._remoteRevEntityGUID;
        }
        /** REV END SAVE NEW RELATIVE SIBLINGS CONTAINER ENTITY */

        /** REV START SAVE FAMILY CONTAINERS RELS */
        let revContainerRelId = await revRemoteHookMethods.revRelExists_By_RevEntityGUIDs_RevRelValId({
            "revSubjectGUID": revLoggedInFamilySiblingsContainerGUID,
            "revTargetGUID": revNewFamilySiblingsContainerGUID,
            "revRevValId": revNewFamilyMemberRelTypeId,
        });

        if (revContainerRelId < 1 && revNewFamilySiblingsContainerGUID !== revLoggedInFamilySiblingsContainerGUID) {
            let revNewRelStruct = revRemoteHookMethods.REV_ENTITY_RELATIONSHIP_STRUCT();
            revNewRelStruct._revOwnerGUID = revLoggedInEntityGUID;
            revNewRelStruct._revEntitySubjectGUID = revLoggedInFamilySiblingsContainerGUID;
            revNewRelStruct._remoteRevEntitySubjectGUID = revLoggedInFamilySiblingsContainerGUID;
            revNewRelStruct._remoteRevEntityTargetGUID = revNewFamilySiblingsContainerGUID;
            revNewRelStruct._revEntityRelationshipType = revNewFamilyMemberRelType;

            let revNewSavedRelsData = await revRemoteHookMethods.createNewRevEntitiesRelationshipsArrayService([revNewRelStruct]);

            if (revNewSavedRelsData.filter.length > 0) {
                revRetVarArgs["revNewSavedRelsData"] = revNewSavedRelsData.filter;
            }
        }
        /** REV END SAVE FAMILY CONTAINERS RELS */

        /** REV START SAVE RELATIVE CONNECTION REL */
        let revFamilyConnectionRelId = await revRemoteHookMethods.revRelExists_By_RevEntityGUIDs_RevRelValId({
            "revSubjectGUID": revLoggedInEntityGUID,
            "revTargetGUID": revFamilyRelativeEntityGUID,
            "revRevValId": revPersRelationshipTypeId,
        });

        if (revFamilyConnectionRelId < 1) {
            let revNewRelStruct = revRemoteHookMethods.REV_ENTITY_RELATIONSHIP_STRUCT();
            revNewRelStruct._revOwnerGUID = revLoggedInEntityGUID;
            revNewRelStruct._revEntitySubjectGUID = revLoggedInEntityGUID;
            revNewRelStruct._remoteRevEntitySubjectGUID = revLoggedInEntityGUID;
            revNewRelStruct._revEntityTargetGUID = revFamilyRelativeEntityGUID;
            revNewRelStruct._remoteRevEntityTargetGUID = revFamilyRelativeEntityGUID;
            revNewRelStruct._revEntityRelationshipType = revPersRelationshipType;

            let revNewSavedFamilyConnRelsData = await revRemoteHookMethods.createNewRevEntitiesRelationshipsArrayService([revNewRelStruct]);

            revFamilyConnectionRelId = revNewSavedFamilyConnRelsData.filter[0]._revEntityRelationshipId;

            if (revNewSavedFamilyConnRelsData.filter.length > 0) {
                revRetVarArgs["revNewSavedFamilyConnRelsData"] = revNewSavedFamilyConnRelsData.filter;
            }
        }
        /** REV END SAVE RELATIVE CONNECTION REL */

        if (revLoggedInFamilySiblingsContainerGUID > 0 && revNewFamilySiblingsContainerGUID > 0 && revContainerRelId > 0 && revRelReqId > 0) {
            let revRelUpdateObj = await revRemoteHookMethods.revSetRelResStatus(1, revRelReqId);

            revRetVarArgs["revResolveStatus"] = revRelUpdateObj._revResolveStatus;
        }

        return revRetVarArgs;
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
