import {Component, OnInit} from '@angular/core';
import {GloablService} from "../../../services/global/gloabl.service";

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {

  isLoading: boolean = true;
  addresses!: any[];

  constructor(private global: GloablService) {
  }

  ngOnInit() {
    this.getAddresses();
  }

  editAddress(address: any) {

  }

  deleteAddress(address: any) {

  }

  getAddresses() {
    this.isLoading = true;
    setTimeout(() => {
      this.addresses = [
        {
          address: "Fancy Bazaar, India",
          house: "2nd Floor",
          id: "7Kox63KlggTvV7ebRKar",
          landmark: "Fancy Bazar",
          lat: 26.1830738,
          lng: 91.74049769999999,
          title: "Fancy",
          user_id: "1"
        },
        {
          address: "Kanuat palace, India",
          house: "Ground Floor",
          id: "8Kox63KlggTvV7ebRKar",
          landmark: "Bazar",
          lat: 26.1830738,
          lng: 91.74049769999999,
          title: "Work",
          user_id: "1"
        }]
      this.isLoading = false;
    }, 2000)
  }

  getIcon(title: String) {
    return this.global.getIcon(title);
  }
}
