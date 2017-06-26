import { clone } from "../../utils/object";
import { CONTAINER_FOO, INITIALIZE_CONTAINER } from "./actions";

export default function reducer(state: any = {}, action: { type: string, payload: any }) {

    const clonedState = clone(state);

    switch (action.type) {
        case INITIALIZE_CONTAINER:
            clonedState[action.payload.id] = {
                foo: false,
            };
            return clonedState;
        case CONTAINER_FOO:
            clonedState[action.payload.id].showMenu = !clonedState[action.payload.id].foo;
            clonedState[action.payload.id].showMenu = !clonedState[action.payload.id].foo;
            return clonedState;
        default:
            return state;
    }
}
