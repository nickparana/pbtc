export class Producto {
    constructor(
        codigoExterno: string,
        nombre: string,
        //  peso: number,        
        //  distancia: number,
        tarifa: number,
        formaPago: string,
        descripcion: string,
        origenLatitud: number,
        origenLongitud: number,
        origenDireccion: string,
        destinoLatitud: number,
        destinoLongitud: number,
        destinoDireccion: string
    ) {
        this.codigoExterno = codigoExterno;
        this.nombre = nombre;
        this.tarifa = tarifa;
        this.formaPago = formaPago;       
        // this.peso = peso;
        // this.distancia = distancia;
    }

    public id: number;
    public codigoExterno: string;
    public nombre: string;
    // private  peso: number,        
    //  private distancia: number,
    public tarifa: number;
    public formaPago: string;
    //  private fechaCreacion: Date,
    //  private fechaCarga: Date,
    //  private fechaDescarga: Date,
    public descripcion: string;
    public estadoProducto: string;
    public origen: Punto;
    public destino: Punto;
    public origenLatitud: number;
    public origenLongitud: number;
    public origenDireccion: string;
    public destinoLatitud: number;
    public destinoLongitud: number;
    public destinoDireccion: string;
    // public transportista_id: number;  // -> va en relacion intermedia
}

interface Punto {
    direccion: string;
    latitud: number;
    longitud:number;
}