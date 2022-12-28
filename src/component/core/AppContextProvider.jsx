import React, { useReducer } from "react";

import AppContext, {
    appStateReducer,
    initialAppState,
} from "./AppContext";

export default function AppContextProvider({ children }) {
    const [appState, dispatchAppStateAction] = useReducer(
        appStateReducer,
        initialAppState
    );
    return (
        <AppContext.Provider
            value={{
                //: appState,
                appState,
                dispatchAppStateAction
                //: dispatchAppStateAction,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}