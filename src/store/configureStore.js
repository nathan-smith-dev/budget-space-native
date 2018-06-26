import { createStore, combineReducers, compose, applyMiddleware } from 'redux'; 
import thunk from 'redux-thunk'; 

import authReducer from './reducers/auth'; 
import transactionsReducer from './reducers/transactions'; 
import annualTransactionReducter from './reducers/annualTransactions'; 

const rootReducer = combineReducers({
    auth: authReducer, 
    transactions: transactionsReducer, 
    annualTransactions: annualTransactionReducter
}); 

let composeEnhancers = compose; 
if(__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 
}

const configureStore = ()=> {
    return createStore( rootReducer, composeEnhancers(applyMiddleware(thunk)) )
}; 

export default configureStore; 