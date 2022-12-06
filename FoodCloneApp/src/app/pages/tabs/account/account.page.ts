import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {OrderService} from "../../../services/order/order.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  orders: any = [];
  profile: any = {}
  isLoading: boolean = true;
  ordersSub: Subscription | undefined;


  constructor(private ordersService: OrderService) {
  }

  ngOnInit() {
    this.ordersSub = this.ordersService.orders.subscribe(order => {
      console.log('order data: ', order)
      this.orders = order;
    })
    this.getData();
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
