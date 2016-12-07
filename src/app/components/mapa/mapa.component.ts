import { Component, Input, OnInit } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { Transportista } from '../../models/transportista';
import { Carga } from '../../models/carga';
import { TransportistaService } from '../../services/transportista.service';
import { CargaService } from '../../services/carga.service';


@Component({
    selector: 'my-mapa',
    templateUrl: './mapa.component.html',
    styleUrls: ['./mapa.component.css']
})

export class MapaComponent implements OnInit {

    ngOnInit() {
        this.getTransportistas();
        this.getCargas();
        this.initMap();
    }

    constructor(private transportistaService: TransportistaService,
        private cargaService: CargaService) { }

    private latitude: number = -31.7413;
    private longitude: number = -60.5115;

    private zoom: number = 12;
    private map: any;

    private posicionesTransportistas: Posicion[] = [];
    private posicionesCargas: Posicion[] = [];
    private cargas: Carga[] = [];
    private transportistas: Transportista[];

    initMap() {
        let myLatLng = { lat: -25.363, lng: 131.044 };
        this.map = new google.maps.Map(document.getElementById('mapa'), {
            mapTypeControl: true,
            center: { lat: this.latitude, lng: this.longitude },
            scrollwheel: true,
            draggable: true,
            panControl: true,
            zoom: this.zoom
        });
    }

    setTransportistasMarkers() {
        let bounds = new google.maps.LatLngBounds();
        this.transportistas.forEach(t => {
            this.posicionesTransportistas.forEach(posicion => {
                let marker = new google.maps.Marker({
                    position: posicion,
                    map: this.map
                });
                bounds.extend(marker.getPosition());
                let infowindow = new google.maps.InfoWindow({
                    content: t.apellido + ", " + t.nombre + " - Estado: " + t.estado
                });
                marker.addListener('mouseover', () => {
                    infowindow.open(this.map, marker);
                });
                marker.addListener('mouseout', () => {
                    infowindow.close();
                });
            })
        });
        this.map.fitBounds(bounds);
    }

    setCargasMarkers() {
        let bounds = new google.maps.LatLngBounds();
        this.cargas.forEach(c => {
            this.posicionesCargas.forEach(posicion => {
                let marker = new google.maps.Marker({
                    position: posicion,
                    map: this.map,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                });
                bounds.extend(marker.getPosition());
                let infowindow = new google.maps.InfoWindow({
                    content: c.titulo+" - Estado: " + c.estado
                });
                marker.addListener('mouseover', () => {
                    infowindow.open(this.map, marker);
                });
                marker.addListener('mouseout', () => {
                    infowindow.close();
                });
            })
        });
        this.map.fitBounds(bounds);
    }

    getTransportistas() {
        this.transportistaService.getTransportistas()
            .subscribe(
            transportistas => { this.transportistas = transportistas },
            error => console.log(error),
            () => { this.getPosicionesTransportistas(); this.setTransportistasMarkers(); });
    }

    getCargas() {
        this.cargaService.getCargas()
            .subscribe(
            cargas => { this.cargas = cargas },
            error => console.log(error),
            () => { this.getPosicionesCargas(); this.setCargasMarkers(); });
    }

    getPosicionesTransportistas() {
        this.transportistas.forEach(t => {
            let posicion: Posicion = { lat: t.latActual, lng: t.lngActual }
            this.posicionesTransportistas.push(posicion);
        })
    }

    getPosicionesCargas() {
        this.cargas.forEach(c => {
            let posicion: Posicion = { lat: c.origLat, lng: c.origLng }
            this.posicionesCargas.push(posicion);
        })
    }
}

interface Posicion {
    lat: number;
    lng: number;
}