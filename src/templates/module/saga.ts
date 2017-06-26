import {takeEvery} from "redux-saga/effects";
import {APIRequest} from "../../utils/api";
import {USER_LOGIN} from "./actions";

export default function*() {
    yield takeEvery(USER_LOGIN.REQUEST, APIRequest(USER_LOGIN, "post", () => "/api/login"));
}
