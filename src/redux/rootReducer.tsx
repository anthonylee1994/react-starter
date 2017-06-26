import {routerReducer} from "react-router-redux";
import {combineReducers} from "redux";
import {reducers as modules} from "./modules";

export default combineReducers({
    router: routerReducer,
    modules,
});
