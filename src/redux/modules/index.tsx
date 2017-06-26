import {combineReducers} from "redux";
import {fork} from "redux-saga/effects";

import {reducers as containersReducer} from "../../containers/redux";
import {ormReducer} from "./orm/reducer";
// Sagas
import userSaga from "./user/saga";

export function* sagas() {
    yield [
        fork(userSaga),
    ];
}

// Reducers
export const reducers = combineReducers({
    orm: ormReducer,
    containers: containersReducer,
});
