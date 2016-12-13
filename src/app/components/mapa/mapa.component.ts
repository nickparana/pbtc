import { Component, Input, OnInit } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { Transportista } from '../../models/transportista';
import { Producto } from '../../models/producto';
import { TransportistaService } from '../../services/transportista.service';
import { ProductoService } from '../../services/producto.service';

@Component({
    selector: 'mapa-global',
    templateUrl: './mapa.component.html',
    styleUrls: ['./mapa.component.css']
})

export class MapaComponent implements OnInit {

    ngOnInit() {
        this.getTransportistas();
        this.getProductos();
        this.initMap();
    }

    constructor(
        private transportistaService: TransportistaService,
        private productoService: ProductoService) { }

    private latitude: number = -31.7413;
    private longitude: number = -60.5115;

    private bounds: any = new google.maps.LatLngBounds();

    private zoom: number = 12;
    private map: any;

    private posicionesTransportistas: Posicion[] = [];
    private posicionesProductos: Posicion[] = [];
    private productos: Producto[] = [];
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
        this.transportistas.forEach(t => {
            this.posicionesTransportistas.forEach(posicion => {
                let marker = new google.maps.Marker({
                    position: posicion,
                    map: this.map
                });
                this.bounds.extend(marker.getPosition());
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
        this.map.fitBounds(this.bounds);
    }

    setProductosMarkers() {      
        this.productos.forEach(c => {
            this.posicionesProductos.forEach(posicion => {
                let marker = new google.maps.Marker({
                    position: posicion,
                    map: this.map,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                });
                this.bounds.extend(marker.getPosition());
                let infowindow = new google.maps.InfoWindow({
                    content: c.nombre+" - Estado: " + c.estadoProducto
                });
                marker.addListener('mouseover', () => {
                    infowindow.open(this.map, marker);
                });
                marker.addListener('mouseout', () => {
                    infowindow.close();
                });
            })
        });
        this.map.fitBounds(this.bounds);
    }

    getTransportistas() {
        this.transportistaService.getTransportistas()
            .subscribe(
            transportistas => { this.transportistas = transportistas },
            error => console.log(error),
            () => { this.getPosicionesTransportistas(); this.setTransportistasMarkers(); });
    }

    // getProductos() {
    //     this.productoService.getProductos()
    //         .subscribe(
    //         productos => { this.productos = productos },
    //         error => console.log(error),
    //         () => { this.getPosicionesProductos(); this.setProductosMarkers(); });
    // }

    getProductos() {
        this.productoService.getProducto(1)
            .subscribe(
            producto => { this.productos.push(producto) },
            error => console.log(error),
            () => { this.getPosicionesProductos(); this.setProductosMarkers(); });
    }


    getPosicionesTransportistas() {
        this.transportistas.forEach(t => {
            let posicion: Posicion = { lat: t.latActual, lng: t.lngActual }
            this.posicionesTransportistas.push(posicion);
        })
    }

    getPosicionesProductos() {
        this.productos.forEach(c => {
            let posicion: Posicion = { lat: c.origen.latitud, lng: c.origen.longitud }
            this.posicionesProductos.push(posicion);
        })
        console.log(this.productos)
        console.log(this.posicionesProductos)
    }
}

interface Posicion {
    lat: number;
    lng: number;
}