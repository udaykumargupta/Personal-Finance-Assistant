import { thunk } from "redux-thunk";

import { combineReducers, legacy_createStore, applyMiddleware }  from "redux";
import authReducer from "./Auth/Reducer";
import { analyticsReducer } from "./Analytics/Reducer";
import { transactionReducer } from "./Transaction/Reducer";


const rootReducer=combineReducers({
    auth:authReducer,
    analytics: analyticsReducer,
    transaction: transactionReducer,
});

export const store=legacy_createStore(rootReducer,applyMiddleware(thunk))