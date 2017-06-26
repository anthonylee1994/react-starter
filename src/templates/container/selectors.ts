import {selectContainers} from "../../redux/modules/components/selectors";

export const selectContainer = (state: any) => {
    return selectContainers(state).Container;
};

export const selectContainerById = (state: any, id: string) => {
    const Container = selectContainer(state);
    return Container ? Container[id] : null;
};

export const foo = (state: any, id: string) => {
    return  selectContainerById(state, id) ?  selectContainerById(state, id).foo : false;
};
