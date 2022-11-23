import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() item: any;
  @Input() index: any;
  // @ts-ignore
  @Output() add: EventEmitter<any> = new EventEmitter<>();
  // @ts-ignore
  @Output() minus: EventEmitter<any> = new EventEmitter<>();

  constructor() {
  }

  ngOnInit() {
  }

  quantityPlus(){
    this.add.emit(this.index);
  }

  quantityMinus(){
    this.minus.emit(this.index);
  }

}
