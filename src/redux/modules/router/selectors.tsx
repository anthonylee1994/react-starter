export const selectPathName = (state: any) =>
    state.router === null ? "" :
        state.router.location === null ? "" :
            state.router.location.pathname;
