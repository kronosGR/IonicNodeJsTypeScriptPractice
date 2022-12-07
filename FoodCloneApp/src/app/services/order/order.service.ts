import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ApiService} from "../api/api.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private _orders = new BehaviorSubject<any>(null);

  get orders() {
    return this._orders.asObservable();
  }

  constructor(private api: ApiService) {
  }

  getOrders() {
    try {
      const orders = this.api.orders;
      this._orders.next(orders);
    } catch (e) {
      throw (e);
    }
  }

  placeOrder(param: any) {
    try {
      param.user_id = '1';
      param.id = '4tg3g4636h356h7457h3';
      param.order = JSON.parse(param.order);
      this._orders.next(param)
    } catch (e) {
      throw (e);
    }
  }

  updateOrder(param: any) {
  }

}
