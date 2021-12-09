var revMenuItemWidget = (revVarArgs) => {
    if (!revVarArgs || !revVarArgs.revId || !revVarArgs.revFilesSelectedCallback) return 'ERR revHiddenMenuItemFileExplorerTabWidget';

    let revId = 'upload_' + revVarArgs.revId;
    let revTab = revVarArgs.revTab;

    let revFileMulti = revVarArgs.revFileMulti;

    if (!revFileMulti) revFileMulti = false;

    let revFilesSelectedCallback = revVarArgs.revFilesSelectedCallback;

    window.revSetInterval(revId, () => {
        document.getElementById(revId).addEventListener('change', function () {
            revFilesSelectedCallback(document.getElementById(revId).files);
        });
    });

    return `
        <div class="revTabLink revFlexWrapper revHiddenSelectFileWrapper">
            <input type="file" name="upload" id="${revId}" class="revTabLink" label="sELEcT" multiple=true >
            ${revTab}
        </div>
    `;
}

module.exports.revMenuItemWidget = revMenuItemWidget;