import { clone } from "../../utils/object";
import { CLOSE_APP_MENU, INITIALIZE_MATERIAL_LAYOUT, OPEN_APP_MENU } from "./actions";

export default function reducer(state: any = {}, action: { type: string, payload: any }) {

    const clonedState = clone(state);

    switch (action.type) {
        case INITIALIZE_MATERIAL_LAYOUT:
            clonedState[action.payload.id] = {
                isAppMenuOpen: false,
            };
            return clonedState;
        case OPEN_APP_MENU:
            clonedState[action.payload.id].isAppMenuOpen = true;
            return clonedState;
        case CLOSE_APP_MENU:
            clonedState[action.payload.id].isAppMenuOpen = false;
            return clonedState;
        default:
            return state;
    }
}
