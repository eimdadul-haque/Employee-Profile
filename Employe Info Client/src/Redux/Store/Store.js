import { employeReducer } from "../Reducers/reloadReducer"
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import  thunk  from "redux-thunk";

const mainReducer = combineReducers({
    employeStore: employeReducer
});

const composeEnhanchers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const Store = createStore(mainReducer, composeEnhanchers(applyMiddleware(thunk)));