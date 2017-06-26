import "isomorphic-fetch";

import { put } from "redux-saga/effects";
import { action } from "./actions";

export const api: any = {
    get: (url: string, body: any) => API("GET", url + "?" + toQueryString(body), null),
    post: (url: string, body: any) => API("POST", url, body),
    put: (url: string, body: any) => API("PUT", url, body),
    delete: (url: string, body: any) => API("DELETE", url, body),
};

function API(method: string, url: string, body: any) {
    const config: any = {
        credentials: "same-origin",
        method,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };
    if (body) {
        config.body = toQueryString(body);
    }
    if (method === "DELETE") {
        config.headers["Content-Type"] = "application/json";
        config.body = JSON.stringify(body);
    }
    return fetch(url, config);
}

function toQueryString(body: any) {
    if (!body) {
        return "";
    }
    let str = "";
    for (const v in body) {
        if (body.hasOwnProperty(v)) {
            str += `${v}=${body[v]}&`;
        }
    }
    return str.substr(0, str.length - 1);
}

function toMultiPartFormData(body: any) {
    return Object.keys(body).reduce((formData, key) => {
        if (body.hasOwnProperty(key)) {
            formData.append(key, body[key]);
        }
        return formData;
    }, new FormData());
}

export function APIRequest(apiActions: any, method: string, url: (v: any) => string) {

    return function*(requestAction: any) {

        try {

            const response = yield api[method](url(requestAction.payload), requestAction.payload);

            if (!response) {
                yield put(action(apiActions.FAILURE, {
                    status: -1,
                    message: "Unable to connect to API Server",
                }));
            }

            let data: any = {};

            try {
                data = yield response.json();
            } catch (e) {
                console.error(e);
            }

            if (!String(response.status).match(/^2.{2}$/g)) {
                const status = response.status;
                const message = data.message === null ? "" : data.message;
                yield put(action(apiActions.FAILURE, {
                    status,
                    message,
                }));
                return;
            }

            yield put(action(apiActions.SUCCESS, {
                status: 200,
                result: data,
                request: requestAction.payload,
            }));

        } catch (e) {
            console.error(e);
            yield put(action(apiActions.FAILURE, {
                status: e.name,
                message: e.message,
            }));
        }

    };
}
