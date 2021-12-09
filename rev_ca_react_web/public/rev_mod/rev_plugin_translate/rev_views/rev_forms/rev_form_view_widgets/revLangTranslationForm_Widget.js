var revFormViewWidget = async (revVarArgs) => {
    let revDefLang = revVarArgs.revDefLang;

    let revViewNameId = revVarArgs.revViewNameId;
    let revLangKey = revVarArgs.revLangKey;
    let revLangVal = revVarArgs.revLangVal;
    let revTransToLangDetails = revVarArgs.revTransToLangDetails;

    let revLangFormality = "";

    let revNewLangFormality = async () => {
        let revCheckBoxesArr = [];

        /** REV START FORMAL */
        let revCB_Formal_Id = "revCB_Formal_Id_" + window.revGenUniqueId();

        let revCheckBoxCallback = (revCBVarArgs) => {
            let revCurrCheckBoxId = revCBVarArgs.revCheckBoxId;

            let revCheckedCBIndex = window.revCheckBoxesToggler({ "revCheckBoxesArr": revCheckBoxesArr, "revCheckedCheckBoxId": revCurrCheckBoxId });

            if (revCBVarArgs.revCheckBoxChecked) {
                revLangFormality = revCBVarArgs.revCheckBoxVal;
            } else {
                revLangFormality = "";
            }
        };

        let revCBVarArgs_Formal = {
            "revCheckBoxCallback": revCheckBoxCallback,
            "revCheckBoxId": revCB_Formal_Id,
            "revCheckBoxVal": "rev_formal",
        };

        let revCheckBox_Formal = window.revGetCheckBox(revCBVarArgs_Formal);
        /** REV END FORMAL */

        /** REV START INFORMAL */
        let revCB_InFormal_Id = "revCB_InFormal_Id_Id_" + window.revGenUniqueId();

        let revCBVarArgs_InFormal = {
            "revCheckBoxCallback": revCheckBoxCallback,
            "revCheckBoxId": revCB_InFormal_Id,
            "revCheckBoxVal": "rev_informal",
            "revIsChecked": true,
        };

        let revCheckBox_InFormal = window.revGetCheckBox(revCBVarArgs_InFormal);
        /** REV END INFORMAL */

        revCheckBoxesArr.push(revCB_Formal_Id);
        revCheckBoxesArr.push(revCB_InFormal_Id);

        let revChatSettingsForm = `
            <div class="revFlexWrapper revLangTransPublisherFormOptionalFooterAreaContainer">
                <div class="revFlexWrapper revChatSettingsOptionWrapper">
                    ${revCheckBox_Formal}
                    <div class="revFontSiteGreyTxtColor revFontSizeNormal revChatSettingsTxt">FoRmAL</div>
                </div>
                <div class="revFlexWrapper revChatSettingsOptionWrapper">
                    ${revCheckBox_InFormal}
                    <div class="revFontSiteGreyTxtColor revFontSizeNormal revChatSettingsTxt">iNFormAL</div>
                </div>
            </div>
        `;

        return revChatSettingsForm;
    };

    let revPassVarArgs = window.revCloneJsObject(revVarArgs);

    revPassVarArgs["revPublisherFormHintText"] = "youR TRAnslATioN suGgesTioN";

    revPassVarArgs["revFilesSelectedCallback"] = (revFiles) => {
        console.log("revFiles : " + JSON.stringify(revFiles));
    };

    revPassVarArgs["revPublisherPublishCallback"] = (revPassParams) => {
        let revLangCode = revTransToLangDetails.revLangCode;

        if (window.revIsEmptyVar(revLangCode)) {
            return;
        }

        let revLangName = revTransToLangDetails.revLangName;

        if (window.revIsEmptyVar(revLangName)) {
            return;
        }

        if (window.revIsEmptyVar(revLangFormality)) {
            revLangFormality = "rev_informal";
        }

        let revURL = window.REV_SITE_BASE_PATH + "/rev_base_api_post?revPluginHookContextsRemoteArr=revPluginHookRemoteEnvironment_TranslatePhrase";

        let revTransSuggestion = revPassParams.revEditorPlainText;
        revTransSuggestion = revTransSuggestion.replace("\n", "");

        let revLangDetails = {
            "rev_plugin_name_id": revVarArgs.revPluginNameId,
            "rev_plugin_display_name": "TRANsLATioNs",
            "revLangDetails": revTransToLangDetails,
            "revLangViewType": "rev_form",
            "revViewNameId": revViewNameId,
            "rev_lang": {
                [revLangKey]: revTransSuggestion,
            },
        };

        window.revPostServerData(
            revURL,
            {
                "revLoggedInEntityGUID": window.REV_LOGGED_IN_ENTITY_GUID,
                "revLangDetails": revLangDetails,
            },
            async (revRetData) => {
                console.log("revRetData : " + JSON.stringify(revRetData));
            }
        );
    };

    revPassVarArgs["revCancelPublisherFormCallback"] = () => {
        if (revVarArgs.revCancelPublisherFormCallback) {
            revVarArgs.revCancelPublisherFormCallback();
        }
    };

    revPassVarArgs["revPublisherFormAdditionalInputsFooterArea"] = await revNewLangFormality();

    let revNewLangTranslationForm = await window.revGetForm("revPublisherForm", revPassVarArgs);

    return revNewLangTranslationForm;
};

module.exports.revFormViewWidget = revFormViewWidget;
