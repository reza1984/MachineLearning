import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export abstract class ObservableHelper implements OnDestroy {
  public subscribers: Array<Subscription>;
  alive = true;
  constructor() {
    this.subscribers = new Array<Subscription>();
  }
  ngOnDestroy(): void {
    this.alive = false;
    this.subscribers.forEach(s => {
      console.log(s);
      s.unsubscribe();
    });
  }
}
