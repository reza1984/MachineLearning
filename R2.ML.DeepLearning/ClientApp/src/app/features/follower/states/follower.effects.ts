import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as actions from './follower.actions';
import { InstagramService } from '../../../instagram.service';

@Injectable()
export class ProductEffects {
  constructor(private instagramService: InstagramService, private actions$: Actions) {}

  @Effect()
  getFollowers$: Observable<Action> = this.actions$.pipe(
    ofType(actions.FollowerActionTypes.GetFollowerList),
    mergeMap(_ =>
      this.instagramService.getFollowers().pipe(
        map(products => new actions.GetFollowerListSuccess(products)),
        catchError(err => of(new actions.GetFollowerListFail(err)))
      )
    )
  );

  @Effect()
  getFollowerImages$: Observable<Action> = this.actions$.pipe(
    ofType(actions.FollowerActionTypes.GetFollowerImages),
    mergeMap((action: actions.GetFollowerImages) =>
      this.instagramService.getFollowerImages(action.payload).pipe(
        map(products => new actions.GetFollowerImagesSuccess(products)),
        catchError(err => of(new actions.GetFollowerImagesFail(err)))
      )
    )
  );

  @Effect()
  saveFollowerImage$: Observable<Action> = this.actions$.pipe(
    ofType(actions.FollowerActionTypes.SaveImage),
    mergeMap((action: actions.SaveImage) =>
      this.instagramService.saveFollowerImage(action.payload).pipe(
        map(result => new actions.SaveImageSuccess(action.payload)),
        catchError(err => of(new actions.SaveImageFail(err)))
      )
    )
  );

  @Effect()
  deleteFollowerImage$: Observable<Action> = this.actions$.pipe(
    ofType(actions.FollowerActionTypes.DeleteImage),
    mergeMap((action: actions.DeleteImage) =>
      this.instagramService.deleteFollowerImage(action.payload).pipe(
        map(result => new actions.DeleteImageSuccess(action.payload)),
        catchError(err => of(new actions.DeleteImageFail(err)))
      )
    )
  );
}
