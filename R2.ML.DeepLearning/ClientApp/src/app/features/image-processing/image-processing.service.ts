import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {
  constructor(private http: HttpClient) {}

  train() {
    const url = 'api/ImageProceesing/Train';
    return this.http.get(url);
  }
}
