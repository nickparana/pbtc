import { Component, ViewChild, Input } from '@angular/core';
import { Producto } from '../../models/producto';
import { Punto } from '../../models/punto';
import { Transportista } from '../../models/transportista';
import { ProductoService } from '../../services/producto.service';
import { TransportistaService } from '../../services/transportista.service';
import { MapComponent } from '../map/map.component';
import { Router } from '@angular/router';

@Component({
    selector: 'producto-nuevo',
    templateUrl: './producto-nuevo.component.html',
    styleUrls: ['./producto-nuevo.component.css']
})
export class ProductoNuevoComponent {   

    @Input() public validCoords: boolean = false;
    validCoordsChange($event: any) {
        this.validCoords = $event;
    }

    submitted: boolean;
    newProducto: Producto = new Producto("", '', null, null, "", 0, "", 0);

    constructor(
        private productoService: ProductoService,
        private router: Router
    ) { }

    @ViewChild('map')
    private mapComponent: MapComponent;

    resetFormAndGoBack(form: any) {
        if (this.submitted) {
            this.submitted = false;
            form.reset();
            this.router.navigate(['/productos']);
        }
    }

    onSubmit(form: any) {
        this.newProducto.origen = this.mapComponent.origen;
        this.newProducto.destino = this.mapComponent.destino;
        if (form.valid && this.validCoords) {
            this.submitted = true;
            this.productoService.createProducto(this.newProducto)
                .subscribe(
                producto => console.log("producto creado", producto),
                error => console.log(error));
        }
        else
            this.submitted = false
    }
}
