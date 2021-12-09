var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;

        let revReqParams = revVarArgs.revReqParams;

        if (!revReqParams.rev_lang_trans_guid || revReqParams.rev_lang_trans_guid < 1) {
            return revVarArgs;
        }

        let revLoggedInEntityGUID = Number(revReqParams.rev_logged_in_entity_guid);
        let revPhraseEntityGUID = Number(revReqParams.rev_lang_trans_guid);

        let revLangKey = revReqParams.rev_to_lang_key;
        let revLangPluginnameId = revReqParams.rev_to_lang_plugin_name_id;
        let revLangViewType = revReqParams.rev_to_lang_view_type;
        let revViewNameId = revReqParams.rev_view_name_id;

        let revCurrPhraseEntityIndex = -1;

        let revTransSuggestionsArr = revRemoteHookMethods.revLangTranslations[revLangKey][revLangPluginnameId][revLangViewType][revViewNameId].revTransSuggestionsArr;

        for (let i = 0; i < revTransSuggestionsArr.length; i++) {
            let revCurrTransObj = revTransSuggestionsArr[i];
            let revCurrPhraseEntityGUID = revCurrTransObj.revPhraseEntityGUID;

            if (revCurrPhraseEntityGUID == revPhraseEntityGUID) {
                revCurrPhraseEntityIndex = i;

                break;
            }
        }

        let revTransSuggestion = revTransSuggestionsArr[revCurrPhraseEntityIndex];

        if (!revTransSuggestion.hasOwnProperty("rev_translation_locks_count")) {
            revRemoteHookMethods.revLangTranslations[revLangKey][revLangPluginnameId][revLangViewType][revViewNameId].revTransSuggestionsArr[revCurrPhraseEntityIndex]["rev_translation_locks_count"] = 0;
        }

        let revRetVarArgs = {};

        /** REV START TRANSLATION LOCKS STATS */
        let revEntityStatsWrapperNameId = "rev_translation_locks_count";

        let revPassVarArgs = {
            "revEntityGUID": revPhraseEntityGUID,
            "revEntityStatsWrapperNameId": revEntityStatsWrapperNameId,
            "revEntityStatsWrapperDefVal": 0,
        };

        let revEntityMetadataStatsWrapper = await revRemoteHookMethods.revGetEntityStatsWrapper(revPassVarArgs);

        let remoteRevMetadataId = revEntityMetadataStatsWrapper.remoteRevMetadataId;
        let metadataValue = revEntityMetadataStatsWrapper._metadataValue;

        let revMetadataUpdateVal = Number(metadataValue);
        /** REV END TRANSLATION LOCKS STATS */

        let revReqQuerry = {
            "rev_logged_in_entity_guid": revLoggedInEntityGUID,
            "rev_ann_name_id": 4,
            "rev_limit": 1,
        };

        let revLastAnn = await revRemoteHookMethods.revPersReadAnns_By_AnnId_OwnerEntityGUID(revReqQuerry);

        revLastAnn = revLastAnn[0];

        console.log((Number(revLastAnn._revAnnotationRemoteEntityGUID) == revPhraseEntityGUID) + " > " + Number(revLastAnn._revAnnotationRemoteEntityGUID) + " : revLoggedInEntityGUID : " + revLoggedInEntityGUID + " revPhraseEntityGUID : " + revPhraseEntityGUID + "\n\trevLastAnn : " + JSON.stringify(revLastAnn));

        if (!revRemoteHookMethods.revIsEmptyJSONObject(revLastAnn) && Number(revLastAnn._revAnnotationRemoteEntityGUID) == revPhraseEntityGUID) {
            let revAnnDelRes = await revRemoteHookMethods.revPersDeleteAnn_By_AnnId_Multi([revLastAnn._revAnnotationRemoteId]);

            if (revAnnDelRes == 1) {
                revRetVarArgs["revTranslationLock"] = revLastAnn;

                if (revMetadataUpdateVal > 0) {
                    revMetadataUpdateVal = revMetadataUpdateVal - 1;
                }
            }
        } else {
            let revAnn = revRemoteHookMethods.REV_ENTITY_ANNOTATION_STRUCT();
            revAnn._revAnnotationId = 0;
            revAnn._revAnnotationResStatus = -1;
            revAnn._revAnnotationNameId = 4;
            revAnn._revAnnotationValue = "rev_translation_lock";
            revAnn._revAnnotationRemoteEntityGUID = revPhraseEntityGUID;
            revAnn._revAnnRemoteOwnerEntityGUID = revLoggedInEntityGUID;

            let revAnnData = await revRemoteHookMethods.revPersSaveRevEntityAnnotation([revAnn]);

            revMetadataUpdateVal = revMetadataUpdateVal + 1;

            if (revAnnData && revAnnData.revNewAnnPersRes) {
                revRetVarArgs["revNewAnnPersRes"] = revAnnData.revNewAnnPersRes;
            }
        }

        let revUpdateMetadataVarArgs = {
            "remoteRevMetadataId": remoteRevMetadataId,
            "_metadataValue": revMetadataUpdateVal,
        };

        let revMetadataUpdateData = await revRemoteHookMethods.revPersUpdaterevEntityMetadataValue_By_MetadataId(revUpdateMetadataVarArgs);

        revRetVarArgs["revTranslationLockCount"] = revMetadataUpdateVal;

        revRemoteHookMethods.revLangTranslations[revLangKey][revLangPluginnameId][revLangViewType][revViewNameId].revTransSuggestionsArr[revCurrPhraseEntityIndex].rev_translation_locks_count = revMetadataUpdateVal;

        return revRetVarArgs;
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
