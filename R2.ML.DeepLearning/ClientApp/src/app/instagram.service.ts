import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ProfileViewModel,
  ImageViewModel,
  ModifyImageRequest
} from './features/follower/states/follower.interface';

@Injectable({
  providedIn: 'root'
})
export class InstagramService {
  constructor(private http: HttpClient) {}
  getFollowers(): Observable<ProfileViewModel[]> {
    const url = 'api/Instagram/Followers';
    return this.http.get<ProfileViewModel[]>(url);
  }

  getFollowerImages(userName): Observable<ImageViewModel[]> {
    const url = `api/instagram/Follower/${userName}`;
    return this.http.get<ImageViewModel[]>(url);
  }

  saveFollowerImage(model: ModifyImageRequest) {
    const url = 'api/Instagram/SaveFollowerImage';
    return this.http.post<boolean>(url, model);
  }

  deleteFollowerImage(model: ModifyImageRequest) {
    const url = 'api/Instagram/DeleteFollowerImage';
    return this.http.post<boolean>(url, model);
  }

  checkInstgramState() {
    const url = 'api/Instagram';
    return this.http.get(url);
  }

  login(loginViewModel) {
    const url = 'api/Instagram/Login';
    return this.http.post(url, loginViewModel);
  }

  twoFactor(loginViewModel) {
    const url = 'api/Instagram/TwoFactor';
    return this.http.post(url, loginViewModel);
  }

  startTraining() {
    const url = 'api/Instagram/StartTrain';
    return this.http.get(url);
  }
}

