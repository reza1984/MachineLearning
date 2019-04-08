import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, ApplicationState } from './app.interface';

export const getApplicationState = createFeatureSelector<ApplicationState>(
  'application'
);

export const getCurrentTheme = createSelector(
  getApplicationState,
  state => state.currentTheme
);

export const getError = createSelector(
  getApplicationState,
  state => state.error
);
