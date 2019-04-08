import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import * as fromFollower from './states/follower.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './states/follower.effects';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { FollowerRoutingModule } from './follower-routing.module';
import { InstagramService } from '../../instagram.service';
import { FollowerListComponent } from './follower-list/follower-list.component';
import { FollowerItemComponent } from './follower-item/follower-item.component';

@NgModule({
  declarations: [FollowerListComponent, FollowerItemComponent],
  imports: [
    CommonModule,
    FollowerRoutingModule,
    FormsModule,
    PaginationModule.forRoot(),
    StoreModule.forFeature('follower', fromFollower.reducer),
    EffectsModule.forFeature([ProductEffects])
  ],
  providers: [InstagramService]
})
export class FollowerModule {}
