var revPageViewWidget = async (revVarArgs) => {

    console.log('>>>>> CALL!!!');

    let revRetPageView = async () => {
        return `HELLO WORLD STORES!`;
    };

    return await revRetPageView();
}

module.exports.revPageViewWidget = revPageViewWidget;