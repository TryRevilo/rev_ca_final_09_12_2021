var revPluginOverrideViewWidget = async (revVarArgs) => {
    let revDefLang = revVarArgs.revDefLang;

    let revTransFromLangDetails = revVarArgs.revTransFromLangDetails;
    let revTransToLangDetails = revVarArgs.revTransToLangDetails;
    let revToPluginViewTranslations = revVarArgs.revToPluginViewTranslations;
    let revFromPluginViewTranslations = revVarArgs.revFromPluginViewTranslations;

    let revPluginNameId = revToPluginViewTranslations.revPluginNameId;

    /** REV START TRANS SUGGESTIONS */
    let revGetLockTransTabView = (revTansLockCount) => {
        if (revTansLockCount == 0) {
            revTansLockCount = "";
        }

        return `
            <div><i class="fas fa-lock"></i></div>
            <div class="revTansLockCount">${revTansLockCount}</div>
        `;
    };

    let revTranslateSuggestionView = async (revTransSuggestionsArr, revLangKey, revViewType, revViewNameId, revPublishersArr) => {
        let revTransArr = [];

        let revLockTransPhraseTab = async (revCurrTransSuggestion) => {
            let revPhraseEntityGUID = revCurrTransSuggestion.revPhraseEntityGUID;

            let revTranslationLocksCount = revCurrTransSuggestion.rev_translation_locks_count;

            let revLockTransTabWrapper_Id = revPhraseEntityGUID + "_revLockTransTabWrapper_Id_" + window.revGenUniqueId();

            window.revSetInterval(revLockTransTabWrapper_Id, () => {
                document.getElementById(revLockTransTabWrapper_Id).addEventListener("click", async (event) => {
                    try {
                        let revURL = `${window.REV_SITE_BASE_PATH}/rev_api?&rev_logged_in_entity_guid=${window.REV_LOGGED_IN_ENTITY_GUID}&rev_lang_trans_guid=${revPhraseEntityGUID}&rev_to_lang_key=${revTransToLangDetails.revLangCode}&rev_to_lang_plugin_name_id=${revToPluginViewTranslations.revPluginNameId}&rev_to_lang_view_type=${revViewType}&rev_view_name_id=${revViewNameId}&revPluginHookContextsRemoteArr=revHookRemoteHandler_LockTranslationPers`;

                        let revData = await window.revGetServerData_JSON_Async(revURL);

                        let revTranslationLockCount = 0;

                        if (revData.revTranslationLockCount || revData.revTranslationLockCount == 0) {
                            revTranslationLockCount = revData.revTranslationLockCount;

                            document.getElementById(revLockTransTabWrapper_Id).innerHTML = revGetLockTransTabView(revTranslationLockCount);
                        }
                    } catch (error) {
                        console.log("ERR -> revOverrideViewTranslateSuggestionWidget.js -> !revData" + error);
                    }
                });
            });

            return `
                <div id="${revLockTransTabWrapper_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper_WidthAuto revCloseQuestionTabWrapper revTranslateSuggestionItemOptionTab">${revGetLockTransTabView(revTranslationLocksCount)}</div>
            `;
        };

        for (let i = 0; i < revTransSuggestionsArr.length; i++) {
            let revCurrTransSuggestion = revTransSuggestionsArr[i];

            let revPhrasePublisherGUID = revCurrTransSuggestion.revPhrasePublisherGUID;
            let revTimePublished = revCurrTransSuggestion._revTimePublished;

            if (revCurrTransSuggestion.revPhraseEntityGUID < 1) {
                continue;
            }

            let revPublisherEntity = window.revGetPublisherEntity(revPublishersArr, revPhrasePublisherGUID);

            if (!revPublisherEntity || window.revIsEmptyJSONObject(revPublisherEntity)) {
                let revURLPublisher = window.REV_SITE_BASE_PATH + "/rev_api/get_entity_single?remote_rev_entity_guid=" + revPhrasePublisherGUID;

                try {
                    let revDataPublisher = await window.revGetServerData_JSON_Async(revURLPublisher);

                    console.log("D-LOAD : revPhrasePublisherGUID : " + revPhrasePublisherGUID + "\n\t" + JSON.stringify(revDataPublisher));

                    revPublisher = revDataPublisher.filter;
                    revPublisherEntity = revPublisher[0];
                } catch (error) {
                    console.log("ERR -> revOverrideViewTranslateSuggestionWidget.js -> revPublisher -> " + error);
                }
            }

            let revPublisherEntityName = window.revGetMetadataValue(revPublisherEntity._revInfoEntity._revEntityMetadataList, "rev_entity_full_names_value");

            let revPublisherEntityIcon_Id = "revPublisherEntityIcon_Id_" + window.revGenUniqueId();

            window.revSetInterval(revPublisherEntityIcon_Id, () => {
                document.getElementById(revPublisherEntityIcon_Id).addEventListener("click", function () {
                    window.revUserIconClick(revPublisherEntity._remoteRevEntityGUID);
                });

                window.revLoadUserIcon(revPublisherEntity, revPublisherEntityIcon_Id);
            });

            let revPublisherEntityName_Id = "revPublisherEntityName_Id_" + window.revGenUniqueId();

            window.revSetInterval(revPublisherEntityName_Id, () => {
                document.getElementById(revPublisherEntityName_Id).addEventListener("click", function () {
                    window.revUserIconClick(revPublisherEntity._remoteRevEntityGUID);
                });
            });

            revTransArr.push(
                `
                    <div class="revFlexContainer revTranslateSuggestionItemContainer">
                        <div class="revFlexWrapper revTranslateSuggestionPublisherWrapper">
                            <div id="${revPublisherEntityIcon_Id}" class="revTabLink revTranslateSuggestionPublisherIcon"></div>
                            <div id="${revPublisherEntityName_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revTranslateSuggestionPublisherNames">${revPublisherEntityName}</div>
                            <div class="revTimeCreatedStyle revTranslateSuggestionPublisherTime">${window.revFormatLongDate(revTimePublished)}</div>
                        </div>
                        <div class="revFlexWrapper revTranslateItemSuggestionWrapper">
                            <div class="revFlexWrapper revTranslateSuggestionsPointerWrapper">
                                <div class="revLarge-V-Line-2em"></div>
                                <div class="revFontSiteGreyTxtColor revFontSizeLarge revTranslateSuggestionsPointerIcon"><i class="fas fa-long-arrow-alt-right"></i></div>
                            </div>
                            <div class="revFlexContainer revTranslateItemSuggestionContainer">
                                <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper">${revCurrTransSuggestion[revLangKey]}</div>
                                <div class="revFlexWrapper revTranslateSuggestionItemOptionsWrapper">
                                    ${await revLockTransPhraseTab(revCurrTransSuggestion)}
                                    <div class="revSmall-H-Line-1em-Blue"></div>
                                    <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revTranslateSuggestionItemOptionTab">EDiT</div>
                                    <div class="revSmall-H-Line-1em-Blue"></div>
                                    <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revTranslateSuggestionItemOptionTab"><i class="far fa-trash-alt"></i> 2</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            );
        }

        let revTransSuggestionsCountView = ``;

        if (Array.isArray(revTransArr) && revTransArr.length > 0) {
            let revTransSuggestionsTxt = `${revTransArr.length} trAnsLaTioN suGgEsTioNs`;

            revTransSuggestionsCountView = `
                <div class="revFlexWrapper">
                    <div class="revFontSiteGreyTxtColor revFontSizeNormal">${revTransSuggestionsTxt}</div>
                    <div class="revFontSiteGreyTxtColor revFontSizeNormal revTranslateSuggestionsAreaContainerPointer"><i class="fas fa-level-down-alt"></i></div>
                </div>
            `;
        } else {
            let revNoTransSuggestionsTxt = `No trAnsLaTioN suGgEsTioNs so FaR`;

            revTransSuggestionsCountView = `
                <div class="revFlexWrapper">
                    <div class="revFontSiteGreyTxtColor revFontSizeNormal">${revNoTransSuggestionsTxt}</div>
                </div>
            `;
        }

        return `
            <div class="revFlexContainer revTranslateSuggestionsAreaContainer">
                ${revTransSuggestionsCountView}
                <div class="revFlexContainer revTranslationsPublishedListingContainer">${revTransArr.join("")}</div>
            </div>
        `;
    };
    /** REV END TRANS SUGGESTIONS */

    /** REV START SORT VIEW TYPES */
    let revCurrViewType = "rev_form";

    let revForms;

    for (let revViewType in revFromPluginViewTranslations.revPluginTransViews) {
        if (revViewType.localeCompare(revCurrViewType) == 0) {
            revForms = {
                "revFrom": revFromPluginViewTranslations.revPluginTransViews[revViewType],
                "revTo": revToPluginViewTranslations.revPluginTransViews[revViewType],
            };
        }
    }
    /** REV END SORT VIEW TYPES */

    let revGetTransViews = async (revViewTypesGroup, revViewType) => {
        let revFromViewTypesGroup = revViewTypesGroup.revFrom;
        let revToViewTypesGroup = revViewTypesGroup.revTo;

        /** revViewTypesGroup -> eg: rev_forms, rev_override_views */
        if (window.revIsEmptyJSONObject(revFromViewTypesGroup)) {
            return;
        }

        let revTranslateViewContainersArr = [];

        for (let revViewNameId in revFromViewTypesGroup) {
            let revLangDetails = revFromViewTypesGroup[revViewNameId].revLangDetails;
            let revLang = revFromViewTypesGroup[revViewNameId].revLang;
            let revPublishersArr = revToViewTypesGroup[revViewNameId].revPublishersArr;

            let revLangDef = revDefLang["rev_form"][revViewNameId].revLang;

            for (let revLangKey in revLangDef) {
                let revTransSuggestionsArr = [];

                if (revToViewTypesGroup[revViewNameId][revLangKey]) {
                    revTransSuggestionsArr = revTransSuggestionsArr.concat(revToViewTypesGroup[revViewNameId][revLangKey].revTransSuggestionsArr);
                }

                let revTransI = 0;

                let revLangVal = revLang[revLangKey];

                let revLangValEmpty = window.revIsEmptyVar(revLang[revLangKey]);

                if (!revLangValEmpty) {
                    revLangVal = revLang[revLangKey];
                }

                let revPhraseVal = revLang[revLangKey];

                if (revFromPluginViewTranslations.revIsDefault || revLangValEmpty) {
                    if (window.revIsEmptyVar(revLangDef[revLangKey])) {
                        continue;
                    }

                    revPhraseVal = revLangDef[revLangKey] + "*";
                }

                let revTranslateTab_Id = revTransI + "_revTranslateTab_Id_" + window.revGenUniqueId();
                let revTranslateInput_Id = revTransI + "_revTranslateInput_Id_" + window.revGenUniqueId();

                window.revSetInterval(revTranslateTab_Id, () => {
                    document.getElementById(revTranslateTab_Id).addEventListener("click", async (event) => {
                        let revPassVarArgs = {
                            "revDefLang": revDefLang,
                            "revTransToLangDetails": revTransToLangDetails,
                            "revViewNameId": revViewNameId,
                            "revPluginNameId": revPluginNameId,
                            "revLangKey": revLangKey,
                            "revLangVal": revLangVal,
                            "revCancelPublisherFormCallback": () => {
                                document.getElementById(revTranslateInput_Id).innerHTML = "";
                            },
                        };

                        let revLangTranslationForm = await window.revGetForm("revLangTranslationForm", revPassVarArgs);
                        document.getElementById(revTranslateInput_Id).innerHTML = revLangTranslationForm;
                    });
                });

                let revTranslationsPublishedListing_Id = revTransI + "_revTranslationsPublishedListing_Id_" + window.revGenUniqueId();

                revTransI = revTransI + 1;

                let revTranslateViewContainer = `
                    <div class="revFlexContainer revTranslatePhraseContainer">
                        <div class="revFontSiteGreyTxtColor revFontSizeMedium revFlexWrapper"><i class="fas fa-long-arrow-alt-right"></i> ${revPhraseVal}</div>
                        <div class="revFlexWrapper revTranslateOptionsWrapper">
                            <div id="${revTranslateTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revTranslateOptionTabWrapper">
                                <div class="revFontSizeNormal"><i class="fas fa-language fa-2x"></i></div>
                                <div class="revTranslateOptionTxt">TRansLate</div>
                            </div>
                            <div class="revSmall-H-Line-1em-Blue"></div>
                            <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revTranslateOptionTabWrapper">EDiT</div>
                            <div class="revSmall-H-Line-1em-Blue"></div>
                            <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revTranslateOptionTabWrapper">DEscRipTioN</div>
                        </div>
                        <div id="${revTranslateInput_Id}" class="revFlexContainer"></div>
                        <div id="${revTranslationsPublishedListing_Id}" class="revFlexContainer"></div>
                    </div>
                `;

                revTranslateViewContainersArr.push(revTranslateViewContainer);

                window.revSetInterval(revTranslationsPublishedListing_Id, async () => {
                    let revCurrTranslateSuggestionView = await revTranslateSuggestionView(revTransSuggestionsArr, revLangKey, revViewType, revViewNameId, revPublishersArr);

                    if (!window.revIsEmptyVar(revCurrTranslateSuggestionView)) {
                        document.getElementById(revTranslationsPublishedListing_Id).innerHTML = revCurrTranslateSuggestionView;
                    }
                });
            }
        }

        return revTranslateViewContainersArr.join("");
    };

    return await revGetTransViews(revForms, revCurrViewType);
};

module.exports.revPluginOverrideViewWidget = revPluginOverrideViewWidget;
