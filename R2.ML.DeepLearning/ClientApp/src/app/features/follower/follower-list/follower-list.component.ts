import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from '../follower.state';

import * as actions from './../states/follower.actions';
import * as selectors from './../states/follower.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-follower-list',
  templateUrl: './follower-list.component.html',
  styleUrls: ['./follower-list.component.css']
})
export class FollowerListComponent implements OnInit {
  followers$: any;
  constructor(private store: Store<State>, private router: Router) {}

  ngOnInit() {
    this.store.dispatch(new actions.GetFollowerList());
    this.followers$ = this.store.pipe(select(selectors.followersSelector));
  }

  navigateToFollower(userName) {
    this.router.navigate(['/follower', userName]);
  }
}
