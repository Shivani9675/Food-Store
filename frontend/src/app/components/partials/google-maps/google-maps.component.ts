import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-google-maps',
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './google-maps.component.html',
  styleUrl: './google-maps.component.css'
})
export class GoogleMapsComponent implements OnInit {

  @ViewChild('searchBox') searchBox!: ElementRef;

  zoom = 15;
  center: google.maps.LatLngLiteral = { lat: 22.9975806, lng: 72.496563 }; 

  markerPosition?: google.maps.LatLngLiteral;
  selectedLat?: number;
  selectedLng?: number;
  selectedAddress: string = '';

  ngOnInit() {
    this.setCurrentLocation();
  }

  ngAfterViewInit() {
    this.initAutocomplete();
  }

  setCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.center = coords;
        this.markerPosition = coords;
        this.selectedLat = coords.lat;
        this.selectedLng = coords.lng;
        this.getAddressFromCoords(coords.lat, coords.lng);
      });
    }
  }

  initAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.searchBox.nativeElement);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const location = place.geometry?.location;
        if (!location) return;
        const coords = {
          lat: location.lat(),
          lng: location.lng()
        };
        this.center = coords;
        this.markerPosition = coords;
        this.selectedLat = coords.lat;
        this.selectedLng = coords.lng;
        this.getAddressFromCoords(coords.lat, coords.lng);
      }
    });
  }

  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      const coords = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
      this.markerPosition = coords;
      this.selectedLat = coords.lat;
      this.selectedLng = coords.lng;
      this.getAddressFromCoords(coords.lat, coords.lng);
    }
  }

  getAddressFromCoords(lat: number, lng: number) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results && results.length > 0) {
        this.selectedAddress = results[0].formatted_address;
      } else {
        this.selectedAddress = 'Address not found';
      }
    });
  }
}
