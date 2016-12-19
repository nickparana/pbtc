import {Transporte} from './transporte';

export class Transportista {
  constructor(
  ) {
    this.estado = "libre";
    this.latActual = 0;
    this.lngActual = 0;
   }

  public id: number;
  public chofer: string;
  public cuil: string;
  public celular: string;
  public patenteChasis: string;
  public patenteAcoplado: string;
  public tipoCamion: string;
  public transporte: Transporte;

  public latActual: number;
  public lngActual: number;
  public estado: string;

  public nombreTransporte: string;

}
