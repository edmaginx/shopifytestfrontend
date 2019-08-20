import { GET_SALESREP, ADD_SALESREP, GET_ADMINS } from '../action/types';

const initialState = {
    salesReps: [],
    salesRep: {},
    admins: []
}

export default function (state = initialState, action) {
    switch(action.type) {
        case GET_SALESREP:
            return ({
                ...state,
                salesReps: action.payload.filter(user => user.role === "salesrep")
            });
        case ADD_SALESREP:
            return {
                ...state,
                salesReps: [ ...state.salesReps, action.payload ]
            }

        case GET_ADMINS:
            return {
                ...state,
                admins: action.payload.filter(user =>  user.role === "admin")
            }
        default:
            return state;
    }
}