import { UserStatusService } from '../services/user-status/user-status.service';
import { LoadService } from '../services/loading/load.service';
import { UsersService } from '../services/user/users.service';
import { AuthService } from '../services/auth/auth.service';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  users;

  constructor(
    private userStatus: UserStatusService,
    private userServ: UsersService,
    private authServ: AuthService,
    private loadServ: LoadService,
    private route: Router
  ){
    this.getUsers();
  }

  getUsers() {
    this.loadServ.presentLoad('Loading...');
    this.userServ.getUsers().subscribe((usr)=>{
      this.users = usr;
      this.loadServ.dismissLoad();
    });
  }

  logout(){
    this.loadServ.presentLoad('Authentication...');
    this.userStatus.signOut().then((out)=>{
      this.route.navigate(['/login']);
      this.loadServ.dismissLoad();
    });
  }

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

}
