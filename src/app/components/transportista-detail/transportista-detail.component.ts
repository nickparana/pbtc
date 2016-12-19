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
    styleUrls: ['./transportista-detail.component.css']
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
    private productosTransportados: Producto[] = [];

    public columns: Array<any> = [
        { title: 'Id', name: 'id', sort: 'asc' },
        { title: 'Título', name: 'nombre', sort: '' },
        { title: 'Origen', name: 'origenDireccion', sort: '' },
        { title: 'Destino', name: 'destinoDireccion', sort: '' },
        { title: 'Estado', name: 'estadoProducto', sort: '' }
    ];

    ngOnInit(): void {
      //  this.getProductos();
        this.getTransportista();
    }


    getTransportista() {
        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            this.transportistaService.getTransportista(id)
                .subscribe(
                transportista => {
                    this.transportista = transportista;
                    // if (transportista.productos.length) this.getProductosTransportadas()           
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
    //                     this.productosTransportados.push(producto)
    //                 }
    //             },
    //             error => console.log(error));
    //     })

    // }


    getProductos() {  // prueba (trae todo)
        this.productoService.getProductos()
            .subscribe(productos => this.productosTransportados = productos,
            error => console.log(error))
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
            this.goBack();
        }
    }

    goBack(): void {
        this.location.back();
    }

    gotoDetailProducto(codigo: string): void {
        this.router.navigate(['/producto-detail', codigo]);
    }

}


