import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FollowerListComponent } from './follower-list/follower-list.component';
import { FollowerItemComponent } from './follower-item/follower-item.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Follower'
    },
    children: [
      {
        path: '',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: FollowerListComponent,
        data: {
          title: 'List'
        }
      },
      {
        path: ':id',
        component: FollowerItemComponent,
        data: {
          title: 'Images'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FollowerRoutingModule {}
