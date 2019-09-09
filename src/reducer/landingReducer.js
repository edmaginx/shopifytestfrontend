import React from 'react'
import { STORE_SHOP, STORE_TOKEN } from "../action/types";


const initialState = {
    shopOrigin: "",
    shopToken: ""
}

export default function ( state = initialState, action) {
    switch(action.type) {
        case STORE_SHOP:
            console.log("something");
            console.log(action.payload);
            return {
                ...state,
                shopOrigin: action.payload
            }
        case STORE_TOKEN:
            return {
                ...state,
                shopToken: action.payload
            }

        default:
            return state;
    }
}
