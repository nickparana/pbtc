export class Carga {
    constructor(
        public _id: string,
        public codigo: string,
        public titulo: string,
        public peso: number,        
        public distancia: number,
        public tarifa: number,
        public formaPago: string,
        public fechaCreacion: Date,
        public fechaCarga: Date,
        public fechaDescarga: Date,
        public descripcion: string,
        public estado: Estado,
        public origLat: number,
        public origLng: number,
        public destLat: number,
        public destLng: number,
        public nombreOrigen: string,
        public nombreDestino: string,
        public transportistaId: string
    ) { }
}

export enum Estado {   
    'EN_ESPERA',
    'TOMADA',
    'EN_CURSO',
    'CANCELADA',
    'DEMORADA',
    'FINALIZADA'
}
