import { Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Hotel, MapLocation } from '@models';

// Google map lib
import { Loader } from '@googlemaps/js-api-loader';

declare var google: any;

@Component({
  selector: 'lh-map-view',
  templateUrl: './map-view.component.html'
})
export class MapViewComponent implements OnInit {
  // map element
  @ViewChild("map", {static: false})
  public mapElement: ElementRef;

  // current location
  _location: MapLocation;
  @Input() set mapLocation(value: MapLocation) {
      if (value)  this._location = value;
      if (this._map)  this.updateMap();
  }
  get mapLocation(): MapLocation {
    return this._location;
  }

  private _map: any;

  
  // Map Loader
  private loader = new Loader({
    apiKey: environment.mapApikeyGoogle,
    version: "weekly",
    libraries: ["places"],
    mapIds: environment.mapIds
  });

  /**
   * placeService
   * @Note: Should be in services file but for speedness && short of the time I'll let that here
   */
  private _placeService: any;

  // Places google map API request
  private _request = {
    location: {},
    radius: '500',
    type: ['lodging'],
  };

  // List of current markers
  private markers: any[] = [];

  // Icons of markers selected/deselected
  private markerOffIcon: string = 'assets/home-icon.svg';
  private markerOnIcon: string = 'assets/home-icon-active.svg';

  // events for [hotels list] and hotelactivated outputs
  @Output('hotelsChanged') hotelsChanged: EventEmitter<Hotel[]> = new EventEmitter<Hotel[]>();
  @Output('hotelActivated') hotelActivated: EventEmitter<Hotel> = new EventEmitter<Hotel>();

  constructor(private ngZone: NgZone) {}


  ngOnInit() {
    this.initGoogleMap();
  }

  /**
   * @function
   * @description: init google map api
   * @note: it should be [initMap] as name but There was a two functions one for init here map && other for init google map
   * so that's why i go with [initGoogleMap] as name
   */
  initGoogleMap() {
    this.loader.loadCallback(e => {
      if (e) {
        console.log(e);
      } else {
        this._map = new google.maps.Map(this.mapElement.nativeElement as HTMLElement, {
          mapId: environment.mapIds[0],
          center: { lat: this._location?.lat, lng: this._location?.lng },
          zoom: 16,
          mapTypeControl: false,
          panControl: false,
          streetViewControl: false,
          disableDoubleClickZoom: true,
          // gestureHandling: 'none',
          scaleControl: false,
          zoomControl : false,
        }
        );
        this._placeService = new google.maps.places.PlacesService(this._map);
        this.findPlaces();
      }
    });
  }

  /**
   * @function
   * @description: update the current map
   */
  updateMap(): void {
    this._map.setCenter({lat:this._location.lat, lng:this._location.lng});
    this._map.setZoom(14);
    this.findPlaces();
  }

  /**
   * @function
   * @description: find all places around current location, [emit] hotel list
   */
  findPlaces(): void {
    const self = this;
    self._request.location = { lat: this._location?.lat, lng: this._location?.lng };
    self._placeService.nearbySearch(self._request, (results: any, status: string) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        self.ngZone.run(() => {
          self.hotelsChanged.emit(results);
        });
        for (let i = 0; i < results.length; i++) {
          self.createMarkers(self, results[i]);
        }
      }
    });
  }

  /**
   * @function
   * @description: set marker for the place
   * @param self {this}
   * @param place {Hotel}
   */
  createMarkers(self: this, place: Hotel): void {
    const marker = new google.maps.Marker({
      position: place.geometry.location,
      map: self._map,
      icon: self.markerOffIcon,
    });
    self.markers.push(marker);
    marker.addListener("click", () => {
      self.setActive(self, marker, place);
    });
  }

  /**
   * @function
   * @description: set current selected hotel and [emit] the activated hotel
   * @param self {this}
   * @param marker {Marker}
   * @param hotel {Hotel}
   */
  setActive(self: this, marker: any, hotel: Hotel): void {
    self.resetMarkerIcon();
    marker.setIcon(self.markerOnIcon);
    self.ngZone.run(() => {
      self.hotelActivated.emit(hotel);
    });
  }

  /**
   * @function
   * @description: Reset Marker Icons to unselected [markerOffIcon]
   */
  resetMarkerIcon(): void {
    this.markers.forEach((element) => element.setIcon(this.markerOffIcon));
  }

  /**
   * @function
   * @description: Remove the current markers
   */
  removeMarkers(): void {
    this.markers.forEach((element) => element.setMap(null));
    this.markers = [];
  }
}