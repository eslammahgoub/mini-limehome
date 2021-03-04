/**
 * This un used service was used before in the Here map API
 */

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel, HotelParam, MapLocation } from '@models';
import { environment } from 'src/environments/environment';

export const HOTELS_BASE_URL: string = 'http://localhost:4200/api';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private _autToken: string = environment.mapToken;

  constructor(
    private http: HttpClient,
  ) { }

  /** GET hotels from the server */
  getHetels(mapLocation: MapLocation): Observable<Hotel[]> {
    const params: HotelParam = {
      r: "150",
      q: "hotels",
      in: `circle:${mapLocation.lat},${mapLocation.lng}`
    };
    const fromObject: any = params;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this._autToken
    });
    return this.http.get<Hotel[]>(HOTELS_BASE_URL, {
      headers,
      params: new HttpParams({
        fromObject,
      }),
      // withCredentials: true,
    })
  }
}
