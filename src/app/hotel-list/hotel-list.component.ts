import { Component, Input } from '@angular/core';
import { Hotel, MapLocation } from '@models';

@Component({
  selector: 'lh-hotel-list',
  templateUrl: './hotel-list.component.html'
})
export class HotelListComponent {
  // list of all hotels
  @Input() hotels: Hotel[] = [];

  // set current active hotel
  @Input() set active(val: Hotel) {
    if (val) {
      this._active = val;
      this.scrollToItem(val);
    }
  }
  get active() {
    return this._active;
  }

  _active: Hotel;

  // current Location
  @Input() centerLocation: MapLocation;

  /**
   * @function
   * @description: scroll to the selected hotel card
   * @param val {Hotel}
   */
  scrollToItem(val: Hotel): void {
    let item: any = document.getElementById(val.place_id);
    if (item) {
      item.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    }
  }

}
