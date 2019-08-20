import { createStore, applyMiddleware, compose } from 'redux';
import { STORE_SHOP } from './action/types';
import thunk from 'redux-thunk';
import rootReducer from './reducer'
const initialState = {};

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(...middleware)
    ));
    
let urlParams = new URLSearchParams(window.location.search);
const store_hash = urlParams.get('shop').split(".")[0];  
// console.log(store_hash);
store.dispatch({
    type: STORE_SHOP,
    payload: store_hash
});

export default store;

