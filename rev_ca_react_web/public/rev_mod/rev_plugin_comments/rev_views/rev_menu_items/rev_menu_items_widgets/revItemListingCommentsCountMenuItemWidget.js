var revMenuItemWidget = async (revVarArgs) => {
    if (!revVarArgs) return;

    let revTotComments = 0;

    if (revVarArgs.revVarArgsData) {
        let revVarArgsData = revVarArgs.revVarArgsData;
        let revTotCommentsCount = revVarArgsData.revTotCommentsCount;

        if (revTotCommentsCount) {
            revTotComments = revTotCommentsCount;
        }
    }

    return `
        <div class="revCommentsCounter">
            <span class="revItemOptionsIcon"><i class="far fa-comments"></i></span>
            <span class="revItemOptionsText"> ${revTotComments} </span>
        </div>
        `;
}

module.exports.revMenuItemWidget = revMenuItemWidget;