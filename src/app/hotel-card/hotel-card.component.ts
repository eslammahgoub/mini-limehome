import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hotel, MapLocation } from '@models';

@Component({
  selector: 'lh-hotel-card',
  templateUrl: './hotel-card.component.html',
})
export class HotelCardComponent {
  // hotel obj
  @Input() hotel: Hotel;
  // current hotel obj
  @Input() activeHotel: Hotel;

  // current location
  @Input() centerLocation: MapLocation = {lat: null, lng: null};

  @Output() bookHotel: EventEmitter<Hotel> = new EventEmitter<Hotel>();


  /**
   * @function
   * @description calculate by KM from the current location
   * @param mapLocation {lat: Function, lng: Function} 
   * @returns {string}
   */
  calcFarFromCenter(mapLocation: {lat: Function, lng: Function}): string {
    return this.calcCrow(mapLocation.lat(), mapLocation.lng(), this.centerLocation.lat, this.centerLocation.lng).toFixed(2);
  }

  /**
   * @description This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
   * @param lat1
   * @param lon1 
   * @param lat2 
   * @param lon2
   * @return {string} 
   */
  calcCrow(lat1: number, lon1: number, lat2: number, lon2: number): number {
    let R = 6371; // km
    let dLat = this.toRad(lat2-lat1);
    let dLon = this.toRad(lon2-lon1);
    lat1 = this.toRad(lat1);
    lat2 = this.toRad(lat2);

    let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    let d = R * c;
    return d;
  }

  // Converts numeric degrees to radians
  toRad(Value: number) {
      return Value * Math.PI / 180;
  }

}
