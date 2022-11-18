import {Component, OnInit} from '@angular/core';
import SwiperCore, {Keyboard, Pagination, Scrollbar, SwiperOptions} from "swiper";

SwiperCore.use([Pagination, Keyboard])

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  config: SwiperOptions = {
    slidesPerView: 1.1,
    pagination: {clickable: true},
    keyboard: {enabled: true}

  }

  constructor() {
  }

  ngOnInit() {
  }


}
