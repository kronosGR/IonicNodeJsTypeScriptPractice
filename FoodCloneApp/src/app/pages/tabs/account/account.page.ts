import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {OrderService} from "../../../services/order/order.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit, OnDestroy {

  orders: any = [];
  profile: any = {}
  isLoading: boolean = true;
  ordersSub: Subscription | undefined;


  constructor(private ordersService: OrderService) {
  }

  ngOnInit() {
    this.ordersSub = this.ordersService.orders.subscribe(order => {
      console.log('order data: ', order)
      if (order instanceof Array) {
        this.orders = order;
      }
    }, e => {
      console.log(e)
    })
    this.getData();
  }

  ngOnDestroy() {
    if (this.ordersSub) this.ordersSub.unsubscribe();
  }

  logout() {

  }

  reorder($event: any) {
    console.log($event)
  }

  getHelp($event: any) {
    console.log($event)
  }

  getData() {
    setTimeout(async () => {
      this.profile = {
        name: 'Kronos',
        phone: '2342342',
        email: 'gep@gmail.com'
      }
      await this.ordersService.getOrders();
      this.isLoading = false;
    }, 2000)
  }
}
