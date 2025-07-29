import { thunk } from "redux-thunk";

import { combineReducers, legacy_createStore, applyMiddleware }  from "redux";
import authReducer from "./Auth/Reducer";


const rootReducer=combineReducers({
    auth:authReducer,
});

export const store=legacy_createStore(rootReducer,applyMiddleware(thunk))