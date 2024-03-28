import { Action, AppState } from './AppProvider';

// Define the reducer function
export const appStateReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case 'TOGGLE_CHAT_HISTORY':
            return { ...state, isChatHistoryOpen: !state.isChatHistoryOpen };
        case 'TOGGLE_CHAT_SUGGESTION':
            return { ...state, isSuggestionOpen: !state.isSuggestionOpen };
        case 'TOGGLE_CHAT_NEW_SUGGESTION':
            return { ...state, isNewSuggestionOpen: !state.isNewSuggestionOpen };
        case 'TOGGLE_CHAT_UPDATE_SUGGESTION':
            return { ...state, isUpdateSuggestionOpen: !state.isUpdateSuggestionOpen };
        default:
            return state;
      }
};