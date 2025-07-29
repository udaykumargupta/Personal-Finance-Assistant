import { thunk } from "redux-thunk";

import { combineReducers, legacy_createStore, applyMiddleware }  from "redux";
import authReducer from "./Auth/Reducer";
import { analyticsReducer } from "./Analytics/Reducer";


const rootReducer=combineReducers({
    auth:authReducer,
    analytics: analyticsReducer,
});

export const store=legacy_createStore(rootReducer,applyMiddleware(thunk))