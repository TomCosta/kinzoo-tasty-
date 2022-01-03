import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertService } from '../services/alert/alert.service';
import { LoadService } from '../services/loading/load.service';
import { AuthService } from '../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  registerForm: FormGroup;
  loginForm: FormGroup;
  isSubmitted = false;
  mode: string;

  constructor(
    private alertServ: AlertService,
    private loadServ: LoadService,
    private authServ: AuthService,
    private fb: FormBuilder,
    private route: Router
  ){
    this.isLoggedIn();
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      userMail: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      userMail: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }

  get formControls() { return this.loginForm.controls; };

  ngOnInit() {
    this.mode = 'loginMode';
  }

  login(event) {
    event.stopPropagation();
    this.isSubmitted = true;
    if (!this.loginForm.value.userMail || !this.loginForm.value.password) {
      console.log('😡 LOGIN FORM INVALID: ', this.loginForm.invalid);
      return;
    } else {
      this.loadServ.presentLoad('Authentication...');
      this.authServ.login(this.loginForm.value.userMail, this.loginForm.value.password)
      .then((resp)=>{
        if (resp) {
          this.loginForm.reset();
          localStorage.setItem('kinzooAccess', resp.user['refreshToken']);
          this.route.navigateByUrl('home');
        }else{
          console.log('😡 ERROR LOGIN: ', resp['message']);
        }
        this.loadServ.dismissLoad();
      }, error => {
        this.loadServ.dismissLoad();
        switch (error['code']) { 
          case "auth/wrong-password":
            this.alertServ.myAlert("Wrong email or password");
            break;    
          case "auth/user-not-found":
            this.alertServ.myAlert("User not found");
            break;    
          case "auth/invalid-email":
            this.alertServ.myAlert("Wrong email or password");
            break;
        }
      });
    }
  }

  register(event) {
    event.stopPropagation();
    this.isSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {
      this.loadServ.presentLoad('Authentication...');
      const dataUser = {
        userName: this.registerForm.value.userName,
        userMail: this.registerForm.value.userMail,
        password: this.registerForm.value.password
      };
      this.authServ.register(dataUser.userMail, dataUser.password)
        .then((resp) => {
          if (resp) {
            const userID = resp.user.uid;
            this.authServ.createProfile(userID, dataUser);
            localStorage.setItem('kinzooAccess', resp.user['refreshToken']);
            this.registerForm.reset();
            this.route.navigateByUrl('home');
          } else {
            this.route.navigate(['/login']);
          }
          this.loadServ.dismissLoad();
        });
    }
  }

  async isLoggedIn(){
    let log = this.authServ.isLogged();
      if (!log) {
        this.route.navigateByUrl('login');
      }else{
        this.route.navigateByUrl('home');
      }
  }

}
