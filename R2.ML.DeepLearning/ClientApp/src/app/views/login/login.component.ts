import { Component } from '@angular/core';
import { InstagramService } from '../../instagram.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  twoFactorRequired = false;
  constructor(private instagramService: InstagramService,private router: Router) {}
  login(userName, password) {
    this.instagramService
      .login({ UserName: userName.value, Password: password.value })
      .subscribe(loginResult => {
        if (loginResult === 2) {
          // need two factor auth
          this.twoFactorRequired = true;
        } else if (loginResult === 1) {
          // login successfully
        }
      });
  }

  sendCode(code) {
    this.instagramService.twoFactor({ Code: code.value }).subscribe(loginResult => {
      // login successfully
      if (loginResult === 0) {
        this.twoFactorRequired = false;
      } else if (loginResult === 1) {
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
