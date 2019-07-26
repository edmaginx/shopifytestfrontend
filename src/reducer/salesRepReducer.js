import { GET_SALESREP, ADD_SALESREP } from '../action/types';

const initialState = {
    salesReps: [],
    salesRep: {}
}

export default function (state = initialState, action) {
    switch(action.type) {
        case GET_SALESREP:
            return {
                ...state,
                salesReps: action.payload
            };
        case ADD_SALESREP:
            return {
                ...state,
                salesRep: action.payload
            }
        default:
            return state;
    }
}