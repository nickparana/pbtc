import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Producto } from '../../models/producto';
import { Transportista } from '../../models/transportista';
import { ProductoService } from '../../services/producto.service';
import { TransportistaService } from '../../services/transportista.service';
import { MapComponent } from '../map/map.component';
import { Router } from '@angular/router';

@Component({
    selector: 'productos-form',
    templateUrl: './producto-form.component.html',
    styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent implements AfterViewInit {

    origenLatitud: number = 0;
    origenLongitud: number = 0;
    origenDireccion: string = "";
    destinoLatitud: number = 0;
    destinoLongitud: number = 0;
    destinoDireccion: string = "";
    distancia: number = 0;
    active: boolean = true;
    submitted: boolean = false;

    constructor(
        private productoService: ProductoService,
        private router: Router
    ) { }

    @ViewChild('map')
    private mapComponent: MapComponent;

    ngAfterViewInit() {
        this.origenLatitud = this.mapComponent.origLat;
        this.origenLongitud = this.mapComponent.origLng;
        this.origenDireccion = this.mapComponent.nombreOrigen;
        this.destinoLatitud = this.mapComponent.destLat;
        this.destinoLongitud = this.mapComponent.destLng;
        this.destinoDireccion = this.mapComponent.nombreDestino;
        this.distancia = this.mapComponent.total_distance;
    }

    newProducto = new Producto('', '', 0, '', "",
        this.origenLatitud, this.origenLongitud, this.destinoDireccion,
        this.destinoLatitud, this.destinoLongitud, this.destinoDireccion);

    addProducto() {
        this.productoService.createProducto(this.newProducto)
            .subscribe(
            producto => console.log("producto creado", producto),
            error => console.log(error),
            () => this.router.navigate(['/productos']));
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }

    onSubmit() {
        // this.newProducto.origen_latitud = this.mapComponent.origLat;
        // this.newProducto.origen_longitud = this.mapComponent.origLng;
        // this.newProducto.destino_latitud = this.mapComponent.destLat;
        // this.newProducto.destino_longitud = this.mapComponent.destLng;
        // // this.newProducto.distancia = this.mapComponent.total_distance;
        // this.newProducto.origen_direccion = this.mapComponent.nombreOrigen;
        // this.newProducto.destino_direccion = this.mapComponent.nombreDestino;
        this.submitted = true;
        this.addProducto();
    }
}
