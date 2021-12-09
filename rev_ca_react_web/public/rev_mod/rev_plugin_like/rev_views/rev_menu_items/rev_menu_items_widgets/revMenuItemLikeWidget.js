var revMenuItemWidget = async (revVarArgs) => {
    if (!revVarArgs || !revVarArgs._remoteRevEntityGUID || (revVarArgs._remoteRevEntityGUID < 1)) return;

    let revCreateLike = (revVal) => {
        let revFilterArr = {
            filter: []
        };

        let revLike = window.REV_ENTITY_ANNOTATION();
        revLike._revAnnotationNameId = 0;
        revLike._revAnnotationRemoteId = -1;
        revLike._revAnnotationValue = revVal;
        revLike._revUnique = true;
        revLike._revIncremental = true;
        revLike._revAnnotationRemoteEntityGUID = revVarArgs._remoteRevEntityGUID;
        revLike._revAnnRemoteOwnerEntityGUID = window.REV_LOGGED_IN_ENTITY_GUID;

        revFilterArr.filter.push(revLike);

        window.revPostServerData(window.REV_CREATE_NEW_ANN_URL, revFilterArr, (revData) => {
            let revLikesCount = Number(window.revGetElementById(revItemOptionsTextId).innerHTML);
            revVal = Number(revVal);

            if (revData.revUpdateAnnRes && (revData.revUpdateAnnRes > 1)) {
                window.revGetElementById(revItemOptionsTextId).innerHTML = revLikesCount + revVal;
            } else if (revData.revOffsetDels && (revData.revOffsetDels > 0)) {
                if (revVal == -1) {
                    window.revGetElementById(revItemOptionsTextId).innerHTML = revLikesCount - 1;
                } else window.revGetElementById(revItemOptionsTextId).innerHTML = revLikesCount + 1;
            } else if (revData.revDelAnnRes && (revData.revDelAnnRes > 0)) {
                if (revVal == -1) {
                    window.revGetElementById(revItemOptionsTextId).innerHTML = revLikesCount + 1;
                } else window.revGetElementById(revItemOptionsTextId).innerHTML = revLikesCount - 1;
            } else if (revData.revNewAnnPersRes && revData.revNewAnnPersRes.filter && (revData.revNewAnnPersRes.filter.length > 0)) {
                if (revVal == -1) {
                    window.revGetElementById(revItemOptionsTextId).innerHTML = revLikesCount - 1;
                } else window.revGetElementById(revItemOptionsTextId).innerHTML = revLikesCount + 1;
            }
        });
    }

    let revLikeId = 'revLikeId_' + window.revGenUniqueId();
    let revUnlikeId = 'revUnlikeId' + window.revGenUniqueId();
    let revItemOptionsTextId = 'revItemOptionsTextId' + window.revGenUniqueId();

    window.revSetInterval(revLikeId, () => {
        document.getElementById(revLikeId).addEventListener('click', (event) => {
            event.stopPropagation();
            revCreateLike(1);
        });
    });

    window.revSetInterval(revUnlikeId, () => {
        document.getElementById(revUnlikeId).addEventListener('click', (event) => {
            event.stopPropagation();
            revCreateLike(-1);
        });
    });

    let revCalcLikes = 0;
    let revEntityTotLikes = 0;
    let revEntityTotUnLikes = 0;

    if (revVarArgs && revVarArgs.revVarArgsData) {
        if (revVarArgs.revVarArgsData.revEntityTotLikes)
            revEntityTotLikes = revVarArgs.revVarArgsData.revEntityTotLikes;

        if (revVarArgs.revVarArgsData.revEntityTotUnLikes)
            revEntityTotUnLikes = revVarArgs.revVarArgsData.revEntityTotUnLikes;

        revCalcLikes = (Number(revEntityTotLikes) + (-(Number(revEntityTotUnLikes))));
    }

    return `
    <div class="revLikesCount">
        <span id="${revLikeId}" class="revItemOptionsIcon revTabLink"><i class="fas fa-arrow-up"></i></span>
        <span id="${revItemOptionsTextId}" class="revItemOptionsText revTabLink">${revCalcLikes} </span>
        <span id="${revUnlikeId}" class="revItemOptionsIcon revTabLink"><i class="fas fa-arrow-down" ></i></span>
    </div>
        `;
}

module.exports.revMenuItemWidget = revMenuItemWidget;