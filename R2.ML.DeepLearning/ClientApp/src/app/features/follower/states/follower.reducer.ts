import { FollowerActions, FollowerActionTypes } from './follower.actions';
import { FollowerState } from './follower.interface';

const initialState: FollowerState = {
  Followers: null,
  FollowerImages: null,
  error: ''
};

export function reducer(state = initialState, action: FollowerActions): FollowerState {
  switch (action.type) {
    case FollowerActionTypes.GetFollowerListSuccess:
      return {
        ...state,
        Followers: action.payload
      };
    case FollowerActionTypes.GetFollowerImages:
      return {
        ...state,
        FollowerImages: []
      };
    case FollowerActionTypes.GetFollowerImagesSuccess:
      return {
        ...state,
        FollowerImages: action.payload
      };

    case FollowerActionTypes.GetFollowerListFail:
      return {
        ...state,
        error: action.payload
      };

    case FollowerActionTypes.SaveImageSuccess: {
      const result = { ...state };
      const image = result.FollowerImages.find(
        c => c.instaIdentifier === action.payload.instaIdentifier
      );
      if (image) {
        image.isImageAdded = true;
      }
      return result;
    }

    case FollowerActionTypes.DeleteImageSuccess: {
      const result = { ...state };
      const image = result.FollowerImages.find(
        c => c.instaIdentifier === action.payload.instaIdentifier
      );
      if (image) {
        image.isImageAdded = false;
      }
      return result;
    }
    default:
      return state;
  }
}
