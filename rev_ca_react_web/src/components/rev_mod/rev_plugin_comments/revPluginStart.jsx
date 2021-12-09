import React, { Component } from 'react';

import RevItemListingCommentsCountMenuItem from './rev_views/rev_menu_items/revItemListingCommentsCountMenuItem';

var revInitPlugin = (props) => {
    return {
        'revPluginName': 'revCommentsPlugin',
        'revMenuItems': revMenuItemsArr(props)
    }
}

var revMenuItemsArr = (props) => {
    return [
        {
            'REV_NAME_ID': 'revItemListingCommentsMenuItem',
            'revMenuName': 'revItemListingCommentsCountMenuItem',
            'revMenuAreaName': 'revItemListingOptionsMenuItemArea',
            'revMenuItem': <RevItemListingCommentsCountMenuItem props={props} />
        }
    ];
}

export { revInitPlugin };
