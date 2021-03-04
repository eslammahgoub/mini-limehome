import { Component } from '@angular/core';
import { Hotel, MapLocation } from '@models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  // error && loading messages
  message: string = '';

  // current location default berlin
  mapLocation: MapLocation = {
    lat:52.5159,
    lng:13.3777
  };

  //list of current hotels
  hotels: Hotel[] = [];

  // current selected hotel
  activeHotel: Hotel;

  // modal status
  activeModal: boolean = false;
  hotelToBook: Hotel;

  constructor() {
    if(!navigator.geolocation) {
      this.message = 'Geolocation is not supported by your browser';
    } else {
      this.message = 'Locating…';
      navigator.geolocation.getCurrentPosition((position) => {
          const latitude  = position.coords.latitude;
          const longitude = position.coords.longitude;
          this.mapLocation = {lat: latitude, lng: longitude };
          this.message = null;
      }, (e) => {
        this.message = 'Unable to retrieve your location';
      });
    }
  }

  // set list of the hotels
  setHotels(hotels: Hotel[]): void {
    this.hotels = hotels;
  }

  // set active hotel
  setActiveHotel(hotel: Hotel): void {
    this.activeHotel = hotel;
  }

  // book hotel modal
  /**
   * @function
   * @description this function to open a book form modal
   * @note: it should be a service with args for short time i did that
   * @param hotel {Hotel}
   */
  bookHotel(hotel: Hotel): void {
    this.hotelToBook = hotel;
    this.activeModal = true;
  }

  // change the active modal
  changeActive(active: boolean) {
    this.activeModal = active;
    this.hotelToBook = null;
  }
}
