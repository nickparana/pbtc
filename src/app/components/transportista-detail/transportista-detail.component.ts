import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { TransportistaService } from '../../services/transportista.service';
import { CargaService } from '../../services/carga.service';
import { Transportista } from '../../models/transportista';
import { Carga } from '../../models/carga';
import { TableComponent } from '../../components/table/table.component';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'transportista-detail',
    templateUrl: './transportista-detail.component.html',
})

export class TransportistaDetailComponent implements OnInit {

    constructor(
        private transportistaService: TransportistaService,
        private cargaService: CargaService,
        private location: Location,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    @Input()
    transportista: Transportista = null;

    @Input()
    private cargasTransportadas: Carga[] = [];

    public columns: Array<any> = [
        { title: 'Código', name: 'codigo', sort: 'asc' },
        { title: 'Título', name: 'titulo' },
        { title: 'Peso', name: 'peso' },
        { title: 'Distancia', name: 'distancia' },
        { title: 'Tarifa [$]', name: 'tarifa' },
        { title: 'Forma de Pago', name: 'formaPago' },
        { title: 'Estado', name: 'estado' }
    ];

    ngOnInit(): void {
        this.getTransportista();
    }


    getTransportista() {
        this.route.params.forEach((params: Params) => {
            let userid = params['userid'];
            this.transportistaService.getTransportista(userid)
                .subscribe(
                transportista => {
                    this.transportista = transportista;
                    // if (transportista.cargas.length) this.getCargasTransportadas()
                    console.log("transportista encontrado con id: " + userid, transportista);
                },
                error => console.log(error)
                );
        });
    }

    getCargasTransportadas() {
        this.transportista.cargas.forEach((_carga: any) => {
            this.cargaService.getCarga(_carga.codigo)
                .subscribe(
                carga => {
                    if (carga !== null) {
                        console.log("carga encontrada con codigo: " + _carga.codigo, carga);
                        this.cargasTransportadas.push(carga)
                    }
                },
                error => console.log(error));
        })
        
    }


    getCargas() {
         this.cargaService.getCargas()  
            .subscribe(cargas => this.cargasTransportadas = cargas)

    }



    updateTransportista() {
        this.transportistaService.updateTransportista(this.transportista)
            .subscribe(
            () => {
                console.log("transportista actualizado", this.transportista);
            },
            error => console.log(error));
    }

    deleteTransportista(): void {
        let t: Transportista = this.transportista;
        let conf = confirm("¿Desea continuar?");
        if (conf == true) {
            this.transportistaService.deleteTransportista(t)
                .subscribe(
                error => console.log(error));
            this.goBack;
        }
    }

    goBack(): void {
        this.location.back();
    }

    gotoDetailCarga(codigo: string): void {
        this.router.navigate(['/carga-detail', codigo]);
    }

}


