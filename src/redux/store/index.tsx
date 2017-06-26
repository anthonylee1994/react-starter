import createHistory from "history/createBrowserHistory";
import { routerMiddleware, routerReducer } from "react-router-redux";
import { applyMiddleware, compose, createStore } from "redux";
import * as freeze from "redux-freeze";
import reducers from "../rootReducer";
import rootSaga from "../rootSaga";
import initialState from "./initialState";
import sagaMiddleware from "./middleware/saga";

export const history = createHistory();

const middlewares = [
    routerMiddleware(history),
    sagaMiddleware,
    // messageMiddleware,
];

if (process.env.NODE_ENV !== "production") {
    middlewares.push(freeze);
}

let middleware = applyMiddleware(...middlewares);

const win: any = window;

if (process.env.NODE_ENV !== "production" &&
    win.__REDUX_DEVTOOLS_EXTENSION__ && win.__REDUX_DEVTOOLS_EXTENSION__) {
    middleware = compose(middleware, win.__REDUX_DEVTOOLS_EXTENSION__ && win.__REDUX_DEVTOOLS_EXTENSION__());
}

export const store = createStore(reducers, initialState, middleware);

const rS: any = rootSaga;
sagaMiddleware.run(rS);
