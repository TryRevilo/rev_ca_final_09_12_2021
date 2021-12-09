var revView = async (revVarArgs) => {
    if (!revVarArgs) {
        return;
    }

    let revHiddenViewId = "revHiddenView_" + window.revGenUniqueId();
    let revMessagesTab_Id = "revMessagesTab_" + window.revGenUniqueId();
    let revCallTab_Id = "revCallTab_Id_" + window.revGenUniqueId();
    let revVideoCallTab_Id = "revVideoCallTab_Id_" + window.revGenUniqueId();
    let revRecentlySentMsgs_Id = "revRecentlySentMsgs_" + window.revGenUniqueId();

    let revFullNames = window.revGetMetadataValue(revVarArgs._revInfoEntity._revEntityMetadataList, "rev_entity_full_names_value");
    if (!revFullNames) revFullNames = "&nbsp; . . . &nbsp;";

    window.revSetInterval(revMessagesTab_Id, async () => {
        document.getElementById(revMessagesTab_Id).addEventListener("click", async function (event) {
            let revMsgComposeCallback = (revMsg) => {
                revMsg._revTimePublished = new Date().getTime();

                window.revInitiateDataMessanger(JSON.stringify(revMsg), revVarArgs);

                window.revGetLoadedPageView("revObjectViewIM", revMsg, (revMainCenterScrollArea) => {
                    let revNewMsgContainer = document.createElement("div");
                    revNewMsgContainer.classList.add("revFlexContainer");
                    revNewMsgContainer.innerHTML = revMainCenterScrollArea;

                    document.getElementById(revRecentlySentMsgs_Id).insertBefore(revNewMsgContainer, document.getElementById(revRecentlySentMsgs_Id).firstChild);

                    document.getElementById(revHiddenViewId).innerHTML = "";
                });
            };

            let revInlineFormComposeMessage = await window.revGetForm("revInlineFormComposeMessage", { "revEntity": revVarArgs, "revMsgComposeCallback": revMsgComposeCallback });

            document.getElementById(revHiddenViewId).innerHTML = revInlineFormComposeMessage;
        });
    });

    window.revSetInterval(revCallTab_Id, async () => {
        document.getElementById(revCallTab_Id).addEventListener("click", async function () {
            await window.revGetLoadedPageView("revItemObjectViewOngoingCall", 555, (revLoadedPageView) => {
                window.revGetElementById(revHiddenViewId).innerHTML = revLoadedPageView;
            });
        });
    });

    window.revSetInterval(revVideoCallTab_Id, () => {
        document.getElementById(revVideoCallTab_Id).addEventListener("click", function () {
            window.revGetLoadedPageView("revPageViewVideoCall", revVarArgs, (revLoadedPageView) => {
                window.revGetElementById(revHiddenViewId).innerHTML = revLoadedPageView;

                window.revLoadModules("revPluginModuleSessions", (revScriptModule) => {
                    window.revPluginModuleSessions.revGetLoggedInEntity((revLoggedInEntity) => {
                        let revRemoteVideo_Id = "revRemoteVideo_Id" + window.revGenUniqueId();
                        let revLocalVideo_Id = "revLocalVideo_Id_" + window.revGenUniqueId();

                        let revOngoingVidCallsWrapper = "revOngoingVidCallsWrapper_Id_" + window.revGenUniqueId();
                        let revVidCallEntityLengthId = "revVidCallEntityLength_Id_" + window.revGenUniqueId();
                        let revVidCallEndTabWrapperId = "revVidCallEndTabWrapperId_" + window.revGenUniqueId();
                        let revVidCallEndTabId = "revVidCallEndTab_Id" + window.revGenUniqueId();

                        let revLocalStreamCallback = (revLocalStream) => {
                            window.revSetInterval(revLocalVideo_Id, () => {
                                document.getElementById(revLocalVideo_Id).srcObject = revLocalStream;
                            });
                        };

                        let revRemoteStreamCallback = (e) => {
                            let revSetTimerInterval;

                            window.revSetInterval(revRemoteVideo_Id, () => {
                                document.getElementById(revRemoteVideo_Id).srcObject = e.stream;

                                window.revSetInterval(revVidCallEntityLengthId, () => {
                                    let pad = (val) => {
                                        let valString = val + "";
                                        if (valString.length < 2) {
                                            return "0" + valString;
                                        } else {
                                            return valString;
                                        }
                                    };

                                    let totalSeconds = 0;

                                    revSetTimerInterval = setInterval(() => {
                                        ++totalSeconds;

                                        if (document.getElementById(revVidCallEntityLengthId)) {
                                            document.getElementById(revVidCallEntityLengthId).innerHTML = pad(parseInt(totalSeconds / 60)) + "." + pad(totalSeconds % 60) + " . mins";
                                        }
                                    }, 1000);
                                });
                            });
                        };

                        window.revInitiateVideoCall(revVarArgs, revLocalStreamCallback, revRemoteStreamCallback);

                        let revFullNames = window.revGetMetadataValue(revVarArgs._revInfoEntity._revEntityMetadataList, "rev_entity_full_names_value");
                        if (!revFullNames) revFullNames = "&nbsp; . . . &nbsp;";

                        window.revSetInterval(revVidCallEndTabId, () => {
                            document.getElementById(revVidCallEndTabId).addEventListener("click", (event) => {
                                window.revHangUpVideoCall(revVarArgs);

                                document.getElementById(revRemoteVideo_Id).srcObject = null;
                                document.getElementById(revLocalVideo_Id).srcObject = null;

                                if (revSetTimerInterval) {
                                    clearInterval(revSetTimerInterval);
                                }

                                document.getElementById(revOngoingVidCallsWrapper).innerHTML = "";
                            });
                        });

                        let revEndCallTabArea = `
                        <div id="${revVidCallEndTabWrapperId}" class="revFlexWrapper revVidCallEntityFooter">
                            <div id="${revVidCallEndTabId}" class="revTabLink revVidCallEndTab">End</div>
                            <div class="revVidCallOptionsTab"><div class="revMsgTab"><i class="far fa-envelope"></i></div></div>
                        </div>
                        `;

                        let revLocalVidView = `
                        <div class="revFlexContainer revOngoingVidCallWidgetContainer">
                            <div class="revVidCallHeaderContainer">
                                <div class="revVidCallEntityNames">. . .</div>
                                <div class="revVidCallEntityLength"> - </div>
                            </div>
                            <div class="revFlexWrapper"><video id="${revLocalVideo_Id}" class="revVideoSmall" autoplay></video></div>
                        </div>
                        `;

                        let revRemoteVidView = `
                        <div class="revFlexContainer revOngoingVidCallWidgetContainer">
                            <div class="revVidCallHeaderContainer">
                                <div class="revVidCallEntityNames">${revFullNames}</div>
                                <div id="${revVidCallEntityLengthId}" class="revVidCallEntityLength"> - </div>
                            </div>
                            <div class="revFlexWrapper"><video id="${revRemoteVideo_Id}" class="revVideoSmall" autoplay></video></div>
                            ${revEndCallTabArea}
                        </div>
                        `;

                        document.getElementById(revHiddenViewId).innerHTML = `<div id="${revOngoingVidCallsWrapper}" class="revFlexWrapper">${revLocalVidView}${revRemoteVidView}</div>`;
                    });
                });
            });
        });
    });

    let revView = `
    <div class="revFlexWrapper revContactWrapper">
        <div class="revFlexWrapper revContactUserIconWrapper"><span><i class="fa fa-user fa-lg"></i></span></div>

        <div class="revFlexContainer revContactCenterContainer">
            <div class="revFlexContainer revContactsDetailsContainer">
                <div class="revIMUserFullNamesStyle">${revFullNames} <span class="revTimeCreatedStyle">Last seen 11/26/19 - 10:01AM</span></div>
                <div class="revIMUsercctNumberStyle">+254 ${revVarArgs._remoteRevEntityGUID}</div>
            </div>

            <div id="${revHiddenViewId}" class="revFlexContainer"></div>

            <div class="revFlexWrapper revContactOptionsWrapper">
                <div class="revFlexWrapper revOptionsTabsWrapper">
                    <span id="${revMessagesTab_Id}" class="revContactOptionTab"><i class="fas fa-envelope fa-lg"></i></span>
                    <span id="${revCallTab_Id}" class="revContactOptionTab"><i class="fas fa-tty fa-lg"></i></span>
                    <span id="${revVideoCallTab_Id}" class="revContactOptionTab"><i class="fas fa-video fa-lg"></i></span>
                    <span class="revContactOptionTab"><i class="fas fa-list fa-lg"></i></span>
                </div>
            </div>

            <div id="${revRecentlySentMsgs_Id}" class="revFlexContainer revRecentlySentMsgsContainer"></div>
        </div>
    </div>
    `;

    return revView;
};

module.exports.revView = revView;
