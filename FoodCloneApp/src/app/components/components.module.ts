import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RestaurantComponent} from "./restaurant/restaurant.component";
import {IonicModule} from "@ionic/angular";


@NgModule({
  declarations: [RestaurantComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [RestaurantComponent],
  entryComponents: []
})
export class ComponentsModule {
}
