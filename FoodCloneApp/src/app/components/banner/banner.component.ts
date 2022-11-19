import {Component, Input, OnInit} from '@angular/core';
import SwiperCore, {Keyboard, Pagination, SwiperOptions} from "swiper";

SwiperCore.use([Pagination, Keyboard])

// @ts-ignore
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit{
  @Input() bannerImages: any[] = [];
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
