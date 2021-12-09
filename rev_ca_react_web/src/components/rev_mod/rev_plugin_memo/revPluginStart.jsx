import React, { Component } from 'react';

import RevOverrideView_MemoItemListing from './rev_views/rev_override_views/revOverrideView_MemoItemListing';

var revInitPlugin = (props) => {
    return {
        'revPluginName': 'revMemoPlugin',
        'revOverrideViewItemsArr': revGetOverrideViewItemsArr(props)
    }
}

var revGetOverrideViewItemsArr = (props) => {
    return [
        {
            'REV_NAME_ID': 'rev_memo',
            'revViewName': 'rev_memo',
            'revViewItem': <RevOverrideView_MemoItemListing props={props} />
        },
    ];
}

export { revInitPlugin };
