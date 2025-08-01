import { Injectable } from '@angular/core';
import { LatLngLiteral } from 'leaflet';
import { Observable } from 'rxjs';
import { geocoding } from '@maptiler/client';
import { config } from '@maptiler/sdk';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() {
    config.apiKey = 'tRQM7bBvWAJECdA7FA1m';
  }

  async getCurrentCoordinates(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  async getAddressFromCoords(lng: number, lat: number): Promise<string> {
    try {
      const result = await geocoding.reverse([lng, lat]);
      return result.features?.[0]?.place_name || 'Unknown location';
    } catch (err) {
      console.error('Reverse geocoding failed', err);
      return 'Unknown location';
    }
  }

  getCurrentLocation(): Observable<LatLngLiteral> {
    return new Observable((observer) => {
      if (!navigator.geolocation) return;

      return navigator.geolocation.getCurrentPosition(
        (pos) => {
          observer.next({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          })
        },
        (error) => {
          observer.error(error);
        }
      )
    })
  }
}
