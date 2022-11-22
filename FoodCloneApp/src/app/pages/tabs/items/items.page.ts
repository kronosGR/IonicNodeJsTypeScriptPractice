import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {

  id: any;
  data: any = {};
  item: any = [];
  veg: boolean = false;
  items: any = [];
  cartData: any;

  restaurants = [
    {
      uid: '12wefdss',
      cover: 'assets/imgs/1.jpg',
      name: 'Stayfit',
      short_name: 'stayfit',
      address: 'Karol Bagh, New Delhi',
      cuisines: [
        'Italian',
        'Mexican'
      ],
      rating: 5,
      delivery_time: 25,
      distance: 2.5,
      price: 100
    },
    {
      uid: '12wefdefsdss',
      cover: 'assets/imgs/2.jpg',
      name: 'Stayfit1',
      short_name: 'stayfit1',
      cuisines: [
        'Italian',
        'Mexican'
      ],
      rating: 5,
      delivery_time: 25,
      address: 'Karol Bagh, New Delhi',
      distance: 2.5,
      price: 100
    },
    {
      uid: '12wefdssrete',
      cover: 'assets/imgs/3.jpg',
      name: 'Stayfit2',
      short_name: 'stayfit2',
      cuisines: [
        'Italian',
        'Mexican'
      ],
      rating: 5,
      delivery_time: 25,
      address: 'Karol Bagh, New Delhi',
      distance: 2.5,
      price: 100
    },
  ];

  categories: any[] = [
    {
      id: "e00",
      name: "Italian",
      uid: "12wefdss"
    },
    {
      id: "e0",
      name: "Mexican",
      uid: "12wefdss"
    },
  ];

  allItems = [
    {
      category_id: "e00",
      cover: "assets/imgs/pizza.jpg",
      desc: "Great in taste",
      id: "i1",
      name: "Pizza",
      price: 120,
      rating: 0,
      status: true,
      uid: "12wefdss",
      variation: false,
      veg: false
    },
    {
      category_id: "e0",
      cover: "assets/imgs/salad.jpg",
      desc: "Great in taste",
      id: "i2",
      name: "Caprese Salad",
      price: 200,
      rating: 0,
      status: true,
      uid: "12wefdss",
      variation: false,
      veg: true
    },
    {
      category_id: "e00",
      cover: "assets/imgs/pasta.jpg",
      desc: "Great in taste",
      id: "i3",
      name: "Pasta",
      price: 150,
      rating: 0,
      status: true,
      uid: "12wefdss",
      variation: false,
      veg: false
    },
  ];

  constructor(private route: ActivatedRoute, private navCtrl: NavController, private router: Router) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramap => {
      if (!paramap.has('restaurantId')) {
        this.navCtrl.back();
        return;
      }

      this.id = paramap.get('restaurantId');
      console.log('id: ', this.id);
      this.getItems();

    })
  }

  getItems() {
    this.data = {};
    this.cartData = {};
    let data: any = this.restaurants.filter(x => x.uid === this.id);
    this.data = data[0];
    this.categories = this.categories.filter(x => x.uid === this.id);
    this.items = this.allItems.filter(x => x.uid === this.id);
    console.log(this.data);
  }

  getCuisine(cuisines: any) {
    return cuisines.join(', ');
  }

  vegOnly(event: any) {
    console.log(event.detail.checked);
    this.items = [];
    if (event.detail.checked === true) {
      this.items = this.allItems.filter(x => x.veg === true);
    } else {
      this.items = this.allItems;
    }
  }

  quantityPlus(item: any, index: number) {
    try {
      console.log(this.items[index]);
      if (!this.items[index].quantity || this.items[index].quantity === 0) {
        this.items[index].quantity = 1;
        this.calculate();
      } else {
        this.items[index].quantity += 1;
        this.calculate();
      }
    } catch (e) {
      console.log(e);
    }
  }

  quantityMinus(item: any, index: number) {
    if (this.items[index].quantity !== 0) {
      this.items[index].quantity -= 1;
    } else {
      this.items[index].quantity = 0;
    }
    this.calculate();
  }

  private calculate() {
    console.log(this.items);
    this.cartData.items = [];
    let item: any = this.items.filter((x: any) => x.quantity > 0);
    console.log(item);
    this.cartData.items = item;
    this.cartData.totalPrice = 0;
    this.cartData.totalItem = 0;
    item.forEach((element: any) => {
      this.cartData.totalItem += element.quantity;
      this.cartData.totalPrice += parseFloat(element.price) * parseFloat(element.quantity);
    })
    this.cartData.totalPrice = parseFloat(this.cartData.totalPrice).toFixed(2);
    if (this.cartData.totalItem === 0) {
      this.cartData.totalItem = 0;
      this.cartData.totalPrice = 0;
    }
    console.log('cart: ', this.cartData);
  }

  async viewCart() {
    if (this.cartData.items && this.cartData.items.length > 0) {
      await this.saveToCart();
    }
    this.router.navigate([this.router.url + '/cart'])
  }

  private async saveToCart() {
    try {
      this.cartData.restaurant = {};
      this.cartData.restaurant = this.data;
      console.log('cardData', this.cartData);
    } catch (e) {
      console.log(e)
    }
  }
}
