export const asyncActionTypes = ["REQUEST", "SUCCESS", "FAILURE", "CANCEL"];

export function createActionType(base: string, array: any[]) {
    return array.reduce((acc, type) => {
        acc[type] = `${base}_${type}`;
        return acc;
    }, {});
}

export const createAsyncRequestTypes = (base: string) => createActionType(base, asyncActionTypes);

export function action(type: string, payload: any = {}) {
    return {type, payload};
}

export function APIActionsInit(name: string) {
    return {
        REQUEST: `${name}_REQUEST`,
        SUCCESS: `${name}_SUCCESS`,
        FAILURE: `${name}_FAILURE`,
        CANCEL: `${name}_CANCEL`,
    };
}

export const APIActions = (api: any) => ({
    request: (payload: any) => action(api.REQUEST, payload),
    success: (payload: any) => action(api.SUCCESS, payload),
    failure: (payload: any) => action(api.FAILURE, payload),
    cancel: (payload: any) => action(api.CANCEL, payload),
});
