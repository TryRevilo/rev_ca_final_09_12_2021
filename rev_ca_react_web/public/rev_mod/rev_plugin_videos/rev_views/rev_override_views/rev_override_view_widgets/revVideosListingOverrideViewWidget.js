var revPluginOverrideViewWidget = (revVarArgs) => {
    if (!revVarArgs || !revVarArgs._revEntityChildrenList) return;

    let revTimelineVidsListingId = "revTimelineVidListing_" + window.revGenUniqueId();

    let revPlayVid = (revVidsAlbum) => {
        window.revSetInterval(revTimelineVidsListingId, () => {
            revVidsAlbum = revVidsAlbum._revEntityChildrenList;

            let revVidItem = revVidsAlbum[0];

            if (!revVidItem) return;

            let revVidItemId = "revVidItemId_" + window.revGenUniqueId();

            let revRemotePath = revGetMetadataValue(revVidItem._revEntityMetadataList, "rev_remote_file_name");
            revRemotePath = REV_UPLOAD_FILES_DIR_PATH + "/" + revRemotePath;

            let revVid = document.createElement("video");
            revVid.id = revVidItemId;

            let timeupdate = function () {
                revVid.removeEventListener("timeupdate", timeupdate);
                revVid.pause();
            };

            revVid.addEventListener("timeupdate", timeupdate);
            revVid.preload = "metadata";
            revVid.src = revRemotePath;
            revVid.setAttribute("type", "video/mp4");
            revVid.controls = true;
            // revVid.crossOrigin = 'anonymous';
            revVid.width = "100%";
            revVid.classList.add("revVidItemStyle");

            // Load revVid in Safari / IE11
            revVid.muted = true;
            revVid.playsInline = true;
            revVid.play();

            document.getElementById(revTimelineVidsListingId).innerHTML = window.revNodeToString(revVid);
        });
    };

    let revDrawVideo = (revVidsAlbum) => {
        revPlayVid(revVidsAlbum);

        return `
        <div class="revFlexContainer revVideoContainer">
            <div id=${revTimelineVidsListingId} class="revVideoWrapperStyle"></div>
        </div>
            `;
    };

    return revDrawVideo(revVarArgs);
};

module.exports.revPluginOverrideViewWidget = revPluginOverrideViewWidget;
