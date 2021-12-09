(function (revPluginModuleVideoCaptionGenerator, $, undefined) {
    /**
     * Takes a screenshot from video.
     * @param revVideoEl {Element} Video element
     * @param scale {Number} Screenshot scale (default = 1)
     * @returns {Element} Screenshot revImage element
     */
    revPluginModuleVideoCaptionGenerator.revGetScreenshot = (revVideoEl, scale) => {
        scale = scale || 1;

        const revCanvas = document.createElement("canvas");
        revCanvas.width = revVideoEl.clientWidth * scale;
        revCanvas.height = revVideoEl.clientHeight * scale;
        revCanvas.getContext("2d").drawImage(revVideoEl, 0, 0, revCanvas.width, revCanvas.height);

        const revImage = new Image();
        revImage.src = revCanvas.toDataURL();

        return revImage;
    };

    revPluginModuleVideoCaptionGenerator.revVideoPausedDisplay = (revFile, revCallback) => {
        let revReader = new FileReader();

        revReader.onload = function () {
            let revBlob = new Blob([revReader.result], { type: revFile.type });
            let revVidUrl = URL.createObjectURL(revBlob);

            let revVideoId = "revVideo_" + window.revGenUniqueId();
            let revVideo = document.createElement("video");
            revVideo.id = revVideoId;
            revVideo.classList.add("thumb");

            let timeupdate = function () {
                revVideo.removeEventListener("timeupdate", timeupdate);
                revVideo.pause();
            };

            revVideo.addEventListener("loadeddata", function () {
                revVideo.removeEventListener("timeupdate", timeupdate);
                revVideo.pause();
            });

            revVideo.addEventListener("timeupdate", timeupdate);
            revVideo.preload = "metadata";
            revVideo.src = revVidUrl;

            // Load revVideo in Safari / IE11
            revVideo.muted = true;
            revVideo.playsInline = true;
            revVideo.controls = true;
            revVideo.play();

            revCallback(revVideo);
        };

        revReader.readAsArrayBuffer(revFile);
    };

    revPluginModuleVideoCaptionGenerator.revVideoLocalFileCaption = async (revFile, revImgStyle) => {
        let revReader = new FileReader();

        let revLocalVideoCaptionPromise = new Promise((resolve, reject) => {
            revReader.onload = function (e) {
                // The file reader gives us an ArrayBuffer:
                let buffer = e.target.result;

                // We have to convert the buffer to a blob:
                let videoBlob = new Blob([new Uint8Array(buffer)], { type: "video/mp4" });

                // The blob gives us a URL to the video file:
                let revVidUrl = window.URL.createObjectURL(videoBlob);

                let revVideoId = "revVideo_" + window.revGenUniqueId();
                let revVideo = document.createElement("video");
                revVideo.id = revVideoId;

                let timeupdate = function () {
                    revVideo.removeEventListener("timeupdate", timeupdate);
                    revVideo.pause();

                    var canvas = document.createElement("canvas");
                    var ctx = canvas.getContext("2d");
                    // if you want to preview the captured image,
                    // attach the canvas to the DOM somewhere you can see it.

                    //draw image to canvas. scale to target dimensions
                    ctx.drawImage(revVideo, 0, 0, canvas.width, canvas.height);

                    //convert to desired file format
                    var dataURI = canvas.toDataURL("image/jpeg"); // can also use 'image/png'
                    let revImg = window.revReadFileToImageFromURL(dataURI, revImgStyle);

                    resolve(revImg);
                };

                revVideo.addEventListener("timeupdate", timeupdate);
                revVideo.preload = "metadata";
                revVideo.src = revVidUrl;

                // Load revVideo in Safari / IE11
                revVideo.muted = true;
                revVideo.playsInline = true;
                revVideo.controls = true;
                revVideo.play();
            };

            revReader.readAsArrayBuffer(revFile);
        });

        let revLocalVideoCaption = await revLocalVideoCaptionPromise;

        return revLocalVideoCaption;
    };

    revPluginModuleVideoCaptionGenerator.revVideoLocalCaptionSeeker = async (revFile, seekTo = 0.0) => {
        console.log("getting video cover for file: ", revFile);
        let revVideoIconPromise = new Promise((resolve, reject) => {
            // load the file to a video player
            const videoPlayer = document.createElement("video");
            videoPlayer.setAttribute("src", URL.createObjectURL(revFile));
            videoPlayer.load();
            videoPlayer.addEventListener("error", (ex) => {
                reject("error when loading video file", ex);
            });
            // load metadata of the video to get video duration and dimensions
            videoPlayer.addEventListener("loadedmetadata", () => {
                // seek to user defined timestamp (in seconds) if possible
                if (videoPlayer.duration < seekTo) {
                    reject("video is too short.");
                    return;
                }
                // delay seeking or else 'seeked' event won't fire on Safari
                setTimeout(() => {
                    videoPlayer.currentTime = seekTo;
                }, 200);
                // extract video thumbnail once seeking is complete
                videoPlayer.addEventListener("seeked", () => {
                    console.log("video is now paused at %ss.", seekTo);
                    // define a canvas to have the same dimension as the video
                    const canvas = document.createElement("canvas");
                    canvas.width = videoPlayer.videoWidth;
                    canvas.height = videoPlayer.videoHeight;
                    // draw the video frame to canvas
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
                    // return the canvas image as a blob
                    ctx.canvas.toBlob(
                        (blob) => {
                            resolve(blob);
                        },
                        "image/jpeg",
                        0.75 /* quality */
                    );

                    //convert to desired file format
                    var dataURI = canvas.toDataURL("image/jpeg"); // can also use 'image/png'
                    let revImg = window.revReadFileToImageFromURL(dataURI, "revListingUserIconBlock");

                    resolve(revImg);
                });
            });
        });

        let revVideoIcon = await revVideoIconPromise;

        return revVideoIcon;
    };

    revPluginModuleVideoCaptionGenerator.revRemoteVideoCaption = async (revVidUrl) => {
        let revVideoId = "revVideo_" + window.revGenUniqueId();
        let revVideo = document.createElement("video");
        revVideo.id = revVideoId;

        let revVideoIconPromise = new Promise((resolve, reject) => {
            let timeupdate = function () {
                revVideo.removeEventListener("timeupdate", timeupdate);
                revVideo.pause();

                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                // if you want to preview the captured image,
                // attach the canvas to the DOM somewhere you can see it.

                //draw image to canvas. scale to target dimensions
                ctx.drawImage(revVideo, 0, 0, canvas.width, canvas.height);

                //convert to desired file format
                var dataURI = canvas.toDataURL("image/jpeg"); // can also use 'image/png'
                let revImg = window.revReadFileToImageFromURL(dataURI, "revListingUserIconBlock");

                resolve(revImg);
            };

            revVideo.addEventListener("timeupdate", timeupdate);
            revVideo.preload = "metadata";
            revVideo.src = revVidUrl;

            // Load revVideo in Safari / IE11
            revVideo.muted = true;
            revVideo.playsInline = true;
            revVideo.controls = true;
            revVideo.play();
        });

        let revVideoIcon = await revVideoIconPromise;

        return revVideoIcon;
    };

    /** - - - - - - - - - */

    revPluginModuleVideoCaptionGenerator.revVideoURLCaptionSeeker = async (revVidUrl, seekTo = 0.0) => {
        let revVideoIconPromise = new Promise((resolve, reject) => {
            let revVideoId = "revVideo_" + window.revGenUniqueId();

            // load the file to a video player
            const videoPlayer = document.createElement("video");
            videoPlayer.id = revVideoId;
            videoPlayer.setAttribute("src", revVidUrl);
            videoPlayer.setAttribute("type", "video/mp4");
            videoPlayer.load();
            videoPlayer.addEventListener("error", (ex) => {
                reject("error when loading video file", ex);
            });

            // load metadata of the video to get video duration and dimensions
            videoPlayer.addEventListener("loadedmetadata", () => {
                // seek to user defined timestamp (in seconds) if possible
                if (videoPlayer.duration < seekTo) {
                    reject("video is too short.");
                    return;
                }

                let revDuration = 0.0;

                if (seekTo < 5) {
                    revDuration = videoPlayer.duration;
                    revDuration = revDuration * 0.1;
                } else {
                    revDuration = seekTo;
                }

                // delay seeking or else 'seeked' event won't fire on Safari
                setTimeout(() => {
                    videoPlayer.currentTime = revDuration;
                }, 200);
                // extract video thumbnail once seeking is complete
                videoPlayer.addEventListener("seeked", () => {
                    // define a canvas to have the same dimension as the video
                    const canvas = document.createElement("canvas");
                    canvas.width = videoPlayer.videoWidth;
                    canvas.height = videoPlayer.videoHeight;
                    // draw the video frame to canvas
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);

                    //convert to desired file format
                    var dataURI = canvas.toDataURL("image/jpeg"); // can also use 'image/png'
                    let revImg = window.revReadFileToImageFromURL(dataURI, "revListingUserIconBlock");

                    resolve(revImg);
                });
            });
        });

        let revVideoIcon = await revVideoIconPromise;

        return revVideoIcon;
    };

    revPluginModuleVideoCaptionGenerator.revCreateVideoCaption = async (revVidEntity, revCallback) => {
        let revRemotePath = window.revGetMetadataValue(revVidEntity._revEntityChildrenList[0]._revEntityMetadataList, "rev_remote_file_name");
        revRemotePath = window.REV_UPLOAD_FILES_DIR_PATH + "/" + revRemotePath;

        let revVidCaptionView;

        try {
            let revVidCaption = await window.revPluginModuleVideoCaptionGenerator.revVideoURLCaptionSeeker(revRemotePath);

            if (revVidCaption) {
                revVidCaptionView = revVidCaption;
            }
        } catch (error) {
            console.log("revPluginModuleVideoCaptionGenerator.js -> ERR -> revVidCaptionView -> " + error);
        }

        if (revCallback) {
            revCallback(revVidCaptionView);
        } else return revVidCaptionView;
    };
})((window.revPluginModuleVideoCaptionGenerator = window.revPluginModuleVideoCaptionGenerator || {}), jQuery);
