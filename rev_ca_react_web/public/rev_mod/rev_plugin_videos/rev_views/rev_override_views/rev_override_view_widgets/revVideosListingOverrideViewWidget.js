var revPluginOverrideViewWidget = (revVarArgs) => {
    if (!revVarArgs || !revVarArgs._revEntityChildrenList) return;

    let revTimelineVidsListingId = "revTimelineVidListing_" + window.revGenUniqueId();

    let revDuration_Id = "revDuration_Id_" + window.revGenUniqueId();
    let revPlayStatus_Id = "revPlayStatus_Id_" + window.revGenUniqueId();
    let revPlayStatusTxt_Id = "revPlayStatusTxt_Id_" + window.revGenUniqueId();
    let revPlayed_Id = "revPlayed_Id_" + window.revGenUniqueId();

    let revPlayVid = (revVidsAlbum) => {
        if (!revVidsAlbum) {
            return;
        }

        window.revSetInterval(revTimelineVidsListingId, () => {
            revVidsAlbum = revVidsAlbum._revEntityChildrenList;

            let revVidItem = revVidsAlbum[0];

            if (!revVidItem) {
                return;
            }

            let revVidItem_Id = "revVidItem_Id_" + window.revGenUniqueId();

            let revRemotePath = revGetMetadataValue(revVidItem._revEntityMetadataList, "rev_remote_file_name");
            revRemotePath = REV_UPLOAD_FILES_DIR_PATH + "/" + revRemotePath;

            let revVid = document.createElement("video");
            revVid.id = revVidItem_Id;
            revVid.src = revRemotePath;

            // revVid.preload = "metadata";
            revVid.setAttribute("type", "video/mp4");
            revVid.controls = true;
            // revVid.crossOrigin = 'anonymous';
            revVid.width = "100%";
            revVid.classList.add("revVidItemStyle");

            // Load revVid in Safari / IE11
            revVid.muted = true;
            revVid.playsInline = true;

            let revVidView = () => {
                // let revVidsAlbum = revVarArgs.revEntity;
                let revVidsAlbumGUID = revVarArgs._remoteRevEntityGUID;

                window.revSetInterval(revVidItem_Id, () => {
                    let revVidCurrentTime = document.getElementById(revVidItem_Id).currentTime;
                    console.log(">>> UPDATE : " + revVidCurrentTime);

                    document.getElementById(revVidItem_Id).onplay = async (event) => {
                        console.log("revVarArgs : " + JSON.stringify(revVarArgs));

                        try {
                            let revURL = `${window.REV_SITE_BASE_PATH}/rev_api?rev_logged_in_entity_guid=${window.REV_LOGGED_IN_ENTITY_GUID}&rev_vid_entity_guid=${revVidsAlbumGUID}&revPluginHookContextsRemoteArr=revHookRemoteHandler_VideoPlayCount`;

                            let revRetData = await window.revGetServerData_JSON_Async(revURL);

                            console.log("revRetData : " + JSON.stringify(revRetData));
                        } catch (error) {
                            console.log("ERR -> revLockTransPhraseTab -> !revRetData" + error);
                        }
                    };
                });
            };

            let timeStarted = -1;
            let timePlayed = 0;
            let duration = 0;

            window.revSetInterval(revVidItem_Id, () => {
                let getDuration = () => {
                    duration = document.getElementById(revVidItem_Id).duration;
                    document.getElementById(revDuration_Id).appendChild(new Text(Math.round(duration) + ""));
                };

                // If video metadata is laoded get duration
                if (document.getElementById(revVidItem_Id).readyState > 0) {
                    getDuration.call(document.getElementById(revVidItem_Id));
                }
                //If metadata not loaded, use event to get it
                else {
                    document.getElementById(revVidItem_Id).addEventListener("loadedmetadata", getDuration);
                }

                // remember time user started the video
                let videoStartedPlaying = () => {
                    timeStarted = new Date().getTime() / 1000;
                };

                let videoStoppedPlaying = (event) => {
                    // Start time less then zero means stop event was fired vidout start event
                    if (timeStarted > 0) {
                        let playedFor = new Date().getTime() / 1000 - timeStarted;
                        timeStarted = -1;
                        // add the new ammount of seconds played
                        timePlayed += playedFor;
                    }

                    document.getElementById(revPlayed_Id).innerHTML = Math.round(timePlayed) + "";

                    // Count as complete only if end of video was reached
                    if (event.type == "ended") {
                        document.getElementById(revPlayStatus_Id).classList.replace("revPlayStatusIncomplete", "revPlayStatusComplete");
                        document.getElementById(revPlayStatusTxt_Id).innerHTML = "COMPLETE";

                        console.log("timePlayed : " + timePlayed);

                        document.getElementById(revPlayed_Id).innerHTML = Math.round(timePlayed) + " played";
                    }
                };

                document.getElementById(revVidItem_Id).onplay = (event) => {
                    videoStartedPlaying(event);
                };

                let revIsVidLengthPassed = false;

                document.getElementById(revVidItem_Id).ontimeupdate = function () {
                    if (!revIsVidLengthPassed) {
                        revIsVidLengthPassed = true;

                        revVidView();
                    }
                };

                document.getElementById(revVidItem_Id).addEventListener("playing", (event) => {
                    videoStartedPlaying(event);
                });

                document.getElementById(revVidItem_Id).addEventListener("pause", (event) => {
                    videoStoppedPlaying(event);
                });

                document.getElementById(revVidItem_Id).addEventListener("ended", (event) => {
                    videoStoppedPlaying(event);
                });
            });

            document.getElementById(revTimelineVidsListingId).innerHTML = window.revNodeToString(revVid);
        });
    };

    let revDrawVideo = (revVidsAlbum) => {
        revPlayVid(revVidsAlbum);

        return `
            <div class="revFlexContainer revVideoContainer">
                <div id="${revTimelineVidsListingId}" class="revVideoWrapperStyle"></div>

                <div id="${revPlayStatus_Id}" class="revPlayStatus">
                    <span>Play status: </span>
                    <span id="${revPlayStatusTxt_Id}" class="revPlayStatusIncomplete">INCOMPLETE</span>
                    <br />
                </div>
                <div>
                    <span id="${revPlayed_Id}">0</span> seconds out of 
                    <span id="${revDuration_Id}"></span> seconds. (only updates when the video pauses)
                </div>
            </div>
        `;
    };

    return revDrawVideo(revVarArgs);
};

module.exports.revPluginOverrideViewWidget = revPluginOverrideViewWidget;
