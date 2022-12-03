import {Injectable} from '@angular/core';
import {AlertController, LoadingController, ModalController, ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class GloablService {
  isLoading: boolean = false;

  constructor(private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private modalCtrl: ModalController) {
  }

  async showAlert(message: any, header?: any, buttonArray?: any[]) {
    await this.alertCtrl.create({
      header: header ? header : 'Authentication failed',
      message: message,
      buttons: buttonArray ? buttonArray : ['Okay']
    })
      .then(alertEl => alertEl.present);
  }

  async showToast(msg: any, color: any, position: any, duration = 3000) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: duration,
      color: color,
      position: position
    })
  }

  errorToast(msg?: any, duration = 4000) {
    this.showToast(
      msg ? msg : 'No internet connection',
      'danger',
      'bottopm',
      duration
    )
  }

  successToast(msg: any) {
    this.showToast(
      msg,
      'success',
      'bottopm'
    )
  }

  showLoader(msg?: any, spinner?: any) {
    this.isLoading = true;
    return this.loadingCtrl.create({
      message: msg,
      spinner: spinner ? spinner : 'bubbles'
    }).then(res => {
      res.present().then(() => {
        if (!this.isLoading) {
          res.dismiss().then(() => {
            console.log('abort presenting')
          })
        }
      })
    })
      .catch(e => {
        console.log('error', e)
      })
  }

  hideLoader() {
    this.isLoading = false;
    return this.loadingCtrl.dismiss()
      .then(() => console.log('dismissed'))
      .catch(e => console.log('error: ', e))
  }

  

}
