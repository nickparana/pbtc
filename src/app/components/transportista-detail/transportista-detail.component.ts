import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { TransportistaService } from '../../services/transportista.service';
import { ProductoService } from '../../services/producto.service';
import { Transportista } from '../../models/transportista';
import { Producto } from '../../models/producto';
import { TableComponent } from '../../components/table/table.component';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'transportista-detail',
    templateUrl: './transportista-detail.component.html',
})

export class TransportistaDetailComponent implements OnInit {

    constructor(
        private transportistaService: TransportistaService,
        private productoService: ProductoService,
        private location: Location,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    @Input()
    transportista: Transportista = null;

    @Input()
    private productosTransportadas: Producto[] = [];

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
                    // if (transportista.productos.length) this.getProductosTransportadas()
                    console.log("transportista encontrado con id: " + userid, transportista);
                },
                error => console.log(error)
                );
        });
    }

    // getProductosTransportadas() {
    //     this.transportista.productos.forEach((_producto: any) => {
    //         this.productoService.getProducto(_producto.codigo)
    //             .subscribe(
    //             producto => {
    //                 if (producto !== null) {
    //                     console.log("producto encontrada con codigo: " + _producto.codigo, producto);
    //                     this.productosTransportadas.push(producto)
    //                 }
    //             },
    //             error => console.log(error));
    //     })
        
    // }


    getProductos() {
         this.productoService.getProductos()  
            .subscribe(productos => this.productosTransportadas = productos)

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

    gotoDetailProducto(codigo: string): void {
        this.router.navigate(['/producto-detail', codigo]);
    }

}


