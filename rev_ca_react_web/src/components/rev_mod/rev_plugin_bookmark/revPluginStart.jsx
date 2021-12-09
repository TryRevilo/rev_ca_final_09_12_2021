import React, { Component } from 'react';

import RevItemListingBookmarkMenuItem from './rev_views/rev_menu_items/revItemListingBookmarkMenuItem';

var revInitPlugin = (props) => {
    return {
        'revPluginName': 'revBookmarksPlugin',
        'revMenuItems': revMenuItemsArr(props)
    }
}

var revMenuItemsArr = (props) => {
    return [
        {
            'REV_NAME_ID': 'revItemListingBookmarkMenuItem',
            'revMenuName': 'revItemListingBookmarkMenuItem',
            'revMenuAreaName': 'revItemListingOptionsMenuItemArea',
            'revMenuItem': <RevItemListingBookmarkMenuItem props={props} />
        }
    ];
}

export { revInitPlugin };
