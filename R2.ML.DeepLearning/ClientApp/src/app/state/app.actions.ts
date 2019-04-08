import { Action } from '@ngrx/store';

export enum ApplicationActionTypes {
  SetCurrentTheme = '[Application] Set Current Theme'
}
export class SetCurrentTheme implements Action {
  readonly type = ApplicationActionTypes.SetCurrentTheme;

  constructor(public payload: string) {}
}



// Union the valid types
export type ApplicationActions = SetCurrentTheme;
