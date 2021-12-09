var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;

        let revReqBody = revVarArgs.revReqBody;

        if (revRemoteHookMethods.revIsEmptyVar(revReqBody)) {
            return;
        }

        if (!revVarArgs.hasOwnProperty("filter")) {
            revVarArgs["filter"] = [];
        }

        if (!revReqBody.hasOwnProperty("revLoggedInEntityGUID") || revReqBody.revLoggedInEntityGUID < 1) {
            return revVarArgs;
        }

        let revLoggedInEntityGUID = revReqBody.revLoggedInEntityGUID;
        let revPluginNameId = revReqBody.revPluginNameId;
        let revPluginFormNameId = revReqBody.revPluginFormNameId;
        let revPluginCode = revReqBody.revPluginCode;

        let revPlugin = await revRemoteHookMethods.revGetPluginEntity_By_Plugin_Name(revPluginNameId);

        let revPluginEntityGUID = -1;

        if (!revRemoteHookMethods.revIsEmptyJSONObject(revPlugin)) {
            revPluginEntityGUID = revPlugin._remoteRevEntityGUID;
        }

        if (revPluginEntityGUID < 1) {
            return revVarArgs;
        }

        let revPluginFormEntity = await revRemoteHookMethods.revGetPluginFormEntity_By_Plugin_Name(revPluginEntityGUID, revPluginFormNameId);

        if (revRemoteHookMethods.revIsEmptyJSONObject(revPluginFormEntity)) {
            return revVarArgs;
        }

        let revPluginFormEntityGUID = revPluginFormEntity._remoteRevEntityGUID;

        if (revPluginFormEntityGUID < 1) {
            return revVarArgs;
        }

        let revPluginEditGUID = -1;
        let revPluginEditMetadataId = -1;

        let revPassVarArgs = {
            "revEntityOwnerGUID": revLoggedInEntityGUID,
            "revEntitySubtype": "rev_plugin_edit",
        };

        let revPluginEditsArr = await revRemoteHookMethods.revPersReadFlatEnties_By_OwnerGUID_Subtype(revPassVarArgs);

        let revPluginEditEntity;

        for (let i = 0; i < revPluginEditsArr.length; i++) {
            let revCurrPluginEditEntity = revPluginEditsArr[i];
            let revCurrPluginEditInfoEntity = revCurrPluginEditEntity._revInfoEntity;

            let revPluginFormMetadata = revRemoteHookMethods.revGetMetadata_By_Metadata_Name(revCurrPluginEditInfoEntity._revEntityMetadataList, "rev_plugin_edit_form_name_id");

            if (revRemoteHookMethods.revIsEmptyVar(revPluginFormMetadata) || !revPluginFormMetadata.hasOwnProperty("_metadataValue")) {
                continue;
            }

            let revPluginFormNameIdMetadataVal = revPluginFormMetadata._metadataValue;

            if (revPluginFormNameIdMetadataVal.localeCompare(revPluginFormNameId) == 0) {
                revPluginEditEntity = revCurrPluginEditEntity;

                revPluginEditGUID = revCurrPluginEditEntity._remoteRevEntityGUID;
                revPluginEditMetadataId = revPluginFormMetadata.remoteRevMetadataId;

                break;
            }
        }

        if (revPluginEditGUID < 1 && revPluginEditMetadataId < 1) {
            let revPersEntity = revRemoteHookMethods.REV_ENTITY_STRUCT();

            revPersEntity._revEntityResolveStatus = -1;
            revPersEntity._revEntityChildableStatus = 301;
            revPersEntity._revEntityType = "rev_object";
            revPersEntity._revEntitySubType = "rev_plugin_edit";
            revPersEntity._remoteRevEntityGUID = -1;
            revPersEntity._revEntityOwnerGUID = revLoggedInEntityGUID;
            revPersEntity._revEntityContainerGUID = revPluginFormEntityGUID;
            revPersEntity._revTimeCreated = new Date().getTime();

            /** START REV INFO */
            let revPersInfoEntity = revRemoteHookMethods.REV_ENTITY_STRUCT();
            revPersInfoEntity._remoteRevEntityGUID = -1;
            revPersInfoEntity._revEntityResolveStatus = 0;
            revPersInfoEntity._revEntityChildableStatus = 3;
            revPersInfoEntity._revEntityType = "revObject";
            revPersInfoEntity._revEntitySubType = "rev_entity_info";
            revPersInfoEntity._revEntityOwnerGUID = revLoggedInEntityGUID;
            revPersInfoEntity._revEntityContainerGUID = revPersEntity._remoteRevEntityGUID;
            revPersInfoEntity._revEntityChildableStatus = 3;
            revPersInfoEntity._revTimeCreated = new Date().getTime();
            /** END REV INFO */

            /** REV START SET METADATA */
            revPersInfoEntity._revEntityMetadataList.push(revRemoteHookMethods.REV_METADATA_FILLER("rev_plugin_edit_name_id", revPluginNameId));
            revPersInfoEntity._revEntityMetadataList.push(revRemoteHookMethods.REV_METADATA_FILLER("rev_plugin_edit_form_name_id", revPluginFormNameId));
            revPersInfoEntity._revEntityMetadataList.push(revRemoteHookMethods.REV_METADATA_FILLER("rev_plugin_edit_code", revPluginCode));
            /** REV END SET METADATA */

            /** REV START ATTACH INFO */
            revPersEntity._revInfoEntity = revPersInfoEntity;
            /** REV END ATTACH INFO */

            let revPluginEdit_Rel = revRemoteHookMethods.REV_ENTITY_RELATIONSHIP_STRUCT();
            revPluginEdit_Rel._revResolveStatus = -101;
            revPluginEdit_Rel._revEntityRelationshipType = "rev_plugin_edit_of";
            revPluginEdit_Rel._remoteRevEntityTargetGUID = revPluginFormEntityGUID;
            revPluginEdit_Rel._remoteRevEntitySubjectGUID = -1;

            revPersEntity._revSubjectEntityRelationships.push(revPluginEdit_Rel);

            let retRevEntityFilterArr_PluginEdit = await revRemoteHookMethods.createNewRevEntitiesArray([revPersEntity]);

            revVarArgs.filter.push({ "revSavedPluginEdit": retRevEntityFilterArr_PluginEdit });
        } else if (revPluginEditMetadataId > 0) {
            let revCurrPluginEditInfoEntity = revPluginEditEntity._revInfoEntity;

            let revPluginFormEditCodeMetadata = revRemoteHookMethods.revGetMetadata_By_Metadata_Name(revCurrPluginEditInfoEntity._revEntityMetadataList, "rev_plugin_edit_code");

            if (revRemoteHookMethods.revIsEmptyVar(revPluginFormEditCodeMetadata) || !revPluginFormEditCodeMetadata.hasOwnProperty("_metadataValue")) {
                return revVarArgs;
            }

            let revPluginFormEditCodeMetadataId = revPluginFormEditCodeMetadata.remoteRevMetadataId;

            let revUpdateMetadataVarArgs = {
                "remoteRevMetadataId": revPluginFormEditCodeMetadataId,
                "_metadataValue": 0,
                "_metadataValue": revPluginCode,
            };

            let revMetadataUpdateData = await revRemoteHookMethods.revPersUpdaterevEntityMetadataValue_By_MetadataId(revUpdateMetadataVarArgs);

            revVarArgs.filter.push({ "revMetadataUpdateData": revMetadataUpdateData });
        }
        /** REV END LOEDED PLUGINS */
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
