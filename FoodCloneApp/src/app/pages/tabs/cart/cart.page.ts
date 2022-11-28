import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Preferences} from "@capacitor/preferences";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  urlCheck: any;
  url: any;
  model: any = {};
  deliveryCharge = 20;
  instruction: any;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.checkUrl();
    this.getCartData();
  }

  checkUrl() {
    let url: any = this.router.url.split('/');
    const spliced = url.splice(url.length - 2, 2);
    this.urlCheck = spliced[0]
    url.push(this.urlCheck);
    this.url = url;
  }

  getPreviousUrl() {
    return this.url.join('/');
  }

  getCard() {
    return Preferences.get({key: 'cart'});
  }

  async getCartData() {
    let data: any = await this.getCard();
    if (data?.value) {
      this.model = await JSON.parse(data.value);
      this.calculate();
    }
  }

  async calculate() {
    let item = this.model.items.filter((x: any) => x.quantity > 0);
    this.model.items = item;
    this.model.totalPrice = 0;
    this.model.totalItem = 0;
    this.model.deliveryCharge = 0;
    this.model.grandTotal = 0;
    item.forEach((element: any) => {
      this.model.totalItem += element.quantity;
      this.model.totalPrice += (parseFloat(element.price) * parseFloat(element.quantity));
    });
    this.model.deliveryCharge = this.deliveryCharge;
    this.model.totalPrice = parseFloat(this.model.totalPrice).toFixed(2);
    this.model.grandTotal = (parseFloat(this.model.totalPrice) + parseFloat(this.model.deliveryCharge)).toFixed(2);
    if (this.model.totalItem == 0) {
      this.model.totalItem = 0;
      this.model.totalPrice = 0;
      this.model.grandTotal = 0;
      await this.clearCart();
      this.model = null;
    }
    console.log('cart: ', this.model);
  }

  clearCart() {
    Preferences.remove({key: 'cart'});
  }

  quantityMinus(i: number) {
    if(this.model.items[i].quantity !== 0) {
      this.model.items[i].quantity -= 1; // this.items[index].quantity =
      // this.items[index].quantity - 1
    } else {
      this.model.items[i].quantity = 0;
    }
    this.calculate();
  }

  quantityPlus(i: number) {
    try {
      console.log(this.model.items[i]);
      if(!this.model.items[i].quantity || this.model.items[i].quantity == 0) {
        this.model.items[i].quantity = 1;
        this.calculate();
      } else {
        this.model.items[i].quantity += 1; // this.items[index].quantity =
        // this.items[index].quantity + 1
        this.calculate();
      }
    } catch(e) {
      console.log(e);
    }
  }

  addAddress() {

  }

  changeAddress() {

  }

  makePayment() {

  }
}
