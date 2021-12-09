var selectedFiles = (revFiles) => {
    if (!revFiles) return null;

    let names = [];

    let itemsLength = revFiles.length;

    if (!itemsLength) length = 0;

    for (let i = 0; i < itemsLength; i++) {
        if ((revFiles[i]) && !(names.includes(revFiles[i].name))) {
            names.push(revFiles.name);
        }
    }

    return names;
}

var imagesPreview = function (revFiles, placeToInsertImagePreview) {
    let names = selectedFiles(revFiles);

    if (names === undefined || names.length == 0) {
        return;
    }

    let revImgsArr = [];

    for (let i = 0; i < revFiles.length; i++) {
        let revImageItemContainer_Id = 'revImageItemContainer_Id_' + window.revGenUniqueId();
        let revDelTab_Id = 'revDelTab_Id_' + window.revGenUniqueId();
        let revImgItem_Id = 'revImgItem_Id_' + window.revGenUniqueId();

        let reader = new FileReader();

        reader.onload = function (event) {
            window.revSetInterval(revImgItem_Id, () => {
                document.getElementById(revImgItem_Id).src = event.target.result
            });

            window.revSetInterval(revDelTab_Id, () => {
                document.getElementById(revDelTab_Id).addEventListener('click', (event) => {
                    document.getElementById(revImageItemContainer_Id).remove();

                    let pathsString = names[i];

                    if (pathsString !== "") {
                        delete names[i];
                        console.log('names.length : ' + names.length);
                    }
                });
            });
        }

        reader.readAsDataURL(revFiles[i]);

        let revImagesWrapper = `
        <div id="${revImageItemContainer_Id}" class="revFlexContainer revSelectedImageItemPreviewContainer">
            <div id="${revDelTab_Id}" class="revTabLink revFontSiteRedTxtColor revFontSizeLarge revFontSizeLarge revDeleteImageItem"><i class="far fa-trash-alt"></i></diV>
            <img id="${revImgItem_Id}" class="thumb" >
        </div>
        `;

        revImgsArr.push(revImagesWrapper);
    }

    document.getElementById(placeToInsertImagePreview).innerHTML = `<div class="revFlexWrapper revSelectedFilesWrapper">${revImgsArr.join('')}</div>`;
};
