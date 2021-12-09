var revFiles = [];
var names = [];

var selectedFiles = (input) => {
    if (!input) return null;

    let itemsLength = input.files.length;

    for (let i = 0; i < itemsLength; i++) {
        if ((input.files[i]) && !(names.includes(input.files[i].name))) {
            names.push(input.files[i].name);
            revFiles.push(input.files[i]);
        }
    }

    return revFiles;
}

var imagesPreview = (revSelectedFiles, placeToInsertImagePreview_, callback) => {
    window.revSetInterval(placeToInsertImagePreview_, () => {
        let placeToInsertImagePreview = document.getElementById(placeToInsertImagePreview_);

        placeToInsertImagePreview.innerHTML = '';

        if (revSelectedFiles === undefined || revSelectedFiles.length == 0) return;

        let revViewsArr = [];

        for (let i = 0; i < revSelectedFiles.length; i++) {
            let revFile = revSelectedFiles[i];

            if (!revFile) continue;

            let revImageItemContainerId = "revImageItemContainerId_" + i;
            let revDeleteImageItemId = "revDeleteImageItemId_" + i;
            let revImageId = 'revImageId_' + i;
            let revImageWrapperId = 'revImageWrapperId_' + i;

            let revImageItemContainer = `
                    <div id="${revImageItemContainerId}" class="rev-image-item-container">
                        <div id="${revDeleteImageItemId}" class="rev-delete-image-item"><span><i class="far fa-trash-alt"></i></span></div>
                        <div id="${revImageWrapperId}" class="revImageWrapper"></div>
                    </div>
                `;

            let revFileType = window.revGetFileType(revFile);
            let revFileTypes = ['jpg', 'jpeg']

            window.revSetInterval(revImageWrapperId, async () => {
                if (revFileTypes.includes(revFileType)) {
                    let revImage = window.revReadFileToImageFromPath(revFile, 'thumb', revImageId);
                    document.getElementById(revImageWrapperId).innerHTML = revImage;
                } else {
                    let revLocalVideoCaption = await window.revVideoLocalFileCaption(revFile, 'thumb');
                    document.getElementById(revImageWrapperId).innerHTML = revLocalVideoCaption;
                }
            });

            window.revSetInterval(revDeleteImageItemId, () => {
                document.getElementById(revDeleteImageItemId).addEventListener('click', function () {
                    document.getElementById(revImageItemContainerId).remove();

                    let pathsString = names[i];

                    if (pathsString !== "") {
                        names = names.splice(i, 1);
                        revFiles = revFiles.splice(i, 1);

                        callback(revFiles);
                    }
                });
            });

            revViewsArr.push(revImageItemContainer);
        }

        placeToInsertImagePreview.innerHTML = `<div class="revSelectedMediaWrapper">${revViewsArr.join('')}</div>`;
    });
};