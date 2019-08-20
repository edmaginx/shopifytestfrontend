import { ADD_COMPANY, GET_COMPANIES, DELETE_COMPANY, UPDATE_COMPANY } from '../action/types';

const initialState = {
    companies: [],
    company: {}
}

export default function (state = initialState, action) {
    switch(action.type) {
        case ADD_COMPANY:
            console.log(action.type);
            
            console.log(action.companyData);
            return {
                ...state,
                customers: action.companyData
            };
        case GET_COMPANIES:
            console.log(action.type);
            console.log(action.payload);

            // for (var i = 0; i < action.payload.length; i++){
            //     action.payload[i].company_id = action.payload[i].company_id.toString();
            // }

            return {
                ...state,
                companies: action.payload
            }
        case DELETE_COMPANY:
            console.log(action.type);
            console.log(action.payload);
            return state;

        case UPDATE_COMPANY:
            console.log(action.type);
            console.log(action.payload);
            // !todo return 
        default:
            return state;
    }
}