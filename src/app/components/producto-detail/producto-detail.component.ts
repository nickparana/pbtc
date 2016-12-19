import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import { Transportista } from '../../models/transportista';
import { TransportistaService } from '../../services/transportista.service';

@Component({
    selector: 'producto-detail',
    templateUrl: './producto-detail.component.html',
    styleUrls: ['./producto-detail.component.css']
})

export class ProductoDetailComponent implements OnInit {

    @Input()
    producto: Producto;
    transportista: Transportista;

    constructor(
        private productoService: ProductoService,
        private transportistaService: TransportistaService,
        private location: Location,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.getProducto();
    }

    getProducto() {
        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            this.productoService.getProducto(id)
                .subscribe(
                producto => this.producto = producto,
                error => console.log(error),
                // () => this.getTransportista()
            );
        });
    }

    // getTransportista() {
    //     let transportista = this.producto.transportista_id;
    //     if (transportista !== null) {
    //         this.transportistaService.getTransportista(this.producto.transportista_id)
    //             .subscribe(
    //             transportista => this.transportista = transportista,
    //             error => console.log(error));
    //     }
    //     else { console.log("no hay transportista asociado a este producto") }
    // }

    deleteProducto(): void {
        let conf = confirm("¿Desea continuar?");
        if (conf == true) {
            this.productoService.deleteProducto(this.producto)
                .subscribe(
                error => console.log(error));
            this.goBack()
        }
    }

    updateProducto(): void {
        this.productoService.updateProducto(this.producto)
            .subscribe(
            producto => this.producto = producto,
            error => console.log(error),
            () => console.log("producto actualizado", this.producto));
    }

    // quitarProducto() {
    //     if (this.producto != null && this.producto.estado == "Carga tomada") {
    //         let id = this.producto.id;
    //         let productos = this.transportista.productos;
    //         let index = productos.indexOf(productos.find((producto: any) => producto.id === id));
    //         productos.splice(index, 1);
    //         this.transportistaService.updateTransportista(this.transportista)
    //             .subscribe(
    //             transportista => this.transportista = transportista,
    //             error => console.log(error),
    //             () =>
    //                 console.log("Producto removida de la lista de productos de transportista: " +
    //                     this.transportista.userid)
    //             );
    //         this.producto.transportista_id = null;
    //         this.transportista = null;
    //         this.producto.estado = "Carga disponible";
    //         console.log("Transportista desasignado de esta producto")
    //         this.updateProducto();
    //         this.router.navigate(['/productos']);
    //     }
    //     else {
    //         if (this.producto.estado == "En curso")
    //             alert("CARGA EN CURSO, NO SE PUEDE DESASIGNAR")
    //     }
    // }

    // gotoDetailTransportista(): void {
    //     this.router.navigate(['/transportista-detail', this.transportista.userid]);
    // }

    gotoEditProducto(){
        this.router.navigate(['/producto-edit', this.producto.id]);
    }

    goBack(): void {
        this.location.back();
    }

}


