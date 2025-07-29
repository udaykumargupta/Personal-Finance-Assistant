import { thunk } from "redux-thunk";
import authReducer from "./Auth/Reducer";

import { combineReducers, legacy_createStore, applyMiddleware }  from "redux";

const rootReducer=combineReducers({
    auth:authReducer,

});

export const store=legacy_createStore(rootReducer,applyMiddleware(thunk))