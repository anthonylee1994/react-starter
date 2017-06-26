import { action } from "../../utils/actions";
export const INITIALIZE_CONTAINER = "INITIALIZE_CONTAINER";
export const CONTAINER_FOO = "CONTAINER_FOO";


export const actions = (id: string) => ({
    initialize: () => action(INITIALIZE_CONTAINER, { id }),
    containerFoo: () => action(CONTAINER_FOO, { id }),
});
