import { AuthService } from '../auth/auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private authServ: AuthService,
    private router: Router
  ){}

  canActivate(): boolean {
    // console.log('AuthGuard: ', this.authServ.isLogged());
    if (!this.authServ.isLogged()) {
      this.router.navigateByUrl('/login');
    }
    return this.authServ.isLogged();
  }
}
