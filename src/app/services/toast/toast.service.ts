import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) { }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: 'middle',
      cssClass: 'toast-message'
    });
    toast.present();
  }
}
