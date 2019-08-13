import { combineReducers } from 'redux';
import customerReducer from './customerReducer';
import salesRepReducer from './salesRepReducer';
import companyReducer from './companyReducer';
import landingReducer from './landingReducer';

export default combineReducers({
    customera: customerReducer,
    salesRepresentative: salesRepReducer,
    companyState: companyReducer,
    landingState: landingReducer
});