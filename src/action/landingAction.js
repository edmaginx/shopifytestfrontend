import React from 'react'
import { STORE_SHOP } from './types';

export function storeOrigin() {
    return (
        function (dispatch, shopOrigin) {
            console.log("Storing shopOrigin in redux");
            dispatch({
                type: STORE_SHOP,
                payload: shopOrigin
            })
        }
    )
}
