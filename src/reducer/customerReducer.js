import { GET_CUSTOMERS } from '../action/types';

const initialState = {
    customers: [],
    customer: {}
}

export default function (state = initialState, action) {
    switch(action.type) {
        case GET_CUSTOMERS:
            console.log(action.type);
            console.log(action.payload);
            return {
                ...state,
                customers: action.payload
            };
        default:
            return state;
    }
}