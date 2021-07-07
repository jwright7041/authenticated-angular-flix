import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  token: string;
  constructor(private apiService: ApiService) { }

  async signUp(username: string, password: string): Promise<any>{
    return await this.apiService.post('auth/signup',{
      username,
      password
    });
  }

  async logIn(username: string, password: string): Promise<void>{
    const response = await this.apiService.post('auth/login',{
      username,
      password
    });

    this.token = response.token;

    localStorage.setItem('token', this.token);
  }

  isAuthenticated(): boolean{
    const token = this.getToken();

    return token !== 'undefined' && token !== undefined && token !== null;
  }

  getToken(): string{
    return localStorage.getItem('token');
  }
}
