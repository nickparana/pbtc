import {Punto} from './punto';

export class Producto {
    constructor(
        nombre: string,
        codigoExterno: string,
        origen: Punto,
        destino: Punto,
        descripcion: string,
        tarifa: number,
        formaPago: string,
        peso: number
    ) {
        this.nombre = nombre;
        this.codigoExterno = codigoExterno;
        this.origen = origen;
        this.destino = destino;
        this.descripcion = descripcion;
        this.tarifa = tarifa;
        this.formaPago = formaPago;
        this.peso = peso;
    }

    public id: number;
    public nombre: string;
    public codigoExterno: string;
    public origen: Punto;
    public destino: Punto;
    public descripcion: string;
    public tarifa: number;
    public formaPago: string;
    public estadoProducto: string;
    // public fechaCreacion: Date;
    // public fechaCarga: Date;
    // public fechaDescarga: Date;
    public  peso: number; 
    // public distancia: number;  
    // public transportista_id: number;  // -> va en relacion intermedia
    public cantidadCargasDisponibles: number;
    public cantidadTotalCargas: number;
    public estadoCargas: string;

    public origenDireccion: string; // solo sirve para poder mostrar en tabla por problema con ng2-table y el array de columnas
    public destinoDireccion: string; // idem
}