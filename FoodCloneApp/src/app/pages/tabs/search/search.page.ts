import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  @ViewChild('searchInput') sInput: any;
  query: any;
  isLoading: boolean = false;

  allRestaurants: any[] = [
    {
      cover: 'assets/imgs/1.jpg',
      name: 'Stayfit',
      short_name: 'stayfit',
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
      cover: 'assets/imgs/2.jpg',
      name: 'Stayfit1',
      short_name: 'stayfit1',
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
      cover: 'assets/imgs/3.jpg',
      name: 'Stayfit2',
      short_name: 'stayfit2',
      cuisines: [
        'Italian',
        'Mexican'
      ],
      rating: 5,
      delivery_time: 25,
      distance: 2.5,
      price: 100
    },
  ]
  restaurants: any[] = [];

  constructor() {
  }

  ngOnInit() {
    setTimeout(() => {
      this.sInput.setFocus()
    }, 500);
  }

  onSearchChange(event: any) {
    this.query = event.detail.value.toLowerCase();
    if (this.query.length > 0) {
      this.restaurants = this.allRestaurants.filter((element: any) => element.short_name.includes(this.query))
    }
  }
}
