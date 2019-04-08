import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageProcessingRoutingModule } from './image-processing-routing.module';
import { TrainComponent } from './train/train.component';
import { ImageProcessingService } from './image-processing.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [TrainComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ImageProcessingRoutingModule
  ],
  providers:[ImageProcessingService]
})
export class ImageProcessingModule { }
