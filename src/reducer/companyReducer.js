import { ADD_COMPANY, GET_COMPANIES, DELETE_COMPANY, UPDATE_COMPANY } from '../action/types';

const initialState = {
    companies: [],
    company: {}
}

export default function (state = initialState, action) {
    switch(action.type) {
        case ADD_COMPANY:
            return {
                ...state,
                companies: [ ...state.companies, action.payload ]
            };
        case GET_COMPANIES:
            return {
                ...state,
                companies: action.payload
            }
        case DELETE_COMPANY:
            return {
                ...state,
                companies: state.companies.filter(company => company.company_id !== action.company_id)
            };

        case UPDATE_COMPANY:
            return {
                ...state,
                companies: state.companies.map(company => (
                    company.company_id === action.company_id ? {...company, data:action.payload} : company
                ))
            }
        default:
            return state;
    }
}