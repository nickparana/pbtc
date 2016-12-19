export class Punto {

    public latitud: number;
    public longitud: number;
    public direccion: string;

    constructor(
        latitud: number, longitud: number, direccion: string) {
        this.latitud = latitud;
        this.longitud = longitud;
        this.direccion = direccion;
    }
}