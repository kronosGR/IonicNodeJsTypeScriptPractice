import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../../../services/api/api.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  @ViewChild('searchInput') sInput: any;
  model: any = {
    icon: 'search-outline',
    title: 'No restaurants found'
  };
  query: any;
  isLoading: boolean = false;

  allRestaurants: any[] = []
  restaurants: any[] = [];

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.allRestaurants = this.api.allRestaurants;
      this.sInput.setFocus()
    }, 500);
  }

  onSearchChange(event: any) {
    this.query = event.detail.value.toLowerCase();
    this.restaurants = [];
    if (this.query.length > 0) {
      this.isLoading = true;
      setTimeout(async () => {
        this.restaurants = await this.allRestaurants.filter((element: any) => element.short_name.includes(this.query))
        this.isLoading = false;
      }, 3000)
    }
  }
}
