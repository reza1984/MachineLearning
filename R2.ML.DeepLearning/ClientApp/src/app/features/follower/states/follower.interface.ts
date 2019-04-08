export interface FollowerState {
  Followers: ProfileViewModel[];
  FollowerImages: ImageViewModel[];
  error: string;
}

export interface ProfileViewModel {
  pk: number;
  fullName: string;
  pictureUrl: string;
  userName: string;
}

export interface ImageViewModel {
  pictureUrl: string;
  takenAt: string;
  instaIdentifier: string;
  isImageAdded: boolean;
}

export interface ModifyImageRequest {
  userName: string;
  instaIdentifier: string;
  pictureUrl: string;
}
