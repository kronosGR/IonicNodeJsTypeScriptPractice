import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {Preferences} from "@capacitor/preferences";
import {IonContent, NavController} from "@ionic/angular";
import * as moment from "moment";
import {OrderService} from "../../../services/order/order.service";
import {GloablService} from "../../../services/global/gloabl.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  @ViewChild(IonContent, {static: false}) content: any;
  urlCheck: any;
  url: any;
  model: any = {};
  deliveryCharge = 20;
  instruction: any;
  location: any = {};

  constructor(private router: Router, private orderService: OrderService, private global: GloablService,
              private nacCtrl: NavController) {
  }

  ngOnInit() {
    this.checkUrl();
    this.getModel();
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

  async getModel() {
    let data: any = await this.getCard();
    this.location = {
      lat: 58.8490393, lng: 5.7480021, address: "Gravarsveien 34, 4306 Sandnes"
    }
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
        this.calculate();
      } else {
        this.model.items[i].quantity += 1; // this.items[index].quantity =
        // this.items[index].quantity + 1
        this.calculate();
      }
    } catch (e) {
      console.log(e);
    }
  }

  addAddress() {

  }

  changeAddress() {

  }

  async makePayment() {
    try {
      const data = {
        restaurant_id: this.model.restaurant.uid,
        res: this.model.restaurant,
        order: JSON.stringify(this.model.items),
        time: moment().format('lll'),
        address: this.location,
        total: this.model.totalPrice,
        grandTotal: this.model.grandTotal,
        deliveryCharge: this.deliveryCharge,
        status: "Created",
        paid: "COD"
      }
      console.log('order: ', data)
      await this.orderService.placeOrder(data);

      // clear cart
      await this.clearCart();

      this.global.successToast('Your order is Places Successfully');
      this.nacCtrl.navigateRoot(['tabs/account'])
    } catch (e) {
      console.log(e)
    }
  }

  scrollToBottom() {
    this.content.scrollToBottom(500);
  }
}
