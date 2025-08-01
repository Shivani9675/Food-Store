import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Map, MapStyle, Marker, config } from '@maptiler/sdk';
import { GeocodingControl } from "@maptiler/geocoding-control/maptilersdk";
import { geocoding } from '@maptiler/client';

import '@maptiler/sdk/dist/maptiler-sdk.css';
import "@maptiler/geocoding-control/style.css";

@Component({
  selector: 'app-map-tiler',
  imports: [],
  templateUrl: './map-tiler.component.html',
  styleUrl: './map-tiler.component.css'
})
export class MapTilerComponent implements OnInit, AfterViewInit, OnDestroy {
  // map: Map | undefined;
  map!: Map;
  marker!: Marker;

  @ViewChild('map') private mapContainer!: ElementRef<HTMLElement>;

  ngOnInit(): void {
    config.apiKey = 'tRQM7bBvWAJECdA7FA1m';
  }

  ngAfterViewInit() {
    const initialState = { lng: 72.496563, lat: 22.9975806, zoom: 15 };

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${config.apiKey}`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });

    this.marker = new Marker({ color: '#ce0000' })
      .setLngLat([initialState.lng, initialState.lat])
      .addTo(this.map);

    const geocodingControl = new GeocodingControl({
      placeholder: 'Search location...',
      bbox: [68.1766451354, 6.747138, 97.4025614766, 35.4940095078],
      country: ['IN']
    });

    geocodingControl.on('select', (e: any) => {
      const [lng, lat] = e.feature.geometry.coordinates;

      this.map.flyTo({ center: [lng, lat], zoom: 15 });
      this.marker.setLngLat([lng, lat]);
    });


    this.map.addControl(geocodingControl, 'top-left');

    this.map.on('click', async (e) => {
      const lngLat = e.lngLat;

      try {
        const result = await geocoding.reverse([lngLat.lng, lngLat.lat]);

        const address = result.features?.[0]?.place_name || 'No address found';
        alert(`Clicked address: ${address}`);
      } catch (error) {
        console.error('Reverse geocoding failed', error);
      }
      // this.marker.setLngLat([lngLat.lng, lngLat.lat]);

      // const result = await geocoding.reverse([lngLat.lng, lngLat.lat]);
      // const address = result.features?.[0]?.place_name || 'No address found';
      // alert(`Clicked address: ${address}`);
    });
  }

  ngOnDestroy() {
    this.map?.remove();
  }
}
