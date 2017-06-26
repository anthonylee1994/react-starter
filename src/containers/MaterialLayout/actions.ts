import { action } from "../../utils/actions";
export const INITIALIZE_MATERIAL_LAYOUT = "INITIALIZE_MATERIAL_LAYOUT";
export const OPEN_APP_MENU = "OPEN_APP_MENU";
export const CLOSE_APP_MENU = "CLOSE_APP_MENU";


export const actions = (id: string) => ({
    initialize: () => action(INITIALIZE_MATERIAL_LAYOUT, { id }),
    openAppMenu: () => action(OPEN_APP_MENU, { id }),
    closeAppMenu: () => action(CLOSE_APP_MENU, { id }),
});
