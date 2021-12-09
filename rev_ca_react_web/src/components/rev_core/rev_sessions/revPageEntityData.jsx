import React, { Component } from 'react';

var REV_PAGE_VIEWS = [];

var revGetPageView_By_RevPageId = (revPageId) => {
    let revPageView;

    for (let i = 0; i < REV_PAGE_VIEWS.length; i++) {
        let revPageItem = REV_PAGE_VIEWS[i];

        if (revPageItem.revPageId.localeCompare(revPageId) == 0) {
            revPageItem = revPageView;
            break;
        }
    }

    return revPageView;
};

var revresetPageView_By_RevPageId = (revPageId, ) => {
    let revPageView;

    for (let i = 0; i < REV_PAGE_VIEWS.length; i++) {
        let revPageItem = REV_PAGE_VIEWS[i];

        console.log((revPageItem.revPageId.localeCompare(revPageId) == 0) + ' >>> revPageItem.revPageId : ' + revPageItem.revPageId + ' revPageId : ' + revPageId)

        if (revPageItem.revPageId.localeCompare(revPageId) == 0) {
            let revStateItem = REV_PAGE_VIEWS[i].revPageStateId;
            REV_PAGE_VIEWS[i].revComponent.setState({ revStateItem: <div>HELLO WOrld</div> });

            break;
        }
    }

    return revPageView;
};

export { REV_PAGE_VIEWS, revGetPageView_By_RevPageId, revresetPageView_By_RevPageId };