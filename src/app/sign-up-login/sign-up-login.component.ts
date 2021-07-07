import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-sign-up-login',
  templateUrl: './sign-up-login.component.html',
  styleUrls: ['./sign-up-login.component.css']
})
export class SignUpLoginComponent implements OnInit {

  username: string;
  password: string;
  invalidLogin = false;

  constructor(private authService: AuthenticationService, private routerService: Router) { }

  ngOnInit(): void {
  }

  async signUp(): Promise<void>{
    await this.authService.signUp(this.username, this.password);
    await this.login();
  }

  async login(): Promise<void> {
    await this.authService.logIn(this.username, this.password);

    if(!this.authService.isAuthenticated()){
      this.invalidLogin = true;
    } else {
      this.invalidLogin = false;
      this.routerService.navigate(['/main']);
    }
  }
}
