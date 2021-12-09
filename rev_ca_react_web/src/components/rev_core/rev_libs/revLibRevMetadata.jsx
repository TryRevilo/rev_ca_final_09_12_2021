var revGetMetadataValue = (revEntityMetadataList, revMetadataName) => {
    let revMetadataValue;

    for (let i = 0; i < revEntityMetadataList.length; i++) {
        let revIsinfo = revEntityMetadataList[i]._revMetadataName.localeCompare(revMetadataName);

        if (revIsinfo == 0) {
            revMetadataValue = revEntityMetadataList[i]._metadataValue;
        }
    }

    return revMetadataValue;
};

export { revGetMetadataValue };