import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFollower from './../follower.state';
import { FollowerState } from './follower.interface';

const getFollowerFeatureState = createFeatureSelector<FollowerState>(
  'follower'
);


export const followersSelector = createSelector(
  getFollowerFeatureState,
  state => state.Followers
);

export const followerImagesSelector = createSelector(
  getFollowerFeatureState,
  state => state.FollowerImages
);

