import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainComponent } from './train/train.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Image Processing'
    },
    children: [
      {
        path: '',
        redirectTo: 'train'
      },
      {
        path: 'train',
        component: TrainComponent,
        data: {
          title: 'Train'
        }
      },
      // {
      //   path: ':id',
      //   component: FollowerItemComponent,
      //   data: {
      //     title: 'Images'
      //   }
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageProcessingRoutingModule { }
