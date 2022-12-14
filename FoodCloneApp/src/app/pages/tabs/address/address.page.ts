import {Component, OnDestroy, OnInit} from '@angular/core';
import {GloablService} from "../../../services/global/gloabl.service";
import {AddressService} from "../../../services/address/address.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit, OnDestroy {

  isLoading: boolean = true;
  addresses!: any[];
  addressesSub: Subscription | undefined;
  model: any={
    title: 'No Addressed added yet',
    icon: 'location-outline'
  }

  constructor(private global: GloablService, private addressService: AddressService) {
  }

  ngOnInit() {
    this.addressesSub = this.addressService.addresses.subscribe(address => {
      if (address instanceof Array) {
        this.addresses = address;
      } else {
        if (address?.delete) {
          this.addresses = this.addresses.filter(x => x.id != address.id);
        } else if (address?.update) {
          const index = this.addresses.findIndex(x => x.id == address.id);
          this.addresses[index] = address;
        } else {
          this.addresses = this.addresses.concat(address);
        }
      }
    })
    this.getAddresses();
  }

  ngOnDestroy() {
    if (this.addressesSub) this.addressesSub.unsubscribe();
  }

  editAddress(address: any) {
    //this.addressService.updateAddress();
  }

  deleteAddress(address: any) {
    console.log('address:', address);
    this.global.showAlert(
      'Are you sure you want to delete this address',
      "Confirm",
      [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('cancel');
            return;
          }
        },
        {
          text: 'Yes',
          handler: async () => {
            this.global.showLoader();
            await this.addressService.deleteAddress(address);
            this.global.hideLoader();
          }
        }
      ]
    )
  }

  getAddresses() {
    this.isLoading = true;
    this.global.showLoader();
    setTimeout(async () => {
      await this.addressService.getAddresses()
      this.isLoading = false;
      this.global.hideLoader();
    }, 2000)
  }

  getIcon(title: String) {
    return this.global.getIcon(title);
  }

}


