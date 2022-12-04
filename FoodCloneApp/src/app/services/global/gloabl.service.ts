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

  setLoader(){
    this.isLoading = !this.isLoading;
  }

  showAlert(message: any, header?: any, buttonArray?: any[]) {
    this.alertCtrl.create({
      header: header ? header : 'Authentication failed',
      message: message,
      buttons: buttonArray ? buttonArray : ['Okay']
    })
      .then(alertEl => alertEl.present());
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
      'bottom',
      duration
    )
  }

  successToast(msg: any) {
    this.showToast(
      msg,
      'success',
      'bottom'
    )
  }

  showLoader(msg?: any, spinner?: any) {
    if (this.isLoading) this.setLoader();
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
    if (this.isLoading) this.setLoader();
    // this.isLoading = false;
    return this.loadingCtrl.dismiss()
      .then(() => console.log('dismissed'))
      .catch(e => console.log('error: ', e))
  }

  async createModal(options: any) {
    const modal = await this.modalCtrl.create(options);
    await modal.present();
    const {data} = await modal.onWillDismiss();
    console.log(data);
    if (data) return data;
  }

  modalDismiss(val?: any) {
    let data: any = val ? val : null;
    console.log('data', data);
    this.modalCtrl.dismiss(data);
  }

  getIcon(title: String){
    const name = title.toLowerCase();
    switch (name) {
      case "home": return 'home-outline';
      case "work": return 'briefcase-outline';
      default: return 'location-outline';
    }
  }


}
