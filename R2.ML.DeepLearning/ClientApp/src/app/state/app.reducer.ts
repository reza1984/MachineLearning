import { ApplicationActions, ApplicationActionTypes } from './app.actions';
import { ApplicationState } from './app.interface';

const initialState: ApplicationState = {
  currentTheme: '',
  error: ''
};

export function applicationReducer(
  state = initialState,
  action: ApplicationActions
): ApplicationState {
  switch (action.type) {
    case ApplicationActionTypes.SetCurrentTheme:
      return {
        ...state,
        currentTheme: action.payload
      };

    default:
      return state;
  }
}
