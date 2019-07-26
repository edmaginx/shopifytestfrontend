import { ADD_COMPANY } from '../action/types';

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
        default:
            return state;
    }
}