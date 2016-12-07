export class Transportista {
  constructor(
    public _id: string,
    public userid: string,
    public cuit: string,
    public cuil: string,
    public nombreTransporte: string,
    public patenteChasis: string,
    public patenteAcoplado: string,
    public tipoCamion: string,
    public nombre: string,
    public apellido: string,
    public telef: string,
    public celular: string,
    public email: string,
    public ciudad: string,
    public cargas: Array<String>,
    public latActual: number,
    public lngActual: number,
    public estado: string
  ) { }
}
