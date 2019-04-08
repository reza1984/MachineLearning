import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { InstagramService } from './instagram.service';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private instagramService: InstagramService) {}

  ngOnInit() {
    this.router.events.subscribe(evt => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    this.instagramService.checkInstgramState().subscribe(state => {
      // need login
      if (state === 0) {
        this.router.navigate(['/login']);
      }
    });
  }
}
