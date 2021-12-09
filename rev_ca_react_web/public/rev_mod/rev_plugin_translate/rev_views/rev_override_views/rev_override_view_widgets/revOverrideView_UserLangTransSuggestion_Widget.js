var revPluginOverrideViewWidget = async (revVarArgs) => {
    let revPhrasePublisherGUID = 5;

    let revIsTimelineView = false;

    if (revVarArgs.hasOwnProperty("revEntity") && revVarArgs.revEntity._revEntitySubType.localeCompare("rev_lang_phrase") == 0) {
        let revEntity = revVarArgs.revEntity;
        revVarArgs = revEntity.revEntityTranslations;

        revPhraseEntityGUID = revEntity._revEntityOwnerGUID;

        revIsTimelineView = true;
    }

    let revPublisherEntity;

    if (!revPublisherEntity || window.revIsEmptyJSONObject(revPublisherEntity)) {
        let revURLPublisher = window.REV_SITE_BASE_PATH + "/rev_api/get_entity_single?remote_rev_entity_guid=" + revPhrasePublisherGUID;

        try {
            let revVarArgsPublisher = await window.revGetServerData_JSON_Async(revURLPublisher);

            revPublisher = revVarArgsPublisher.filter;
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

    let revGetLockTransTabView = (revTansLockCount) => {
        if (revTansLockCount == 0) {
            revTansLockCount = "";
        }

        return `
            <div><i class="fas fa-lock"></i></div>
            <div class="revTansLockCount">${revTansLockCount}</div>
        `;
    };

    let revLockTransPhraseTab = async (revCurrTransSuggestion) => {
        let revPhraseEntityGUID = revCurrTransSuggestion.revPhraseEntityGUID;

        let revTranslationLocksCount = revCurrTransSuggestion.rev_translation_locks_count;

        let revLockTransTabWrapper_Id = revPhraseEntityGUID + "_revLockTransTabWrapper_Id_" + window.revGenUniqueId();

        window.revSetInterval(revLockTransTabWrapper_Id, () => {
            document.getElementById(revLockTransTabWrapper_Id).addEventListener("click", async (event) => {
                try {
                    let revURL = `${window.REV_SITE_BASE_PATH}/rev_api?&rev_logged_in_entity_guid=${window.REV_LOGGED_IN_ENTITY_GUID}&rev_lang_trans_guid=${revPhraseEntityGUID}&rev_to_lang_key=${revTransToLangDetails.revLangCode}&rev_to_lang_plugin_name_id=${revToPluginViewTranslations.revPluginNameId}&rev_to_lang_view_type=${revViewType}&rev_view_name_id=${revViewNameId}&revPluginHookContextsRemoteArr=revHookRemoteHandler_LockTranslationPers`;

                    let revRetData = await window.revGetServerData_JSON_Async(revURL);

                    let revTranslationLockCount = 0;

                    if (revCurrTransSuggestion.revTranslationLockCount || revRetData.revTranslationLockCount == 0) {
                        revTranslationLockCount = revRetData.revTranslationLockCount;

                        document.getElementById(revLockTransTabWrapper_Id).innerHTML = revGetLockTransTabView(revTranslationLockCount);
                    }
                } catch (error) {
                    console.log("ERR -> revLockTransPhraseTab -> !revRetData" + error);
                }
            });
        });

        return `
            <div id="${revLockTransTabWrapper_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper_WidthAuto revCloseQuestionTabWrapper revTranslateSuggestionItemOptionTab">${revGetLockTransTabView(revTranslationLocksCount)}</div>
        `;
    };

    let revLangCodeFromToViewsArr = [];

    for (let revLangCode in revVarArgs) {
        if (window.revIsEmptyVar(revVarArgs[revLangCode])) {
            continue;
        }

        for (let revPluginNameId in revVarArgs[revLangCode]) {
            if (window.revIsEmptyVar(revVarArgs[revLangCode][revPluginNameId])) {
                continue;
            }

            for (let revViewType in revVarArgs[revLangCode][revPluginNameId]) {
                if (window.revIsEmptyVar(revVarArgs[revLangCode][revPluginNameId][revViewType])) {
                    continue;
                }

                for (let revViewNameId in revVarArgs[revLangCode][revPluginNameId][revViewType]) {
                    if (window.revIsEmptyVar(revVarArgs[revLangCode][revPluginNameId][revViewType][revViewNameId]) || window.revIsEmptyVar(revVarArgs[revLangCode][revPluginNameId][revViewType][revViewNameId].revLangDetails)) {
                        continue;
                    }

                    let revLangDetails = revVarArgs[revLangCode][revPluginNameId][revViewType][revViewNameId].revLangDetails;

                    let revDefLangCode = "";
                    let revDefLangNameView = "";

                    if (!window.revIsEmptyVar(revVarArgs[revLangCode][revPluginNameId][revViewType][revViewNameId].revDefLangDetails)) {
                        let revDefLangDetails = revVarArgs[revLangCode][revPluginNameId][revViewType][revViewNameId].revDefLangDetails;

                        revDefLangCode = revDefLangDetails[revLangCode];

                        if (!window.revIsEmptyVar(revDefLangDetails.revLangName)) {
                            revDefLangNameView = `
                                <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFromTab">${revDefLangDetails.revLangName}</div>
                                <div class="revFontSiteGreyTxtColor revFontSizeNormal revLangCodeFromToSeparator"><i class="fas fa-long-arrow-alt-right"></i></div>
                            `;
                        }
                    }

                    let revToLangName = revLangDetails.revLangName;

                    let revUserTransSuggestionsViewsArr = [];

                    for (let revLangKey in revVarArgs[revLangCode][revPluginNameId][revViewType][revViewNameId]) {
                        if (revLangKey.localeCompare("revLangDetails") == 0 || revLangKey.localeCompare("revDefLangDetails") == 0) {
                            continue;
                        }

                        let revDefLangPhrase = revVarArgs[revLangCode][revPluginNameId][revViewType][revViewNameId].revDefLangDetails.revLang[revLangKey];
                        let revTransSuggestionsArr = revVarArgs[revLangCode][revPluginNameId][revViewType][revViewNameId][revLangKey].revTransSuggestionsArr;

                        for (let i = 0; i < revTransSuggestionsArr.length; i++) {
                            let revCurrTransSuggestion = revTransSuggestionsArr[i];

                            let revPhrasePublisherGUID = revCurrTransSuggestion.revPhrasePublisherGUID;
                            let revTimePublished = revCurrTransSuggestion._revTimePublished;

                            if (revCurrTransSuggestion.revPhraseEntityGUID < 1) {
                                continue;
                            }

                            revUserTransSuggestionsViewsArr.push(`
                            <div class="revFlexContainer revUserTranslateSuggestionItemContainer">
                                <div class="revTimeCreatedStyle revUserTranslateSuggestionPublisherTime">${window.revFormatLongDate(revTimePublished)}</div>
                                <div class="revFlexWrapper revUserTranslateItemSuggestionWrapper">
                                    <div class="revFlexWrapper revUserTranslateDefaultPointerWrapper">
                                        <div class="revLarge-V-Line-2em"></div>
                                        <div class="revFontSiteGreyTxtColor revFontSizeLarge revTranslateSuggestionsPointerIcon"><i class="fas fa-long-arrow-alt-right"></i></div>
                                    </div>
                                    <div class="revFlexContainer revTranslateItemSuggestionContainer">
                                        <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper revUserFromToTransLangNameWrapper">
                                            <div class="revFlexWrapper_WidthAuto revUserTransPhraseFromTo">${revDefLangPhrase}</div>
                                            <div class="revFlexWrapper_WidthAuto revUserTransPhraseFromToDividerWrapper">
                                                ${window.revSmallDividerWrapper_BorderRight()}
                                                <div class="revUserTransToDividerTxt">To </div>
                                                <div class="revUserTransToDividerTxt"><i class="fas fa-long-arrow-alt-right"></i></div>
                                            </div>
                                            <div class="revFlexWrapper_WidthAuto revUserTransPhraseFromTo">${revCurrTransSuggestion[revLangKey]}</div>
                                        </div>
                                        <div class="revFlexWrapper revUserTranslateSuggestionItemOptionsWrapper">
                                            ${await revLockTransPhraseTab(revCurrTransSuggestion)}
                                            <div class="revSmall-H-Line-1em-Blue"></div>
                                            <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revTranslateSuggestionItemOptionTab">EDiT</div>
                                            <div class="revSmall-H-Line-1em-Blue"></div>
                                            <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revTranslateSuggestionItemOptionTab"><i class="far fa-trash-alt"></i> 2</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `);

                            if (revIsTimelineView && i >= 0) {
                                break;
                            }
                        }
                    }

                    let revFromToView = `
                        <div class="revFlexContainer revFromToViewContainer">
                            <div class="revFlexWrapper revFromToViewWrapper">
                                <div class="revFlexWrapper revUserTranslateSuggestionsPointerWrapper">
                                    <div class="revLarge-V-Line-2em"></div>
                                    <div class="revFontSiteGreyTxtColor revFontSizeLarge revTranslateSuggestionsPointerIcon"><i class="fas fa-long-arrow-alt-right"></i></div>
                                </div>
                                <div class="revFlexWrapper_WidthAuto revFromToTxtWrapper">
                                    ${revDefLangNameView}
                                    <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revToTab">${revToLangName}</div>
                                </div>
                            </div>
                            <div class="revFlexContainer revUserTransSuggestionsViewsContainer">${revUserTransSuggestionsViewsArr.join("")}</div>
                        </div>
                    `;

                    if (revIsTimelineView && revLangCodeFromToViewsArr.length < 2) {
                        revLangCodeFromToViewsArr.push(revFromToView);
                    } else if (revIsTimelineView && revLangCodeFromToViewsArr.length == 2 && revLangCodeFromToViewsArr.length < 3) {
                        let revViewAllUserTrans = `
                            <div class="revFlexContainer revFromToViewContainer">
                                <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper_WidthAuto revViewAllUserTransTabWrapper">
                                    <div class="revSmall-H-Line"></div>
                                    <div>ViEw ALL tRANsLatioNs By ${revPublisherEntityName}</div>
                                    <div class="revLangCodeFromToSeparator"><i class="fas fa-long-arrow-alt-right"></i></div>
                                </div>
                            </div>
                        `;

                        revLangCodeFromToViewsArr.push(revViewAllUserTrans);
                    } else if (!revIsTimelineView) {
                        revLangCodeFromToViewsArr.push(revFromToView);
                    }
                }
            }
        }
    }

    if (!revLangCodeFromToViewsArr.length) {
        return;
    }

    /** REV START PUBLISHER ICON */
    let revPublisherIcon_Id = "revPublisherIcon_Id_" + window.revGenUniqueId();

    window.revSetInterval(revPublisherIcon_Id, () => {
        document.getElementById(revPublisherIcon_Id).addEventListener("click", function () {
            window.revUserIconClick(revPublisherEntity._remoteRevEntityGUID);
        });

        window.revLoadUserIcon(revPublisherEntity, revPublisherIcon_Id);
    });
    /** REV END PUBLISHER ICON */

    /** REV START HEADER AREA */
    let revHeaderTx = `
        <div class="revFlexWrapper revUserDetailsTransHeaderWrapper">
            <div id="${revPublisherIcon_Id}" class="revTabLink revFlexWrapper revUserTranslateSuggestionPublisherIcon"></div>
            <div class="revFontSiteGreyTxtColor revFontSizeNormal revUserTransByHeaderTxt">TraNsLATionNs By </div>
            <div id="${revPublisherEntityName_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revTranslateSuggestionPublisherNames">${revPublisherEntityName}</div>
        </div>
    `;

    let revPageViewPageNavHeader = await window.revGetLoadedPageView("revPageViewPageNavHeader", { "revDafaultPagePagination": true });
    let revUserOptionsMenuArea = await window.revGetMenuArea("revActivityItemsListingView", window.REV_LOGGED_IN_ENTITY);
    let revPageHeader = window.revPageHeader(revHeaderTx);

    let revPageHeaderArea = `<div class="revFlexContainer revUserTransPageHeaderAreaContainer_TimeLine">${revHeaderTx}</div>`;

    let revUserTransListingContainer = "revUserLangTransContainer";

    if (!revIsTimelineView) {
        revUserTransListingContainer = "revUserTransListingContainer";

        revPageHeaderArea = `
            <div class="revFlexContainer">
                <div class="revFlexWrapper revPageViewTitledPageNavHeaderWrapper_AdForm">${revPageViewPageNavHeader}</div>
                <div class="revFlexWrapper revUserOptionsMenuAreaWrapper_AdForm">${revUserOptionsMenuArea}</div>
                <div class="revFlexContainer revPageHeaderAreaContainer_UserTransListing">${revHeaderTx}</div>
            </div>
        `;
    }
    /** REV END HEADER AREA */

    let revRetView = `
    <div class="revFlexContainer">
        ${revPageHeaderArea}
        <div class="revFlexContainer ${revUserTransListingContainer}">${revLangCodeFromToViewsArr.join("")}</div>
    </div>
    `;

    return revRetView;
};

module.exports.revPluginOverrideViewWidget = revPluginOverrideViewWidget;
