import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Carga, Estado } from '../../models/carga';
import { CargaService } from '../../services/carga.service';


@Component({
    selector: 'my-cargas',
    templateUrl: './cargas.component.html',
    styleUrls: ['./cargas.component.css']
})

export class CargasComponent implements OnInit {

    @Input() cargas: Carga[];
    private carga: Carga;

    // public columns: Array<any> = [
    //     { title: 'Código', name: 'codigo' },
    //     { title: 'Título', name: 'titulo' },
    //     { title: 'Peso [Kg]', name: 'peso', },
    //     { title: 'Distancia [Km]', name: 'distancia' },
    //     { title: 'Tarifa [$]', name: 'tarifa' },
    //     { title: 'Forma de Pago', name: 'formaPago' }      
    // ];

    public columns: Array<any> = [
        { title: 'Código', name: 'codigo' },
        { title: 'Título', name: 'titulo' },
        { title: 'Origen', name: 'nombreOrigen' },
        { title: 'Destino', name: 'nombreDestino' },
        { title: 'Estado', name: 'estado' }
    ];

    constructor(
        private cargaService: CargaService,
        private router: Router

    ) { }

    ngOnInit(): void {
        this.getCargas();
    }

    getCargas(): void {
        this.cargaService.getCargas()
            .subscribe(
            cargas => this.cargas = cargas,
            error => console.log(error));
    }

}