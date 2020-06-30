//import React from 'react'
import { STORE_SHOP, STORE_TOKEN } from './types';

export function storeOrigin(storeOrigin) {
    return (
        function (dispatch) {
            console.log("Storing shopOrigin in redux");
            dispatch({
                type: STORE_SHOP,
                payload: storeOrigin
            })
        }
    )
}


export function storeToken(token) {
    return (
        function (dispatch) {
            console.log("Storing shopToken in redux");
            dispatch({
                type: STORE_TOKEN,
                payload: token
            })
        }
    )
}

