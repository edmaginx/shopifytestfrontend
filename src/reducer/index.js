import { combineReducers } from 'redux';
import customerReducer from './customerReducer';
import salesRepReducer from './salesRepReducer';
import companyReducer from './companyReducer';

export default combineReducers({
    customera: customerReducer,
    salesRepresentative: salesRepReducer,
    companyState: companyReducer
});