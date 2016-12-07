import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { CargaService } from '../../services/carga.service';
import { Carga, Estado } from '../../models/carga';
import { Transportista } from '../../models/transportista';
import { TransportistaService } from '../../services/transportista.service';

@Component({
    selector: 'carga-detail',
    templateUrl: './carga-detail.component.html',
    styleUrls: ['./carga-detail.component.css']

})

export class CargaDetailComponent implements OnInit {

    @Input()
    carga: Carga;
    transportista: Transportista;

    constructor(
        private cargaService: CargaService,
        private transportistaService: TransportistaService,
        private location: Location,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.getCarga();
    }

    getCarga() {
        this.route.params.forEach((params: Params) => {
            let codigo = params['codigo'];
            this.cargaService.getCarga(codigo)
                .subscribe(
                carga => this.carga = carga,
                error => console.log(error),
                () => this.getTransportista());
        });
    }

    getTransportista() {
        let transportista = this.carga.transportistaId;
        if (transportista !== null && transportista !== '') {
            this.transportistaService.getTransportista(this.carga.transportistaId)
                .subscribe(
                transportista => this.transportista = transportista,
                error => console.log(error));
        }
        else { console.log("no hay transportista asociado a este producto") }
    }

    deleteCarga(): void {
        let conf = confirm("¿Desea continuar?");
        if (conf == true) {
            this.cargaService.deleteCarga(this.carga)
                .subscribe(
                () => {
                    console.log("carga eliminada");
                    this.goBack();
                },
                error => console.log(error));
        }
    }

    updateCarga(): void {
        this.cargaService.updateCarga(this.carga)
            .subscribe(
            carga => this.carga = carga,
            error => console.log(error),
            () => console.log("carga actualizada", this.carga));
    }

    quitarCarga() {
        if (this.carga != null && this.carga.estado == Estado.TOMADA) {
            let codigo = this.carga.codigo;
            let cargas = this.transportista.cargas;
            let index = cargas.indexOf(cargas.find((carga: any) => carga.codigo === codigo));
            cargas.splice(index, 1);
            this.transportistaService.updateTransportista(this.transportista)
                .subscribe(
                transportista => this.transportista = transportista,
                error => console.log(error),
                () =>
                    console.log("Carga removida de la lista de cargas de transportista: " +
                        this.transportista.userid)
                );
            this.carga.transportistaId = "";
            this.transportista = null;
            this.carga.estado = Estado.EN_ESPERA;
            console.log("Transportista desasignado de esta carga")
            this.updateCarga();
            this.router.navigate(['/cargas']);
        }
        else {
            if (this.carga.estado == Estado.EN_CURSO)
                alert("CARGA EN CURSO, NO SE PUEDE DESASIGNAR")
        }
    }

    gotoDetailTransportista(): void {
        this.router.navigate(['/transportista-detail', this.transportista.userid]);
    }

    goBack(): void {
        this.location.back();
    }

}


