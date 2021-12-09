/**
 * Takes a screenshot from video.
 * @param revVideoEl {Element} Video element
 * @param scale {Number} Screenshot scale (default = 1)
 * @returns {Element} Screenshot revImage element
 */
var revGetScreenshot = (revVideoEl, scale) => {
    scale = scale || 1;

    const revCanvas = document.createElement("canvas");
    revCanvas.width = revVideoEl.clientWidth * scale;
    revCanvas.height = revVideoEl.clientHeight * scale;
    revCanvas.getContext('2d').drawImage(revVideoEl, 0, 0, revCanvas.width, revCanvas.height);

    const revImage = new Image()
    revImage.src = revCanvas.toDataURL();

    return revImage;
}

var revVideoPausedDisplay = (revFile, revCallback) => {
    let revReader = new FileReader();

    revReader.onload = function () {
        let revBlob = new Blob([revReader.result], { type: revFile.type });
        let revVidUrl = URL.createObjectURL(revBlob);

        let revVideoId = 'revVideo_' + window.revGenUniqueId();
        let revVideo = document.createElement('video');
        revVideo.id = revVideoId;
        revVideo.classList.add('thumb');

        let timeupdate = function () {
            revVideo.removeEventListener('timeupdate', timeupdate);
            revVideo.pause();
        };

        revVideo.addEventListener('loadeddata', function () {
            revVideo.removeEventListener('timeupdate', timeupdate);
            revVideo.pause();
        });

        revVideo.addEventListener('timeupdate', timeupdate);
        revVideo.preload = 'metadata';
        revVideo.src = revVidUrl;

        // Load revVideo in Safari / IE11
        revVideo.muted = true;
        revVideo.playsInline = true;
        revVideo.controls = true;
        revVideo.play();

        revCallback(revVideo);
    }

    revReader.readAsArrayBuffer(revFile);
}

var revVideoLocalFileCaption = async (revFile, revImgStyle) => {
    let revReader = new FileReader();

    let revLocalVideoCaptionPromise = new Promise((resolve, reject) => {
        revReader.onload = function (e) {
            // The file reader gives us an ArrayBuffer:
            let buffer = e.target.result;

            // We have to convert the buffer to a blob:
            let videoBlob = new Blob([new Uint8Array(buffer)], { type: 'video/mp4' });

            // The blob gives us a URL to the video file:
            let revVidUrl = window.URL.createObjectURL(videoBlob);

            let revVideoId = 'revVideo_' + window.revGenUniqueId();
            let revVideo = document.createElement('video');
            revVideo.id = revVideoId;

            let timeupdate = function () {
                revVideo.removeEventListener('timeupdate', timeupdate);
                revVideo.pause();

                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                // if you want to preview the captured image,
                // attach the canvas to the DOM somewhere you can see it.

                //draw image to canvas. scale to target dimensions
                ctx.drawImage(revVideo, 0, 0, canvas.width, canvas.height);

                //convert to desired file format
                var dataURI = canvas.toDataURL('image/jpeg'); // can also use 'image/png'
                let revImg = window.revReadFileToImageFromURL(dataURI, revImgStyle);

                resolve(revImg);
            };

            revVideo.addEventListener('timeupdate', timeupdate);
            revVideo.preload = 'metadata';
            revVideo.src = revVidUrl;

            // Load revVideo in Safari / IE11
            revVideo.muted = true;
            revVideo.playsInline = true;
            revVideo.controls = true;
            revVideo.play();
        }

        revReader.readAsArrayBuffer(revFile);
    });

    let revLocalVideoCaption = await revLocalVideoCaptionPromise;

    return revLocalVideoCaption;
}

var revRemoteVideoCaption = async (revVidUrl) => {
    let revVideoId = 'revVideo_' + window.revGenUniqueId();
    let revVideo = document.createElement('video');
    revVideo.id = revVideoId;

    let revVideoIconPromise = new Promise((resolve, reject) => {
        let timeupdate = function () {
            revVideo.removeEventListener('timeupdate', timeupdate);
            revVideo.pause();

            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            // if you want to preview the captured image,
            // attach the canvas to the DOM somewhere you can see it.

            //draw image to canvas. scale to target dimensions
            ctx.drawImage(revVideo, 0, 0, canvas.width, canvas.height);

            //convert to desired file format
            var dataURI = canvas.toDataURL('image/jpeg'); // can also use 'image/png'
            let revImg = window.revReadFileToImageFromURL(dataURI, 'revListingIconCurvedSmall');

            resolve(revImg);
        };

        revVideo.addEventListener('timeupdate', timeupdate);
        revVideo.preload = 'metadata';
        revVideo.src = revVidUrl;

        // Load revVideo in Safari / IE11
        revVideo.muted = true;
        revVideo.playsInline = true;
        revVideo.controls = true;
        revVideo.play();
    });

    let revVideoIcon = await revVideoIconPromise;

    return revVideoIcon;
}