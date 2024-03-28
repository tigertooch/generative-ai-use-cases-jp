  
import React, { createContext, useReducer, ReactNode} from 'react';
import { appStateReducer } from './AppReducer';
export interface AppState {
    isSuggestionOpen: boolean;
    isNewSuggestionOpen:boolean;
    isChatHistoryOpen: boolean;
    isUpdateSuggestionOpen:boolean;
}
export type Action =
    | { type: 'TOGGLE_CHAT_HISTORY' }
    | { type: 'TOGGLE_CHAT_SUGGESTION' } 
    | { type: 'TOGGLE_CHAT_NEW_SUGGESTION' } 
    | { type: 'TOGGLE_CHAT_UPDATE_SUGGESTION'} 

const initialState: AppState = {
    isChatHistoryOpen: false,
    isSuggestionOpen: false,
    isNewSuggestionOpen: false,
    isUpdateSuggestionOpen:false,
};

export const AppStateContext = createContext<{
    state: AppState;
    dispatch: React.Dispatch<Action>;
  } | undefined>(undefined);

type AppStateProviderProps = {
    children: ReactNode;
  };
  
export const AppStateProvider: React.FC<AppStateProviderProps> = ({ children }) => {
const [state, dispatch] = useReducer(appStateReducer, initialState);
return (
    <AppStateContext.Provider value={{ state, dispatch }}>
    {children}
    </AppStateContext.Provider>
);
};





