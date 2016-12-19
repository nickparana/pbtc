import { Component, Input, OnInit, EventEmitter, NgZone } from '@angular/core';
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

    loaded: boolean = false;
    loadedChange = new EventEmitter();
    boundsChange = new EventEmitter();


    ngOnInit() {
        this.initMap();
    }


    // MOCK

    // private productos: Array<any> = [{"id":1,"nombre":"2 Silobolsas de soja","origen":{"latitud":-36.6147573,"longitud":-64.2839,"direccion":"Buenos Aires"},"destino":{"latitud":-31.6106578,"longitud":-58.017434,"direccion":"Cordoba"},"estadoProducto":"Disponible"},{"id":2,"nombre":"2 Silobolsas de trigo","origen":{"latitud":-31.6106578,"longitud":-58.017434,"direccion":"La Pampa"},"destino":{"latitud":-37.2017285,"longitud":-59.8410697,"direccion":"Rosario"},"estadoProducto":"Disponible"},{"id":3,"nombre":"2 silobolsas de trigo","origen":{"latitud":-31.6106578,"longitud":-58.017434,"direccion":"Cordoba"},"destino":{"latitud":-31.6106578,"longitud":-58.017434,"direccion":"La Pampa"},"estadoProducto":"Disponible"}]

    constructor(
        private zone: NgZone,
        private transportistaService: TransportistaService,
        private productoService: ProductoService) {
    }

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
        this.map = new google.maps.Map(document.getElementById('map-canvas'), {
            mapTypeControl: true,
            center: { lat: this.latitude, lng: this.longitude },
            scrollwheel: true,
            draggable: true,
            panControl: true,
            zoom: this.zoom
        });

        // this.getTransportistas();
        this.getProductos();

        google.maps.event.addListener(this.map, 'idle', () => {
            this.loaded = true;
            google.maps.event.addListenerOnce(this.map, 'tilesloaded', () => {

                this.loadedChange.emit(this.loaded);
                this.map.fitBounds(this.bounds);
            });

            alert(this.loaded)
        });


    }

    // setTransportistasMarkers() {
    //     this.transportistas.forEach(t => {
    //         this.posicionesTransportistas.forEach(posicion => {
    //             let marker = new google.maps.Marker({
    //                 position: posicion,
    //                 map: this.map
    //             });
    //             this.bounds.extend(marker.getPosition());
    //             let infowindow = new google.maps.InfoWindow({
    //                 content: t.apellido + ", " + t.nombre + " - Estado: " + t.estado
    //             });
    //             marker.addListener('mouseover', () => {
    //                 infowindow.open(this.map, marker);
    //             });
    //             marker.addListener('mouseout', () => {
    //                 infowindow.close();
    //             });
    //         })
    //     });
    // }

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
                    content: c.nombre + " - Estado: " + c.estadoProducto
                });
                marker.addListener('mouseover', () => {
                    infowindow.open(this.map, marker);
                });
                marker.addListener('mouseout', () => {
                    infowindow.close();
                });
            })
        });
    }

    // getTransportistas() {
    //     this.transportistaService.getTransportistas()
    //         .subscribe(
    //         transportistas => { this.transportistas = transportistas },
    //         error => console.log(error),
    //         () => { this.getPosicionesTransportistas(); this.setTransportistasMarkers(); });
    // }

    getProductos() {
        this.productoService.getProductos()
            .subscribe(
            productos => this.productos = productos,
            error => console.log(error),
            () => { this.getPosicionesProductos(); this.setProductosMarkers(); }
            );
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
    }
}

interface Posicion {
    lat: number;
    lng: number;
}