var revMenuItemWidget = async (revVarArgs) => {
    if (!revVarArgs) {
        console.log("ERR -> revPageOwnerOptionsMenuAreaWidget -> !revVarArgs || !revVarArgs || !revVarArgs._revInfoEntity");
        return;
    }

    let revPublisher = revVarArgs;
    let revPublisherInfo = revPublisher._revInfoEntity;

    let revOwnerName = " . . . ";

    if (revPublisher && revPublisher._revEntityMetadataList) {
        revOwnerName = window.revGetMetadataValue(revPublisherInfo._revEntityMetadataList, "rev_entity_full_names_value");
    }

    let revPageOwnerNames_Id = "revPageOwnerNames_Id_" + window.revGenUniqueId();

    window.revSetInterval(revPageOwnerNames_Id, () => {
        document.getElementById(revPageOwnerNames_Id).addEventListener("click", async function () {
            await window.revGetLoadedPageViewAreaContainer("revMainCenterScrollArea", revVarArgs, (_revView) => {
                document.getElementById("revPageHome").innerHTML = _revView;
            });
        });
    });

    let revTotPoints = 100;

    if (revVarArgs.revEntityProfileStats_TotCount_Questions_Answers) {
        let revEntityProfileStats_TotCount_Questions_Answers = revVarArgs.revEntityProfileStats_TotCount_Questions_Answers;
        let revEntityTotCountStats_QuestionAsked = revEntityProfileStats_TotCount_Questions_Answers.rev_entity_tot_question_asked_count_stats_wrapper;
        let revEntityTotCountStats_QuestionAnswersPublished = revEntityProfileStats_TotCount_Questions_Answers.rev_entity_tot_answers_published_count_stats_wrapper;

        revEntityTotCountStats_QuestionAsked = Number(revEntityTotCountStats_QuestionAsked);

        if (revEntityTotCountStats_QuestionAsked) {
            revTotPoints += Number(revEntityTotCountStats_QuestionAsked) * 23;
        }

        revEntityTotCountStats_QuestionAnswersPublished = Number(revEntityTotCountStats_QuestionAnswersPublished);

        if (revEntityTotCountStats_QuestionAnswersPublished) {
            revTotPoints += Number(revEntityTotCountStats_QuestionAnswersPublished) * 41;
        }
    }

    return `
        <div class="revFlexWrapper revpageOwnerHeaderWrapper">
            <div id="${revPageOwnerNames_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revPageOwnerNamesWrapper">
                <i class="fa fa-user revUserIcon"></i><i class="fas fa-long-arrow-alt-right revUserIconArrowRight"></i>
                <div class="revPageOwnerNamesTxt"> ${revOwnerName}</div>
            </div>
            <div class="revTabLink revSmalllBoldBlue revFlexWrapper revPageOwnerScoreWrapper">
                <div class="revSmall-H-Line"></div>
                <div class="revTiny-V-Line"></div>
                <div class="revPageOwnerScoreIcon"><i class="fas fa-arrow-up revFontSizeSmall"></i></div>
                <div class="revPageOwnerScoreCountTxt">${revTotPoints}</div>
                <div class="revTiny-V-Line"></div>
                <div class="revSmall-H-Line"></div>
            </div>
        </div>
        `;
};

module.exports.revMenuItemWidget = revMenuItemWidget;
