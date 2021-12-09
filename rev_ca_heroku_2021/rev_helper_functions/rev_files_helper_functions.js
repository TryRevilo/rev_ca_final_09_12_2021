var https = require('https');
var fs = require('fs');

var revGetFileNameFromURL = (revURL) => {
    let revFilename = revURL.split('/').pop();
    return revFilename;
}

var revSaveRemoteFileToDisk = (revSrcUrl, revDestPath) => {
    let file = fs.createWriteStream(revDestPath);
    https.get(revSrcUrl, function (response) {
        response.pipe(file);
    });
}

module.exports.revGetFileNameFromURL = revGetFileNameFromURL;
module.exports.revSaveRemoteFileToDisk = revSaveRemoteFileToDisk;