import { Component, ViewChild, AfterViewInit, Input } from '@angular/core';
import { Producto } from '../../models/producto';
import { Transportista } from '../../models/transportista';
import { ProductoService } from '../../services/producto.service';
import { TransportistaService } from '../../services/transportista.service';
import { MapComponent } from '../map/map.component';
import { Router } from '@angular/router';
import {ProductoFormComponent} from '../producto-form/producto-form.component';

@Component({
    selector: 'producto-edit',
    templateUrl: './producto-edit.component.html',
    styleUrls: ['./producto-edit.component.css']
})
export class ProductoEditComponent  {

    
}
