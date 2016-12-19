import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';

@Component({
    selector: 'productos',
    templateUrl: './productos.component.html',
    styleUrls: ['./productos.component.css']
})

export class ProductosComponent implements OnInit {

    @Input() productos: Producto[];

    public columns: Array<any> = [
        { title: 'Id', name: 'id', sort: 'asc' },
        { title: 'Título', name: 'nombre', sort: '' },
        { title: 'Origen', name: 'origenDireccion', sort: '' },
        { title: 'Destino', name: 'destinoDireccion', sort: '' },
        { title: 'Estado', name: 'estadoProducto', sort: '' },
        {title: 'Cargas', name: 'estadoCargas', sort:'' }
    ];

    constructor(
        private productoService: ProductoService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.getProductos();
    }

    getProductos(): void {
        this.productoService.getProductos()
            .subscribe(
            productos => this.productos = productos,
            error => console.log(error),
            () => this.productos.forEach(p => {
                p.origenDireccion = p.origen.direccion;
                p.destinoDireccion = p.destino.direccion;
                p.estadoCargas = p.cantidadCargasDisponibles+"/"+p.cantidadTotalCargas;
            })
            );
    }
}

