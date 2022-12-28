import { createContext } from "react";

const initialAppState = {
    userInfo: {},
    mainPageSelectedDate: "daily",
};

function appStateReducer(state = initialAppState, action) {
    let newState = state;
    const { type, payload } = action;
    switch (type) {
        case "SET_USER_PROFIL_INFO":
            newState = { ...state, userInfo: payload }
            break;
        case "SET_MAIN_PAGE_SELECTED_DATE":
            newState = { ...state, mainPageSelectedDate: payload }
            break;
        default:
            break;
    }
    return newState;
}

const AppContext = createContext({
    appState: initialAppState,
    dispatchAppStateAction: () => undefined,
});

export default AppContext;
export {
    appStateReducer,
    initialAppState
};
