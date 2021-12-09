var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;

        let revUniqueId = revVarArgs.revReqParams.rev_entity_unique_id;

        /** REV START GET UNIQUE ID METADATA */
        let revEntityMetadata = await revRemoteHookMethods.revReadUniqueMetadata_By_UniqueValue(revUniqueId);
        let revLoggedInEntityGUID = revEntityMetadata._revMetadataEntityGUID;

        revVarArgs["revLoggedInEntityGUID"] = revLoggedInEntityGUID;

        let revMintConversationsGUIDsArr = await revRemoteHookMethods.revPersReadRevRelsTargetGUIDs_By_RemoteRevEntityGUID_RelID(revLoggedInEntityGUID, 14);

        let revMintConversationsArr = await revRemoteHookMethods.revGetFilledEntities(revMintConversationsGUIDsArr.filter);

        let revEntitiesArrIncludesEntityGUID = (revEntitiessArr, revEntityGUID) => {
            let revIsAdded = false;

            for (let i = 0; i < revEntitiessArr.length; i++) {
                if (revEntitiessArr[i]._remoteRevEntityGUID == revEntityGUID) {
                    revIsAdded = true;
                    break;
                }
            }

            return revIsAdded;
        };

        let revEntitiesArrIncludesEntity = (revEntitiessArr, revEntity) => {
            let revIsAdded = false;

            for (let i = 0; i < revEntitiessArr.length; i++) {
                if (revEntitiessArr[i]._remoteRevEntityGUID == revEntity._remoteRevEntityGUID) {
                    revIsAdded = true;
                    break;
                }
            }

            return revIsAdded;
        };

        let revPublishersArr = [];

        for (let i = 0; i < revMintConversationsArr.length; i++) {
            let revMintConversation = revMintConversationsArr[i];

            /** REV START MINT CONVERSATION MEMBERS */
            let revMintConversationMembersGUIDsArr = await revRemoteHookMethods.revPersReadRevRelsSubjects_By_RemoteRevEntityGUID_RelID({
                "rev_rel_type_val_id_arr": "14",
                "rev_entity_target_guid": revMintConversation._remoteRevEntityGUID,
            });

            if (revMintConversationMembersGUIDsArr.length < 2) {
                let revRemovedMintConv = revMintConversationsArr.splice(i, 1);
                continue;
            }

            revMintConversationsArr[i]["revMintConversationMembersGUIDsArr"] = revMintConversationMembersGUIDsArr;

            for (let g = 0; g < revMintConversationMembersGUIDsArr.length; g++) {
                if (revEntitiesArrIncludesEntityGUID(revPublishersArr, revMintConversationMembersGUIDsArr[g])) {
                    continue;
                }

                let revMintConversationMember = await revRemoteHookMethods.revGetFlatEntity(revMintConversationMembersGUIDsArr[g]);

                revPublishersArr.push(revMintConversationMember);
            }
            /** REV END MINT CONVERSATION MEMBERS */

            /** REV START MINT CONVERSATION TARGETS */
            let revMintConversationTargetMembersGUIDsArr = await revRemoteHookMethods.revPersReadRevRelsSubjects_By_RemoteRevEntityGUID_RelID({
                "rev_rel_type_val_id_arr": "15",
                "rev_entity_target_guid": revMintConversation._remoteRevEntityGUID,
            });

            if (revMintConversationTargetMembersGUIDsArr.length > 0) {
                revMintConversationsArr[i]["revMintConversationTargetMembersGUIDsArr"] = revMintConversationTargetMembersGUIDsArr;

                for (let g = 0; g < revMintConversationTargetMembersGUIDsArr.length; g++) {
                    if (revEntitiesArrIncludesEntityGUID(revPublishersArr, revMintConversationTargetMembersGUIDsArr[g])) {
                        continue;
                    }

                    let revMintConversationTargetMember = await revRemoteHookMethods.revGetFlatEntity(revMintConversationTargetMembersGUIDsArr[g]);

                    revPublishersArr.push(revMintConversationTargetMember);
                }
            }

            /** REV END MINT CONVERSATION TARGETS */

            if (!revEntitiesArrIncludesEntityGUID(revPublishersArr, revMintConversation._revEntityOwnerGUID)) {
                let revMintConversationPublisher = await revRemoteHookMethods.revGetFlatEntity(revMintConversation._revEntityOwnerGUID);
                revPublishersArr.push(revMintConversationPublisher);
            }

            let revPassVarArgs = {
                "revCollectionLimit": 10,
                "revEntityContainerGUID": revMintConversation._remoteRevEntityGUID,
                "revEntitySubtype": "rev_mint_message",
                "revLastCheckDate": null,
            };

            let revMintConversationMessagesArr = await revRemoteHookMethods.revPersReadFilledRevEntities_OF_ContainerGUID_SubType(revPassVarArgs);

            for (let m = 0; m < revMintConversationMessagesArr.length; m++) {
                let revMintConversationMessage = revMintConversationMessagesArr[m];

                if (!revEntitiesArrIncludesEntityGUID(revPublishersArr, revMintConversationMessage._revEntityOwnerGUID)) {
                    let revMintConversationMessagePublisher = await revRemoteHookMethods.revGetFlatEntity(revMintConversationMessage._revEntityOwnerGUID);
                    revPublishersArr.push(revMintConversationMessagePublisher);
                }
            }

            revMintConversationsArr[i]["revMintConversationMessagesArr"] = revMintConversationMessagesArr;
        }

        revVarArgs["revMintConversations"] = { "revMintConversationsArr": revMintConversationsArr, "revPublishersArr": revPublishersArr };
        /** REV END GET INIQUE ID METADATA */

        return revVarArgs;
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
