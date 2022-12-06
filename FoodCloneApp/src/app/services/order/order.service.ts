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
    const orders = this.api.orders;
    this._orders.next(orders);
  }

  placeOrder(param: any) {

  }

  updateOrder(param: any){}

}
