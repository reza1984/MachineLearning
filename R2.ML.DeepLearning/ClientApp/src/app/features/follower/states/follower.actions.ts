import { Action } from '@ngrx/store';
import {} from './follower.reducer';
import { ProfileViewModel, ImageViewModel, ModifyImageRequest } from './follower.interface';

export enum FollowerActionTypes {
  GetFollowerList = '[Follower] Get Follower List',
  GetFollowerListSuccess = '[Follower] Get Follower List Success',
  GetFollowerListFail = '[Follower] Get Follower List Fail',

  GetFollowerImages = '[Follower] Get Follower Images',
  GetFollowerImagesSuccess = '[Follower] Get Follower Images Success',
  GetFollowerImagesFail = '[Follower] Get Follower Images Fail',

  SaveImage = '[Follower] Save Image',
  SaveImageSuccess = '[Follower] Save Image Success',
  SaveImageFail = '[Follower] Save Image Fail',

  DeleteImage = '[Follower] Delete Image',
  DeleteImageSuccess = '[Follower] Delete Image Success',
  DeleteImageFail = '[Follower] Delete Image Fail',
}

export class GetFollowerList implements Action {
  readonly type = FollowerActionTypes.GetFollowerList;
}

export class GetFollowerListSuccess implements Action {
  readonly type = FollowerActionTypes.GetFollowerListSuccess;
  constructor(public payload: ProfileViewModel[]) {}
}
export class GetFollowerListFail implements Action {
  readonly type = FollowerActionTypes.GetFollowerListFail;
  constructor(public payload: string) {}
}

export class GetFollowerImages implements Action {
  readonly type = FollowerActionTypes.GetFollowerImages;
  constructor(public payload: string) {}
}
export class GetFollowerImagesSuccess implements Action {
  readonly type = FollowerActionTypes.GetFollowerImagesSuccess;
  constructor(public payload: ImageViewModel[]) {}
}
export class GetFollowerImagesFail implements Action {
  readonly type = FollowerActionTypes.GetFollowerImagesFail;
  constructor(public payload: string) {}
}

export class SaveImage implements Action {
  readonly type = FollowerActionTypes.SaveImage;
  constructor(public payload: ModifyImageRequest) {}
}
export class SaveImageSuccess implements Action {
  readonly type = FollowerActionTypes.SaveImageSuccess;
  constructor(public payload: ModifyImageRequest) {}
}
export class SaveImageFail implements Action {
  readonly type = FollowerActionTypes.SaveImageFail;
  constructor(public payload: string) {}
}



export class DeleteImage implements Action {
  readonly type = FollowerActionTypes.DeleteImage;
  constructor(public payload: ModifyImageRequest) {}
}
export class DeleteImageSuccess implements Action {
  readonly type = FollowerActionTypes.DeleteImageSuccess;
  constructor(public payload: ModifyImageRequest) {}
}
export class DeleteImageFail implements Action {
  readonly type = FollowerActionTypes.DeleteImageFail;
  constructor(public payload: string) {}
}
// Union the valid types
export type FollowerActions =
  | GetFollowerList
  | GetFollowerListSuccess
  | GetFollowerListFail
  | GetFollowerImages
  | GetFollowerImagesSuccess
  | GetFollowerImagesFail
  | SaveImage
  | SaveImageSuccess
  | SaveImageFail
  | DeleteImage
  | DeleteImageSuccess
  | DeleteImageFail;
