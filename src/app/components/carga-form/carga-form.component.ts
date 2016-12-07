import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Carga, Estado } from '../../models/carga';
import { Transportista } from '../../models/transportista';
import { CargaService } from '../../services/carga.service';
import { TransportistaService } from '../../services/transportista.service';
import { MapComponent } from '../map/map.component';
import { Router } from '@angular/router';

@Component({
    selector: 'my-admin-cargas',
    templateUrl: './carga-form.component.html',
    styleUrls: ['./carga-form.component.css']
})
export class CargaFormComponent implements AfterViewInit {

    constructor(
        private cargaService: CargaService,
        private router: Router
    ) { }

    @ViewChild('map')
    private mapComponent: MapComponent;

    ngAfterViewInit() {
        this.origLat = this.mapComponent.origLat;
        this.origLng = this.mapComponent.origLng;
        this.destLat = this.mapComponent.destLat;
        this.destLng = this.mapComponent.destLng;
        this.distance = this.mapComponent.total_distance;
        this.nombreOrigen = this.mapComponent.nombreOrigen;
        this.nombreDestino = this.mapComponent.nombreDestino;
    }

    origLat: number;
    origLng: number;
    destLat: number;
    destLng: number;
    distance: number;
    nombreOrigen: string;
    nombreDestino: string;

    newCarga = new Carga('', '', '', null, null, null, '',
        new Date(), null, null, '', Estado.EN_ESPERA,
        this.origLat, this.origLng, this.destLat, this.destLng, '', '', '');

    active = true;

    addCarga() {
        this.cargaService.createCarga(this.newCarga)
            .subscribe(
            carga => console.log("carga creada", carga),
            error => console.log(error),
            () => this.router.navigate(['/cargas']));
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }

    submitted = false;
    onSubmit() {
        this.newCarga.origLat = this.mapComponent.origLat;
        this.newCarga.origLng = this.mapComponent.origLng;
        this.newCarga.destLat = this.mapComponent.destLat;
        this.newCarga.destLng = this.mapComponent.destLng;
        this.newCarga.distancia = this.mapComponent.total_distance;
        this.newCarga.nombreOrigen = this.mapComponent.nombreOrigen;
        this.newCarga.nombreDestino = this.mapComponent.nombreDestino;
        this.submitted = true;
        this.addCarga();
    }
}
