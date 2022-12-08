import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  model: any = {};
  deliveryCharge = 20;

  private _cart = new BehaviorSubject<any>(null);

  get cart(){
    return this._cart.asObservable();
  }

  constructor() { }

  getCartData(){
    let data: any = await this.getCard();
    if (data?.value) {
      this.model = await JSON.parse(data.value);
      this.calculate();
    }
  }

  quantityMinus(i: number) {
    if (this.model.items[i].quantity !== 0) {
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
      if (!this.model.items[i].quantity || this.model.items[i].quantity == 0) {
        this.model.items[i].quantity = 1;
      } else {
        this.model.items[i].quantity += 1; // this.items[index].quantity =
        // this.items[index].quantity + 1
        this.calculate();
      }
    } catch (e) {
      console.log(e);
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

  clearCart();
}
