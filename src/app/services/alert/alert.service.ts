import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public alertCtrl: AlertController) { }

  async myAlert(msg){
    const alert = await this.alertCtrl.create({
      header: 'Atenção',
      message: msg,
      buttons: ['Entendi']
    });
    await alert.present();
  }
}
