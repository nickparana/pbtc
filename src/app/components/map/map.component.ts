import { Component, Input, NgModule, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'map-root',
    styleUrls: ['./map.component.css'],
    templateUrl: './map.component.html'
})

export class MapComponent implements OnInit {
    
    @Input() editable: boolean;

    latitude: number = -31.7413;
    longitude: number = -60.5115;

    zoom: number = 12;
    map: any;

    @Input() public origLat: number = 0;
    @Input() public origLng: number = 0;
    @Input() public destLat: number = 0;
    @Input() public destLng: number = 0;
    @Input() public nombreOrigen: string;
    @Input() public nombreDestino: string;

    public total_distance: number = 0;

    origin_location: any;
    destination_location: any;

    travel_mode: any = google.maps.TravelMode.DRIVING;

    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;

    constructor() { }

    ngOnInit() {

        if (this.editable)
            this.initMapEditable();
        else
            this.initMapStatic();
    }

    initMapStatic() {

        this.origin_location = { lat: this.origLat, lng: this.origLng };
        this.destination_location = { lat: this.destLat, lng: this.destLng };

        this.map = new google.maps.Map(document.getElementById('map'), {
            mapTypeControl: true,
            center: { lat: this.latitude, lng: this.longitude },
            scrollwheel: false,
            draggable: false,
            panControl: false,
            zoom: this.zoom
        });

        this.drawRoute(this.origin_location, this.destination_location, this.travel_mode,
            this.directionsService, this.directionsDisplay);
    }

    initMapEditable() {

        if (window.navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.zoom = 13;

                this.map = new google.maps.Map(document.getElementById('map'), {
                    mapTypeControl: true,
                    center: { lat: this.latitude, lng: this.longitude },
                    zoom: this.zoom
                });

                let origin_input: any = document.getElementById('origin-input');
                let destination_input: any = document.getElementById('destination-input');

                // Para inputs DENTRO del mapa...
                // this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(origin_input);
                // this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(destination_input);

                let origin_autocomplete = new google.maps.places.Autocomplete(origin_input);
                origin_autocomplete.bindTo('bounds', this.map);
                let destination_autocomplete = new google.maps.places.Autocomplete(destination_input);
                destination_autocomplete.bindTo('bounds', this.map);

                origin_autocomplete.addListener('place_changed', () => {
                    let place = origin_autocomplete.getPlace();

                    console.log(place);
                    if (!place.geometry) {
                        window.alert("No se encontró lugar");
                        return;
                    }
                    this.origLat = place.geometry.location.lat();
                    this.origLng = place.geometry.location.lng();
                    this.nombreOrigen = place.formatted_address;
                    this.origin_location = place.geometry.location;
                    this.expandViewportToFitPlace(this.map, place);
                    this.drawRoute(this.origin_location, this.destination_location, this.travel_mode,
                        this.directionsService, this.directionsDisplay);
                });

                destination_autocomplete.addListener('place_changed', () => {
                    let place = destination_autocomplete.getPlace();

                    console.log(place);   // tomar para campo string en product
                    if (!place.geometry) {
                        window.alert("No se encontró lugar");
                        return;
                    }
                    this.destLat = place.geometry.location.lat();
                    this.destLng = place.geometry.location.lng();
                    this.nombreDestino = place.formatted_address;
                    this.destination_location = place.geometry.location;
                    this.expandViewportToFitPlace(this.map, place);
                    this.drawRoute(this.origin_location, this.destination_location, this.travel_mode,
                        this.directionsService, this.directionsDisplay);
                });
            });
        }
    }

    expandViewportToFitPlace(map: any, place: any) {
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(13);
        }
    }

    drawRoute(origin_location: any, destination_location: any, travel_mode: any,
        directionsService: any, directionsDisplay: any) {
        if (!origin_location || !destination_location) {
            return;
        }
        directionsDisplay.setMap(this.map);
        directionsService.route({
            //waypoints: [{ location: { lat: this.latitude, lng: this.longitude } }], // puntos intermedios
            origin: { 'location': origin_location },
            destination: { 'location': destination_location },
            travelMode: travel_mode
        }, (response: any, status: any) => {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                this.computeTotalDistance(directionsDisplay.getDirections());
            } else {
                window.alert('Solicitud de ruta ha fallado debido a: ' + status);
            }
        });
    }

    computeTotalDistance(result: any) {
        let total = 0;
        let myroute = result.routes[0];
        for (let i = 0; i < myroute.legs.length; i++) {
            total += myroute.legs[i].distance.value;
        }
        total = total / 1000;
        this.total_distance = total; // en Km    

    }
}