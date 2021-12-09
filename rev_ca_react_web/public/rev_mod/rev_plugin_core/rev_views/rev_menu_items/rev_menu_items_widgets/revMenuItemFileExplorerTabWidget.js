var revMenuItemWidget = (revVarArgs) => {
  let revFilesSelectedCallback = revVarArgs.revFilesSelectedCallback;
  let revSelectFileId = "revSelectFileId_" + window.revGenUniqueId();

  let revSelectFileText = "";

  if (revVarArgs.revSelectFileText) revSelectFileText = `<div class="revFontSiteBlueTxtColor revFontSizeNormal revEntityIconText">${revVarArgs.revSelectFileText}</div>`;

  window.revSetInterval(revSelectFileId, () => {
    document.getElementById(revSelectFileId).addEventListener("change", function () {
      revFilesSelectedCallback(document.getElementById(revSelectFileId).files);
    });
  });

  return `
    <div class="revTabLink revFlexWrapper revSelectFileWrapper">
        <input type="file" name="upload" id="${revSelectFileId}" class="revTabLink" label="sELEcT" multiple=true >
        ${revSelectFileText}
        <div class="revTabLink revUploadTab"><i class="fa fa-upload"></i></div>
    </div>
    `;
};

module.exports.revMenuItemWidget = revMenuItemWidget;
