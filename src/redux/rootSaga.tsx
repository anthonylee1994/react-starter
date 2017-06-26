import {fork} from "redux-saga/effects";
import {sagas as modulesSaga} from "./modules";

export default function* rootSaga() {
    yield [
        fork(modulesSaga),
    ];
}
