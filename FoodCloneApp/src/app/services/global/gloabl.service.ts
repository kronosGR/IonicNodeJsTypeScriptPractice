import {Injectable} from '@angular/core';
import {AlertController, LoadingController, ModalController, ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class GloablService {

  constructor(private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private modalCtrl: ModalController) {
  }

  showAlert(){
    this.alertCtrl.create({
      header:,
      message:
    })
  }
}
