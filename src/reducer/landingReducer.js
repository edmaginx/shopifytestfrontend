import React from 'react'
import { STORE_SHOP } from "../action/types";


const initialState = {
    shopOrigin: ""
}

export default function ( state = initialState, action) {
    switch(action.type) {
        case STORE_SHOP:
            return {
                ...state,
                shopOrigin: action.payload
            }

        default: 
            return state;
    }
}
