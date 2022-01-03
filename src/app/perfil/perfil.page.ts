/* eslint-disable @typescript-eslint/dot-notation */
import { LoadService } from '../services/loading/load.service';
import { UsersService } from '../services/user/users.service';
import { AuthService } from '../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  disciplinasObs$: Subscription;
  myDisciplinas = [];
  disciplinas = [];
	userUID: any;
	model: User;
  isProf = '';
  tempUser;
  userName;

  constructor(
    private alertCtrl: AlertController,
    public loadingServ: LoadService,
    private userServ: UsersService
  ){
    this.userUID = this.userServ.getUserUID();
    this.model = new User();
  }

  ngOnInit(){
    this.getUserProfile();
  }

  getUserProfile(){
    this.loadingServ.presentLoad('Profile...');
    if(this.userUID!==undefined){
      this.userServ.getUserProfile(this.userUID).then((doc) => {
        if (doc.exists) {
          this.tempUser = doc.data();
          this.model = this.tempUser;
          this.isProf = this.tempUser.prof;
          this.disciplinas = doc.data()['disc'];
          this.userServ.setProfileObs(this.tempUser);
          this.loadingServ.dismissLoad();
        } else {
          console.log('Sem dados User!');
          this.loadingServ.dismissLoad();
        }
      });
    }else{
      this.userUID = this.userServ.getUserUID();
      setTimeout(() => {
        this.getUserProfile();
      }, 400);
      this.loadingServ.dismissLoad();
    }
  }

  editProfile(model) {
    this.userServ.updateProfile(this.userUID, model)
      .then(res => {
        this.getUserProfile();
        this.showAlert('Perfil atualizado com sucesso.');
    });
  }

  async showAlert(msg) {
    const alert = await this.alertCtrl.create({
      header: 'Parabéns!',
      message: msg,
      cssClass: 'alert-custom-class',
      animated: true,
      buttons: ['Entendi']
    });
    await alert.present();
  }

  ionViewDidLeave(){
    this.disciplinasObs$.unsubscribe();
    this.myDisciplinas=[];
  }
}
