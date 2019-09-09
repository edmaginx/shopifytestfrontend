import { GET_SALESREP, ADD_SALESREP, GET_ADMINS, DELETE_USER, UPDATE_USER } from '../action/types';

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

        case DELETE_USER:
            console.log('ddd');
            return {
                ...state,
                salesReps: state.salesReps.filter(salesRep => salesRep.user_id !== action.user_id),
                admins: state.admins.filter(admin => admin.user_id !== action.user_id)
            }
        
        case UPDATE_USER:
            return {
                ...state,
                // salesReps: state.salesReps.filter(salesRep => salesRep.user_id !== action.user_id),
                // admins: state.admins.filter(admin => admin.user_id !== action.user_id)
                salesReps: [ ...state.salesReps.filter(salesRep => salesRep.user_id !== action.user_id), action.payload ], 
                admins: [ ...state.admins.filter(admin => admin.user_id !== action.user_id), action.payload ]
            }



        default:
            return state;
    }
}