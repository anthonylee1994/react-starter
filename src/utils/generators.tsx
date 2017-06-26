const { createSelector, Model } = require("redux-orm");
import { takeEvery } from "redux-saga/effects";
import { ormSelector } from "../redux/modules/orm/selectors";
import { APIActions, APIActionsInit } from "./actions";
import { APIRequest } from "./api";
import { formatDateTime } from "./date";

export class CRUDModel extends Model {

    public static modelName = "";

    public static getAction(type: string) {
        return `${type}_${this.modelName.toUpperCase()}`;
    }

    public static reducer(action: any, currentModel: any, session: any): any {
        switch (action.type) {
            case this.getAction("CREATE") + "_SUCCESS":
                currentModel.create(action.payload.result);
                break;
            case this.getAction("READ") + "_SUCCESS":
                currentModel.all().delete();
                for (const e in action.payload.result) {
                    if (action.payload.result[e]) {
                        currentModel.create(action.payload.result[e]);
                    }
                }
                break;
            case this.getAction("UPDATE") + "_SUCCESS":
                currentModel.withId(action.payload.result.id).update(action.payload.result);
                break;
            case this.getAction("DELETE") + "_SUCCESS":
                action.payload.request.ids.forEach((id: number) => {
                    currentModel.withId(id).delete();
                });
                break;
        }
        return undefined;
    }
}

export function generateActions(arr: any): any {
    const obj: any = {};
    for (const x of arr) {
        obj[x.name] = APIActionsInit(x.name);
        obj[x.creator] = APIActions(APIActionsInit(x.name));
    }
    return obj;
}

export function generateCRUDActions(name: string): any {
    return generateActions([
        {
            name: `CREATE_${name.toUpperCase()}`,
            creator: `create`,
        },
        {
            name: `READ_${name.toUpperCase()}`,
            creator: `read`,
        },
        {
            name: `UPDATE_${name.toUpperCase()}`,
            creator: `update`,
        },
        {
            name: `DELETE_${name.toUpperCase()}`,
            creator: `delete`,
        },
    ]);
}

export function generateCRUDSaga(name: string, CRUDActions: any) {
    return function*() {
        yield takeEvery(CRUDActions[`CREATE_${name.toUpperCase()}`].REQUEST,
            APIRequest(CRUDActions[`CREATE_${name.toUpperCase()}`], "post", () => `/api/${name}`));
        yield takeEvery(CRUDActions[`READ_${name.toUpperCase()}`].REQUEST,
            APIRequest(CRUDActions[`READ_${name.toUpperCase()}`], "get", () => `/api/${name}`));
        yield takeEvery(CRUDActions[`UPDATE_${name.toUpperCase()}`].REQUEST,
            APIRequest(CRUDActions[`UPDATE_${name.toUpperCase()}`], "put", (item: any) => `/api/${name}/${item.id}`));
        yield takeEvery(CRUDActions[`DELETE_${name.toUpperCase()}`].REQUEST,
            APIRequest(CRUDActions[`DELETE_${name.toUpperCase()}`], "delete", () => `/api/${name}`));
    };
}

import orm from "../redux/modules/orm/selectors";

export function generateSelectAllSelector(name: string) {
    return createSelector(orm, ormSelector, (session: any) => {
        return session[name[0].toUpperCase() + name.substr(1)].all().toRefArray().map((c: any) => {
            return {
                ...c,
                _dateCreated: formatDateTime(c.dateCreated),
                _lastUpdated: formatDateTime(c.lastUpdated),
            };
        });
    });
}
