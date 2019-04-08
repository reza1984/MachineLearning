import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from '../follower.state';

import * as actions from './../states/follower.actions';
import * as selectors from './../states/follower.selectors';
import { ActivatedRoute } from '@angular/router';
import { ImageViewModel } from '../states/follower.interface';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-follower-item',
  templateUrl: './follower-item.component.html',
  styleUrls: ['./follower-item.component.css']
})
export class FollowerItemComponent implements OnInit, OnDestroy {
  private sub: any;
  followerImages$: Observable<ImageViewModel[]>;
  userName: string;

  constructor(private store: Store<State>, private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.userName = params['id'];
      this.store.dispatch(new actions.GetFollowerImages(this.userName));
    });

    this.followerImages$ = this.store.pipe(select(selectors.followerImagesSelector));
  }

  saveImage(image: ImageViewModel) {
    this.store.dispatch(new actions.SaveImage({
      userName: this.userName,
      instaIdentifier: image.instaIdentifier,
      pictureUrl: image.pictureUrl
    }));
  }

  deleteImage(image: ImageViewModel) {
    this.store.dispatch(new actions.DeleteImage({
      userName: this.userName,
      instaIdentifier: image.instaIdentifier,
      pictureUrl: image.pictureUrl
    }));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
