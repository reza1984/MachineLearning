import { Component, OnInit } from '@angular/core';
import { ImageProcessingService } from './../image-processing.service';

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.scss']
})
export class TrainComponent implements OnInit {
  trainResult$: any;

  constructor(private ipService: ImageProcessingService) { }

  ngOnInit() {

  }
  startTraining() {
    this.trainResult$ = this.ipService.train();
  }
}
