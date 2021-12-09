var revView = async (revVarArgs) => {
    if (!revVarArgs) return;

    let revHiddenViewId = "revHiddenView_" + window.revGenUniqueId();
    let revMessagesTabId = "revMessagesTab_" + window.revGenUniqueId();
    let revCallTabId = "revCallTabId_" + window.revGenUniqueId();
    let revVideoCallTabId = "revVideoCallTabId_" + window.revGenUniqueId();
    let revRecentlySentMsgsId = "revRecentlySentMsgs_" + window.revGenUniqueId();

    let revFullNames = revVarArgs.names[0].displayName;
    if (!revFullNames) revFullNames = "&nbsp; . . . &nbsp;";

    let revContactUpdateTime = revVarArgs.metadata.sources[0].updateTime;

    let revPhoneNumMobile = revVarArgs.phoneNumbers[0].value;

    window.revSetInterval(revCallTabId, async () => {
        document.getElementById(revCallTabId).addEventListener("click", async function () {
            await window.revGetLoadedPageView("revItemObjectViewOngoingCall", 555, (revLoadedPageView) => {
                window.revGetElementById(revHiddenViewId).innerHTML = revLoadedPageView;
            });
        });
    });

    window.revSetInterval(revVideoCallTabId, async () => {
        document.getElementById(revVideoCallTabId).addEventListener("click", async function () {
            await window.revGetLoadedPageView("revPageViewVideoCall", revVarArgs, async (revLoadedPageView) => {
                window.revGetElementById(revHiddenViewId).innerHTML = revLoadedPageView;

                await window.revLoadModules("revPluginModuleSessions", async (revScriptModule) => {
                    await window.revPluginModuleSessions.revGetLoggedInEntity((revLoggedInEntity) => {
                        window.revInitiateVideoCall(revHiddenViewId, revVarArgs);
                    });
                });
            });
        });
    });

    let revView = `
    <div class="revFlexWrapper revGoogleImportedContactWrapper">
        <div class="revFlexWrapper revContactUserIconWrapper"><span><i class="fa fa-user fa-lg"></i></span></div>

        <div class="revFlexContainer revContactCenterContainer">
            <div class="revFlexContainer revContactsDetailsContainer">
                <div class="revIMUserFullNamesStyle">${revFullNames} <span class="revTimeCreatedStyle">Last UpDAted ${revContactUpdateTime}</span></div>
                <div class="revIMUsercctNumberStyle">+254 ${revPhoneNumMobile}</div>
            </div>

            <div id="${revHiddenViewId}" class="revFlexContainer"></div>

            <div class="revFlexWrapper revContactOptionsWrapper">
                <div class="revFlexWrapper revOptionsTabsWrapper">
                    <span id="${revMessagesTabId}" class="revContactOptionTab"><i class="fas fa-envelope fa-lg"></i></span>
                    <span id="${revCallTabId}" class="revContactOptionTab"><i class="fas fa-tty fa-lg"></i></span>
                    <span id="${revVideoCallTabId}" class="revContactOptionTab"><i class="fas fa-video fa-lg"></i></span>
                    <span class="revContactOptionTab"><i class="fas fa-list fa-lg"></i></span>
                </div>
            </div>

            <div id="${revRecentlySentMsgsId}" class="revRecentlySentMsgs"></div>
        </div>
    </div>
    `;

    return revView;
};

module.exports.revView = revView;
