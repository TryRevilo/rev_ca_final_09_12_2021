var revPageViewWidget = async (revVarArgs) => {

    let revItemsListView = () => {
        let revArr = [];
        let i = 0;

        while (i < 42) {
            i++;
            revArr.push(i);
        }

        let revPeopleIcons = revArr.map((val) => {
            return `
                    <div class="revUserIconStyle"><i class="fa fa-user"></i></div>
                `;
        });

        let revItemContainer = `
            <div class="revItemContainer">
                <div class="revListItemsContainer">${revPeopleIcons.join('')}</div>
                <div class="revMoreReccomendationsStyle">+255 moRE pEopLE you mAy kNow</div>
            </div>
        `;

        return revItemContainer;
    };

    return revItemsListView();
}

module.exports.revPageViewWidget = revPageViewWidget;