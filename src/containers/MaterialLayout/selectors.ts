import {selectContainers} from "../../redux/modules/components/selectors";

export const selectMaterialLayout = (state: any) => {
    return selectContainers(state).MaterialLayout;
};

export const selectMaterialLayoutById = (state: any, id: string) => {
    const MaterialLayout = selectMaterialLayout(state);
    return MaterialLayout ? MaterialLayout[id] : null;
};

export const isAppMenuOpen = (state: any, id: string) => {
    return  selectMaterialLayoutById(state, id) ?  selectMaterialLayoutById(state, id).isAppMenuOpen : false;
};
